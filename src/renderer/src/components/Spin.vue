<script setup lang="ts">
const props = defineProps<{
  show?: boolean
}>()

import { useDotAnimation } from '@/common/useDotAnimation'

const dotAnimation = useDotAnimation()

watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      dotAnimation.startAnimation()
    } else {
      dotAnimation.stopAnimation()
    }
  }
)
</script>

<template>
  <span v-show="props.show" class="spin__ no-drag" style="line-height: 14px">
    <i class="spin-icon"></i>
    <a-typography-text v-show="$slots.default" type="secondary" style="margin-left: 10px">
      <slot />{{ dotAnimation.displayText.value }}
    </a-typography-text>
  </span>
</template>

<style lang="less" scoped>
.spin-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  box-sizing: border-box;

  border: solid 2px transparent;
  border-top-color: #1677ff;
  border-left-color: #1677ff;
  border-radius: 50%;

  -webkit-animation: spin 400ms linear infinite;
  animation: spin 400ms linear infinite;

  vertical-align: middle;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
