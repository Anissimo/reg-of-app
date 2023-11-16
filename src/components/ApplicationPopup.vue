<template>
  <div v-if="application">
    <h2>{{ application.address }}</h2>
    <p>Тип инцидента: {{ application.typeOfAccident }}</p>
    <p>Приоритет: {{ application.typeOfPriorities }}</p>
    <p>Заявитель: {{ application.applicant }}</p>
    <p>Номер телефона: {{ application.phoneNumber }}</p>
  </div>
</template>

<script setup>
// const props = defineProps({
//   application: {
//     type: Object,
//     required: true,
//   },
// }); //NUV
</script>

<style scoped></style>
