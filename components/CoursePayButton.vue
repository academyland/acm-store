<template>
  <app-button
    v-if="canBuy"
    @click="payClick"
    :variant="ButtonVariantEnum.secondary"
    class="btn-block"
  >
    خرید و انتقال به بانک
  </app-button>
</template>
<script lang="ts" setup>
import { BASE_URL } from "~~/composables/api/api.config";
import { useAuthStore } from "~~/composables/auth/Auth.store";
import { useCanBuyConsumer } from "~~/composables/course/useCourseDetail";
import { ButtonVariantEnum } from "~~/types";
import qs from "querystringify";
const props = defineProps<{ courseId: number }>();
const { canBuy } = useCanBuyConsumer();
const authStore = useAuthStore();
const getTarget = computed(() => {
  return (
    BASE_URL +
    "/site/request?" +
    qs.stringify(
      {
        key: authStore.getToken,
        course_id: props.courseId,
      },
      false
    )
  );
});
const payClick = () => {
  window.location.assign(unref(getTarget));
};
</script>
