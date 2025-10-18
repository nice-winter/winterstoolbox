import { createVNode, render } from 'vue'
import AppProgress from '@components/AppProgress.vue'

interface ProgressState {
  current: number
  message?: string
}

const CONTAINER_ID = 'app-progress-container'
const container = document.createElement('div')
container.id = CONTAINER_ID
let exists: boolean = false

export const useAppProgressStore = defineStore('appProgress', () => {
  const route = useRoute()

  const states = reactive(new Map<string, ProgressState>())
  const current = ref<number>(0)

  const updateCurrentFromStates = (routePath?: string) => {
    const state = states.get(routePath || route.path)

    if (state) {
      current.value = state.current < 0.1 ? 0 : state.current < 1 ? 1 : Math.round(state.current)

      if (state.current >= 100) {
        setTimeout(() => {
          states.delete(route.path)
          current.value = 0
        }, 200)
      }
    } else {
      current.value = 0
    }
  }

  onMounted(() => {
    const { appContext } = getCurrentInstance()!

    if (!exists) {
      const parent = document.querySelector('#app-container__content') || document.body
      parent.appendChild(container)

      const vnode = createVNode(AppProgress, { current: current })
      vnode.appContext = appContext
      render(vnode, container)

      exists = true
    }
  })

  onUnmounted(() => {
    if (exists) {
      render(null, container)
      container.remove()

      exists = false
    }
  })

  watch(
    () => route.path,
    (newRoutePath) => {
      updateCurrentFromStates(newRoutePath)
    },
    { immediate: true }
  )

  watch(
    () => Array.from(states.entries()),
    () => {
      updateCurrentFromStates()
    },
    { immediate: true }
  )

  // 进度条状态操作
  const set = (state: ProgressState, routePath?: string) => {
    states.set(routePath || route.path, state)
  }

  const done = (routePath?: string, message?: string) => {
    states.set(routePath || route.path, {
      current: 100,
      message
    })
  }

  const reset = (routePath?: string, message?: string) => {
    states.set(routePath || route.path, {
      current: 0,
      message
    })
  }

  // 响应式状态 API
  const routeHasProgressState = (routePath?: string) =>
    computed(() => {
      const state = states.get(routePath || route.path)

      return (state && state.current > 0 && state.current < 100) || false
    })

  const currentRouteHasProgressState = computed(() => {
    const state = states.get(route.path)

    return (state && state.current > 0 && state.current < 100) || false
  })

  const currentRouteProgressState = computed(() => states.get(route.path))

  return {
    states,
    current,
    set,
    done,
    reset,
    routeHasProgressState,
    currentRouteHasProgressState,
    currentRouteProgressState
  }
})
