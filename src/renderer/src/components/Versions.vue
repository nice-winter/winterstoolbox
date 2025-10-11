<script setup lang="ts">
const versions = reactive({ ...window.api.getElectronProcessVersions() })
</script>

<template>
  <ul class="versions">
    <li class="electron-version">Electron v{{ versions.electron }}</li>
    <li class="chrome-version">Chromium v{{ versions.chrome }}</li>
    <li class="node-version">Node.js v{{ versions.node }}</li>
  </ul>
</template>

<style lang="less"></style>
