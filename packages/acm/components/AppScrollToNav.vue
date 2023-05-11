<template>
  <app-slider
    :items="items"
    item-container-class="flex-shrink-0"
    :middle="activeItemIndex"
    :arrows="false"
  >
    <template #item="{ item, index }">
      <div
        role="button"
        :class="{ 'text-primary': index === activeItemIndex }"
        @click="scrollToID(item.id)"
      >
        {{ item.label }}
      </div>
    </template>
  </app-slider>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { computed, defineProps, onMounted, watch, withDefaults } from "vue";
import { useRoute, useRouter } from "vue-router";
const props = withDefaults(
  defineProps<{ items: { id: string; label: string }[]; offset?: number }>(),
  {
    offset: 300,
  }
);
const route = useRoute();
const router = useRouter();
const activeHash = ref(route.hash || "");
const updateHash = (id) => {
  if (process.client) {
    window.history.pushState(null, "", "#" + id);
    activeHash.value = "#" + id;
  }
};
onMounted(() => {
  gsap.registerPlugin(ScrollToPlugin);
  if (route.hash) {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: route.hash, offsetY: props.offset },
    });
  }
});
let scrollTo: any;
const scrollToID = (id: string) => {
  // router.replace({ hash: "#" + id });
  updateHash(id);
  scrollTo = gsap.to(window, {
    duration: 1,
    scrollTo: { y: "#" + id, offsetY: props.offset, autoKill: true },
  });
};
const { y } = useWindowScroll();
watch(y, () => {
  for (let i = props.items.length - 1; i >= 0; i--) {
    const item = props.items[i];
    const el = document.getElementById(item.id);
    if (el && el?.getBoundingClientRect().top <= props.offset + 2) {
      // router.replace({ hash: "#" + item.id });
      updateHash(item.id);
      return;
    }
    if (i == 0) {
      updateHash("");
      // router.replace({ hash: "" });
    }
  }
});
const activeItemIndex = computed(() => {
  // return props.items.findIndex((item) => "#" + item.id === route.hash);
  return props.items.findIndex((item) => "#" + item.id === unref(activeHash));
});
</script>

<style scoped></style>
