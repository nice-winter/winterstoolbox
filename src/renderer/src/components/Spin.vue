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
    <a-spin>
      <template #indicator>
        <LoadingOutlined style="font-size: 16px" />
      </template>
    </a-spin>
    <a-typography-text v-show="$slots.default" type="secondary" style="margin-left: 10px">
      <slot />{{ dotAnimation.displayText.value }}
    </a-typography-text>
  </span>
</template>
