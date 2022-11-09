<template>
  <div>
    <section class="grid bg-[#220241] lg:grid-cols-3">
      <div class="aspect-w-40 aspect-h-21 drop-shadow-lg filter blur-[4px]">
        <figure class="overflow-hidden">
          <img class="w-full h-full" loading="lazy" src="#" />
        </figure>
      </div>
      <div
        class="py-4 lg:py-0 my-auto space-y-3 lg:space-y-4 t-col items-center text-center"
      >
        <h1 class="font-bold prose-2xl text-white">
          پیاده سازی فروشگاه با vue و nuxt 3
        </h1>
        <div class="t-row">
          <div class="badge badge-secondary badge-lg text-xs">در حال ضبط</div>
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
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
                نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان
                جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و
                زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
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
              html , css و تسلط بر جاوا اسکریپت. شروع دوره از صفر هست و نیاز به
              هیچ پیش ضمینه ای از فریم ورک های جاوا اسکریپت ندارد هرچند آشنایی
              با این فریم ورک ها در درک هرچه بهتر مسائل کمک می کند اما اجباری
              نیست.
            </p>
          </div>
        </div>
        <div class="card bg-white border rounded-box p-4">
          <div class="card-body">
            <h6 :id="CourseTabs[2].id" class="card-title text-secondary">
              لیست ویدئوهای دوره
            </h6>
            <template v-if="true">
              <div class="h-20">لیست ویدئوهای دوره در اینجا قرار می گیرد</div>
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
            <div class="h-10">لیست سوالات متداول در اینجا قرار می گیرد</div>
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
                  <div>فرم ثبت نظر در اینجا قرار می گیرد</div>
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

              <div class="h-10">نظرات کاربران اینجا قرار می گیرد</div>
            </div>
          </div>
        </client-only>
      </section>
      <aside class="lg:col-span-4 t-col space-y-3">
        <section class="bg-white border rounded-box p-4">
          <div class="t-row justify-between p-3">
            <span class="block font-medium prose-sm">قیمت دوره</span>
            <span class="block"> 869,000 تومان </span>
          </div>
          <div v-if="true" class="t-row justify-between p-3">
            <span class="block font-medium prose-sm">مدت زمان دوره</span>
            <span class="block" dir="ltr">12 : 20 : 15</span>
          </div>
          <div v-if="true" class="t-row justify-between p-3">
            <span class="block font-medium prose-sm"
              >مدت زمان تقریبی دوره (پس از تکمیل)</span
            >
            <span class="block">20 ساعت</span>
          </div>
          <div v-if="true" class="t-row justify-between p-3">
            <span class="block font-medium prose-sm">تعداد قسمت ها</span>
            <span class="block"> 70 </span>
          </div>
          <div class="t-row justify-between p-3">
            <span class="block font-medium prose-sm">تعداد شرکت کننده گان</span>
            <span class="block"> 120</span>
          </div>
          <client-only> دکمه پرداخت و ثبت نام دوره </client-only>
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

<script lang="ts">
import { defineComponent } from "vue";
import { CourseTabs } from "~/composables/course/Course.const";
import { useLoginDialog } from "~~/composables/auth/login/useLoginDialog";
import { useAuthStore } from "~~/composables/auth/Auth.store";
export default defineComponent({
  setup() {
    const { open: openLoginDialog } = useLoginDialog();
    const authStore = useAuthStore();
    return {
      CourseTabs,
      authStore,
      openLoginDialog,
    };
  },
});
</script>
<style scoped>
.course-cover {
  background-size: 100% 100%;
}
</style>
