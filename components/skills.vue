<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PhArrowFatDown } from '@phosphor-icons/vue'

const letters = ref<HTMLSpanElement[]>([])

const activateLetter = (index: number) => {
  letters.value[index].classList.add('active')
}

const handleAnimationEnd = (event: AnimationEvent) => {
  if (event.target instanceof HTMLSpanElement) {
    event.target.classList.remove('active')
  }
}

onMounted(() => {
  letters.value = Array.from(document.querySelectorAll('.word span'))
  
  letters.value.forEach((span, idx) => {
    span.addEventListener('animationend', handleAnimationEnd)
    
    // Initial animation
    setTimeout(() => {
      span.classList.add('active')
    }, 750 * (idx + 1))
  })
})

</script>

<template>
    <div class="layout">
        <h3 class="aboutme">Skills</h3>
    </div>
</template>

<style scoped>

.layout {
  height: 50vh;
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  justify-content: space-around;
  border-top: 1.5rem solid var(--secondary); 
  background: var(--secondary);
}

</style>