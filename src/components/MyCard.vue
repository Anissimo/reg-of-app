<template>
  <div class="table-with-apps-app" @click="openForm(app)">
    <div>Адрес: {{ app.address }}</div>
    <div>
      Тип аварии:
      {{ app.typeOfAccident }}
    </div>
    <div>
      Приоритет:
      {{ app.typeOfPriorities }}
    </div>
    <div>Заявитель: {{ app.applicant }}</div>
    <div class="last">Телефон: {{ app.phoneNumber }}</div>
    <div style="height: 200px; width: 100%">
      <!-- 39.723284, 47.23135 -->
      <OLMap
        :locationX="app.location.x"
        :locationY="app.location.y"
        :locations="[
          {
            x: app.location.x,
            y: app.location.y,
            priority: app.typeOfPriorities,
          },
        ]"
      />
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import OLMap from "@/components/OLMap.vue";

const store = useStore();
const router = useRouter();

const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});

const openForm = (app) => {
  store.commit("editApplication", app); // Обновляем состояние заявки
  store.commit("setEditingMode", true); // Устанавливаем editingMode в true
  store.commit("setDialog", true);
  router.push({ path: "/statement/add" });
};
</script>

<style scoped>
.table-with-apps-app {
  width: calc(50% - 10px);
  height: calc(25% - 10px);
  color: white;
  padding: 15px;
  border: 2px solid white;
  margin-top: 15px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}
.last {
  margin-bottom: 15px;
}
</style>
