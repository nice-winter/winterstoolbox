<script lang="ts" setup>
import { useProgress } from '@/common/useProgress'
import type { MenuProps } from 'ant-design-vue'

const router = useRouter()
const routes = computed(() => router.getRoutes().sort((a, b) => a.meta.weight - b.meta.weight))
const progress = useProgress()

console.log(routes)

const selectedKeys = ref<string[]>([])

const handleClick: MenuProps['onClick'] = (e) => {
  router.push(e.key.toString())
}

watch(router.currentRoute, (val) => {
  selectedKeys.value = [router.currentRoute.value.path]
  console.log('current route', val)
})
watch(selectedKeys, (val) => {
  console.log('selectedKeys', val)
})
</script>

<template>
  <AMenu
    :selected-keys="selectedKeys"
    class="route-menu no-drag"
    mode="inline"
    @click="handleClick"
  >
    <AMenuItem
      v-for="route in routes.sort((a, b) => a.meta.weight - b.meta.weight)"
      :key="route.path"
      :title="route.meta.name"
    >
      <template #icon>
        <i :class="`iconfont ${route.meta.icon}`" style="font-size: 20px"></i>
      </template>
      {{ route.meta.name }}

      <Spin
        :show="progress.routeHasProgress(route.path).value"
        style="float: inline-end; margin: 6px 0px"
      />
    </AMenuItem>
  </AMenu>
</template>

<style lang="less" scoped>
.route-menu.ant-menu-light {
  width: 200px;
  padding: 0 4px;
  background: transparent;

  :deep(.ant-menu-item) {
    transition: none;
    padding: 0 12px !important;
    height: 34px;
    line-height: 34px;

    &:not(.ant-menu-item-selected):active {
      background-color: var(--active-color);
    }

    &.ant-menu-item-selected {
      color: inherit;
      background-color: var(--selected-color);
    }

    .anticon + span {
      margin-inline-start: 8px;
    }

    :deep(.route-menu__tag) {
      background: #32a0f64a;
    }
  }

  &.ant-menu-root.ant-menu-inline,
  &.ant-menu-root.ant-menu-vertical {
    border-inline-end: unset !important;
  }
}
</style>
