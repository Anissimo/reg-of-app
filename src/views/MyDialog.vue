<template>
  <v-row justify="start ml-0">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> Создайте новую заявку! </v-btn>
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
                    v-bind:value="title"
                    @input="title = $event.target.value"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                  <v-text-field label="Адрес"></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                  <v-text-field label="Phone Number"></v-text-field>
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
                  ></v-select>
                </v-col>
              </v-row>
            </form>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="
              createPost();
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
import { ref } from "vue";

const dialog = ref(false);

function createPost() {
  console.log(1);
}
</script>
