import { computed, Ref } from 'vue'
import { useRoute } from 'vue-router'

export const useEnableByRoute = (routesArray: { name?: string, path?: string }[]): Ref<boolean> => {
  const route = useRoute()
  return computed(() => {
    return (
      routesArray.findIndex((item) => {
        if (item.name && item.name === route.name) {
          return true
        } else if (item.path && item.path === route.path) {
          return true
        }
        return false
      }) !== -1
    )
  })
}
