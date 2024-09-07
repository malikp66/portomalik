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
    <div class="flex w-[80%] justify-between">
      <h3 class="uppercase text-[1.6rem] text-[var(--secondary)]">mochammad malik putra kurniawan</h3>
      <h3 class="uppercase text-[1.6rem] text-[var(--secondary)]">bsd city, indonesia</h3>
    </div>
    <div class="word">
      <span v-for="(letter, index) in 'MALIK'" :key="index" @click="activateLetter(index)">{{ letter }}</span>
    </div>
    <div class="w-full flex justify-center">
      <div class="bg-[var(--primary)] rounded-full p-[1rem]">
        <PhArrowFatDown size="2rem" color="var(--bg)" weight="fill" />
      </div>
    </div>
    <h3 class="aboutme">about me</h3>
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

.aboutme{
  position: absolute;
  bottom: 0;
  left: 0;
  color: var(--secondary);
  display:inline-block;
  font-family: 'super-retro-m54', sans-serif;
  font-size: 9.6rem;
  margin: 0;
}
</style>