<script setup lang="ts">
definePage({
  meta: {
    name: '硬件信息',
    icon: 'hwinfo',
    weight: 0
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

const ping = async () => {
  const res = await window.api.ping()
  console.log('From ipcMain:', res)
}
</script>

<template>
  <AButton @click="setT">{{ timer ? 'CLEAR' : 'SET' }}</AButton>
  <div v-for="i in 30" :key="i" class="text">
    Build an Electron app with
    <span class="vue">Vue</span>
    and
    <span class="ts">TypeScript</span>
  </div>

  <p class="tip">Please try pressing <code>F12</code> to open the devTool</p>

  <div class="actions">
    <div class="action">
      <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">Documentation</a>
    </div>
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="ping">Send IPC</a>
    </div>
  </div>
</template>
