<script setup lang="ts">
definePage({
  meta: {
    name: '垃圾清理',
    icon: 'cleaner',
    weight: 1
  }
})

import { useLoadingMessageGenerator } from '@/common/test'
import { useAppProgressStore } from '@/stores/appProgressStore'

const route = useRoute()
const routePath = unref(route.path)

const progress = useAppProgressStore()
const loadingMessageGenerator = useLoadingMessageGenerator()
const timer = ref<number>(0)

const start = () => {
  if (timer.value > 0) {
    window.clearTimeout(timer.value)
    timer.value = 0
  } else {
    timer.value = window.setInterval(updateProgress, 1000)
    updateProgress()
  }
}

const done = () => {
  window.clearTimeout(timer.value)
  timer.value = 0
  loadingMessageGenerator.reset()
  progress.done(routePath)
}

const reset = () => {
  loadingMessageGenerator.reset()
}

const updateProgress = () => {
  const inc = loadingMessageGenerator.inc()

  if (inc.progress >= 100) {
    reset()
    return
  }

  progress.set({ current: inc.progress, message: inc.message }, routePath)
}
</script>

<template>
  <h1>Hello World! HaHAha</h1>

  <a-space>
    <AButton :type="timer ? 'default' : 'primary'" @click="start">
      {{ timer ? 'Pause' : 'Start' }}
    </AButton>
    <AButton type="default" danger @click="reset">Reset</AButton>
    <AButton type="default" @click="done">Done</AButton>
  </a-space>

  <div v-for="i in 30" :key="i" class="text">
    Build an Electron app with
    <span class="vue">Vue</span>
    and
    <span class="ts">TypeScript</span>
  </div>
</template>
