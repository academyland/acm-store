<template>
  <div class="relative lg:px-5">
    <template v-if="arrows">
      <button
        class="hidden lg:block absolute top-1/2 -right-5 transition translate--y-1/2"
        @click="clickPrev"
      >
        <chevron-right-icon class="w-8"></chevron-right-icon>
      </button>
      <button
        class="hidden lg:block absolute top-1/2 -left-5 transition translate--y-1/2"
        @click="clickNext"
      >
        <chevron-left-icon class="w-8"></chevron-left-icon>
      </button>
    </template>
    <div class="overflow-x-hidden">
      <div ref="sliderWrapperRef" class="flex">
        <template v-for="(item, index) in items" :key="index">
          <div
            :ref="(el) => setChildrenRef(el, index)"
            :class="[
              { 'py-2 px-1.5 first:pr-3 last:pl-3': defaultPadding },
              itemContainerClass,
            ]"
          >
            <slot name="item" :item="item" :index="index" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { gsap } from "gsap";
import Draggable from "gsap/Draggable";
import { useEventListener } from "@vueuse/core";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/vue/outline/index.js";
export default defineComponent({
  name: "AppSlider",
  components: { ChevronLeftIcon, ChevronRightIcon },
  props: {
    items: { type: Array, default: () => [] },
    arrows: {
      type: Boolean,
      default: () => true,
    },
    defaultPadding: { type: Boolean, default: () => true },
    itemContainerClass: {
      type: [Array, Object, String],
      default: "",
    },
    config: {
      type: Object,
      default: () => ({ duration: 1, ease: "power1" }),
    },
    middle: {
      type: Number,
      default: -1,
    },
    end: {
      type: Number,
      default: -1,
    },
    start: {
      type: Number,
      default: -1,
    },
  },
  setup(props) {
    const sliderWrapperRef = ref<any>(null);
    const childrenRef = ref<any>([]);
    const setChildrenRef = (el: any, index: number) => {
      if (el) childrenRef.value[index] = el;
    };
    onBeforeUpdate(() => {
      childrenRef.value = [];
    });
    const getConfig = () => {
      const el = unref(sliderWrapperRef);
      const maxX: number = el!.scrollWidth - el!.clientWidth;
      // console.log("maxX", maxX, el!.scrollWidth, el!.clientWidth);

      return { el, maxX };
    };
    const recalculate = () => {
      const { el, maxX } = getConfig();
      //@ts-ignore
      Draggable.get(unref(el)).applyBounds({ minX: 0, maxX });
    };
    onUpdated(() => {
      recalculate();
    });
    onMounted(() => {
      gsap.registerPlugin(Draggable);
      let { el, maxX } = getConfig();
      Draggable.create(unref(el), {
        type: "x",
        edgeResistance: 0.9,
        //@ts-ignore
        bounds: { minX: 0, maxX },
      });
      useEventListener("resize", recalculate);
    });
    const getValidX = (x: number) => {
      const { maxX } = getConfig();
      if (x < 0) return 0;
      if (x > maxX) {
        return maxX;
      }
      return x;
    };
    const getPrevItemsWidth = (activeIndex: number): number => {
      let xDistance = 0;
      for (let i = 0; i < activeIndex; i++) {
        xDistance += childrenRef.value[i].clientWidth;
      }
      return xDistance;
    };
    const setActiveIndexStart = (activeIndex: number) => {
      //move to first item
      if (childrenRef.value[activeIndex]) {
        const { el } = getConfig();
        const xDistance = getPrevItemsWidth(activeIndex);
        gsap.to(unref(el), {
          x: getValidX(xDistance),
          ...props.config,
        });
      }
    };
    const setActiveIndexEnd = (activeIndex: number) => {
      //move to last item
      if (childrenRef.value[activeIndex]) {
        const { el } = getConfig();
        const xDistance = getPrevItemsWidth(activeIndex);
        const visibleBack =
          (unref(el)?.clientWidth || 0) -
          childrenRef.value[activeIndex].clientWidth;
        gsap.to(unref(el), {
          x: getValidX(xDistance - visibleBack),
          ...props.config,
        });
      }
    };

    const setActiveIndexMiddle = (activeIndex: number) => {
      //move to middle item
      if (childrenRef.value[activeIndex]) {
        const { el } = getConfig();
        const xDistance = getPrevItemsWidth(activeIndex);
        const visibleBack =
          (unref(el)?.clientWidth || 0) -
          childrenRef.value[activeIndex].clientWidth;
        gsap.to(unref(el), {
          x: getValidX(xDistance - visibleBack / 2),
          ...props.config,
        });
      }
    };
    watch(
      () => props.start,
      (value) => {
        setActiveIndexStart(value);
      }
    );
    watch(
      () => props.middle,
      (value) => {
        setActiveIndexMiddle(value);
      }
    );
    watch(
      () => props.end,
      (value) => {
        setActiveIndexEnd(value);
      }
    );
    const clickNext = () => {
      const { el } = getConfig();
      const currentX = gsap.getProperty(unref(el), "x");
      const plusX = unref(el)!.clientWidth;
      gsap.to(unref(el), {
        x: getValidX(+currentX + plusX),
        ...props.config,
      });
    };
    const clickPrev = () => {
      const { el } = getConfig();
      const currentX = gsap.getProperty(unref(el), "x");
      const plusX = unref(el)!.clientWidth;
      gsap.to(unref(el), {
        x: getValidX(+currentX - plusX),
        ...props.config,
      });
    };
    return {
      clickNext,
      clickPrev,
      sliderWrapperRef,
      setChildrenRef,
    };
  },
});
</script>
