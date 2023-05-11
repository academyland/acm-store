<template>
  <input
    v-model="checkboxModel"
    type="checkbox"
    class="modal-toggle"
  >
  <div
    class="modal"
    @click="closeModal"
  >
    <div
      v-if="eager||modelValue"
      class="modal-box relative overflow-hidden"
      @click.stop=""
    >
      <section class="flex items-center justify-between">
        <slot name="title">
          <span class="font-medium">{{ title }}</span>
        </slot>
        <span
          class="cursor-pointer text-xl select-none text-gray-500"
          @click="closeModal"
        >&#x2715</span>
      </section>
      <div class="overflow-y-auto max-h-[85vh] lg:max-h-[80vh] scrollbar-thin">
       <slot />
      </div>
      <div
        v-if="$slots.actions"
        class="modal-action"
      >
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, toRef, watch} from "vue";

export default defineComponent({
  name: "AppModal",
  props:{
    modelValue:{
      type:[Boolean,Number],
      default:false
    },
    title:{
      type:String,
      default:''
    },
    eager:{
      type:Boolean,
      default:false
    }
  },
  emits:['update:modelValue'],
  setup(props,{emit}){
    useFixBody(toRef(props, 'modelValue'))
    const checkboxModel=ref(!!props.modelValue)
    watch(()=>props.modelValue,(value)=>{
        checkboxModel.value=!!value
    })
    const closeModal=()=>{
      emit('update:modelValue',false)
    }
    return {checkboxModel,closeModal}
  }
})
</script>

<style scoped>

</style>