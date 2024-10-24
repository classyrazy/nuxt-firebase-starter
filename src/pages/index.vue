<template>
    <div>
        <IconifyIcon icon="mdi-light:logout" class="w-20 h-20 text-primary" />
        <button type="button" @click="logout">
            logout
        </button>
    </div>
</template>

<script setup lang="ts">
import { logout } from '../composables/auth/user';
</script>

<style scoped>

</style>\