<template>
  <div class="app">
    <v-card>
      <v-layout>
        <v-navigation-drawer expand-on-hover rail>
          <v-list>
            <v-list-item
              prepend-avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjhQa4VP5dD6-xO9Ank6auvRE2MHaN3SAUmQ&usqp=CAU"
              title="Grisha Anisimov"
              subtitle="grishaanisimov@gmailcom"
            ></v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list density="compact" nav>
            <RouterLink class="text-decoration-none" to="/statement"
              ><v-list-item
                prepend-icon="mdi-notebook"
                title="Journal"
                value="Journal"
              ></v-list-item
            ></RouterLink>
            <RouterLink class="text-decoration-none" to="/map"
              ><v-list-item
                prepend-icon="mdi-compass"
                title="Map"
                value="Map"
              ></v-list-item
            ></RouterLink>
          </v-list>
        </v-navigation-drawer>
        <v-main class="main"><RouterView /></v-main>
      </v-layout>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from "vue";

const tab = ref(null);
</script>

<style lang="scss" scoped>
.app {
  max-height: 100%;
  overflow-y: auto;
}
.main {
  top: 0;
  left: auto;
  // padding-right: 100px;
  width: 100%;
  height: 100%;
}
</style>
