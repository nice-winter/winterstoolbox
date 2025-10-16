<script setup lang="ts">
const route = useRoute()

onBeforeMount(async () => {
  // const hwinfo = await window.api.hwinfo()
  // console.log(hwinfo)
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
          {{ route.meta.name }}
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
