<template>
  <div v-if="pending">loading...</div>
  <div v-else-if="data">
    <section class="grid bg-[#220241] lg:grid-cols-3">
      <div class="aspect-w-40 aspect-h-21 drop-shadow-lg filter blur-[4px]">
        <figure class="overflow-hidden">
          <img class="w-full h-full" loading="lazy" :src="data.src" />
        </figure>
      </div>
      <div
        class="py-4 lg:py-0 my-auto space-y-3 lg:space-y-4 t-col items-center text-center"
      >
        <h1 class="font-bold prose-2xl text-white">
          {{ data.title }}
        </h1>
        <div class="t-row">
          <div class="badge badge-secondary badge-lg text-xs">
            {{ data.statusText }}
          </div>
        </div>
      </div>
    </section>

    <section class="sticky top-0 bg-white py-4 z-10">
      <app-scroll-to-nav :items="CourseTabs" />
    </section>
    <main
      class="flex flex-col space-y-3 lg:space-y-0 lg:grid lg:gap-5 grid-cols-1 lg:grid-cols-12 px-3 pb-4 pt-2 lg:px-10 lg:pb-10 lg:pt-5"
    >
      <section class="lg:col-span-8 space-y-3">
        <div class="card bg-white border rounded-box p-4">
          <div class="card-body">
            <h6 :id="CourseTabs[0].id" class="card-title text-secondary">
              درباره دوره
            </h6>
            <article>
              <p>
                {{ data.description }}
              </p>
            </article>
          </div>
        </div>
        <div class="card bg-white border rounded-box p-4">
          <div class="card-body">
            <h6 :id="CourseTabs[1].id" class="card-title text-secondary">
              پیش نیازهای دوره
            </h6>
            <p>
              {{ data.requirements }}
            </p>
          </div>
        </div>
        <div class="card bg-white border rounded-box p-4">
          <div class="card-body">
            <h6 :id="CourseTabs[2].id" class="card-title text-secondary">
              لیست ویدئوهای دوره
            </h6>
            <template v-if="hasChapter">
              <course-chapter-item
                v-for="item in data?.courseChapters"
                :item="item"
                :key="`chapter-${item.id}`"
              />
            </template>
            <template v-else>
              <p>هنوز ویدئویی منتشر نشده است.</p>
            </template>
          </div>
        </div>

        <div class="card bg-white border rounded-box p-4">
          <div class="card-body">
            <h6 :id="CourseTabs[3].id" class="card-title text-secondary">
              پرسش های متداول
            </h6>
            <template
              v-for="question in data.courseQuestions"
              :key="`question-${question.id}`"
            >
              <course-faqs :item="question" />
            </template>
          </div>
        </div>

        <client-only>
          <div class="card bg-white border rounded-box p-4">
            <div class="card-body">
              <h6 :id="CourseTabs[4].id" class="card-title text-secondary">
                نظرات کاربران
              </h6>
              <div class="my-3">
                <template v-if="authStore.isLoggedIn">
                  <div>
                    <course-comment-form
                      :courseID="data.id"
                    ></course-comment-form>
                  </div>
                </template>
                <template v-else>
                  <p
                    role="button"
                    @click="openLoginDialog()"
                    class="alert alert-info text-sm"
                  >
                    برای ثبت نظر ابتدا باید وارد شوید.
                  </p>
                </template>
              </div>

              <course-comments :course-id="data.id"></course-comments>
            </div>
          </div>
        </client-only>
      </section>
      <aside class="lg:col-span-4 t-col space-y-3">
        <section class="bg-white border rounded-box p-4">
          <div class="t-row justify-between p-3">
            <span class="block font-medium prose-sm">قیمت دوره</span>
            <span class="block"> {{ numberFormat(data.amountOff) }}</span>
          </div>
          <div v-if="data.courseDuration" class="t-row justify-between p-3">
            <span class="block font-medium prose-sm">مدت زمان دوره</span>
            <span class="block" dir="ltr">{{ data.courseDuration }}</span>
          </div>
          <div
            v-if="data.computedEstimateDuration"
            class="t-row justify-between p-3"
          >
            <span class="block font-medium prose-sm"
              >مدت زمان تقریبی دوره (پس از تکمیل)</span
            >
            <span class="block">{{ data.computedEstimateDuration }}</span>
          </div>
          <div v-if="data.totalVideoCount" class="t-row justify-between p-3">
            <span class="block font-medium prose-sm">تعداد قسمت ها</span>
            <span class="block"> {{ data.totalVideoCount }} </span>
          </div>
          <div class="t-row justify-between p-3">
            <span class="block font-medium prose-sm">تعداد شرکت کننده گان</span>
            <span class="block"> {{ data.userCounter }}</span>
          </div>
          <client-only
            ><course-pay-button :course-id="data.id"></course-pay-button
          ></client-only>
        </section>

        <section class="bg-white border rounded-box p-4">
          <div class="t-row">
            <div class="avatar">
              <div class="rounded-full w-20 h-20">
                <img
                  src="https://avatars.githubusercontent.com/u/15521662?v=4"
                />
              </div>
            </div>
            <div class="t-col space-y-2 mr-4">
              <span class="font-semibold">مدرس دوره</span>
              <span>یدالله ضیاالدینی</span>
            </div>
          </div>
          <article class="mt-4">
            <p class="text-gray-500">
              از سال ۱۳۹۲ داستان برنامه نویسی برای من جدی شد ابتدا به مدت ۴ سال
              صرفا بک اند کار می کردم بعدا بنا به نیاز شرکت با ری اکت نیتیو وارد
              دنیای اپلیکیشن شدم و پس از تکمیل اپلیکیشن فروشگاه اینترنتی مبیت
              مجددا به دنیای وب برگشتم این بار بخش فرانتند و فریم ورک دوست
              داشتنی vue js و همچنان با این فریم ورک در حال برنامه نویسی هستم
            </p>
          </article>
        </section>
      </aside>
    </main>
  </div>
</template>

<script setup lang="ts">
import { CourseTabs } from "~/composables/course/Course.const";
import { useLoginDialog } from "~~/composables/auth/login/useLoginDialog";
import { useAuthStore } from "~~/composables/auth/Auth.store";
import { useCourseDetail } from "~~/composables/course/useCourseDetail";
import { numberFormat } from "~~/helpers/formatHelper";

const { open: openLoginDialog } = useLoginDialog();
const authStore = useAuthStore();
const route = useRoute();
const { data, pending } = useCourseDetail(route.params.slug as string);
const hasChapter = computed(() => unref(data)?.courseChapters?.length! > 0);
// const { canBuy, loading } = useCanBuyConsumer();
// watchEffect(() => {
//   console.log("data", data.value);
//   console.log("canBuy", unref(canBuy), unref(loading));
// });
</script>
<style scoped>
.course-cover {
  background-size: 100% 100%;
}
</style>
