import { gsap } from 'gsap'
import { ScrollTrigger, Draggable, MotionPathPlugin } from "gsap/all";

// Daftarkan plugin GSAP yang dibutuhkan
gsap.registerPlugin(ScrollTrigger, Draggable, MotionPathPlugin);

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      gsap,
      ScrollTrigger,
      Draggable,
      MotionPathPlugin
    }
  }
})