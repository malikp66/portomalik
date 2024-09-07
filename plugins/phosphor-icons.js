// plugins/phosphor.js
import { defineNuxtPlugin } from '#app'
import * as PhosphorIcons from '@phosphor-icons/vue'

export default defineNuxtPlugin((nuxtApp) => {
  Object.entries(PhosphorIcons).forEach(([key, component]) => {
    nuxtApp.vueApp.component(key, component)
  })
})
