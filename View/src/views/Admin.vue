<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
import { ref } from "vue";

const authStore = useAuthStore();
const selectedMenu = ref("Analytics");
const menuItems = ["Analytics", "Menus"];
const analyticsTimePeriods = [
  "Last 24 hours",
  "Last 7 days",
  "Last 30 days",
  "Last 3 months",
];
const tempMenus = ["Menu 1", "Menu 2", "Menu 3"];
</script>

<template>
  <div class="grid w-screen h-screen bg-slate-50 overflow-hidden">
    <div
      class="border border-red-600 w-screen flex flex-col items-center justify-between p-5"
    >
      <div id="top-section" class="flex flex-col items-center w-full">
        <div id="logo">Logo</div>
        <div
          class="flex flex-row border-b border-zinc-900 w-full justify-center"
        >
          <div
            class="p-2 cursor-pointer font-roboto"
            v-for="item in menuItems"
            :class="[item === selectedMenu && 'underline']"
            @click="() => (selectedMenu = item)"
          >
            {{ item }}
          </div>
        </div>
        <div v-if="selectedMenu === menuItems[0]">
          <div class="flex flex-col gap-3 p-5">
            <div
              class="p-3 font-roboto border rounded border-zinc-900 w-60"
              v-for="item in analyticsTimePeriods"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <div v-else-if="selectedMenu === menuItems[1]">
          <div class="flex flex-col gap-3 p-5">
            <div
              class="p-3 font-roboto border rounded border-zinc-900 w-60"
              v-for="item in tempMenus"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <div
        id="bottom-section"
        class="flex flex-row border-t border-zinc-900 w-full justify-center p-5 font-roboto"
      >
        {{ authStore.user?.email }}
      </div>
    </div>
  </div>
</template>
