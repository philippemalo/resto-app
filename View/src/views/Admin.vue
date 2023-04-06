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
  menus: [],
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
  console.log(`A new menu named ${state.newMenuTitle} has been created!`);
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
      class="absolute m-2 p-1 border border-zinc-900 rounded-full top-0 left-0 cursor-pointer lg:hidden"
      @click="() => (state.hideNav = !state.hideNav)"
    >
      {{ "< >" }}
    </div>
    <div
      id="admin-nav"
      class="border border-red-600 w-screen lg:w-80 xl:w-96 flex flex-col items-center justify-between p-5 transition-all"
      :class="[state.hideNav === true && 'translate-x-[-100%]']"
    >
      <div id="nav-top-section" class="flex flex-col items-center w-full">
        <div id="top-section-logo">Logo</div>
        <div
          id="top-section-nav-buttons"
          class="flex flex-row border-b border-zinc-900 w-full justify-center"
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
            <!-- Styling for selected panel shouldn't be underline. See figma design -->
            <div
              class="p-3 border rounded border-zinc-900 w-60 cursor-pointer"
              v-for="item in analyticsTimePeriods"
              :class="[item === state.selectedPanel && 'underline']"
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
              class="p-3 border rounded border-zinc-900 w-60 cursor-pointer"
              :class="[item.title === state.selectedPanel && 'underline']"
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
          class="flex flex-col p-3 border rounded border-zinc-900 w-60"
        >
          <div>Title</div>
          <div class="flex flex-row">
            <input
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
          class="m-5 p-3 border rounded border-zinc-900 w-60 cursor-pointer"
        >
          Create a menu
        </button>
        <div
          class="flex flex-row border-t border-zinc-900 w-full justify-center p-5"
        >
          {{ authStore.user?.email }}
        </div>
      </div>
    </div>
  </div>
</template>
