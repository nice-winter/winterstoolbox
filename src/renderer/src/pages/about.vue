<script setup lang="ts">
definePage({
  meta: {
    name: '关于',
    icon: 'info',
    weight: 2
  }
})

import { useLoadingMessageGenerator } from '@/common/test'
import { useProgress } from '@/common/useProgress'

const route = useRoute()
const routePath = unref(route.path)

const progress = useProgress()
const loadingMessageGenerator = useLoadingMessageGenerator()
const timer = ref<number>(0)

const setT = () => {
  if (timer.value > 0) {
    window.clearTimeout(timer.value)
    timer.value = 0
  } else {
    timer.value = window.setInterval(updateProgress, 1000)
  }
}

const updateProgress = () => {
  const load = loadingMessageGenerator()

  if (load.progress >= 1) {
    load.reset()
    return
  }

  progress.set(load.progress, routePath)
}
</script>

<template>
  <AButton @click="setT()">{{ timer ? 'CLEAR' : 'SET' }}</AButton>
  <h1>Hello World!</h1>
</template>
