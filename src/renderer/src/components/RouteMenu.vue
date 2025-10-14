<script lang="ts" setup>
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons-vue'
import { MenuProps } from 'ant-design-vue'

const items = ref<MenuProps['items']>([
  {
    key: 'mail',
    icon: () => h(MailOutlined),
    label: '硬件信息',
    title: '硬件信息'
  },
  {
    key: 'app',
    icon: () => h(AppstoreOutlined),
    label: '系统调整',
    title: '系统调整'
  },
  {
    key: 'alipay',
    icon: () => h(AppstoreOutlined),
    label: '工具箱',
    title: '工具箱'
  }
])
const selectedKeys = ref<string[]>(['1'])
const openKeys = ref<string[]>(['sub1'])
const handleClick: MenuProps['onClick'] = (e) => {
  console.log('click', e)
}
watch(openKeys, (val) => {
  console.log('openKeys', val)
})
</script>

<template>
  <a-menu
    v-model:open-keys="openKeys"
    v-model:selected-keys="selectedKeys"
    class="route-menu no-drag"
    mode="inline"
    :items="items"
    @click="handleClick"
  >
  </a-menu>
</template>

<style lang="less" scoped>
.route-menu.ant-menu-light {
  width: 200px;
  padding: 0 4px;
  background: transparent;

  :deep(.ant-menu-item) {
    transition: none;
    padding-left: 12px !important;
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
  }

  &.ant-menu-root.ant-menu-inline,
  &.ant-menu-root.ant-menu-vertical {
    border-inline-end: unset !important;
  }
}
</style>
