<template>
  <v-row justify="start ml-0">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn class="ml-4" color="primary" v-bind="props" @click="openForm">
          Создайте новую заявку!
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="text-h5">Создание заявки</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <form>
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    label="ФИО*"
                    v-model="newApplication.applicant"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                  <v-text-field
                    label="Адрес"
                    v-model="newApplication.address"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                  <div style="height: 400px; width: 100%">
                    <ol-map
                      :loadTilesWhileAnimating="true"
                      :loadTilesWhileInteracting="true"
                      style="height: 400px"
                    >
                      <ol-view
                        ref="view"
                        :center="center"
                        :zoom="zoom"
                        :projection="projection"
                      />

                      <ol-tile-layer>
                        <ol-source-osm />
                      </ol-tile-layer>

                      <ol-vector-layer>
                        <ol-source-vector :projection="projection">
                          <ol-interaction-draw
                            v-if="drawing"
                            type="Point"
                            @drawend="handleDrawEnd"
                          >
                            <ol-style>
                              <ol-style-stroke
                                color="blue"
                                :width="2"
                              ></ol-style-stroke>
                              <ol-style-fill
                                color="rgba(0, 0, 0, 0.4)"
                              ></ol-style-fill>
                            </ol-style>
                          </ol-interaction-draw>
                        </ol-source-vector>

                        <ol-style>
                          <ol-style-stroke
                            color="red"
                            :width="2"
                          ></ol-style-stroke>
                          <ol-style-fill
                            color="rgba(255,255,255,0.1)"
                          ></ol-style-fill>
                          <ol-style-circle :radius="5">
                            <ol-style-fill color="black"></ol-style-fill>
                          </ol-style-circle>
                        </ol-style>
                      </ol-vector-layer>
                    </ol-map>
                  </div>
                </v-col>
                <v-col cols="12" md="12">
                  <v-text-field
                    label="Phone Number"
                    v-model="newApplication.phoneNumber"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    :items="[
                      'порыв',
                      'утечка',
                      'колонка уличная',
                      'некачественная вода',
                      'закупорка',
                      'другое',
                    ]"
                    label="Тип аварии*"
                    required
                    v-model="newApplication.typeOfAccident"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    :items="[
                      '1 – незамедлительно',
                      '2 – высокий',
                      '3 – средний',
                      '4 – низкий',
                    ]"
                    label="Приоритет*"
                    required
                    v-model="newApplication.typeOfPriorities"
                  ></v-select>
                </v-col>
              </v-row>
            </form>
          </v-container>
          <small>*Заполните необходимые строки</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeForm">
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="
              saveApplication();
              dialog = false;
            "
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const dialog = ref(false);
const newApplication = ref({
  id: null,
  address: "",
  phoneNumber: "",
  typeOfAccident: "",
  typeOfPriorities: "",
  applicant: "",
  location: { x: null, y: null },
});

const center = ref([39.723284, 47.23135]);
const projection = ref("EPSG:4326");
const zoom = ref(12);
const drawing = ref(true);

function handleDrawEnd(event) {
  const feature = event.feature;
  const coords = feature.getGeometry().getCoordinates();
  drawing.value = false;
  newApplication.value.location = {
    x: coords[0],
    y: coords[1],
  };
}

const resetForm = () => {
  newApplication.value = {
    id: null,
    address: "",
    phoneNumber: "",
    typeOfAccident: "",
    typeOfPriorities: "",
    applicant: "",
    location: { x: null, y: null },
  };
};

const closeForm = () => {
  dialog.value = false;
  router.push({ path: "/statement" }); // Возвращаемся обратно на страницу журнала
};

const saveApplication = () => {
  if (store.state.editingMode) {
    // Если мы в режиме редактирования, обновляем существующую заявку
    const existingApplicationIndex = store.state.applications.findIndex(
      (app) => app.id === newApplication.value.id
    );
    store.commit("updateApplication", {
      index: existingApplicationIndex,
      application: newApplication.value,
    });
  } else {
    // Если мы в режиме создания, добавляем новую заявку
    newApplication.value.id = store.state.applications.length;
    store.state.applications.push(newApplication.value);
  }

  // Сохраняем данные в localStorage
  localStorage.setItem(
    "applications",
    JSON.stringify(store.state.applications)
  );

  store.commit("clearEditingApplication");
  store.commit("setDialog", false);
  resetForm(); // Очистите форму после сохранения
  router.push({ path: "/statement" });
};

const editApplication = (app) => {
  newApplication.value = { ...app };
  store.commit("setEditingMode", true); // Устанавливаем editingMode в true
  store.commit("setDialog", true);
  router.push({ path: "/statement/add" });
};

const openForm = () => {
  resetForm();
  store.commit("setEditingMode", false); // Устанавливаем editingMode в false
  store.commit("setDialog", true);
  router.push({ path: "/statement/add" });
};

watchEffect(() => {
  dialog.value = store.state.dialog;
  if (store.state.editingApplication) {
    newApplication.value = { ...store.state.editingApplication };
  }
});
</script>

<style scoped></style>
