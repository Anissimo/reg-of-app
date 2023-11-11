<template>
  <OLMap style="height: 100vh" :locations="locations" />
</template>

<script setup>
import OLMap from "@/components/OLMap.vue";
import { computed, watchEffect } from "vue";
import { useStore } from "vuex";

const store = useStore();

// Функция для получения данных из локального хранилища
const getLocalStorageData = () => {
  const localStorageData = localStorage.getItem("applications");
  return localStorageData ? JSON.parse(localStorageData) : [];
};

// Изначально загружаем данные из локального хранилища
store.state.applications = getLocalStorageData();

// Создаем наблюдатель, который будет следить за изменениями в локальном хранилище
watchEffect(() => {
  store.state.applications = getLocalStorageData();
});

const locations = computed(() =>
  store.state.applications.map((app) => ({
    x: app.location.x,
    y: app.location.y,
    priority: app.typeOfPriorities,
  }))
);
</script>

<style></style>
