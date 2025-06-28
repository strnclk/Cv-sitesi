<!-- src/pages/AboutPage.vue -->
<template>
  <q-page class="q-pa-xl">

    <!-- Info Card -->
    <div class="info-card">
      <p class="info-text">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of
        Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
        software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
      <div class="stats-row">
        <div class="stat">
          <span class="stat-number">5+</span>
          <span class="stat-label">Proje</span>
        </div>
        <div class="stat">
          <span class="stat-number">1+</span>
          <span class="stat-label">Deneyim Yılı</span>
        </div>
      </div>
    </div>

    <!-- Programlama Dilleri -->
    <div class="lang-section">
      <div class="text-h5 text-weight-bold">Programlama Dilleri</div>
      <div class="text-body1 q-mt-sm">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </div>

      <div class="lang-grid">
        <div v-for="lang in 6" :key="lang" class="lang-badge">
          <div class="lang-left"></div>
          <div class="lang-right">LOREM</div>
        </div>
      </div>
    </div>

  </q-page>
</template>

<script setup>
// Bu sayfa statik olduğu için şu an script blok boş.
// İstersen props veya veri ekleyebilirsin.
</script>

<style scoped>
/* ---------------- Info Card ---------------- */
.info-card {
  background-color: #F5F5F5;
  border-radius: 20px;
  padding: 24px;
}
.info-text {
  font-size: 0.95rem;
  line-height: 1.6;
}
.stats-row {
  display: flex;
  gap: 48px;
  margin-top: 16px;
}
.stat {
  display: flex;
  align-items: baseline;
  gap: 6px;
}
.stat-number {
  font-size: 1.75rem;
  font-weight: bold;
}
.stat-label {
  font-size: 1rem;
  font-weight: 500;
}

/* -------------- Programming Languages -------------- */
.lang-section {
  margin-top: 48px;
}
.lang-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  margin-top: 16px;
}
.lang-badge {
  display: flex;
  height: 40px;
  border-radius: 10px;
  overflow: hidden;
  cursor: default;
  transition: transform 0.2s;
}
.lang-badge:hover {
  transform: translateY(-2px);
}
.lang-left {
  width: 40px;
  background-color: #FBBC05; /* senin sarı tonun */
}
.lang-right {
  flex: 1;
  background-color: #E0E0E0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 0.9rem;
}
</style>
