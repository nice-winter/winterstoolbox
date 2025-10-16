import { createVNode, render } from 'vue'
import Progress from './Progress.vue'

interface ProgressState {
  current: number
  message?: string
}
interface ProgressStore {
  states: Map<string, ProgressState>
}

const progressStore: ProgressStore = {
  states: reactive(new Map<string, ProgressState>())
}

export function useProgress() {
  const container = document.createElement('div')
  container.id = 'app-progress-container'

  const route = useRoute()

  const current = ref(0)

  onMounted(() => {
    const { appContext } = getCurrentInstance()!

    const exists = document.querySelector(container.id)
    if (!exists) {
      const parent = document.querySelector('#app-container__content') || document.body
      parent.appendChild(container)

      const vnode = createVNode(Progress, { current: current })
      vnode.appContext = appContext
      render(vnode, container)
    }
  })

  /**
   * 监听路由变化，并根据路由获取对应的进度条状态然后显示出来
   */
  watch(
    () => route.path,
    (newRoutePath) => {
      const state = progressStore.states.get(newRoutePath)

      if (state) {
        current.value = state.current
      } else {
        current.value = 0
      }
    },
    { immediate: true }
  )

  /**
   * 监听储存的进度条状态变化，并根据路由获取对应的进度条状态然后显示出来
   */
  watch(
    () => Array.from(progressStore.states.entries()),
    () => {
      const currentRoutePath = route.path
      const state = progressStore.states.get(currentRoutePath)

      if (state) {
        current.value = state.current

        if (state.current >= 100) {
          setTimeout(() => {
            progressStore.states.delete(currentRoutePath)
            current.value = 0
          }, 200)
        }
      }
    },
    { immediate: true }
  )

  // 进度条状态操作
  const set = (state: ProgressState, routePath?: string) => {
    progressStore.states.set(routePath || route.path, state)
  }
  const done = (routePath?: string, message?: string) => {
    progressStore.states.set(routePath || route.path, {
      current: 100,
      message
    })
  }
  const reset = (routePath?: string, message?: string) => {
    progressStore.states.set(routePath || route.path, {
      current: 0,
      message
    })
  }

  // 响应式状态 API
  const routeHasProgress = (routePath: string) =>
    computed(() => {
      const state = progressStore.states.get(routePath)

      return state && state.current > 0 && state.current < 100
    })

  const currentRouteHasProgress = computed(() => {
    const state = progressStore.states.get(route.path)

    return state && state.current > 0 && state.current < 100
  })
  const currentRouteProgress = computed(() => progressStore.states.get(route.path))

  onUnmounted(() => {
    render(null, container)
    container.remove()
  })

  return {
    current,
    set,
    done,
    reset,
    routeHasProgress,
    currentRouteHasProgress,
    currentRouteProgress
  }
}
