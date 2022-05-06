<template>
  <div>
    <div>
      {{ store.count }}
      {{ store.double }}
    </div>
    <button class="btn btn-primary" @click="store.increment">increment</button>
  </div>
</template>

<script setup>
import { useCounterStore } from "../store/useCounter.store";

const store = useCounterStore();
</script>
