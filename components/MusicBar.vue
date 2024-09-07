<template>
  <div class="music-bar" :class="{ 'music-bar-open': isOpen }">
    <div class="music-bar-toggle" @click="toggleMusicBar">
      <div class="music-bar-lay">
        <div class="music-icon">
          <div v-for="bar in 4" :key="bar" class="bar" :class="{ 'animate': isPlaying }"></div>
        </div>
        <img src="/bocil.png" alt="bocil" class="h-[120%] w-auto"/>
      </div>
    </div>
    <div class="music-bar-content">
      <div class="music-controls">
        <button @click="previousTrack"><PhSkipBack size="2rem" weight="fill" /></button>
        <button @click="togglePlay">
          <component :is="isPlaying ? PhPause : PhPlay" size="2rem" weight="fill" />
        </button>
        <button @click="nextTrack"><PhSkipForward size="2rem" weight="fill" /></button>
      </div>
      <div class="track-info">
        <span class="text-[1.3rem] text-[var(--primary)] uppercase font-bold">{{ currentTrack.title }}</span>
        <span class="text-[1rem] text-[rgba(var(--primary-rgb, 0.3))] uppercase">{{ currentTrack.artist }}</span>
      </div>
    </div>
    <div class="absolute top-[-1rem] left-[-1rem] bg-[var(--secondary)] p-[1rem] rounded-full">
      <PhPlus size="2rem" weight="bold" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { PhSkipForward } from '@phosphor-icons/vue'
import { PhSkipBack } from '@phosphor-icons/vue'
import { PhPause } from '@phosphor-icons/vue'
import { PhPlay } from '@phosphor-icons/vue'
import { PhPlus } from '@phosphor-icons/vue'


const isOpen = ref(false)
const isPlaying = ref(false)
const volume = ref(50)

const currentTrack = reactive({
  title: 'Track Title',
  artist: 'Artist Name'
})

const toggleMusicBar = () => {
  isOpen.value = !isOpen.value
}

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
  // Implement your play/pause logic here
}

const previousTrack = () => {
  // Implement previous track logic
}

const nextTrack = () => {
  // Implement next track logic
}

</script>

<style scoped>
.music-bar {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: var(--secondary);
  color: var(--primary);
  border-radius: 1rem;
  padding: 0 0 0 1.5rem;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  z-index: 1000;
}

.music-bar-open {
  /* width: 30rem; */
  flex-direction: row-reverse;
}

.music-bar-toggle {
  width: 12rem;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.music-bar-toggle .music-bar-lay{
  display: flex; 
  gap: 1rem; 
  height: 100%;
  width: auto;
  align-items: flex-end;
}

.music-icon {
  display: flex;
  align-items: flex-end;
  height: 2rem;
  margin-bottom: 1rem;
}

.bar {
  width: 0.4rem;
  height: 0.4rem;
  background: var(--bg);
  margin: 0 0.1rem;
  border-radius: 0.5rem;
  transition: height 0.2s ease;
}

.bar.animate {
  animation: sound 0.5s infinite alternate;
}

.bar:nth-child(1) { animation-delay: 0.1s; }
.bar:nth-child(2) { animation-delay: 0.3s; }
.bar:nth-child(3) { animation-delay: 0.4s; }
.bar:nth-child(4) { animation-delay: 0.2s; }

@keyframes sound {
  0% { height: 0.4rem; }
  100% { height: 3rem; }
}

.music-bar-content {
  display: none;
  flex-grow: 1;
  margin-left: 10px;
}

.music-bar-open .music-bar-content {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.music-controls {
  display: flex;
  justify-content: space-between;
}

.music-controls button {
  background: none;
  border: none;
  color: var(--primary);
  font-size: 20px;
  cursor: pointer;
}

.track-info {
  display: flex;
  flex-direction: column;
}
</style>