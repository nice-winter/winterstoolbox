<script setup lang="ts">
onBeforeMount(async () => {
  const hwinfo = await window.api.hwinfo()
  console.log(hwinfo)
})
</script>

<template>
  <AApp>
    <WindowControlMenu />

    <AppContainer>
      <template #sider>
        <RouteMenu />
      </template>

      <template #headerTitle>
        <a-typography-title :level="5" style="margin-bottom: 0" class="no-drag">
          这是一个不得了的标题
        </a-typography-title>
      </template>

      <template #content>
        <RouterView v-slot="{ Component }">
          <KeepAlive>
            <component :is="Component"></component>
          </KeepAlive>
        </RouterView>
      </template>
    </AppContainer>
  </AApp>
</template>

<style lang="less" scoped></style>
