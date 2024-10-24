<template>
  <div class="fixed  w-full h-full  z-[9999]" v-if="config?.open" :class="classesBasedOnType.mainModalWrapperClass">
    <div class="absolute top-0 left-0 w-full h-full bg-[#00000033] inset-0 cursor-pointer"
      @click="handleCloseFromOutside" :class="config?.blur ? 'blur-bg' : ''"></div>
      <div
        :class="[classesBasedOnType.mainModalClass, config?.background ? `bg-${config?.background}` : 'bg-main-white', anim_class]"
        v-if="refedModalOpen"
        :style="{ width: computedWidth, borderRadius: `${config?.type !== 'side' ? config?.corner ?? '0.75rem' : '0'}` }">
        <div class="md:p-0">
          <div class="flex justify-between items-center mb-">
            <slot name="header" />
          </div>
          <div class="">
            <slot />
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
import { modalOpen } from '~~/composables/core/useModal';
import type { modalOptionsType } from '~~/composables/core/useModal';
let emit = defineEmits(['close']);
let props = defineProps({
  config: Object as PropType<modalOptionsType>,
  modalKeyIndex: Number
})
const closeDialog = () => {
  emit('close');
};
const handleCloseFromOutside = () => {
  if (props.config?.closeable) {
    closeDialog();
  }
}
const computedWidth = computed(() => {
  if (props.config?.type == 'side') {
    return '100%';
  }
  if (props.config?.width) {
    return `${props.config?.width}px`;
  } else {
    return '480px';
  }
});

let modal_class = ref({
  modal: { cls: "is-modal", anim_in: "zoomIn", anim_out: "zoomOut", style: `padding: ${props.config?.padding}px;` },
  panel: { cls: "is-panel", anim_in: "slideInUp", anim_out: "slideOutDown", style: 'padding: 0' },
  side: { cls: "is-side", anim_in: "slideInRight", anim_out: "slideOutRight", style: 'padding: 0' }
}) as Ref<{ [key: string]: any }>;
let anim_class = computed(() => props.config?.anim
  ? modal_class.value[props.config?.type || 'modal'].anim_in
  : modal_class.value[props.config?.type || 'modal'].anim_out)
const classesBasedOnType = computed(() => {
  let tempWrapperClass = 'flex justify-center items-center top-0 left-0';
  let tempModalClass = 'p-4 shadow-md z-[99]  max-w-[50rem] w-full  pointer-events-auto  overflow-y-auto !my-20';

  if (props.config?.type == 'modal') {
    tempWrapperClass = 'flex justify-center items-center top-0 left-0';
    tempModalClass = 'p-4 shadow-md z-[99]  max-w-[50rem] w-full  pointer-events-auto  overflow-y-auto !my-20';
  } else if (props.config?.type == 'side') {
    tempWrapperClass = 'flex justify-end items-end top-0 right-0';
    tempModalClass = 'p-4 shadow-md z-[99] md:max-w-[25rem] lg:max-w-[30rem] w-full  pointer-events-auto  overflow-y-auto h-full';
  }
  return {
    mainModalWrapperClass: tempWrapperClass,
    mainModalClass: tempModalClass
  };
});
const refedModalOpen = ref(false)
onMounted(() => {
  setTimeout(() => {
    refedModalOpen.value = true;
  }, 100);
});
</script>
<style scss>
@import url('./modal.css');

.blur-bg {
  backdrop-filter: blur(2.5px);
}
</style>