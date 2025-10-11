<script setup lang="ts"></script>

<template>
  <main class="app-container">
    <NavigationMenu style="top: 30px" />

    <img alt="logo" class="logo" height="32" src="@renderer/assets/electron.svg" />
    <div class="creator">Powered by electron-vite</div>

    <div class="router-container">
      <RouterView />
    </div>

    <Versions style="bottom: 30px" />
  </main>
</template>

<style lang="less">
.app-container {
  width: 100%;
  padding: 0 8rem;
}
</style>
