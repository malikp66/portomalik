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
    }, 650 * (idx + 1))
  })
})

</script>

<template>
  <div class="layout">
    <div class="detail flex w-[80%] justify-between">
      <h3 class="uppercase text-[1.6rem] text-[var(--secondary)] antialiased">mochammad malik putra kurniawan</h3>
      <h3 class="uppercase text-[1.6rem] text-[var(--secondary)] antialiased">bsd city, indonesia</h3>
    </div>
    <div class="word">
      <span class="antialiased" v-for="(letter, index) in 'MALIK'" :key="index" @click="activateLetter(index)">{{ letter }}</span>
    </div>
    <div class="w-full flex justify-center">
    </div>
  </div>
</template>

<style scoped>
.layout {
  height: 100vh;
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  justify-content: space-around;
  background: var(--bg);
}

.detail h3:nth-child(1) {
  animation: showFromLeft 1s ease-in forwards;
  overflow: hidden;
  white-space: nowrap;
  opacity: 0;
}

.detail h3:nth-child(2) {
  animation: showFromRight 1s ease-in forwards;
  overflow: hidden;
  white-space: nowrap;
  opacity: 0;
}

@keyframes showFromLeft {
  0% {
    opacity: 0;
    transform: translateX(-50%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes showFromRight {
  0% {
    opacity: 0;
    transform: translateX(50%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.word {
  perspective: 115rem; 
  display: inline-block;
}

.word span {
  display: inline-block;
  font-size: 26.5rem;
  font-family: 'super-retro-m54', sans-serif;
  user-select: none;
  color: var(--secondary);
  line-height: 80%;
}

.word span:nth-child(1).active {
  animation: balance 1.5s ease-out;
  transform-origin: bottom left;
}

@keyframes balance {
  0%, 100% {
    transform: rotate(0deg);
  }
  
  30%, 60% {
    transform: rotate(-45deg);
  }
}

.word span:nth-child(2).active {
  animation: shrinkjump 1s ease-in-out;
  transform-origin: bottom center;
}

@keyframes shrinkjump {
  10%, 35% {
    transform: scale(2, .2) translate(0, 0);
  }
  
  45%, 50% {
    transform: scale(1) translate(0, -150px);
  }
  
  80% {
    transform: scale(1) translate(0, 0);
  }
}

.word span:nth-child(3).active {
  animation: falling 2s ease-out;
  transform-origin: bottom center;
}

@keyframes falling {
  12% {
    transform: rotateX(240deg);
  }
  
  24% {
    transform: rotateX(150deg);
  }
  
  36% {
    transform: rotateX(200deg);
  }
  
  48% {
    transform: rotateX(175deg);
  }
  
  60%, 85% {
    transform: rotateX(180deg);
  }
  
  100% {
    transform: rotateX(0deg);
  }
}

.word span:nth-child(4).active {
  animation: rotate 1s ease-out;
}

@keyframes rotate {
  20%, 80% {
    transform: rotateY(180deg);
  }
  
  100% {
    transform: rotateY(360deg);
  }
}

.word span:nth-child(5).active {
  animation: toplong 1.5s linear;
}

@keyframes toplong {
  10%, 40% {
    transform: translateY(-48vh) scaleY(1);
  }
  
  90% {
    transform: translateY(-48vh) scaleY(4);
  }
}

</style>