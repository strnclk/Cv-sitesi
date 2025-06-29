<template>
  <q-layout view="hHh lpR fFf">
    <!-- Header -->
   <q-header elevated class="bg-white text-grey-9 q-py-sm">
 <q-toolbar class="q-px-md q-px-xl justify-between">
  <!-- Sol: Logo -->
  <div
    class="text-bold text-h6 text-yellow"
    style="font-family: 'Montserrat', sans-serif"
  >
    <span class="text-weight-bolder">Sitran</span>
    <span class="text-weight-light">Çelik</span>
  </div>

  <!-- Orta: Masaüstü Menü -->
  <div v-if="!$q.screen.lt.md" class="row items-center q-gutter-x-md">
    <q-btn
      v-for="nav in navigation"
      :key="nav.id"
      flat
      no-caps
      class="text-grey-7"
      @click="scrollToSection(nav.id)"
      style="font-size: 0.9rem; letter-spacing: 0.5px"
    >
      <q-icon :name="nav.icon" class="q-mr-sm" />
      {{ $t(nav.labelKey) }}
    </q-btn>
  </div>

  <!-- Sağ: Dil Seçici, Dark Mode, Menu -->
  <div class="row items-center q-gutter-x-sm">
    <q-select
      v-model="selectedLanguage"
      :options="languages"
      dense
      borderless
      emit-value
      map-options
      options-dense
      dropdown-icon="expand_more"
      class="language-selector"
      @update:model-value="changeLanguage"
    >
      <template v-slot:selected-item="scope">
        <q-icon :name="scope.opt.icon" size="sm" class="q-mr-xs" />
      </template>
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section avatar>
            <q-icon :name="scope.opt.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ scope.opt.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>

    <q-btn
      round
      dense
      flat
      :icon="darkMode ? 'dark_mode' : 'light_mode'"
      @click="toggleDarkMode"
      class="theme-toggle"
    />

    <q-btn
      v-if="$q.screen.lt.md"
      dense
      flat
      round
      icon="menu"
      class="mobile-menu-btn"
      @click="drawerOpen = !drawerOpen"
    />
  </div>
</q-toolbar>

</q-header>


    <!-- Drawer Menu -->
  <q-drawer
  v-model="drawerOpen"
  side="right"
  overlay
  behavior="mobile"
  :width="250"
  class="drawer-menu"
>
  <q-scroll-area class="fit">
    <q-list padding class="menu-list">
      <q-item
        v-for="nav in navigation"
        :key="nav.id"
        clickable
        v-ripple
        @click="scrollToSection(nav.id); drawerOpen = false"
      >
        <q-item-section avatar>
          <q-icon :name="nav.icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t(nav.labelKey) }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
</q-drawer>


    <!-- Page Container with Footer -->
    <q-page-container class="page-container">
      <router-view />

      <!-- Footer -->
      <footer class="bg-warning q-py-md text-center">
        <div class="text-body1 text-weight-medium">
          {{ $t("footer.copyright") }}
        </div>
      </footer>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { Dark, useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router"; // useRouter'ı ekledik
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const $q = useQuasar();
const route = useRoute();
const router = useRouter(); // Router tanımı
function changeLanguage(val) {
  locale.value = val;
}

function setLanguage(lang) {
  $i18n.locale = lang;
  localStorage.setItem("appLang", lang);
}
const navigation = ref([
  { labelKey: "navigation.home", id: "home", icon: "home" },
  { labelKey: "navigation.about", id: "about", icon: "person" },
  { labelKey: "navigation.projects", id: "projects", icon: "work" },
  { labelKey: "navigation.contact", id: "contact", icon: "mail" },
]);

const scrollToSection = (id) => {
  // Önce ana sayfaya yönlendir
  if (router.currentRoute.value.path !== "/") {
    router
      .push("/")
      .then(() => {
        // Sayfa yüklendikten sonra scroll işlemi
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({
              behavior: "smooth",
              block: "start", // Daha iyi hizalam için ekledik
            });
            window.history.replaceState(null, null, `#${id}`);
          }
        }, 100);
      })
      .catch((err) => {
        console.error("Navigation error:", err); // Hata durumunda log
      });
  } else {
    // Zaten ana sayfadaysa direkt scroll
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start", // Daha iyi hizalam için ekledik
      });
      window.history.replaceState(null, null, `#${id}`);
    }
  }
};

// Dark mode
const darkMode = ref(
  typeof window !== "undefined" && $q.localStorage
    ? $q.localStorage.getItem("darkMode")
    : Dark.isActive
);
Dark.set(darkMode.value);

function toggleDarkMode() {
  darkMode.value = !darkMode.value;
  Dark.set(darkMode.value);
  if ($q.localStorage) {
    $q.localStorage.set("darkMode", darkMode.value);
  }
}

// Language selector
const selectedLanguage = ref("tr");
const languages = [
  {
    label: "Türkçe",
    value: "tr",
    icon: "img:https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TR.svg",
  },
  {
    label: "English",
    value: "en",
    icon: "img:https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GB.svg",
  },
];

// Drawer state
const drawerOpen = ref(false);

// Close drawer when route changes
watch(
  () => route.path,
  () => {
    if ($q.screen.lt.md) {
      drawerOpen.value = false;
    }
  }
);

onMounted(() => {
  if (window.location.hash) {
    const id = window.location.hash.substring(1);
    setTimeout(() => {
      scrollToSection(id);
    }, 300); // Sayfanın tam yüklenmesi için daha uzun bekleme
  }
});
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap");

.q-header {
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.language-selector {
  min-width: 40px;

  :deep(.q-field__control) {
    height: 36px;
    min-height: auto;
  }

  :deep(.q-field__native) {
    padding: 0;
  }
}

.theme-toggle {
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(15deg);
  }
}

.mobile-menu-btn {
  transition: all 0.3s ease;

  &:hover {
    color: $primary;
  }
}

.drawer-menu {
  background: var(--q-primary);
  color: white;

  .menu-list {
    padding-top: 20px;
  }

  .menu-item {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1rem;
    padding: 12px 24px;
    transition: all 0.3s ease;

    &:hover {
      color: white;
      background: rgba(255, 255, 255, 0.1);
    }

    &.active-menu-item {
      color: white;
      background: rgba(255, 255, 255, 0.2);
      border-left: 3px solid white;
    }
  }
}

/* Footer ve sayfa düzeni */
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  > *:not(footer) {
    flex: 1;
  }
}

footer {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  margin-top: auto;
  width: 100%;
}

@media (max-width: $breakpoint-md) {
  .q-toolbar {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
