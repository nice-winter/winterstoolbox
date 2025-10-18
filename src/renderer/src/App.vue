<script setup lang="ts">
const route = useRoute()

onBeforeMount(async () => {})
</script>

<template>
  <AApp>
    <WindowControlButtons />

    <AppContainer>
      <template #sider>
        <RouteMenu />
      </template>

      <template #headerTitle>
        <ATypographyTitle :level="5" style="margin-bottom: 0" class="no-drag">
          {{ route.meta.name }}
        </ATypographyTitle>
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
