<script setup lang="ts">
import { ref } from "vue";
import MenuItem from "./MenuItem.vue";
import { updateMenu } from "../services/api";

interface IProps {
  menus: any[];
  analyticsTimePeriods: string[];
  selectedNavMenu: string;
  selectedPanel: string;
}

const props = defineProps<IProps>();

const emit = defineEmits(["updateMenuTitle"]);

const editingMenuTitle = ref(false);
const deletingMenu = ref(false);

const handleMenuTitleEdit = () => {
  const menuTitle = document.getElementById("menu-title") as HTMLInputElement;
  if (!editingMenuTitle.value) {
    console.log("editing menu title");
    editingMenuTitle.value = !editingMenuTitle.value;
    menuTitle.disabled = false;
    menuTitle.focus();
  } else {
    editingMenuTitle.value = !editingMenuTitle.value;
    menuTitle.disabled = true;
  }
};

const editMenuTitle = async () => {
  try {
    const menuTitle = document.getElementById("menu-title") as HTMLInputElement;
    await updateMenu(props.selectedPanel, menuTitle.value).then((res) => {
      if (res.status === 200) {
        emit("updateMenuTitle", props.selectedPanel, menuTitle.value);
        editingMenuTitle.value = false;
      }
    });
  } catch (error) {
    console.log("There was an error while updating menu title", error);
  }
};
</script>

<template>
  <div
    class="text-base p-6 lg:p-10 flex flex-col w-full h-full absolute lg:relative"
  >
    <div class="h-full" v-if="analyticsTimePeriods.includes(selectedPanel)">
      <h1 class="text-2xl font-bold">Analytics</h1>
      {{ selectedPanel }}
      <div class="flex items-center justify-center w-full h-3/6">
        Coming soon...
      </div>
    </div>

    <div
      class="overflow-hidden hide-scrollbar"
      v-else-if="props.menus.map((menu) => menu.id).includes(selectedPanel)"
    >
      <h1
        id="panel-name"
        class="flex items-center justify-center text-2xl font-bold"
      >
        Menu
      </h1>
      <div id="menu-title-header" class="flex">
        <input
          class="h-7 text-xl text-gray-500 my-3 outline-none w-full border rounded border-neutral-500 px-1 focus:border focus:border-babarYellow focus:shadow"
          :class="
            editingMenuTitle ? ['focus'] : ['bg-transparent', 'border-none']
          "
          type="text"
          id="menu-title"
          name="menu-title"
          :disabled="!editingMenuTitle"
          :value="props.menus.find((menu) => menu.id === selectedPanel)?.title"
          @change="editMenuTitle"
        />
        <img
          @click="handleMenuTitleEdit"
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
        class="h-full w-full overflow-y-scroll hide-scrollbar"
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
