import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'

// Burada i18n'i dışarıya export edelim
export const i18n = createI18n({
  legacy: false,             // Composition API desteği için
  globalInjection: true,
  locale: localStorage.getItem('appLang') || 'tr', // ilk açılışta localStorage'dan oku
  fallbackLocale: 'en-US',
  messages
})

export default boot(({ app }) => {
  app.use(i18n)
})
