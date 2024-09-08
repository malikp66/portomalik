<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const cursorDot = ref<HTMLElement>()

let mouseX = 0
let mouseY = 0
let circleX = 0
let circleY = 0

const updateCursorPosition = (e: any) => {
  mouseX = e.clientX
  mouseY = e.clientY
}

const animateCursor = () => {
  let distX = mouseX - circleX
  let distY = mouseY - circleY

  circleX += distX * 0.1
  circleY += distY * 0.1

  if (cursorDot.value) {
    cursorDot.value.style.left = `${mouseX}px`
    cursorDot.value.style.top = `${mouseY}px`
  }

  requestAnimationFrame(animateCursor)
}

const addHoverEffect = (e: any) => {
  if (['button', 'h1', 'h2', 'h3', 'p', 'span', 'a','BUTTON', 'H1', 'H2', 'H3', 'P', 'SPAN', 'A', 'clickable', 'CLICKABLE'].includes(e.target.tagName) || e.target.classList.contains('clickable')) {
    cursorDot.value.classList.add('cursor-text-hover')
  }
}

const removeHoverEffect = () => {
  cursorDot.value.classList.remove('cursor-text-hover')
}

onMounted(() => {
  document.addEventListener('mousemove', updateCursorPosition)
  document.addEventListener('mouseover', addHoverEffect)
  document.addEventListener('mouseout', removeHoverEffect)
  animateCursor()
})

onUnmounted(() => {
  document.removeEventListener('mousemove', updateCursorPosition)
  document.removeEventListener('mouseover', addHoverEffect)
  document.removeEventListener('mouseout', removeHoverEffect)
})
// import { SpeedInsights } from '@vercel/speed-insights/vue';

// const route = useRoute()

// const checkRoute = computed(() => route.name)

// watchEffect(() => {
//   console.log('Route changed:', route.name)
//   // Lakukan sesuatu ketika route berubah
// })
</script>
<template>
  <!-- <SpeedInsights /> -->
  <main>
    <div ref="cursorDot" class="cursor-dot"></div>
    <slot />
    <MusicBar />
  </main>

</template>


<style scoped>
.container{
  display: flex;
  width: 100%;
}

main {
  box-sizing: border-box;
  width: 100%;
  /* padding: 0 10%; */
}


/* Custom cursor styles */
.cursor-dot {
  width: var(--cursor-size);
  height: var(--cursor-size);
  background-color: var(--bg);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  mix-blend-mode: difference;
  transition: width 0.3s, height 0.3s, border-radius 0.3s;
}

/* Cursor style when hovering over text */
.cursor-text-hover {
  width: var(--cursor-text-size);
  height: var(--cursor-text-size);
  pointer-events: none;
  transform: translate(-50%, -50%);
  background-color: var(--secondary);
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  transition: all 0.3s ease;
  mix-blend-mode: difference;
}

/* Ensure text is visible with the custom cursor */
h1, h2, h3, p, span, a {
  cursor: none;
  position: relative;
  z-index: 1;
}

/* Optional: Add a subtle animation to the cursor */
@keyframes cursorAnimation {
  0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
  50% { border-radius: 60% 40% 30% 70% / 50% 60% 40% 50%; }
  100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
}

.cursor-text-hover {
  animation: cursorAnimation 1s infinite;
}
</style>