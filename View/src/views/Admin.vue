<script setup lang="ts">
import { reactive } from "vue";
import { getMenus } from "../services/api";
import AdminNav from "../components/AdminNav.vue";

interface MenuItem {
  id: string;
  title: string;
}

const state = reactive({
  menus: [] as Array<any>,
});

const loadMenusInState = async () => {
  const response = await getMenus();
  state.menus = response.data;
};

loadMenusInState();

const updateNavMenus = (newMenu: MenuItem) => {
  state.menus.push(newMenu);
};
</script>

<template>
  <div
    id="admin-container"
    class="grid w-screen h-screen bg-slate-50 overflow-hidden font-roboto"
  >
    <AdminNav
      @updateNavMenus="updateNavMenus"
      :menus="state.menus.map((menu) => ({ id: menu.id, title: menu.title }))"
    />
  </div>
</template>
