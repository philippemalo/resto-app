<script setup lang="ts">
interface IProps {
  menus: any[];
  analyticsTimePeriods: string[];
  selectedNavMenu: string;
  selectedPanel: string;
}

const props = defineProps<IProps>();
</script>

<template>
  <div
    class="border border-red-600 flex flex-col w-full h-full absolute lg:relative"
  >
    <div v-if="analyticsTimePeriods.includes(selectedPanel)">
      {{ selectedPanel }}
    </div>
    <div v-else-if="props.menus.map((menu) => menu.id).includes(selectedPanel)">
      {{ props.menus.find((menu) => menu.id === selectedPanel)?.title }}
    </div>
  </div>
</template>
