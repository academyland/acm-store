<template>
  <template v-if="type === SkeletonTypes.AVATAR_LIST">
    <div
      data-name="skeleton-avatarListContainer"
      v-bind="$attrs"
      :class="[
        containerClass,
        `p-4 w-full mx-auto cursor-wait ${borderClass}  ${shadowClass} ${roundedClass}`,
      ]"
    >
      <div
        data-name="skeleton-avatarListInnerContainer"
        class="relative overflow-hidden animate-pulse delay-500 flex space-x-reverse space-x-4"
      >
        <div
          class="skeleton-box absolute top-0 right-0 bottom-0 left-0 transform -translate-x-full"
        ></div>
        <div
          data-name="skeleton-avatarListCircle"
          class="rounded-full bg-gray-300 h-12 w-12"
        ></div>
        <div class="flex-1 space-y-4 py-1">
          <div
            data-name="skeleton-avatarListLine"
            class="h-4 bg-gray-300 rounded w-3/4"
          ></div>
          <div class="space-y-2">
            <div
              data-name="skeleton-avatarListLine"
              class="h-4 bg-gray-300 rounded"
            ></div>
            <div
              data-name="skeleton-avatarListLine"
              class="h-4 bg-gray-300 rounded w-5/6"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <template v-else-if="type === SkeletonTypes.IMAGE">
    <div
      data-name="skeleton-imageContainer"
      v-bind="$attrs"
      :class="[
        containerClass,
        `${roundedSmClass} ${shadowClass} ${borderClass} max-w-xs w-full mx-auto cursor-wait`,
        'imageContainer',
      ]"
    >
      <div
        data-name="skeleton-imageInnerContainer"
        class="relative overflow-hidden animate-pulse delay-500"
      >
        <div
          class="skeleton-box absolute top-0 right-0 bottom-0 left-0 transform -translate-x-full"
        ></div>
        <div
          data-name="skeleton-image"
          :class="` w-full h-60 bg-gray-300 ${roundedSmClass}`"
        ></div>
      </div>
    </div>
  </template>

  <template v-else-if="type === SkeletonTypes.CARD">
    <div
      data-name="skeleton-cardContainer"
      v-bind="$attrs"
      :class="[
        containerClass,
        `${roundedSmClass} ${shadowClass} ${borderClass} max-w-xs  w-full mx-auto cursor-wait`,
        'cardContainer',
      ]"
    >
      <div
        data-name="skeleton-cardInnerContainer"
        class="relative overflow-hidden flex flex-col pb-5 animate-pulse delay-500"
      >
        <div
          class="skeleton-box absolute top-0 right-0 bottom-0 left-0 transform -translate-x-full"
        ></div>
        <div
          data-name="skeleton-cardImage"
          :class="`${
            rounded ? 'rounded-t-sm' : ''
          } w-full h-60 bg-gray-300 mb-5`"
        ></div>
        <template v-if="$slots.footer">
          <slot name="footer"></slot>
        </template>
        <template v-else>
          <div
            data-name="skeleton-cardLine"
            class="h-4 bg-gray-300 rounded w-1/2 mr-6"
          ></div>
        </template>
      </div>
    </div>
  </template>

  <template v-else-if="type === SkeletonTypes.ONE_LINE">
    <div
      data-name="skeleton-lineContainer"
      v-bind="$attrs"
      :class="[
        containerClass,
        `${roundedClass} ${shadowClass} ${borderClass} p-4 w-full mx-auto cursor-wait`,
        'lineContainer',
      ]"
    >
      <div
        data-name="skeleton-line"
        :class="[
          containerClass,
          'relative overflow-hidden delay-500 animate-pulse h-4 bg-gray-300 rounded w-full',
          'line',
        ]"
      >
        <div
          class="skeleton-box absolute top-0 right-0 bottom-0 left-0 transform -translate-x-full"
        ></div>
      </div>
    </div>
  </template>
  <template v-else-if="type === SkeletonTypes.THREE_LINE">
    <div
      v-bind="$attrs"
      data-name="skeleton-threeLineContainer"
      :class="[
        containerClass,
        `${roundedClass} ${shadowClass} ${borderClass} p-4 w-full mx-auto cursor-wait`,
        'threeLineContainer',
      ]"
    >
      <div
        data-name="skeleton-threeLineInnerContainer"
        :class="[
          containerClass,
          'relative overflow-hidden flex-1 space-y-3 py-1 animate-pulse delay-500',
          'threeLineInnerContainer',
        ]"
      >
        <div
          class="skeleton-box absolute top-0 right-0 bottom-0 left-0 transform -translate-x-full"
        ></div>
        <div
          data-name="skeleton-threeLine"
          class="h-4 bg-gray-300 rounded w-3/4 threeLine"
        ></div>
        <div
          data-name="skeleton-threeLine"
          class="h-4 bg-gray-300 rounded threeLine"
        ></div>
        <div
          data-name="skeleton-threeLine"
          class="h-4 bg-gray-300 rounded w-5/6 threeLine"
        ></div>
      </div>
    </div>
  </template>
  <template v-else-if="type === SkeletonTypes.CUSTOM">
    <div
      v-bind="$attrs"
      data-name="skeleton-customContainer"
      :class="[
        containerClass,
        `${roundedClass} ${shadowClass} ${borderClass} w-full mx-auto cursor-wait`,
        'customContainer',
      ]"
    >
      <div
        data-name="skeleton-custom"
        class="relative overflow-hidden animate-pulse delay-500"
      >
        <div
          class="skeleton-box absolute top-0 right-0 bottom-0 left-0 transform -translate-x-full"
        ></div>
        <slot></slot>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from "vue";
import { SkeletonTypes } from "./Skeleton.enum";
export default defineComponent({
  props: {
    containerClass: {
      type: [Object, String, Array],
      default: "",
    },
    type: {
      type: String,
      default: () => inject("t-skeleton-type", SkeletonTypes.AVATAR_LIST),
      validator: (value: SkeletonTypes) => {
        return Object.values(SkeletonTypes).includes(value);
      },
    },
    border: {
      type: Boolean,
      default: () => inject("t-skeleton-border", true),
    },
    shadow: {
      type: Boolean,
      default: () => inject("t-skeleton-shadow", true),
    },
    rounded: {
      type: Boolean,
      default: () => inject("t-skeleton-rounded", false),
    },
  },
  setup(props) {
    const shadowClass = computed(() => (props.shadow ? "shadow" : ""));
    const borderClass = computed(() =>
      props.border ? "border border-gray-200" : ""
    );
    const roundedClass = computed(() => (props.rounded ? "rounded-md" : ""));
    const roundedSmClass = computed(() => (props.rounded ? "rounded-sm" : ""));
    return {
      SkeletonTypes: SkeletonTypes,
      shadowClass,
      borderClass,
      roundedClass,
      roundedSmClass,
    };
  },
});
</script>

<style>
.skeleton-box {
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0) 10%,
    rgba(255, 255, 255, 0.3) 80%,
    rgba(255, 255, 255, 0)
  );
  animation: shimmer 2s infinite;
}
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
