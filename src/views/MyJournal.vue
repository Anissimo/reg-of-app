<template>
  <div class="app">
    <div class="table-with-apps">
      <div
        v-for="app in paginatedApplications"
        :key="app.id"
        class="table-with-apps-app"
      >
        <div>Адрес: {{ app.address }}</div>
        <!-- <OLMap
          :locationX="app.location.x"
          :locationY="app.location.y"
          :zoom="12"
          style="height: 33.3vh; width: 80vh"
        /> -->
        <div>
          Тип аварии:
          {{ app.typeOfAccident }}
        </div>
        <div>
          Приоритет:
          {{ app.typeOfPriorities }}
        </div>
        <div>Заявитель: {{ app.applicant }}</div>
        <div>Телефон: {{ app.phoneNumber }}</div>
      </div>
      <MyDialog class="mt-8"></MyDialog>
      <div class="d-flex justify-start mt-8">
        <v-pagination
          v-model="page"
          :length="$store.state.applications.length"
          :total-visible="7"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import MyDialog from "@/views/MyDialog.vue";
import OLMap from "@/components/OLMap.vue";
import { useStore } from "vuex";
const store = useStore();
const page = ref(1);

if (localStorage.getItem("applications")) {
  store.state.applications = JSON.parse(localStorage.getItem("applications"));
}

const paginatedApplications = computed(() => {
  return [store.state.applications[page.value - 1]];
});
</script>

<style lang="scss">
.table-with-apps {
  padding: 15px 15px;
  min-height: 100vh;
  &-app {
    color: white;
    padding: 15px;
    border: 2px solid white;
    margin-top: 15px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
  }
}
</style>
