<template>
  <div
    class="bg-white t-row border w-full lg:border-none lg:shadow lg:max-w-[20rem] rounded-box space-x-reverse space-x-5 p-4"
  >
    <div class="w-16 h-16 overflow-hidden text-secondary">
      <slot name="icon" />
    </div>
    <div class="space-y-2">
      <h6 class="font-bold block prose-sm">
        {{ title }}
      </h6>
      <p class="block text-justify prose-sm">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    title: String,
    description: String,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
