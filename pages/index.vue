<template>
  <div>
    <h1>page</h1>
    <div class="box w-4 h-4 bg-red-400"></div>
    <div class="box w-4 h-4 bg-green-400"></div>

    form:
    <Form v-slot="{ errors }">
      <Field name="field" :rules="isRequired" />
      <span class="text-red-500">{{ errors.field }}</span>
    </Form>
  </div>
</template>

<script>
import { gsap } from "gsap";
import { Field, Form } from "vee-validate";
export default defineComponent({
  components: {
    Field,
    Form,
  },
  methods: {
    // Validator function
    isRequired(value) {
      return value ? true : "This field is required";
    },
  },
  setup() {
    onMounted(() => {
      gsap.to(".box", { rotation: 27, x: 100, duration: 1 });
    });
  },
});
</script>
