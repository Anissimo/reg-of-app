<template>
  <div class="app">
    <div class="table-with-apps">
      <div
        v-for="app in $store.state.applications"
        :key="app.id"
        class="table-with-apps-app"
      >
        <div>Адрес: {{ app.address }}</div>
        <!-- <div>Координаты: {{ app.location.x }}, {{ app.location.y }}</div> -->
        <OLMap
          :locationX="app.location.x"
          :locationY="app.location.y"
          :zoom="12"
          style="height: 33.3vh; width: 80vh"
        />
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
      <!-- <router-link :to="{ name: 'dialog' }"><v-btn color="primary"> Сreate a new application </v-btn></router-link> -->
      <!-- <router-view /> -->
      <div class="d-flex justify-center mt-8">
        <v-pagination
          v-model="page"
          :leng="15"
          :total-visible="7"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MyDialog from "@/views/MyDialog.vue";
import OLMap from "@/components/OLMap.vue";

const page = ref(1)
</script>

<style lang="scss">
.table-with-apps {
  // border: 2px solid white;
  padding: 15px 15px;
  &-app {
    color: white;
    padding: 15px;
    border: 2px solid white;
    margin-top: 15px;
    border-radius: 5px;
    display: flex;
    // justify-content: space-between;
    flex-direction: column;
  }
}
</style>
