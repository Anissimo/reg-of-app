import { createStore } from "vuex";
import dictionary from "@/modules/dictionary";

const store = createStore({
  state: {
    applications: [
      // этот объект здесь для примера, дабы понимать структуру
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
    search: "", // добавляем поле поиска в состояние
    dialog: false,
    editingMode: false,
  },
  getters: {
    getApplicationById: (state) => (id) => {
      return state.applications.find((application) => application.id === id);
    },
  },
  mutations: {
    addApplication(state, application) {
      state.applications.push(application);
    },
    setSearch(state, value) {
      state.search = value;
    },
    setDialog(state, value) {
      state.dialog = value;
    },
    setEditingMode(state, value) {
      state.editingMode = value;
    },
    editApplication(state, application) {
      state.editingApplication = application;
    },
    updateApplication(state, { index, application }) {
      state.applications.splice(index, 1, application);
    },
    clearEditingApplication(state) {
      state.editingApplication = null;
    },
  },
  actions: {},
  modules: { dictionary },
});

export default store;
