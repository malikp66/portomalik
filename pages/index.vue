<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'

const { $gsap, $ScrollTrigger } = useNuxtApp()

const scrollDown = ref(null)


onMounted(() => {
  // Animasi bubble untuk scroll-down
  const bubbleAnimation = $gsap.timeline({ repeat: -1, yoyo: true })
    .to(scrollDown.value, {
      borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
      duration: 2,
      ease: "sine.inOut"
    })
    .to(scrollDown.value, {
      borderRadius: "70% 30% 50% 50% / 30% 30% 70% 70%",
      duration: 2,
      ease: "sine.inOut"
    })

  // Animasi bouncing untuk scroll-down
  $gsap.to(scrollDown.value, {
    y: -15,
    duration: 0.8,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
  })

  // ScrollTrigger untuk menghilangkan scroll-down
  $ScrollTrigger.create({
    trigger: "#intro",
    start: "top top",
    end: "bottom top",
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress;
      $gsap.to(scrollDown.value, {
        opacity: 1 - progress,
        y: progress * 50,
        duration: 0.1,
        ease: "power1.out"
      });
    },
  });

  // Animate title for "about" section
  $gsap.from("#about .title", {
    scrollTrigger: {
      trigger: "#about",
      start: "top bottom",
      end: "top center",
      scrub: true,
    },
    x: "-100%",
    opacity: 0,
  })

  // Animate title for "skill" section
  $gsap.from("#skill .title", {
    scrollTrigger: {
      trigger: "#skill",
      start: "top bottom",
      end: "top center",
      scrub: true,
    },
    x: "100%",
    opacity: 0,
  })
})
</script>

<template>
  <section class="layout">
    <section id="intro" class="z-[10]">
      <Intro/>
      <button href="#about" ref="scrollDown" class="scroll-down">
        <PhArrowFatDown size="2rem" color="var(--bg)" weight="fill" />
      </button>
    </section>
    <section id="about" class="z-[20] relative">
      <h3 class="title">about me</h3>
      <About/>
    </section>
    <section id="skill" class="z-[30] relative">
      <h3 class="title">skills</h3>
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
  position: fixed;
  bottom: 2rem;
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
  top: -10rem;
  left: 0;
}

#skill .title{
  color: var(--secondary);
  top: -10rem;
  right: 0;
}


</style>