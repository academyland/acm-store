<template>
  <div class="my-6">
    <h2>avatar list</h2>
    <app-skeleton></app-skeleton>
    <h2>card</h2>
    <app-skeleton :type="SkeletonTypes.CARD"></app-skeleton>
    <h2>one line</h2>
    <app-skeleton :type="SkeletonTypes.ONE_LINE"></app-skeleton>

    <h2>three line</h2>
    <app-skeleton :type="SkeletonTypes.THREE_LINE"></app-skeleton>

    <h2>image</h2>
    <app-skeleton :type="SkeletonTypes.IMAGE"></app-skeleton>

    <h2>custom</h2>
    <app-skeleton :type="SkeletonTypes.CUSTOM">
      <div class="flex flex-row">
        <div class="rounded-full bg-gray-300 h-12 w-12"></div>
        <div class="rounded bg-gray-300 h-12 min-w-[10rem]"></div>
      </div>
    </app-skeleton>
  </div>
</template>

<script lang="ts" setup>
import { SkeletonTypes } from "~~/components/AppSkeleton/Skeleton.enum";
</script>
