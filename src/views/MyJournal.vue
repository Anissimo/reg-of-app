<template>
  <div class="app">
    <SearchComponent class="my-4" />
    <MyDialog class="my-4"></MyDialog>
    <transition-group name="list" tag="div" class="table-with-apps my-4">
      <MyCard v-for="app in paginatedApplications" :key="app.id" :app="app" />
    </transition-group>
    <div class="d-flex mt-8 my-4">
      <v-pagination
        v-model="page"
        :length="Math.ceil(filteredApplications.length / 4)"
        :total-visible="7"
        class="pagination"
      ></v-pagination>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import MyDialog from "@/views/MyDialog.vue";
import MyCard from "@/components/MyCard.vue";
import SearchComponent from "@/components/SearchComponent.vue";
import { useStore } from "vuex";
const store = useStore();
const page = ref(1);

if (localStorage.getItem("applications")) {
  store.state.applications = JSON.parse(localStorage.getItem("applications"));
}

const filteredApplications = computed(() => {
  if (store.state.search) {
    const lowerCaseSearch = store.state.search.toLowerCase();
    return store.state.applications.filter((app) =>
      Object.values(app).some((value) =>
        value.toString().toLowerCase().includes(lowerCaseSearch)
      )
    );
  } else {
    return store.state.applications;
  }
});

const paginatedApplications = computed(() => {
  const start = (page.value - 1) * 4;
  const end = start + 4;
  return filteredApplications.value.slice(start, end);
});
</script>

<style lang="scss">
.table-with-apps {
  padding: 15px 15px;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.card-container {
  max-height: calc(100vh - 50px); /* вычисляемая высота */
  overflow-y: auto;
}

.list-move {
  transition: transform 1.5s;
}
</style>
