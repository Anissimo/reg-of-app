import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { loadFonts } from "./plugins/webfontloader";
import OpenLayersMap from "vue3-openlayers";
import "vue3-openlayers/styles.css"; // vue3-openlayers version < 1.0.0-*

loadFonts();

createApp(App)
  .use(store)
  .use(router)
  .use(vuetify)
  .use(OpenLayersMap)
  .mount("#app");
