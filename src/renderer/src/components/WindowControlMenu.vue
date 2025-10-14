<script setup lang="ts">
import { useWindowSize, watchDebounced } from '@vueuse/core'

const wh = useWindowSize()

const maximize = () => {
  window.api.windowControl.isMaximized().then((isMaximized) => {
    if (isMaximized) {
      window.api.windowControl.unmaximize()
    } else {
      window.api.windowControl.maximize()
    }
  })
}

const isMaximized = ref(false)

watchDebounced(
  () => wh.width.value + wh.height.value,
  () => {
    window.api.windowControl.isMaximized().then((flag) => {
      isMaximized.value = flag
    })
  },
  { debounce: 200, maxWait: 500 }
)

const minimize = window.api.windowControl.minimize
const close = window.api.windowControl.close
</script>

<template>
  <a-flex class="window-control-area only-top" justify="flex-end" align="flex-start">
    <div class="window-control-area__btn" @click="minimize">
      <i class="iconfont min"></i>
    </div>
    <div class="window-control-area__btn" @click="maximize">
      <i :class="`iconfont ${isMaximized ? 'unmax' : 'max'}`"></i>
    </div>
    <div class="window-control-area__btn" @click="close">
      <i class="iconfont close"></i>
    </div>
  </a-flex>
</template>

<style lang="less" scoped>
.window-control-area {
  -webkit-app-region: no-drag;
  position: fixed;
  top: 0;
  right: 0;

  .window-control-area__btn {
    width: 32px;
    height: 28px;
    padding: 8px 8px;
    text-align: center;
    line-height: 12px;

    i {
      font-size: 14px;
    }

    &:hover {
      background-color: var(--hover-color);
    }

    &:active {
      background-color: var(--active-color);
    }

    &:hover:last-child {
      color: #fff;
      background-color: var(--hover-color-red);
    }

    &:active:last-child {
      color: #fff;
      background-color: var(--active-color-red);
    }
  }
}
</style>
