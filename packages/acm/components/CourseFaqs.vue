<template>
  <app-collapse>
    <template #title>
      <p class="font-medium">{{ item.question }}</p>
    </template>

    <div class="p-4">{{ item.answer }}</div>
  </app-collapse>
</template>

<script lang="ts" setup>
import { CourseQuestion } from "~~/composables/course/courseDetail.dto";

defineProps<{ item: CourseQuestion }>();
</script>

<style scoped></style>
