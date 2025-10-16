<script setup lang="ts">
definePage({
  meta: {
    name: '关于',
    icon: 'info',
    weight: 2
  }
})

import { useLoadingMessageGenerator } from '@/common/test'
import { useProgress } from '@components/Progress/useProgress'

const route = useRoute()
const routePath = unref(route.path)

const progress = useProgress()
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
  <h1>Hello World!</h1>

  <a-space>
    <AButton :type="timer ? 'default' : 'primary'" @click="start">
      {{ timer ? 'Pause' : 'Start' }}
    </AButton>
    <AButton type="default" danger @click="reset">Reset</AButton>
    <AButton type="default" @click="done">Done</AButton>
  </a-space>
</template>
