<template>

 <q-page id="home" class="home-page flex flex-center q-pt-xl q-pb-xl">
  <div class="full-width">
    <div class="row justify-center items-center q-gutter-y-xl">
      <!-- Sol Kısım - Metinler ve Buton -->
      <div class="col-12 col-md-5 text-center q-px-md">
        <div class="text-h2 text-weight-bold q-mb-sm">
          <span class="text-warning">{{ $t("homePage.greeting") }}</span><br>
          {{ $t("homePage.intro") }}
        </div>

        <div class="text-h4 text-weight-medium q-mt-lg">
          {{ typedText }}<span class="cursor">|</span>
        </div>

        <div class="q-mt-xl">
          <div class="text-body1 q-mb-sm">
            {{ $t("cv.description") }}
          </div>
          <q-btn
            color="amber"
            text-color="black"
            icon="description"
            :label="$t('cv.button')"
            unelevated
            rounded
            class="q-px-md"
            href="/docs/CV.pdf"
            target="_blank"
          />
        </div>
      </div>

      <!-- Sağ Kısım - Profil -->
      <div class="col-12 col-md-5 flex justify-center">
        <div class="profile-container relative-position">
          <!-- Modern arkaplan efekti -->
          <div class="profile-background"></div>

          <!-- Profil çerçevesi -->
          <div class="profile-frame">
            <img
              src="/image/profile.png"
              alt="Profil Fotoğrafı"
              class="profile-img"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</q-page>


  <!-- 1) HAKKIMDA KARTI -->
  <q-page id="about" class="row items-center justify-center q-px-md q-pt-xl">
    <!-- Başlık -->
    <div class="col-12 text-center ">
      <div class="text-h4 text-weight-bold">{{ $t("aboutPage.title") }}</div>
    </div>

    <!-- Hakkımda Kartı -->
    <div
      class="about-card q-pa-lg bg-grey-2"
      style="width: 100%; max-width: 900px"
    >
      <p class="text-body1">
        {{ $t("aboutPage.description") }}
      </p>
      <div class="row items-center q-mt-lg">
        <div class="col-auto text-center">
          <div class="text-h4 text-weight-bold">
            5<span class="text-h6 text-yellow">+</span>
          </div>
          <div class="text-subtitle2">
            {{ $t("aboutPage.projectsCountLabel") }}
          </div>
        </div>
        <div class="col-auto text-center q-ml-lg">
          <div class="text-h4 text-weight-bold">
            1<span class="text-h6 text-yellow">+</span>
          </div>
          <div class="text-subtitle2">
            {{ $t("aboutPage.experienceYearsLabel") }}
          </div>
        </div>
      </div>
    </div>

    <!-- Programlama Dilleri -->
    <div class="q-mt-xl col-12 col-md-8">
      <div class="text-h4 text-weight-bold text-left">
        {{ $t("aboutPage.languagesTitle") }}
      </div>
      <p class="text-body1 q-mb-md text-left">
        {{ $t("aboutPage.languagesDescription") }}
      </p>

      <div class="row q-col-gutter-xl q-row-gutter-xl">
        <div v-for="(lang, i) in languages" :key="i" class="col-6 col-md-3">
          <div class="lang-card flex no-wrap">
            <div class="color-bar bg-warning"></div>
            <div class="name bg-grey-3 flex flex-center">{{ lang }}</div>
          </div>
        </div>
      </div>
    </div>
  </q-page>

  <!-- 3) PROJELERİM -->
  <q-page id="projects" class="q-pa-lg" style="margin-top: 100px">
    <!-- Başlık -->
    <div class="col-12 text-center q-mb-xl">
      <div class="text-h4 text-weight-bold">{{ $t("projectsPage.title") }}</div>

      <p class="text-body1 q-mt-lg">
        {{ $t("projectsPage.description") }}
      </p>
    </div>

    <!-- Max width container -->
    <div class="q-mx-auto" style="max-width: 1400px; padding: 0 24px">
      <div class="row q-col-gutter-lg q-mt-xl">
        <div v-for="(project, i) in 3" :key="i" class="col-12 col-md-4">
          <q-card
            class="q-pa-md bg-grey-3 flex column justify-between q-rounded-xl"
            style="height: 100% ;border-radius: 50px"
          >
            <!-- Resim -->
            <div class="q-mb-md">
               <img
                src="/image/proje.png"
                alt="Profil Fotoğrafı"
                class="proje-img"
              />
            </div>

            <!-- Başlık -->
            <div class="text-h6 text-weight-bold q-mb-xs project-title">
              {{ $t("projectsPage.projectTitle") }}
            </div>

            <!-- Kullanılan Diller -->
            <div class="text-subtitle2 q-mb-sm">
              {{ $t("projectsPage.usedTechnologies") }}
            </div>
            <div class="q-mb-md">
              <q-chip dense class="q-mr-xs" color="grey-4" text-color="black">
                HTML
              </q-chip>
              <q-chip dense class="q-mr-xs" color="grey-4" text-color="black">
                CSS
              </q-chip>
              <q-chip dense class="q-mr-xs" color="grey-4" text-color="black">
                JavaScript
              </q-chip>
            </div>

            <!-- Buton -->
            <div class="row justify-end q-mx-md q-my-md">
              <q-btn round color="amber" icon="open_in_new" />
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>

  <!-- 4) İLETİŞİM -->
  <q-page id="contact" class="q-pa-lg">
    <!-- Başlık -->
    <div class="text-center q-mb-xl">
      <div class="text-h4 text-weight-bold">{{ $t("contactPage.title") }}</div>

      <p class="text-body1 " style="max-width: 600px; margin: 18px auto">
        {{ $t("contactPage.description") }}
      </p>
    </div>

    <!-- Ana İçerik -->
    <div class="row justify-center q-col-gutter-xl">
      <!-- Sosyal Medya -->
      <div class="col-12 col-md-4">
        <q-card flat class="q-pa-lg" style="border-radius: 12px">
          <h2 class="text-h5 text-weight-bold text-black q-mb-lg">
            {{ $t("contactPage.socialMedia") }}
          </h2>

          <div class="q-gutter-y-md">
            <q-btn
              flat
              class="social-btn"
              @click="goTo('https://github.com/strnclk')"
            >
              <q-icon name="fab fa-github" size="md" class="q-mr-sm" />
              <span>GitHub</span>
            </q-btn>

            <q-btn
              flat
              class="social-btn"
              @click="goTo('https://linkedin.com/in/sitran-çelik-4810b3203')"
            >
              <q-icon
                name="fab fa-linkedin"
                size="md"
                color="primary"
                class="q-mr-sm"
              />
              <span>LinkedIn</span>
            </q-btn>

            <q-btn
              flat
              class="social-btn"
              @click="goTo('https://www.figma.com/@sitran')"
            >
              <q-icon name="fab fa-figma" size="md" class="q-mr-sm" />
              <span>Figma</span>
            </q-btn>
          </div>

          <q-separator class="q-my-lg" />

          <h2 class="text-h5 text-weight-bold text-black q-mb-lg">
            {{ $t("contactPage.directContact") }}
          </h2>
          <div class="q-gutter-y-md">
            <div class="row items-center">
              <q-icon name="mail" color="grey-7" class="q-mr-sm" />
              <span class="text-body1">sitran.celik@gmail.com</span>
            </div>
          </div>
        </q-card>
      </div>

      <!-- İletişim Formu -->
      <div class="col-12 col-md-6">
        <q-card flat class="q-pa-lg shadow-2" style="border-radius: 12px">
          <h2 class="text-h5 text-weight-bold text-black q-mb-xl">
            {{ $t("contactPage.sendMessage") }}
          </h2>

          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              filled
              v-model="contactForm.name"
              :label="$t('contactPage.labels.name')"
              lazy-rules
              :rules="[(val) => !!val || $t('contactPage.errors.required')]"
            />

            <q-input
              filled
              v-model="contactForm.email"
              :label="$t('contactPage.labels.email')"
              type="email"
              lazy-rules
              :rules="[
                (val) => !!val || $t('contactPage.errors.required'),
                (val) =>
                  /.+@.+\..+/.test(val) || $t('contactPage.errors.email'),
              ]"
            />

            <q-input
              filled
              v-model="contactForm.subject"
              :label="$t('contactPage.labels.subject')"
            />

            <q-input
              filled
              v-model="contactForm.message"
              :label="$t('contactPage.labels.message')"
              type="textarea"
              rows="5"
              lazy-rules
              :rules="[(val) => !!val || $t('contactPage.errors.required')]"
            />

            <div class="text-right">
              <q-btn
                type="submit"
                color="warning"
                :label="$t('contactPage.labels.send')"
                class="q-px-xl text-black"
                size="md"
              />
            </div>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import profileImage from 'assets/profile.jpg';


const { locale } = useI18n();
const messages = ["Front-end Developer", "UI/UX Developer"];
const typedText = ref("");
let msgIndex = 0,
  charIndex = 0,
  isDeleting = false;
const typingSpeed = 100,
  pauseTime = 1500;

function typeEffect() {
  const current = messages[msgIndex];
  if (!isDeleting) {
    typedText.value = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length)
      setTimeout(() => (isDeleting = true), pauseTime);
  } else {
    typedText.value = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      msgIndex = (msgIndex + 1) % messages.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? typingSpeed / 2 : typingSpeed);
}

const languages = ref([
  "Vue.js",
  "C#",
  "Python",
  "PHP",
  "HTML",
  "CSS",
  "Tailwind CSS",
  ".Net",
]);

const contactForm = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const goTo = (url) => {
  window.open(url, "_blank");
};

const onSubmit = () => {
  $q.notify({
    color: "positive",
    message: "Mesajınız başarıyla gönderildi!",
    icon: "check",
  });

  contactForm.value = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };
};


const openLink = (url) => {
  window.open(url, '_blank');
};
onMounted(typeEffect);
</script>

<style scoped>
.about-card {
  border-radius: 16px;
  width: 70%;
}

.home-page {
  min-height: 100vh;
}

.profile-container {
  width: 450px;
  height: 450px;
  position: relative;
  margin: 0 auto;
}

.profile-background {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #ece9c8 0%, #f1b602 100%);
  border-radius: 20px;
  transform: rotate(13deg);
  z-index: 0;
  box-shadow: 0 20px 40px rgba(255, 193, 7, 0.8);
}

.profile-frame {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  overflow: hidden;
  border: 12px solid #f5f5f5;
  z-index: 1;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.profile-frame:hover {
  transform: translateY(-5px);
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.cursor {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@media (max-width: 768px) {
  .profile-container {
    width: 280px;
    height: 280px;
  }

  .profile-frame {
    border-width: 8px;
  }

  .text-h2 {
    font-size: 2rem;
  }

  .text-h4 {
    font-size: 1.25rem;
  }
}
/* Dil kartları */
.lang-card {
  border-radius: 12px;
  overflow: hidden;
  height: 48px;
}
.color-bar {
  width: 40px;
}
.name {
  flex: 1;
  height: 100%;
}

.social-btn {
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s;
}

.social-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

.proje-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 50px;
}
</style>
