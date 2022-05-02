<template>
  <div>
    <div
      class="flex flex-col relative p-10 lg:pb-32 home-header overflow-hidden"
    >
      <div
        class="z-0 absolute -inset-2 course-cover filter blur-sm contrast-125 home-header"
      >
        <div class="w-full h-full bg-black bg-opacity-50" />
      </div>

      <section
        class="flex-1 flex flex-col lg:flex-row items-center justify-center lg:pr-5 xs:mt-8 sm:mt-0 z-10"
      >
        <div class="text-white space-y-6">
          <h1 class="prose-xl g-head-anime">آموزش تخصصی vue js و nuxt js</h1>
          <p class="block g-head-anime lg:w-3/4">
            به دنیای برنامه نویسی آکادمی لند خوش آمدی، آموزش پروژه محور برنامه
            نویسی با طعم تجربه!
          </p>
          <button
            class="block btn btn-accent btn-wide g-head-anime"
            :class="{ 'transition-none no-animation': !completeAnimation }"
            @click="clickGetStart"
          >
            شروع یادگیری
          </button>
        </div>
      </section>
    </div>
    <section
      class="layout-padding flex flex-col space-y-4 pt-4 lg:pt-0 lg:space-y-0 w-full lg:w-auto lg:flex-row justify-center items-center lg:space-x-reverse lg:space-x-4 lg:transform lg:-translate-y-1/2"
    >
      <service
        title="پروژه های عملی"
        description="آموزش پروژه محور و انتقال تجربه عملی مهمترین وجه آموزش های ماست"
      >
        <template #icon>
          <code-icon />
        </template>
      </service>
      <service
        title="مجموعه بی نظیر آموزش های مدرن"
        description="بروز بودن آموزش های ما وجه تمایز ماست"
      >
        <template #icon>
          <academic-cap-icon />
        </template>
      </service>
      <service
        title="تجربه عملی مدرس"
        description="سال ها تجربه برنامه نویسی در قالب دوره های آموزشی منتظر شماست"
      >
        <template #icon>
          <BeakerIcon />
        </template>
      </service>
    </section>

    <h6 id="featured-courses" class="head text-center">دوره های آکادمی لند</h6>
    <section class="my-3 lg:mt-0 lg:mx-10">
      <app-slider :items="data">
        <template #item="item">
          <course-item :item="item" />
        </template>
      </app-slider>
    </section>
  </div>
</template>
<script setup lang="ts">
import { AcademicCapIcon, BeakerIcon, CodeIcon } from "@heroicons/vue/outline";
import { gsap } from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useCourseList } from "~/composables/course/useCourse";
const completeAnimation = ref(false);
onMounted(() => {
  gsap.registerPlugin(ScrollToPlugin);
  //@ts-ignore
  const tl = new gsap.timeline();
  tl.from(".g-head-anime", {
    ease: "power4",
    duration: 0.8,
    autoAlpha: 0,
    x: 200,
    stagger: 0.3,
    onComplete: () => {
      completeAnimation.value = true;
      gsap.set(".g-head-anime", { clearProps: "transform" });
    },
  });
});
const clickGetStart = () => {
  gsap.to(window, {
    duration: 1,
    scrollTo: { y: "#featured-courses", offsetY: 110 },
  });
};
const { data, pending } = useCourseList();
</script>
<style scoped lang="postcss">
.g-head-anime {
  @apply invisible;
}
#home-head-banner {
  @apply invisible;
}
.home-header {
  background-image: url("~/assets/images/home-header-background.jpeg");
  background-size: 100% 100%;
}
</style>
