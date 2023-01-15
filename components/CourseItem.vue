<template>
  <nuxt-link
    :to="to"
    class="group cursor-pointer block"
    :class="{ ['w-[19rem] lg:w-[22rem]']: hasDefaultWith }"
  >
    <div class="card border border-[2.5px] bg-accent text-accent-content">
      <div
        class="aspect-w-40 aspect-h-21 bg-gray-100 shadow-sm border-b relative"
      >
        <div class="absolute inset-x-2 top-2" v-if="item.percent">
          <div class="t-row justify-between">
            <small class="text-secondary" v-if="item.isRecording">
              تخفیف حین ضبط دوره
            </small>
            <div v-else></div>
            <div class="badge badge-secondary py-3">{{ item.percent }} %</div>
          </div>
        </div>
        <figure class="overflow-hidden">
          <img
            class="w-full h-full transition duration-500 transform-gpu group-hover:opacity-90 group-hover:scale-105"
            loading="lazy"
            :src="item.src"
            :alt="item.title"
          />
        </figure>
      </div>

      <div class="card-body">
        <h3
          class="line-clamp-2 min-h-14 card-title prose-sm group-hover:text-primary transition"
        >
          {{ item.title }}
        </h3>

        <div class="min-h-[6rem]">
          <p class="prose-xs line-clamp-4">
            {{ item.short_description }}
          </p>
        </div>

        <div class="flex items-center justify-between mt-3">
          <div class="prose-xs 3xl:prose-2xs text-secondary">
            <!-- {{ item.statusText }} -->
            <client-only>
            <template v-if="cartStore.fetchedOnce">
              <add-to-cart-button  v-if="!cartStore.isExistInTheCart(item.id)" :id="item.id"></add-to-cart-button>
              <delete-from-cart v-else :id="item.id"></delete-from-cart>
            </template>
            </client-only>
          </div>
          <div class="prose-xs 3xl:prose-2xs">
            <div class="t-row space-x-3 space-x-reverse">
              <span
                v-if="item.showAmount"
                class="line-through prose-3xs text-gray-600"
                >{{ numberFormat(item.amount) }}</span
              >
              <span>
                {{ getAmount }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import { computed, defineComponent, PropType } from "vue";
import { numberFormat } from "~/helpers/formatHelper";
import { CourseDto } from "~/composables/course/course.dto";
import { useCartStore } from "~~/composables/cart/cart.store";
interface Props {
  item: CourseDto;
  hasDefaultWith?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  hasDefaultWith: true,
});
const to = computed(() => ({
  name: "courses-slug",
  params: { slug: props.item.slug },
}));
const getAmount = computed(() => {
  if (props.item.amountOff === 0) {
    return "رایگان";
  }
  return numberFormat(props.item.amountOff) + " تومان ";
});
const cartStore=useCartStore();
</script>
