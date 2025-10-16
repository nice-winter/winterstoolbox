<script setup lang="ts">
definePage({
  meta: {
    name: '硬件信息',
    icon: 'hwinfo',
    weight: 0
  }
})

import { memDisplayText, numberToChinese } from '@/common/helper'
import { useLoadingMessageGenerator, useTestHwinfo } from '@/common/test'
import { useProgress } from '@components/Progress/useProgress'

type ExtractPromise<T> = T extends Promise<infer U> ? U : T
type Hwinfo = ExtractPromise<ReturnType<typeof useTestHwinfo>>

const route = useRoute()
const routePath = unref(route.path)

const hwinfo = ref<Hwinfo>()

const cpu = computed(() => {
  const vendor = hwinfo.value?.cpu.brand
  const c = hwinfo.value?.cpu.physicalCores || 0
  const t = hwinfo.value?.cpu.cores || 0

  // return `${vendor} / ${numberToChinese(c)}核心${numberToChinese(t)}线程 / ${hwinfo.value?.cpu.speedMax}GHz`
  return {
    vendor,
    ct: `${c}核心${t}线程`,
    spd: `${hwinfo.value?.cpu.speedMax}GHz`
  }
})

const memText = computed(() => memDisplayText(hwinfo.value!.memLayout))

const gpu = computed(() => {
  hwinfo.value?.graphics.controllers.map((g) => null)
})

onBeforeMount(async () => {
  hwinfo.value = useTestHwinfo()
  console.log(hwinfo.value)
})
</script>

<template>
  <a-collapse :bordered="false" class="hwinfo-collapse">
    <a-collapse-panel key="1" :show-arrow="false">
      <template #header>
        <i class="iconfont cpu" />
        <span class="hw-name">处理器</span>
        <a-typography-paragraph class="hw-model" copyable>
          {{ cpu.vendor }}
          <a-tag color="blue">{{ cpu.ct }}</a-tag>
          <a-tag color="blue">{{ cpu.spd }}</a-tag>
        </a-typography-paragraph>
      </template>

      <p>1</p>
    </a-collapse-panel>

    <a-collapse-panel key="2" :show-arrow="false">
      <template #header>
        <i class="iconfont ram" />
        <span class="hw-name">内存</span>
        <a-space direction="vertical">
          <a-typography-paragraph class="hw-model" copyable>
            {{ `${memText.displayText[0]}` }}
            <a-tag color="blue">{{ `${memText.totalSize}GB` }}</a-tag>
          </a-typography-paragraph>
        </a-space>
      </template>

      <p>2</p>
    </a-collapse-panel>

    <a-collapse-panel key="3" :show-arrow="false">
      <template #header>
        <i class="iconfont motherboard" />
        <span class="hw-name">主板</span>
        <a-typography-paragraph class="hw-model" copyable>
          {{ `${hwinfo?.baseboard.manufacturer} ${hwinfo?.baseboard.model}` }}
        </a-typography-paragraph>
      </template>

      <p>3</p>
    </a-collapse-panel>

    <a-collapse-panel key="4" :show-arrow="false">
      <template #header>
        <i class="iconfont gpu" />
        <span class="hw-name">显卡</span>
      </template>

      <p>4</p>
    </a-collapse-panel>

    <a-collapse-panel key="5" :show-arrow="false">
      <template #header>
        <i class="iconfont hdd" />
        <span class="hw-name">主硬盘</span>
      </template>

      <p>5</p>
    </a-collapse-panel>

    <a-collapse-panel key="6" :show-arrow="false">
      <template #header>
        <i class="iconfont display" />
        <span class="hw-name">显示器</span>
      </template>

      <p>6</p>
    </a-collapse-panel>

    <a-collapse-panel key="7" :show-arrow="false">
      <template #header>
        <i class="iconfont nic" />
        <span class="hw-name">网卡</span>
      </template>

      <p>7</p>
    </a-collapse-panel>

    <a-collapse-panel key="8" :show-arrow="false">
      <template #header>
        <i class="iconfont sound" />
        <span class="hw-name">声卡</span>
      </template>

      <p>8</p>
    </a-collapse-panel>
  </a-collapse>
</template>

<style lang="css" scoped>
.hwinfo-collapse {
  background-color: #fff;

  .ant-collapse-item {
    border-bottom: 1px solid var(--border-color);
  }

  :deep(.ant-collapse-header) {
    padding-inline-start: 16px !important;
    padding: 16px;

    i {
      font-size: 22px;
      line-height: 22px;
      vertical-align: bottom;
      margin-right: 12px;
      color: #1677ff;
    }

    .ant-space {
      float: right;
    }

    .hw-name {
      display: inline-block;
      text-align: right;
      width: 42px;
    }

    .hw-model {
      float: right;
      margin-bottom: unset;
    }
  }

  & > .ant-collapse-item:last-child {
    border-bottom: unset;
  }
}
</style>
