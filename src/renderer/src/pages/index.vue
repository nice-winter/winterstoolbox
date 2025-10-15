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
const value = ref(0)

const loadingMessageGenerator = useLoadingMessageGenerator()

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
    const load = loadingMessageGenerator()
    progress.set(load.progress, routePath)
    if (value.value >= 1) clrT()
  }, 1000)
}

const ping = async () => {
  const res = await window.api.ping()
  console.log('From ipcMain:', res)
}
</script>

<template>
  <AButton @click="setT()">SET</AButton>
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
