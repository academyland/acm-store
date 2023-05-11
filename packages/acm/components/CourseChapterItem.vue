<template>
  <app-collapse>
    <template #title>
      <p class="font-medium">{{ item.chapterName }}</p>
    </template>
    <section class="divide-y">
      <template
        v-for="videoItem in item.courseVideos"
        :key="`video-item-${videoItem.id}`"
      >
        <course-video-item
          :item="videoItem"
          class="py-3"
          :row-number="videoItem.rowNumber"
        />
      </template>
    </section>
  </app-collapse>
</template>

<script lang="ts" setup>
import { CourseChapter } from "~~/composables/course/courseDetail.dto";
defineProps<{ item: CourseChapter }>();
</script>
