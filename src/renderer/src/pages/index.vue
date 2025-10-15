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

  if (inc.progress >= 1) {
    reset()
    return
  }

  progress.set({ current: inc.progress, message: inc.message }, routePath)
}

const ping = async () => {
  const res = await window.api.ping()
  console.log('From ipcMain:', res)
}
</script>

<template>
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
