<script setup lang="ts">
import MenuItem from "./MenuItem.vue";

interface IProps {
  menus: any[];
  analyticsTimePeriods: string[];
  selectedNavMenu: string;
  selectedPanel: string;
}

const props = defineProps<IProps>();
</script>

<template>
  <div class="text-base p-10 flex flex-col w-full h-full absolute lg:relative">
    <div class="h-full" v-if="analyticsTimePeriods.includes(selectedPanel)">
      <h1 class="text-2xl font-bold">Analytics</h1>
      {{ selectedPanel }}
      <div class="flex items-center justify-center w-full h-3/6">
        Coming soon...
      </div>
    </div>

    <div
      class="overflow-y-scroll hide-scrollbar"
      v-else-if="props.menus.map((menu) => menu.id).includes(selectedPanel)"
    >
      <h1
        id="panel-name"
        class="flex items-center justify-center text-2xl font-bold"
      >
        Menu
      </h1>
      <div id="menu-title-header" class="flex">
        <h2 id="selected-panel-name" class="w-full text-xl text-gray-500 my-3">
          {{ props.menus.find((menu) => menu.id === selectedPanel)?.title }}
        </h2>
        <img
          class="mx-2 cursor-pointer"
          src="../assets/edit_pencil.svg"
          alt="category header edit button"
        />
        <img
          class="mx-2 cursor-pointer"
          src="../assets/garbage.svg"
          alt="category header delete button"
        />
      </div>
      <div
        v-for="category in props.menus.find((menu) => menu.id === selectedPanel)
          .categories"
      >
        <div
          :id="category.id"
          class="flex flex-row border rounded border-gray-700 bg-zinc-300"
        >
          <h3 class="flex justify-center items-center w-full">
            {{ category.title }}
          </h3>
          <img
            class="mx-2 cursor-pointer"
            src="../assets/edit_pencil.svg"
            alt="category header edit button"
          />
          <img
            class="mx-2 cursor-pointer"
            src="../assets/garbage.svg"
            alt="category header delete button"
          />
        </div>
        <MenuItem
          v-for="item in category.items"
          :id="item.id"
          :title="item.title"
          :description="item.description"
          :price="item.price"
          :visible="item.visible"
        ></MenuItem>
      </div>
    </div>
  </div>
</template>
