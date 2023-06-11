<script setup lang="ts">
import { reactive, ref } from "vue";
import { getMenus } from "../services/api";
import AdminNav from "../components/AdminNav.vue";
import AdminPanel from "../components/AdminPanel.vue";

interface MenuItem {
  id: string;
  title: string;
}

// State
const menuItems = ["Analytics", "Menus"];
const analyticsTimePeriods = [
  "Last 24 hours",
  "Last 7 days",
  "Last 30 days",
  "Last 3 months",
];
let selectedNavMenu = ref(menuItems[0]);
let selectedPanel = ref(analyticsTimePeriods[0]);

const state = reactive({
  menus: [] as Array<any>,
});

// Load menus from API
const loadMenusInState = async () => {
  const response = await getMenus();
  state.menus = response.data;
  console.log(response.data);
};
loadMenusInState();

// Callbacks for AdminNav
const updateSelectedNavMenu = (menu: string) => {
  selectedNavMenu.value = menu;
};
const updateNavMenus = (newMenu: MenuItem) => {
  state.menus.push(newMenu);
};
const updateSelectedPanel = (panel: string) => {
  selectedPanel.value = panel;
};
const updateMenuTitle = (menuId: string, newTitle: string) => {
  const menu = state.menus.find((menu) => menu.id === menuId);
  if (menu) {
    menu.title = newTitle;
  }
};
</script>

<template>
  <div
    id="admin-container"
    class="flex w-screen h-screen bg-slate-50 overflow-hidden font-roboto"
  >
    <AdminNav
      :navItems="menuItems"
      :analyticsItems="analyticsTimePeriods"
      :menus="state.menus.map((menu) => ({ id: menu.id, title: menu.title }))"
      :selectedNavMenu="selectedNavMenu"
      :selectedPanel="selectedPanel"
      @updateNavMenus="updateNavMenus"
      @updateSelectedNavMenu="updateSelectedNavMenu"
      @updateSelectedPanel="updateSelectedPanel"
    />
    <AdminPanel
      :menus="state.menus"
      :analyticsTimePeriods="analyticsTimePeriods"
      :selectedNavMenu="selectedNavMenu"
      :selectedPanel="selectedPanel"
      @updateMenuTitle="updateMenuTitle"
    />
  </div>
</template>
