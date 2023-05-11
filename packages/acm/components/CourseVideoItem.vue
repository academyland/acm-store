<template>
  <div
    class="flex flex-col space-y-1.5 sm:(space-y-0 flex-row justify-between)"
  >
    <section class="t-row space-x-reverse space-x-2">
      <div
        class="t-center flex-shrink-0 w-7 h-7 text-xs rounded-full bg-gray-600 text-white"
      >
        {{ rowNumber }}
      </div>
      <div>{{ item.videoTitle }}</div>
    </section>
    <section class="self-end sm:self-auto t-row">
      <span class="block ml-3 lg:ml-4 text-gray-500 prose-sm">{{
        item.duration
      }}</span>
      <lock-closed-icon v-if="isLocked" class="block w-5 h-5 text-red-600" />
      <template v-else>
        <a :href="getDownloadLink">
          <download-icon class="block w-5 h-5 text-primary" />
        </a>
      </template>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { LockClosedIcon } from "@heroicons/vue/outline";
import { DownloadIcon } from "@heroicons/vue/solid";
import { CourseVideo } from "~~/composables/course/courseDetail.dto";
import { useVideoItem } from "~~/composables/course/useCourseDetail";
const props = defineProps<{ rowNumber: number; item: CourseVideo }>();
const { isLocked, getDownloadLink } = useVideoItem(toRef(props, "item"));
</script>

<style scoped></style>
