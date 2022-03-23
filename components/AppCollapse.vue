<template>
  <div
    :class="{
      'bg-gray-100': isOpen && !noStyle,
      'py-3 px-3.5 t-row justify-between cursor-pointer rounded transition-all lg:hover:bg-gray-200':
        !noStyle,
    }"
    @click="toggle"
    v-bind="$attrs"
  >
    <slot name="title" :is-open="isOpen" />
    <div class="mr-3" v-if="withTitleIcon">{{ isOpen ? "-" : "+" }}</div>
  </div>
  <div ref="target" class="px-1.5 h-0 overflow-y-hidden">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, unref } from "vue";
import { gsap } from "gsap";
import { useDebounceFn, useEventListener } from "@vueuse/core";
export default defineComponent({
  props: {
    noStyle: {
      type: Boolean,
      default: false,
    },
    withTitleIcon: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const target = ref<HTMLElement | null>(null);
    const progress = ref(0);
    let animation: any;
    const setAnimation = () => {
      animation = gsap.to(unref(target), {
        height: "auto",
        overflow: "hidden",
        paused: true,
        duration: 0.5,
        onUpdate() {
          progress.value = animation.progress();
        },
      });
    };
    onMounted(() => {
      setAnimation();
    });

    const toggle = () => {
      if (animation.progress() === 0) {
        animation?.play();
      } else {
        animation?.reverse();
      }
    };
    const isOpen = computed(() => unref(progress) !== 0);
    //  const removeProps = () => {
    //   gsap.set(unref(target), { clearProps: "all" });
    // };
    const debouncedFn = useDebounceFn(() => {
      animation.progress(0).invalidate();
    }, 500);
    useEventListener("resize", debouncedFn);
    return { target, toggle, isOpen };
  },
});
</script>

<style scoped></style>
