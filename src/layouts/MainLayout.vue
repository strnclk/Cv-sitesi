<template>
  <q-layout view="hHh lpR fFf">
    <!-- Header with improved styling -->
    <q-header elevated class="bg-white text-grey-9 q-py-sm">
      <q-toolbar class="q-px-xl">
        <!-- Logo with better styling -->
        <div class="text-bold text-h6 text-yellow" style="font-family: 'Montserrat', sans-serif;">
          <span class="text-weight-bolder">Sitran</span>
          <span class="text-weight-light">Çelik</span>
        </div>

        <q-space />

        <!-- Desktop Menu - Improved design -->
        <div v-if="!$q.screen.lt.md" class="row items-center q-gutter-x-sm">
          <q-btn
            v-for="nav in navigation"
            :key="nav.label"
            flat
            no-caps
            class="text-grey-7"
            :class="{ 'text-primary': $route.path === nav.to }"
            :label="nav.label"
            :to="nav.to"
            style="font-size: 0.9rem; letter-spacing: 0.5px;"
          />
        </div>

        <q-space />

        <!-- Right actions - More refined -->
        <div class="row items-center q-gutter-x-sm">
          <!-- Language selector with flag icons -->
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
          >
            <template v-slot:selected-item="scope">
              <q-icon
                :name="scope.opt.icon"
                size="sm"
                class="q-mr-xs"
              />
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

          <!-- Dark mode toggle with better styling -->
          <q-btn
            round
            dense
            flat
            :icon="darkMode ? 'dark_mode' : 'light_mode'"
            @click="toggleDarkMode"
            class="theme-toggle"
          />

          <!-- Mobile menu button with better styling -->
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

    <!-- Drawer Menu with improved styling -->
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
            :key="nav.label"
            clickable
            v-ripple
            :to="nav.to"
            exact
            class="menu-item"
            :class="{ 'active-menu-item': $route.path === nav.to }"
          >
            <q-item-section>{{ nav.label }}</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- Page Container -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Dark, useQuasar } from 'quasar';
import { useRoute } from 'vue-router'; // Add this import

const $q = useQuasar();
const route = useRoute(); // Get the route object

// Navigation items
const navigation = [
  { label: 'ANA SAYFA', to: '/home' },
  { label: 'BEN KİMİM?', to: '/about' },
  { label: 'PROJELERİM', to: '/projects' },
  { label: 'BANA ULAŞIN', to: '/contact' }
];

// Dark mode - localStorage kontrolü ekledik
const darkMode = ref(
  typeof window !== 'undefined' && $q.localStorage
    ? $q.localStorage.getItem('darkMode')
    : Dark.isActive
);
Dark.set(darkMode.value);

function toggleDarkMode() {
  darkMode.value = !darkMode.value;
  Dark.set(darkMode.value);
  if ($q.localStorage) {
    $q.localStorage.set('darkMode', darkMode.value);
  }
}

// Language selector
const selectedLanguage = ref('tr');
const languages = [
  { label: 'Türkçe', value: 'tr', icon: 'img:https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TR.svg' },
  { label: 'English', value: 'en', icon: 'img:https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GB.svg' }
];

// Drawer state
const drawerOpen = ref(false);

// Close drawer when route changes - now using the correct route object
watch(() => route.path, () => {
  if ($q.screen.lt.md) {
    drawerOpen.value = false;
  }
});
</script>

<style lang="scss" scoped>
// Import Google Font
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap');

// Header styles
.q-header {
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

// Language selector
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

// Theme toggle button
.theme-toggle {
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(15deg);
  }
}

// Mobile menu button
.mobile-menu-btn {
  transition: all 0.3s ease;

  &:hover {
    color: $primary;
  }
}

// Drawer menu styles
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

// Responsive adjustments
@media (max-width: $breakpoint-md) {
  .q-toolbar {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
