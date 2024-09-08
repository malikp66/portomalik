<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PhArrowFatDown } from '@phosphor-icons/vue'

const isOpen = ref(false)

const content = ref([
  {
    sekolah: 'SMP Taruna Bakti',
    jurusan: 'Akselerasi Jurusan IPA',
    tahun: '()',
    logo: '/smp.png',
    color: '#003548',
    text: 'var(--secondary-rgb)',
    isOpen: false
  },
  {
    sekolah: 'SMA Taruna Bakti',
    jurusan: 'Jurusan IPA',
    tahun: '()',
    logo: '/sma.png',
    color: '#729193',
    text: 'var(--secondary-rgb)',
    isOpen: false
  },
  {
    sekolah: 'Prasetiya Mulya University',
    jurusan: 'Bachelor, Software Engineer',
    tahun: '(2023 - 2027)',
    logo: '/univ.png',
    color: '#FDFFFF',
    text: 'var(--primary-rgb)',
    isOpen: true
  }
])

// Modify the toggle function to allow only one card to be open at a time
const toggleEducation = (index: number) => {
  content.value.forEach((item, idx) => {
    item.isOpen = idx === index ? !item.isOpen : false
  })
}

onMounted(() => {
  const words = document.querySelectorAll('.effect .word');
  let wordArray: any[] = [];
  let currentWord = 0;

  function splitLetters(word: Element) {
    const content = word.innerHTML;
    word.innerHTML = '';
    const letters: any[] = [];
    Array.from(content).forEach((char) => {
      const span = document.createElement('span');
      span.setAttribute('class', 'letter');
      span.innerHTML = char;
      word.appendChild(span);
      letters.push(span);
    });
    wordArray.push(letters);
  }

  words[currentWord].setAttribute('style', 'opacity: 1');
  words.forEach((word: any) => {
    splitLetters(word);
  });

  function animateLetterOut(cw: any[], i: number) {
    setTimeout(() => {
      cw[i].setAttribute('class', 'letter out');
      cw[i].setAttribute('style', 'transform: rotateX(90deg)');
      cw[i].setAttribute('style', 'transition: transform 0.32s cubic-bezier(0.55, 0.055, 0.675, 0.19);');
    }, i * 80);
  }

  function animateLetterIn(nw: any[], i: number) {
    setTimeout(() => {
      nw[i].setAttribute('class', 'letter in');
    }, 340 + i * 80);
  }

  function changeWord() {
    const cw = wordArray[currentWord];
    const nw = currentWord === words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];

    cw.forEach((letter: any, i: number) => animateLetterOut(cw, i));
    nw.forEach((letter: any, i: number) => {
      letter.setAttribute('class', 'letter behind');
      nw[0].parentElement.setAttribute('style', 'opacity: 1');
      animateLetterIn(nw, i);
    });

    currentWord = currentWord === wordArray.length - 1 ? 0 : currentWord + 1;
  }

  changeWord();
  setInterval(changeWord, 4000);
});

</script>

<template>
    <div class="layout">
        <div class="flex flex-col items-center">
            <h3 class="text-[var(--secondary)] text-[3.2rem] text-center">Hello my name is Malik Putra,</h3>
            <p class="text-[3.2rem] text-[var(--secondary)] font-bold">I’m a 
              <span class="effect">
                <span class="word">Remote Developer</span>
                <span class="word">Student</span>
                <span class="word">Fullstack Developer</span>
                <span class="word">Big Dreamer</span>
                <span class="word">Single LOL!</span>
              </span>
            </p>
        </div>
        <div class="education-con">
          <div 
            class="education" 
            :class="{ 'education-open': c.isOpen }" 
            :style="{background: `${c.color}`, boxShadow: `0px 0px 15px ${c.color}`}" 
            v-for="(c, index) in content" 
            :key="c.sekolah"
          >
            <div class="education-lay" @click="toggleEducation(index)">
              <img :src="c.logo" :alt="c.sekolah" class="h-[100%] w-auto rounded-full bg-white"/>
            </div>
            <div class="education-content">
              <div class="flex flex-col gap-2">
                <span :style="{ color: `rgba(${c.text}, 1)`}" class="text-[1.3rem] capitalized">{{ c.sekolah }}</span>
                <span :style="{ color: `rgba(${c.text}, 0.5)`}" class="text-[1rem] capitalized">{{ c.jurusan }}</span>
                <span :style="{ color: `rgba(${c.text}, 0.5)`}" class="text-[1rem] capitalized">{{ c.tahun }}</span>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<style scoped>

.layout {
  height: 50rem;
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  padding: 8rem 0;
  border-top: 1.5rem solid var(--secondary); 
  background: var(--primary);
}

.education-con {
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 2.5rem;
}

.education {
  padding: 1.5rem;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: max-width 0.6s ease;
  max-width: 10rem;
  overflow: hidden;
}

.education-open {
  max-width: 30rem;
  padding: 1.5rem;
  gap: 1.5rem;
}

.education-content {
  display: none;
  transition: display 0.6s ease;
  white-space: nowrap;
}

.education-open .education-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.effect{
  vertical-align: top;
  display: inline-block;
}

.word{
  opacity: 0;
  position: absolute;
  color: var(--bg);
  text-shadow: 0px 0px 15px rgba(var(--bg-rgb), 0.8);
  font-size: 2rem;
}

.effect .word .letter {
  display: inline-block;
  position: relative;
  float: left;
  transform: translateZ(25px);
  transform-origin: 50% 50% 25px;
}

.effect .word .letter.out {
  transform: rotateX(90deg);
  transition: transform 0.32s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.effect .word .letter.behind {
  transform: rotateX(-90deg);
}

.effect .word .letter.in {
  transform: rotateX(0deg);
  transition: transform 0.38s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

</style>