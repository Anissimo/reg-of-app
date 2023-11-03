<template>
  <div class="app">
    <div class="table-with-apps">
      <MyCard v-for="app in paginatedApplications" :key="app.id" :app="app" />
      <MyDialog class="mt-8"></MyDialog>
      <div class="d-flex justify-center mt-8">
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
import MyCard from "@/components/MyCard.vue";
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
}
</style>
