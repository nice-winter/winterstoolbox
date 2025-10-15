<script setup lang="ts">
const props = defineProps<{
  show?: boolean
}>()
</script>

<template>
  <span v-show="props.show" class="spin__ no-drag" style="line-height: 14px">
    <a-spin style="margin-right: 10px">
      <template #indicator>
        <LoadingOutlined style="font-size: 16px" />
      </template>
    </a-spin>
    <a-typography-text v-show="$slots.default" type="secondary">
      <slot />
    </a-typography-text>
  </span>
</template>
