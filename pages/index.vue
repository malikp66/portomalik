<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'

const { $gsap, $ScrollTrigger } = useNuxtApp()

const scrollDown = ref(null)
const introSection = ref(null)
const aboutSection = ref(null)
const skillsSection = ref(null)

const japaneseChars = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

function scrambleText(element: HTMLElement, finalText: string, duration: number = 2): gsap.core.Timeline {
  const tl = $gsap.timeline();
  let currentText = element.textContent || '';
  const length = finalText.length;

  tl.to({}, {
    duration: duration,
    onUpdate: function() {
      const progress = this.progress();
      const targetLength = Math.floor(length * progress);
      currentText = finalText.slice(0, targetLength) +
        Array.from({length: length - targetLength}, () => 
          japaneseChars[Math.floor(Math.random() * japaneseChars.length)]
        ).join('');
      element.textContent = currentText;
    }
  });

  return tl;
}

onMounted(() => {
  // Animasi bubble untuk scroll-down
  $gsap.timeline({ repeat: -1, yoyo: true })
    .to(scrollDown.value, {
      borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%;",
      transform: "scale(1.1)",
      duration: 1,
      ease: "sine.inOut"
    })
    .to(scrollDown.value, {
      borderRadius: "60% 40% 30% 70% / 50% 60% 40% 50%",
      duration: 1,
      transform: "scale(0.9)",
      ease: "sine.inOut"
    })

  // Animasi bouncing untuk scroll-down
  $gsap.to(scrollDown.value, {
    y: -15,
    duration: 0.5,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
  })

  // ScrollTrigger untuk menghilangkan scroll-down dan intro
  $ScrollTrigger.create({
    trigger: "#intro",
    start: "top top",
    endTrigger: "#about",
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;
      $gsap.to(scrollDown.value, {
        opacity: progress > 0.3 ? 0 : 1,
        duration: 0.3,
        ease: "power1.out"
      });
      $gsap.to(introSection.value, {
        opacity: progress > 0.3 ? 0 : 1,
        duration: 0.3,
        ease: "power1.fadeOut"
      })
    },
  });

  // Animate title for "about" section
  $gsap.from("#about .title", {
    scrollTrigger: {
      trigger: "#about",
      start: "top center",
      end: "center bottom",
      scrub: 1,
      onEnter: (self) => {
        const aboutTitle = document.querySelector("#about .title") as HTMLElement;
        if (aboutTitle) {
          const tl = $gsap.timeline();
          tl.from(aboutTitle, { x: "-100%", opacity: 0, duration: 0.5 })
            .add(scrambleText(aboutTitle, "ABOUT ME", 2));
        }
      },
    },
    x: "-100%",
    opacity: 0,
  })

  // Animate title for "skill" section
  $gsap.from("#skill .title", {
    scrollTrigger: {
      trigger: "#skill",
      start: "top center",
      end: "center bottom",
      scrub: 1,
      onUpdate: (self) => {
        const skillTitle = document.querySelector("#skill .title") as HTMLElement;
        if (skillTitle) {
          const tl = $gsap.timeline();
          tl.from(skillTitle, { x: "100%", opacity: 0, duration: 0.5 })
            .add(scrambleText(skillTitle, "SKILLS", 2));
        }
      },
    },
    x: "100%",
    opacity: 0,
  })
})
</script>

<template>
  <section class="layout">
    <section ref="introSection" id="intro" class="z-[10]">
      <Intro/>
      <a href="#about" ref="scrollDown" class="scroll-down">
        <PhArrowFatDown size="2rem" color="var(--bg)" weight="fill" />
      </a>
    </section>
    <section id="about" ref="aboutSection" class="z-[20] relative">
      <h3 class="title antialiased">about me</h3>
      <About/>
    </section>
    <section id="skill" ref="skillsSection" class="z-[30] relative">
      <h3 class="title antialiased">skills</h3>
      <Skills/>
    </section>
  </section>
</template>

<style scoped>
.layout{
  width: 100%;
}

#intro .scroll-down{
  background: var(--primary);
  border-radius: 50%;
  position: absolute;
  bottom: 15%;
  text-decoration: none;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  border: none;
}

.title{
  position: absolute;
  z-index: 999;
  display:inline-block;
  text-transform: uppercase;
  font-family: 'super-retro-m54', sans-serif;
  font-size: 9.6rem;
  margin: 0;
}

#about .title{
  color: var(--secondary);
  top: -10.8rem;
  left: 0;
}

#skill .title{
  color: var(--secondary);
  top: -10.8rem;
  right: 0;
}


</style>