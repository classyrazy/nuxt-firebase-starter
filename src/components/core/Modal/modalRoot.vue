<template>
    <div>
        <teleport to="body">
            <Modal @close="handleCloseModal" v-for="(item, idx) in compRef" :key="idx" :config="modalOptions[idx]"
                :modal-key-index="idx">
                <template v-if="modalOptions[idx].title" #header>
                    <h3 class="text-dark font-semibold text-2xl">{{ modalOptions[idx].title }}</h3>
                    <button type="button" class="cursor-pointer w-10 h-10 flex justify-center items-center border-[#E0E0E0] border rounded-full" @click="handleCloseModal">
                        <IconsCancel class="text-dark"/>
                    </button>
                </template>
                <component :is="item" :data="modalOptions" @close="closeModal" v-bind="modalProps" @close-all="closeAllModal"></component>
            </Modal>
        </teleport>
    </div>
</template>

<script setup lang="ts">
import Modal from './modal.vue'
import { closeModal, closeAllModal, compRef, modalTitle, modalOptions, modalProps } from '@/composables/core/useModal';

const handleCloseModal = (evt: any) => {
    closeModal(evt);
}
const route = useRoute();
watch(() => route.path, () => {
    closeAllModal("");
})
onMounted(() => {
    console.log('modalRoot mounted')
})
</script>

<style scoped></style>