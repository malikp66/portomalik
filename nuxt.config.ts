// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
  ],
  modules: [
    '@nuxtjs/google-fonts',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: [
  ],
  fontMetrics: {
    fonts: ['Inter'],
  },

  googleFonts: {
    display: 'swap',
    download: true,
    families: {
      'Inter': [200, 300, 400, 500, 600, 700, 800, 900, 1000]
    }
  },
})
