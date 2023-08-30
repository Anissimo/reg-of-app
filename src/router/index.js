import { createRouter, createWebHashHistory } from "vue-router";
import MyJournal from "@/views/MyJournal.vue";
import MyMap from "@/views/MyMap.vue";
import MyDialog from "@/views/MyDialog.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/statement",
      name: "journal",
      component: MyJournal,
      children: [
          {
            path: "add",
            name: "dialog",
            component: MyDialog,
          },
        ]
    },
    {
      path: "/map",
      name: "map",
      component: MyMap,
    },
  ],
});
