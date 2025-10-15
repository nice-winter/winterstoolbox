import { ref, computed, onUnmounted } from 'vue'

/**
 * 文本点点点动画组合函数
 * @param initialText - 初始文本
 * @param intervalTime - 动画间隔时间（毫秒），默认500ms
 * @returns 动画控制方法和状态
 */
export function useDotAnimation(initialText?: string, intervalTime?: number) {
  // 响应式数据
  const baseText = ref(initialText || '')
  const dotCount = ref(0)
  const isRunning = ref(false)
  const intervalId = ref(0)

  // 计算属性：显示的完整文本
  const displayText = computed(() => {
    return baseText.value + '.'.repeat(dotCount.value)
  })

  // 添加点的函数
  const addDot = () => {
    dotCount.value = (dotCount.value + 1) % 4 // 0,1,2,3 循环
  }

  // 开始动画
  const startAnimation = () => {
    if (isRunning.value) return

    isRunning.value = true
    intervalId.value = window.setInterval(addDot, intervalTime || 333)
  }

  // 停止动画
  const stopAnimation = () => {
    if (!isRunning.value) return

    isRunning.value = false
    window.clearInterval(intervalId.value)
    intervalId.value = 0
  }

  // 重置动画（停止并清除点）
  const resetAnimation = () => {
    stopAnimation()
    dotCount.value = 0
  }

  // 设置新文本（可选：是否自动重置点）
  const setText = (newText, shouldReset = true) => {
    baseText.value = newText
    if (shouldReset) {
      resetAnimation()
    }
  }

  // 切换动画状态
  const toggleAnimation = () => {
    if (isRunning.value) {
      stopAnimation()
    } else {
      startAnimation()
    }
  }

  // 组件卸载时自动清理
  onUnmounted(() => {
    if (intervalId.value) {
      window.clearInterval(intervalId.value)
    }
  })

  return {
    // 状态
    baseText,
    dotCount,
    isRunning,
    displayText,

    // 方法
    startAnimation,
    stopAnimation,
    resetAnimation,
    setText,
    toggleAnimation
  }
}
