<template>
  <input type="text" :value="modelValue" @input="handleChange" />
</template>

<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: { type: String, default: "" } });
const handleChange = ($event) => {
  emit("update:modelValue", $event.target.value);
};
</script>
