<template>
  <div
    ref="target"
    class="invisible fixed bottom-0 right-1/2 transform translate-x-1/2 p-3 rounded-md"
    :class="`bg-${toastRef.type} text-white`"
  >
    {{ toastRef.message }}
  </div>
</template>

<script setup lang="ts">
import { useToast } from "~/composables/useToast";
import { gsap } from "gsap";
const { toastRef } = useToast();
const target = ref<HTMLElement | null>(null);
let animation: any;
const setAnimation = (): void => {
  animation = gsap.to(unref(target), {
    autoAlpha: 1,
    bottom: 80,
    ease: "power4",
    paused: true,
    duration: 0.5,
  });
};
onMounted(() => {
  setAnimation();
});
watch(toastRef, (value) => {
  if (value.show) {
    animation.play();
  } else {
    animation.reverse();
  }
});
</script>

<style lang="scss" scoped></style>
