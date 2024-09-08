import { gsap } from 'gsap'
import { ScrollTrigger, Draggable} from "gsap/all";

// Daftarkan plugin GSAP yang dibutuhkan
gsap.registerPlugin(ScrollTrigger, Draggable);

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      gsap,
      ScrollTrigger,
      Draggable,
    }
  }
})