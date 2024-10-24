<template>
    <aside class="flex flex-col items-center justify-center text-center">
     
        <IconifyIcon icon="mdi-light:logout" class="w-20 h-20 text-primary" />
        <h2 class="text-gray2 mt-4 md:mt-10 mb-2">{{ headerText }}</h2>
        <p class="text-gray1 text-sm">{{ message }}</p>
        <div class="flex flex-row w-full gap-3 mt-6">
            <button type="button" @click="handleBtnTrigger"
                class="bg-[#F2F2F5] font-[400] rounded-full inline-block py-3 px-3 text-gray2 w-full text-black">Cancel</button>
            <button type="button" @click="handleLogOut"
                class="bg-primary font-[400] rounded-full inline-block py-3 px-3 text-white w-full ">{{
                    btnText }}</button>
        </div>

    </aside>
</template>

<script setup lang="ts">
const router = useRouter();
const props = defineProps({
    message: {
        type: String,
        default: "Account Deleted"
    },
    headerText: {
        type: String,
        default: "Deleted!"
    },
    link: {
        type: String,
        default: "/"
    },
    btnText: {
        type: String,
        default: "Logout"
    },
    animationLink: {
        type: String,
        default: "https://lottie.host/cb5f8e4c-fe41-4f9d-a261-16f8cc4704e2/73TX1lbKkY.json"
    }
});

let emit = defineEmits(['close', "btnTrigger"]);
function handleBtnTrigger() {
    emit('btnTrigger');
    emit('close');
}

function handleLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    localStorage.removeItem('dynamicAcct');
    location.href = '/auth/login'
    emit('btnTrigger');
    emit('close');
}


</script>

<style scoped></style>