<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
import { ref } from "vue";
import { createMenu } from "../services/api";

interface MenuItem {
  id: string;
  title: string;
}

interface IProps {
  navItems: string[];
  analyticsItems: string[];
  menus: MenuItem[];
  selectedNavMenu: string;
  selectedPanel: string;
}

const props = defineProps<IProps>();

const authStore = useAuthStore();

let hideNav = ref(false);
let showCreateMenuForm = ref(false);
let newMenuTitle = ref("");

const triggerNavHide = () => {
  let windowWidth = window.innerWidth;
  if (windowWidth < 1024) {
    hideNav.value = true;
  }
};
const emit = defineEmits([
  "updateNavMenus",
  "updateSelectedNavMenu",
  "updateSelectedPanel",
]);

const handleCreateMenu = async () => {
  showCreateMenuForm.value = false;
  await createMenu(newMenuTitle.value)
    .then((res) => {
      emit("updateNavMenus", res.data);
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
};

const editNewMenuTitle = (e: any) => {
  newMenuTitle.value = e.target.value;
};

addEventListener("resize", () => {
  let windowWidth = window.innerWidth;
  if (windowWidth > 1024) {
    hideNav.value = false;
  }
});
</script>

<template>
  <div
    class="absolute m-2 p-1 border border-neutral-900 rounded-full top-0 left-0 cursor-pointer lg:hidden z-50"
    @click="() => (hideNav = !hideNav)"
  >
    {{ "< >" }}
  </div>
  <div
    id="admin-nav"
    class="bg-babarBeige lg:drop-shadow-xl absolute lg:relative z-10 w-screen h-screen lg:w-80 flex flex-col items-center justify-between p-5 transition-all"
    :class="[hideNav === true && 'translate-x-[-100%]']"
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
          v-for="item in props.navItems"
          :class="[item === props.selectedNavMenu && 'underline']"
          @click="() => emit('updateSelectedNavMenu', item)"
        >
          {{ item }}
        </div>
      </div>
      <div v-if="props.selectedNavMenu === props.navItems[0]">
        <div class="flex flex-col gap-3 p-5">
          <div
            class="bg-babarBeigeDark p-3 border rounded border-neutral-900 w-60 cursor-pointer"
            v-for="item in props.analyticsItems"
            :class="[item === selectedPanel && 'bg-babarYellow']"
            @click="
              () => {
                triggerNavHide();
                emit('updateSelectedPanel', item);
              }
            "
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div v-else-if="props.selectedNavMenu === props.navItems[1]">
        <div class="flex flex-col gap-3 p-5">
          <div
            class="bg-babarBeigeDark p-3 border rounded border-neutral-900 w-60 cursor-pointer"
            :class="[item.id === selectedPanel && 'bg-babarYellow']"
            v-for="item in props.menus"
            :key="item.id"
            @click="
              () => {
                triggerNavHide();
                emit('updateSelectedPanel', item.id);
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
        v-if="showCreateMenuForm"
        class="flex flex-col p-3 border rounded border-neutral-900 bg-white w-60"
      >
        <div class="text-neutral-500 mb-1">Title</div>
        <div class="flex flex-row">
          <input
            class="h-7 outline-none w-full border rounded border-neutral-500 px-3 focus:border focus:border-babarYellow focus:shadow"
            type="text"
            id="title"
            name="title"
            @change="editNewMenuTitle"
          />
          <button
            @click="handleCreateMenu"
            class="flex items-center justify-center ml-2 w-7 h-7 bg-neutral-900 font-semibold text-white rounded cursor-pointer"
          >
            +
          </button>
        </div>
      </div>
      <button
        v-if="props.selectedNavMenu === props.navItems[1]"
        @click="() => (showCreateMenuForm = !showCreateMenuForm)"
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
</template>
