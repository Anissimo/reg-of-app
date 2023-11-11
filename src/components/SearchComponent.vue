<template>
  <v-text-field
    v-model="search"
    append-icon="mdi-magnify"
    label="Поиск"
    single-line
    hide-details
    @input="updateSearch"
    class="search-input"
  ></v-text-field>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const search = ref(store.state.search);

const updateSearch = () => {
  store.commit("setSearch", search.value);
};
</script>

<style scoped>
.search-input {
  width: 400px;
  border-radius: 15px;
  padding: 15px;
}
</style>
