<template>
  <div class="table-with-apps-app">
    <div>Адрес: {{ app.address }}</div>
    <div style="height: 400px; width: 100%">
      <OLMap
        :locationX="app.location.x"
        :locationY="app.location.y"
        :locations="[app.location]"
        :priorityColor="getPriorityColor(app.typeOfPriorities)"
      />
    </div>
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
</template>

<script setup>
import OLMap from "@/components/OLMap.vue";

const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});
const getPriorityColor = (priority) => {
  const priorityColors = {
    "1 – незамедлительно": "red",
    "2 – высокий": "orange",
    "3 – средний": "yellow",
    "4 – низкий": "green",
  };
  console.log(priorityColors[priority] || "blue");
  return priorityColors[priority] || "blue"; // Возвращает синий цвет, если приоритет не найден в объекте priorityColors
};
</script>

<style scoped>
.table-with-apps-app {
  color: white;
  padding: 15px;
  border: 2px solid white;
  margin-top: 15px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}
</style>
