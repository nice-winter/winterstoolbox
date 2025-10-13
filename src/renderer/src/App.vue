<script setup lang="ts">
onBeforeMount(async () => {
  const hwinfo = await window.api.hwinfo()
  console.log(hwinfo)
})
</script>

<template>
  <a-app>
    <main class="app-container">
      <NavigationMenu style="top: 30px" />

      <img alt="logo" class="logo" height="32" src="@renderer/assets/electron.svg" />
      <div class="creator">Powered by electron-vite</div>

      <div class="router-container">
        <RouterView v-slot="{ Component }">
          <KeepAlive>
            <component :is="Component"></component>
          </KeepAlive>
        </RouterView>
      </div>

      <Versions style="bottom: 30px" />
    </main>
  </a-app>
</template>

<style lang="less">
.app-container {
  width: 100%;
  padding: 0 8rem;
}
</style>
