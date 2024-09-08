<script setup lang="ts">
const appConfig = useAppConfig()

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})


useSeoMeta({
  titleTemplate: `${appConfig.title}`,
})
</script>

<template>
  <!-- #####-----MALIK------###### -->
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@import url("/assets/css/main.css");


</style>