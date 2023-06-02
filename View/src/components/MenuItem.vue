<script setup lang="ts">
interface IProps {
  title: string;
  description: string;
  price: number;
  visible: boolean;
}

const props = defineProps<IProps>();
</script>

<template>
  <div class="flex flex-row border-b border-b-black py-2 pr-2 h-20">
    <img
      class="w-4 h-4 my-auto mx-2"
      src="../assets/drag_to_reorder.svg"
      alt="drag to reorder"
    />
    <div id="info-col" class="flex flex-col justify-center w-full">
      <div class="flex flex-row justify-between">
        <h4>{{ props.title }}</h4>
        <p>{{ props.price }}</p>
      </div>
      <div class="flex flex-row">
        <p class="text-zinc-500 truncate">{{ props.description }}</p>
      </div>
    </div>

    <div id="btn-col" class="flex flex-col justify-around items-center mw-6">
      <img
        v-if="props.visible"
        class="mx-2 cursor-pointer w-4 h-4"
        src="../assets/show_eye.svg"
        alt="item visible eye icon"
      />
      <img
        v-else-if="!props.visible"
        class="mx-2 cursor-pointer w-4 h-4"
        src="../assets/hidden_eye.svg"
        alt="item hidden eye icon"
      />
      <img
        class="mx-2 cursor-pointer w-4 h-4"
        src="../assets/extend_arrow.svg"
        alt="extend item arrow"
      />
    </div>
  </div>
</template>
