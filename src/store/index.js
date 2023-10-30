import { createStore } from "vuex";
import dictionary from "@/modules/dictionary";

const store = createStore({
  state: {
    // 39.76087898627143, 47.23134789834382
    applications: [
      {
        id: 0,
        address: "ул. Авроры, 211А, Самара, Самарская обл., 443080",
        location: { x: 40, y: 48 }, // location.x
        typeOfAccident: dictionary.typeOfAccident.rush,
        typeOfPriorities: dictionary.typeOfPriorities.immediate,
        applicant: "Анисимов Григорий Васильевич",
        phoneNumber: "89277369542",
      },
    ],
  },
  getters: {},
  mutations: {
    addApplication(state, application) {
      state.applications.push(application);
    },
  },
  actions: {},
  modules: { dictionary },
});

export default store;
