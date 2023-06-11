<script setup lang="ts">
import { ref } from "vue";

interface IProps {
  id: string;
  title: string;
  description?: string;
  price: number;
  visible: boolean;
}

const props = defineProps<IProps>();

const extended = ref(false);
</script>

<template>
  <div
    class="flex flex-row border-b border-b-black py-2 w-full"
    :class="extended ? 'h-28' : 'h-20'"
  >
    <img
      class="w-4 h-4 my-auto mx-2"
      src="../assets/drag_to_reorder.svg"
      alt="drag to reorder"
    />
    <div
      id="info-col"
      :class="extended ? '' : 'truncate'"
      class="flex flex-col justify-center w-full mx-2"
    >
      <div class="flex flex-row justify-between">
        <h4>{{ props.title }}</h4>
        <p>{{ props.price }}</p>
      </div>
      <div class="flex flex-row">
        <p :class="extended ? '' : 'truncate'" class="text-zinc-500 text-xs">
          {{ props.description }}
        </p>
      </div>
      <div
        class="flex-row items-center justify-center"
        :class="extended ? 'flex' : 'hidden'"
      >
        <img src="../assets/garbage.svg" alt="Delete menu item icon" />
      </div>
    </div>

    <div
      id="btn-col"
      class="flex flex-col justify-around items-center w-6 mx-2"
    >
      <img
        v-if="props.visible"
        class="cursor-pointer w-4 h-4"
        src="../assets/show_eye.svg"
        alt="item visible eye icon"
      />
      <img
        v-else-if="!props.visible"
        class="cursor-pointer w-4 h-4"
        src="../assets/hidden_eye.svg"
        alt="item hidden eye icon"
      />
      <img
        @click="extended = !extended"
        :class="extended ? 'rotate-180' : 'rotate-0'"
        class="cursor-pointer w-4 h-4"
        src="../assets/extend_arrow.svg"
        alt="extend item arrow"
      />
    </div>
  </div>
</template>
