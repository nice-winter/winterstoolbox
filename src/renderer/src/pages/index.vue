<script setup lang="ts">
definePage({
  meta: {
    name: '硬件信息',
    icon: 'hwinfo',
    weight: 0
  }
})

const ping = async () => {
  const res = await window.api.ping()
  console.log('From ipcMain:', res)
}
</script>

<template>
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
