<template>
  <div
    class="relative overflow-hidden w-full shadow-xl rounded-md box py-4 px-3 max-w-[350px] min-h-20"
    :class="[`border-${COLOR}`, enforceLight ? 'bg-white' : 'bg-alert-bg']"
  >
    <div
      :style="`width:${BORDER_WIDTH}%; background-color:${COLOR}`"
      :class="[
        ` h-1 absolute bottom-0 left-0 transite transition-all !duration-[80ms]`,
      ]"
      class=""
    />
    <span @click="$emit('closeAlert', id)" class="">
      <IconsClose
        class=" w-5 h-5 absolute right-2 top-2 cursor-pointer rounded-md my-auto"  :class="[enforceLight ? 'text-black' : 'text-dark']"
      />
    </span>

    <div class="flex items-center pr-12 gap-2">
      <IconsSuccess :class="[`${TEXT} w-5 h-5`]" v-if="type === 'SUCCESS'" />
      <IconsError :class="[`${TEXT} w-5 shrink-0`]" v-if="type === 'ERROR'" />
      <IconsWarning :class="[`${TEXT} w-5`]" v-if="type === 'Alert'" />
      <div>
        <h2 class="font-[600]" :class="[enforceLight ? 'text-black' : 'text-dark']" v-if="title">{{ title }}</h2>
        <p class="font-[400]" :class="[enforceLight ? 'text-black' : 'text-dark']">
          {{ message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const emit = defineEmits(["closeAlert"]);

const props = defineProps({
  id: {
    type: String,
    required: true,
    default: "",
  },
  message: {
    type: String,
    required: true,
    default: "",
  },
  title: {
    type: String,
    required: true,
    default: "",
  },
  addrs: {
    type: String,
    required: false,
    default: "",
  },
  type: {
    type: String,
    required: true,
    default: "Alert",
  },
  duration: {
    type: Number,
    required: false,
    default: 5000,
  },
  enforceLight: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const BORDER_WIDTH = ref(100);

const TEXT = computed({
  get: () => {
    switch (props.type) {
      case "ERROR":
        return "text-red-500";
      case "SUCCESS":
        return "text-green-700";
      default:
        return "text-black";
    }
  },
  set: () => {},
});
onMounted(() => {
  BORDER_WIDTH.value = 100;
  const intervalSequence = setInterval(() => {
    const substractedValue = Number((100 / (props.duration / 100)).toFixed(1));
    BORDER_WIDTH.value -= substractedValue;
  }, 10000);

  setTimeout(() => {
    clearInterval(intervalSequence);
    emit("closeAlert", props.id);
  }, props.duration);
});

const ICON = computed({
  get: () => {
    switch (props.type) {
      case "ERROR":
        return "error";
      case "SUCCESS":
        return "check";
      default:
        return "info";
    }
  },
  set: () => {},
});

const COLOR = computed({
  get: () => {
    switch (props.type) {
      case "ERROR":
        return "red";
      case "SUCCESS":
        return "#28C794";
      default:
        return "";
    }
  },
  set: () => {},
});
</script>

<style scoped>

/* enter transitions */
.toast-enter-active {
  animation: wobble 0.5s ease;
}
	
.toast-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

.toast-leave-active {
  transition: all 0.3s ease;
}

@keyframes wobble {
  0% {
    transform: translateX(100px);
    opacity: 0;
  }

  50% {
    transform: translateY(0px);
    opacity: 1;
  }

  60% {
    transform: translateX(14px);
    opacity: 1;
  }

  70% {
    transform: translateX(-14px);
    opacity: 1;
  }

  80% {
    transform: translateX(7px);
    opacity: 1;
  }

  90% {
    transform: translateX(-7px);
    opacity: 1;
  }

  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}

.box {
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
}
.test{
  color: #1C1B20;
}
</style>
