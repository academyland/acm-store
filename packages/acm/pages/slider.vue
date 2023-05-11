<template>
  <div class="flex flex-col space-y-3 justify-center items-center">
    <div class="sticky top-0 bg-white py-4 z-10">
      <app-scroll-to-nav :items="CourseTabs"></app-scroll-to-nav>
    </div>
    <template v-for="item in CourseTabs" :key="`course-item-${item.id}`">
      <div class="h-96">
        <h2 :id="item.id">{{ item.label }}</h2>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const CourseTabs = [
  { id: "about-course", label: "درباره دوره" },
  { id: "requirements-course", label: "پیش نیازهای دوره" },
  { id: "chapters-course", label: "لیست ویدئوها" },
  { id: "faqs-course", label: "پرسش های متداول" },
  { id: "comments-course", label: "نظرات کاربران" },
];
</script>
