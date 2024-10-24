
<template>
	<transition-group
		appear
		tag="aside"
		class="fixed bottom-4 right-4 z-[900000000000000] w-auto flex flex-col-reverse gap-4 !transition-all !duration-300"
		name="list"
	>
		<AlertCard v-for="(alert, index) in openAlertArray" :id="alert.id" :key="alert.id" :data-index="index+1" :message="alert.msg" :addrs="alert.addrs" :type="alert.type" @closeAlert="closeAlert($event)" :title="alert.title" :enforce-light="alert.light" />
	</transition-group>
</template>

<script setup lang="ts">
import AlertCard from './AlertCard.vue'
import { useAlert, openAlertArray } from '~~/composables/core/useToast'
const { closeAlert } = useAlert()


</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}


</style>
