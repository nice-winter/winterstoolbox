<script setup lang="ts">
definePage({
  meta: {
    name: '关于',
    icon: 'info',
    weight: 2
  }
})

import { useProgress } from '@/common/useProgress'

const route = useRoute()
const routePath = unref(route.path)

const progress = useProgress()
const value = ref(0)

let t: NodeJS.Timeout | 0 = 0

const clrT = () => {
  clearInterval(t)
  t = 0
  value.value = 0
}

const setT = () => {
  if (t || value.value >= 1) {
    clrT()
  }
  t = setInterval(() => {
    progress.set((value.value = value.value + 0.05), routePath)
    if (value.value >= 1) clrT()
  }, 1000)
}
</script>

<template>
  <AButton @click="setT()">SET</AButton>
  <h1>Hello World!</h1>
</template>
