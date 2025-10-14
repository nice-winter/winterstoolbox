import { useNProgress } from '@vueuse/integrations/useNProgress'
import type { Ref } from 'vue'

interface ProgressState {
  progress: ReturnType<typeof useNProgress> | null
  hasProgress: Ref<boolean>
  progressStates: Map<string, number>
}

// 状态管理
const state: ProgressState = {
  progress: null,
  hasProgress: ref(false),
  progressStates: reactive(new Map<string, number>())
}

// 进度条管理函数
const progressManager = {
  // 初始化进度条
  initProgress(value: number): void {
    if (state.progress) return

    state.progress = useNProgress(value || null, {
      trickle: false,
      parent: '#app-container__content'
    })
    // state.hasProgress.value = true
  },

  // 更新进度条状态
  updateProgress(value: number, routePath: string): void {
    // console.log(state.progress, 'updateProgress:', value)

    if (value <= 0) {
      this.resetProgress(routePath)
    } else if (value >= 1) {
      this.completeProgress(routePath)
    } else {
      this.setProgress(value, routePath)
    }
  },

  // 重置进度条
  resetProgress(routePath: string): void {
    state.progressStates.delete(routePath)
    this.cleanupProgress()
  },

  // 完成进度条
  completeProgress(routePath: string): void {
    if (!state.progress) return

    state.progress.done()
    setTimeout(() => {
      state.progressStates.delete(routePath)
      this.cleanupProgress()
    }, 500)
  },

  // 设置进度值
  setProgress(value: number, routePath: string): void {
    if (!state.progress) {
      this.initProgress(value)
    } else {
      state.progress.progress.value = value
    }
    state.progressStates.set(routePath, value)
  },

  // 清理进度条实例
  cleanupProgress(): void {
    if (state.progress) {
      state.progress.remove()
      state.progress = null
      state.hasProgress.value = false
    }
  },

  // 检查當前頁面是否有活跃的进度条，表示正在加載中
  checkActiveProgress(path: string): boolean {
    const p = state.progressStates.get(path)

    return typeof p !== 'undefined' && p > 0
  }
}

export function useProgress() {
  const route = useRoute()

  // 响应式获取当前路由的进度值
  const getCurrentProgress = (): number => {
    return state.progressStates.get(route.path) || 0
  }

  // 监听路由变化 - 当路由切换时，显示对应路由的进度状态
  watch(
    () => route.path,
    (newPath) => {
      // console.log('路由变化:', newPath)
      const progressValue = state.progressStates.get(newPath) || 0
      // console.log('路由对应的进度值:', progressValue)
      progressManager.updateProgress(progressValue, newPath)
      // 更新 hasProgress 状态
      state.hasProgress.value = progressManager.checkActiveProgress(route.path)
    },
    { immediate: true }
  )

  // 监听进度状态变化 - 当某个路由的进度值变化时，如果它是当前路由就更新进度条
  watch(
    () => state.progressStates,
    () => {
      const currentPath = route.path
      const progressValue = state.progressStates.get(currentPath) || 0
      // console.log('进度状态变化, 当前路由:', currentPath, '进度值:', progressValue)

      // 只有当前路由的进度变化才更新进度条显示
      progressManager.updateProgress(progressValue, currentPath)

      // 更新 hasProgress 状态
      state.hasProgress.value = progressManager.checkActiveProgress(currentPath)
    },
    { immediate: true, deep: true }
  )

  // 对外暴露的 API
  return {
    // 操作函数
    start: (routePath?: string) => {
      const path = routePath || route.path
      // console.log('开始进度条:', path)
      state.progressStates.set(path, 0.1) // 设置为一个小的初始值，让进度条可见
    },

    set: (value: number, routePath?: string) => {
      const path = routePath || route.path
      // console.log('设置进度:', path, value)
      state.progressStates.set(path, value)

      if (value >= 1) {
        setTimeout(() => state.progressStates.delete(path), 500)
      }
    },

    done: (routePath?: string) => {
      const path = routePath || route.path
      // console.log('完成进度条:', path)
      state.progressStates.set(path, 1)
    },

    get: (routePath?: string) => state.progressStates.get(routePath || route.path),

    // 状态查询
    hasProgress: computed(() => state.hasProgress.value),

    // 获取当前路由的进度状态
    currentProgress: computed(() => getCurrentProgress()),

    // 获取所有进度状态（用于调试）
    getAllProgressStates: () => new Map(state.progressStates)
  }
}
