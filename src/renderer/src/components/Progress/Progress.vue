<script setup lang="ts">
import type { Ref } from 'vue'
const props = defineProps<{
  current: Ref<number>
  show?: boolean
}>()

const has = computed(() => {
  return (props.current.value || 0) > 0 && (props.current.value || 0) < 100
})
</script>

<template>
  <AProgress
    id="app-progress"
    :percent="props.current.value"
    :show-info="false"
    class="app-progress"
    :class="has ? 'show' : null"
    size="small"
  />
</template>

<style lang="less" scoped>
.app-progress {
  position: absolute;
  top: -12px;
  left: 0;
  margin: 0;

  :deep(.ant-progress-outer) {
    .ant-progress-inner {
      background: unset !important;

      .ant-progress-bg {
        height: 2px !important;
        border-radius: 0 100px 100px 0;
        opacity: 0;
      }
    }
  }

  &.show {
    :deep(.ant-progress-outer) {
      .ant-progress-inner {
        .ant-progress-bg {
          opacity: 1;
        }
      }
    }
  }
}
</style>
