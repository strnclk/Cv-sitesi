<template>
  <q-page class="row items-center justify-center q-px-xl">
    <!-- SOL KISIM -->
    <div class="col-12 col-md-5 q-pr-lg-lg">
      <div class="text-h2 text-weight-bold">
        <span class="text-warning ">Merhaba !</span><bold><br>  Ben  Sitran Çelik</bold>
      </div>
      <div class="text-h4 text-weight-medium q-mt-md">
        {{ typedText }}<span class="cursor">|</span>
      </div>
    </div>

    <!-- SAĞ KISIM -->
    <div class="col-12 col-md-5 flex justify-center relative-position photo-container q-pl-lg-lg">
      <!-- 1) Sarı panel arkaplan -->
      <img
        src="/image/profikBackground.png"
        alt="Panel Arka Plan"
        class="rotated-bg"
      />

      <!-- 2) Üzerindeki gri çerçeve ve fotoğraf -->
      <div class="photo-frame">
      </div>

       <div class="photo-profile">
        <img
          src="~assets/profile.jpg"
          class="photo-img"
        />
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const messages = ['Front-end Developer', 'UI/UX Developer']
const typedText = ref('')
let msgIndex = 0, charIndex = 0, isDeleting = false
const typingSpeed = 100, pauseTime = 1500

function typeEffect() {
  const current = messages[msgIndex]
  if (!isDeleting) {
    typedText.value = current.substring(0, charIndex + 1)
    charIndex++
    if (charIndex === current.length) setTimeout(() => (isDeleting = true), pauseTime)
  }
  else {
    typedText.value = current.substring(0, charIndex - 1)
    charIndex--
    if (charIndex === 0) {
      isDeleting = false
      msgIndex = (msgIndex + 1) % messages.length
    }
  }
  setTimeout(typeEffect, isDeleting ? typingSpeed / 2 : typingSpeed)
}

onMounted(typeEffect)
</script>

<style scoped>
/* Konteyner ve pozisyonlama */
.relative-position { position: relative; }
.photo-container { height: 300px; }

/* 1) SARI PANEL ARKAPLAN */
.rotated-bg {
  position: absolute;
  bottom: -150px;
  width: 660px;
  /* Yüksekliğe göre auto */
  height: auto;
  transform: rotate(-10deg);
  z-index: 1;
}

/* 2) GRİ ÇERÇEVE VE FOTO */
.photo-frame {
  position: absolute;
  top: -25px;
  width: 380px;
  height: 380px;
  background-color: #DDDBDB;
  border-radius: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

/* Fotoğrafın kutuya tam oturması */
.photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}

/* İmleç efekti (sol kısım için) */
.cursor {
  display: inline-block;
  width: 1ch;
  animation: blink 1s steps(2) infinite;
}
@keyframes blink {
  0%,50% { opacity: 1 }
  50.1%,100% { opacity: 0 }
}
.photo-profile {
  position: absolute;
  top: 65px;
  width: 200px;
  height: 200px;
  background-color: #f1eded;
  border-radius: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
</style>
