import { useNProgress } from '@vueuse/integrations/useNProgress'
import type { Ref } from 'vue'

interface ProgressState {
  current: number
  message?: string
}

interface ProgressStore {
  nprogress: ReturnType<typeof useNProgress> | null
  states: Map<string, ProgressState>
  currentRouteHasProgress: Ref<boolean>
}

// 状态管理
const progressStore: ProgressStore = {
  nprogress: null,
  states: reactive(new Map<string, ProgressState>()),
  currentRouteHasProgress: ref(false)
}

// 进度条管理函数
const progressManager = {
  // 初始化进度条
  createNProgress(value: number): void {
    if (progressStore.nprogress) return

    progressStore.nprogress = useNProgress(value || null, {
      trickle: false,
      parent: '#app-container__content'
    })
  },

  // 更新进度条状态
  updateState(routePath: string, progressState?: ProgressState): void {
    if (!progressState || progressState.current <= 0) {
      this.resetState(routePath)
    } else if (progressState.current >= 1) {
      this.completeState(routePath)
    } else {
      this.setState(progressState, routePath)
    }
  },

  // 重置进度条
  resetState(routePath: string): void {
    progressStore.states.delete(routePath)
    this.destoryNProgress()
  },

  // 完成进度条
  completeState(routePath: string): void {
    if (!progressStore.nprogress) return

    progressStore.nprogress.done()
    setTimeout(() => {
      progressStore.states.delete(routePath)
      this.destoryNProgress()
    }, 500)
  },

  // 设置进度值
  setState(progressState: ProgressState, routePath: string): void {
    if (!progressStore.nprogress) {
      this.createNProgress(progressState.current)
    } else {
      progressStore.nprogress.progress.value = progressState.current
    }
    progressStore.states.set(routePath, progressState)
  },

  // 清理进度条实例
  destoryNProgress(): void {
    if (progressStore.nprogress) {
      progressStore.nprogress.remove()
      progressStore.nprogress = null
      progressStore.currentRouteHasProgress.value = false
    }
  },

  // 检查當前頁面是否有活跃的进度条，表示正在加載中
  checkActiveProgress(path: string): boolean {
    const currentRouteProgressState = progressStore.states.get(path)

    return (
      typeof currentRouteProgressState !== 'undefined' &&
      currentRouteProgressState.current > 0 &&
      currentRouteProgressState.current < 1
    )
  }
}

export function useProgress() {
  const route = useRoute()

  // 响应式获取当前路由的进度值
  const getCurrentProgressState = () => {
    return progressStore.states.get(route.path)
  }

  // 监听路由变化 - 当路由切换时，显示对应路由的进度状态
  watch(
    () => route.path,
    (newPath) => {
      const progressState = progressStore.states.get(newPath)

      progressManager.updateState(newPath, progressState)
      progressStore.currentRouteHasProgress.value = progressManager.checkActiveProgress(route.path)
    },
    { immediate: true }
  )

  // 监听进度状态变化 - 当某个路由的进度值变化时，如果它是当前路由就更新进度条
  watch(
    () => Array.from(progressStore.states.entries()),
    () => {
      const currentPath = route.path
      const progressState = progressStore.states.get(currentPath)

      progressManager.updateState(currentPath, progressState)
      progressStore.currentRouteHasProgress.value = progressManager.checkActiveProgress(currentPath)
    },
    { immediate: true }
  )

  // 对外暴露的 API
  return {
    // 操作函数
    start: (routePath?: string, message?: string) => {
      const path = routePath || route.path
      // console.log('开始进度条:', path)
      progressStore.states.set(path, { current: 0.1, message }) // 设置为一个小的初始值，让进度条可见
    },

    set: (progressState: ProgressState, routePath?: string) => {
      const path = routePath || route.path
      // console.log('设置进度:', path, value)
      progressStore.states.set(path, progressState)

      if (progressState.current >= 1) {
        setTimeout(() => progressStore.states.delete(path), 500)
      }
    },

    done: (routePath?: string, message?: string) => {
      const path = routePath || route.path
      // console.log('完成进度条:', path)
      progressStore.states.set(path, { current: 1, message })
    },

    get: (routePath?: string) => progressStore.states.get(routePath || route.path),

    // 状态查询
    currentRouteHasProgress: computed(() => progressStore.currentRouteHasProgress.value),

    // 获取当前路由的进度状态
    currentProgress: computed(() => getCurrentProgressState()),

    // 获取所有进度状态（用于调试）
    getAllProgressStates: () => new Map(progressStore.states)
  }
}
