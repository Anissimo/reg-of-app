import { createStore } from "vuex";
import dictionary from "@/modules/dictionary";

const store = createStore({
  state: {
    applications: [
      {
        id: 0,
        address: "ул. Авроры, 211А, Самара, Самарская обл., 443080",
        location: { x: 39.723284, y: 47.23135 }, // { "position": [ 39.723284, 47.23135 ] }
        typeOfAccident: dictionary.typeOfAccident.rush,
        typeOfPriorities: dictionary.typeOfPriorities.low,
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
