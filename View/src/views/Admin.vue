<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
import { reactive } from "vue";
import { getMenus, createMenu } from "../services/api";

const authStore = useAuthStore();
const menuItems = ["Analytics", "Menus"];
const analyticsTimePeriods = [
  "Last 24 hours",
  "Last 7 days",
  "Last 30 days",
  "Last 3 months",
];

const state = reactive({
  hideNav: false,
  selectedMenu: menuItems[0],
  selectedPanel: analyticsTimePeriods[0],
  showCreateMenuForm: false,
  newMenuTitle: "",
  menus: [] as any,
});

const triggerNavHide = () => {
  let windowWidth = window.innerWidth;
  if (windowWidth < 1024) {
    state.hideNav = true;
  }
};

const handleCreateMenu = async () => {
  state.showCreateMenuForm = false;
  await createMenu(state.newMenuTitle).then((res) => {
    state.menus.push(res.data);
  });
};

const editNewMenuTitle = (e: any) => {
  state.newMenuTitle = e.target.value;
};

const loadMenusInState = async () => {
  const response = await getMenus();
  console.log(response);
  state.menus = response.data;
};
loadMenusInState();
</script>

<template>
  <div
    id="admin-container"
    class="grid w-screen h-screen bg-slate-50 overflow-hidden font-roboto"
  >
    <div
      class="absolute m-2 p-1 border border-neutral-900 rounded-full top-0 left-0 cursor-pointer lg:hidden z-50"
      @click="() => (state.hideNav = !state.hideNav)"
    >
      {{ "< >" }}
    </div>
    <div
      id="admin-nav"
      class="bg-babarBeige drop-shadow-xl w-screen lg:w-80 xl:w-96 flex flex-col items-center justify-between p-5 transition-all"
      :class="[state.hideNav === true && 'translate-x-[-100%]']"
    >
      <div id="nav-top-section" class="flex flex-col items-center w-full">
        <img
          class="w-64 mb-5"
          src="../assets/Babar-Admin-Logo.svg"
          alt="Babar Admin Logo"
        />
        <div
          id="top-section-nav-buttons"
          class="flex flex-row gap-5 border-b border-neutral-900 w-full justify-center"
        >
          <div
            class="p-2 cursor-pointer font-roboto"
            v-for="item in menuItems"
            :class="[item === state.selectedMenu && 'underline']"
            @click="() => (state.selectedMenu = item)"
          >
            {{ item }}
          </div>
        </div>
        <div v-if="state.selectedMenu === menuItems[0]">
          <div class="flex flex-col gap-3 p-5">
            <div
              class="bg-babarBeigeDark p-3 border rounded border-neutral-900 w-60 cursor-pointer"
              v-for="item in analyticsTimePeriods"
              :class="[item === state.selectedPanel && 'bg-babarYellow']"
              @click="
                () => {
                  triggerNavHide();
                  state.selectedPanel = item;
                }
              "
            >
              {{ item }}
            </div>
          </div>
        </div>
        <div v-else-if="state.selectedMenu === menuItems[1]">
          <div class="flex flex-col gap-3 p-5">
            <div
              class="bg-babarBeigeDark p-3 border rounded border-neutral-900 w-60 cursor-pointer"
              :class="[item.title === state.selectedPanel && 'bg-babarYellow']"
              v-for="item in state.menus"
              @click="
                () => {
                  triggerNavHide();
                  state.selectedPanel = item.title;
                }
              "
            >
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
      <div id="bottom-section" class="flex flex-col items-center w-full">
        <div
          v-if="state.showCreateMenuForm"
          class="flex flex-col p-3 border rounded border-neutral-900 bg-white w-60"
        >
          <div class="text-neutral-500">Title</div>
          <div class="flex flex-row">
            <input
              class="outline-none w-full border-b border-neutral-500"
              type="text"
              id="title"
              name="title"
              @change="editNewMenuTitle"
            />
            <button @click="handleCreateMenu" class="p-2">+</button>
          </div>
        </div>
        <button
          v-if="state.selectedMenu === menuItems[1]"
          @click="() => (state.showCreateMenuForm = !state.showCreateMenuForm)"
          class="m-5 p-3 rounded bg-neutral-900 text-white w-60 cursor-pointer"
        >
          Create a menu
        </button>
        <div
          class="flex flex-row border-t border-neutral-900 w-full justify-center p-5"
        >
          {{ authStore.user?.email }}
        </div>
      </div>
    </div>
  </div>
</template>
