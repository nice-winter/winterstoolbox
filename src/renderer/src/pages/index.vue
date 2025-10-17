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
  <ACollapse :bordered="false" class="hwinfo-collapse">
    <ACollapsePanel key="1" :show-arrow="false">
      <template #header>
        <i class="iconfont cpu" />
        <span class="hw-name">处理器</span>

        <ATypographyParagraph class="hw-model" copyable>
          {{ cpu.vendor }}

          <span class="hw-model__tags">
            <ATag color="blue" class="hw-model__tags__tag">{{ cpu.ct }}</ATag>
            <ATag color="blue" class="hw-model__tags__tag">{{ cpu.spd }}</ATag>
          </span>
        </ATypographyParagraph>
      </template>

      <p>1</p>
    </ACollapsePanel>

    <ACollapsePanel key="2" :show-arrow="false">
      <template #header>
        <i class="iconfont ram" />
        <span class="hw-name">内　存</span>

        <ASpace direction="vertical">
          <ATypographyParagraph class="hw-model" copyable>
            {{ `${memText.displayText[0]}` }}

            <a-typography-text
              v-if="memText.displayText.length > 1"
              type="secondary"
              style="margin-right: 4px"
            >
              {{ `...等共${hwinfo?.memLayout.length}条` }}
            </a-typography-text>

            <span class="hw-model__tags">
              <ATag color="blue" class="hw-model__tags__tag">{{ `${memText.totalSize}GB` }}</ATag>
            </span>
          </ATypographyParagraph>
        </ASpace>
      </template>

      <p>2</p>
    </ACollapsePanel>

    <ACollapsePanel key="3" :show-arrow="false">
      <template #header>
        <i class="iconfont motherboard" />
        <span class="hw-name">主　板</span>
        <ATypographyParagraph class="hw-model" copyable>
          {{ `${hwinfo?.baseboard.manufacturer} ${hwinfo?.baseboard.model}` }}
        </ATypographyParagraph>
      </template>

      <p>3</p>
    </ACollapsePanel>

    <ACollapsePanel key="4" :show-arrow="false">
      <template #header>
        <i class="iconfont gpu" />
        <span class="hw-name">显　卡</span>
      </template>

      <p>4</p>
    </ACollapsePanel>

    <ACollapsePanel key="5" :show-arrow="false">
      <template #header>
        <i class="iconfont hdd" />
        <span class="hw-name">主硬盘</span>
      </template>

      <p>5</p>
    </ACollapsePanel>

    <ACollapsePanel key="6" :show-arrow="false">
      <template #header>
        <i class="iconfont display" />
        <span class="hw-name">显示器</span>
      </template>

      <p>6</p>
    </ACollapsePanel>

    <ACollapsePanel key="7" :show-arrow="false">
      <template #header>
        <i class="iconfont nic" />
        <span class="hw-name">网　卡</span>
      </template>

      <p>7</p>
    </ACollapsePanel>

    <ACollapsePanel key="8" :show-arrow="false">
      <template #header>
        <i class="iconfont sound" />
        <span class="hw-name">声　卡</span>
      </template>

      <p>8</p>
    </ACollapsePanel>
  </ACollapse>
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

      .hw-model__tags {
        .ant-tag.hw-model__tags__tag {
          margin: 0;
          margin-right: 6px;

          &:last-child {
            margin-inline-end: unset;
          }
        }
      }
    }
  }

  & > .ant-collapse-item:last-child {
    border-bottom: unset;
  }
}
</style>
