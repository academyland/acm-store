<template>
  <div
    class="form-control"
    :class="{ 'has-error': !!errorMessage, success: meta.valid }"
  >
    <label
      v-if="label !== ''"
      class="t-row justify-between pb-1.5 px-1"
      :for="name"
    >
      <span class="label-text">{{ label }}</span>
      <slot name="leftLabel" />
    </label>

    <template v-if="area">
      <textarea
        class="input input-bordered h-32"
        v-bind="$attrs"
        :name="name"
        :type="type"
        :value="inputValue"
        :placeholder="placeholder"
        @input="handleChange"
        @blur="handleBlur"
      ></textarea>
    </template>
    <template v-else>
      <input
        autocomplete="off"
        class="input input-bordered"
        v-bind="$attrs"
        :name="name"
        :type="type"
        :value="inputValue"
        :placeholder="placeholder"
        @input="handleChange"
        @blur="handleBlur"
      />
    </template>

    <label class="flex items-center min-h-[1.4rem] px-1">
      <span class="label-text-alt text-error text-2xs leading-3">
        {{ errorMessage || successMessage }}</span
      >
    </label>
  </div>
</template>

<script lang="ts">
import { useField } from "vee-validate";
export default {
  name: "AppTextInput",
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: "text",
    },
    area: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    successMessage: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  setup(props: any, { emit }) {
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
      setValue,
    } = useField(props.name, undefined, {
      initialValue: props.modelValue,
      validateOnValueUpdate: false,
    });
    watchEffect(() => {
      emit("update:modelValue", unref(inputValue));
    });
    watch(
      () => props.modelValue,
      (value) => {
        setValue(value);
      }
    );

    return {
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta,
    };
  },
};
</script>
