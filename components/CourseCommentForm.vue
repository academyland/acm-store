<template>
  <Form :validation-schema="schema" @submit="submit">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" v-if="!hasFullName">
      <app-text-input name="first_name" :label="$t('first_name')" />
      <app-text-input name="last_name" :label="$t('last_name')" />
    </div>
    <app-text-input name="comment" :label="$t('comment')" area></app-text-input>

    <app-button
      :loading="loading"
      class="btn btn-secondary btn-block"
      type="submit"
      >ثبت نظر</app-button
    >
  </Form>
</template>
<script lang="ts" setup>
import { useCreateCourseComment } from "~~/composables/courseComments/useCourseComments";
import { Form } from "vee-validate";
const props = defineProps<{ courseID: number }>();
const { submit, loading, schema, hasFullName } = useCreateCourseComment(
  toRef(props, "courseID")
);
</script>
