<template>
  <div class="space-y-4 divide-y">
    <template v-if="loading">
      <p class="p-4">در حال دریافت اطلاعات...</p>
    </template>
    <template v-else-if="isEmpty">
      <p>هنوز دیدگاهی ثبت نشده است.</p>
    </template>
    <div
      v-else
      v-for="comment in comments"
      :key="`comment-item-${comment.id}`"
      class="prose-sm pt-3 lg:pt-4 space-y-3 lg:space-y-4"
    >
      <div class="t-row">
        <div
          class="t-center bg-gray-500 rounded-full border-4 border-gray-300 w-12 h-12"
        >
          <user-icon class="w-8 h-8 text-white" />
        </div>
        <div class="mr-4">
          <div class="prose-xs font-medium">{{ comment.fullName }}</div>
          <div class="prose-2xs">{{ comment.createdDate }}</div>
        </div>
      </div>
      <p class="font-medium">
        {{ comment.comment }}
      </p>
      <template
        v-for="child in comment.children"
        :key="`child-item-${child.id}`"
      >
        <section class="t-row mr-4 text-gray-500">
          <div class="hidden sm:block">
            <reply-icon class="w-7 h-7 ml-4" />
          </div>
          <p class="font-medium">
            {{ child.comment }}
          </p>
        </section>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UserIcon } from "@heroicons/vue/outline";
import { ReplyIcon } from "@heroicons/vue/solid";
import { useCourseComments } from "~/composables/courseComments/useCourseComments";
const props = defineProps<{ courseId: number }>();
const { loading, comments, isEmpty } = useCourseComments(
  toRef(props, "courseId")
);
</script>

<style scoped></style>
