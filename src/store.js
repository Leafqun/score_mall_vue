import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    windowSize: {
      x: document.documentElement.clientWidth,
      y: document.documentElement.clientHeight
    },
    scrollTop: 0,
    user: sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : null,
    order: sessionStorage.getItem("order")
      ? JSON.parse(sessionStorage.getItem("order"))
      : {},
    list: sessionStorage.getItem("list")
      ? JSON.parse(sessionStorage.getItem("list"))
      : []
  },
  mutations: {
    setWindowSize(state, windowSize) {
      state.windowSize = windowSize;
    },
    setScrollTop(state, scrollTop) {
      state.scrollTop = scrollTop;
    },
    setUser(state, user) {
      state.user = user;
    },
    setOrder(state, order) {
      state.order = order;
    },
    setList(state, list) {
      state.list = list;
    }
  },
  actions: {
    setWindowSize({ commit }, windowSize) {
      commit("setWindowSize", windowSize);
    },
    setScrollTop({ commit }, scrollTop) {
      commit("setScrollTop", scrollTop);
    },
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    setOrder({ commit }, order) {
      commit("setOrder", order);
    },
    setList({ commit }, list) {
      commit("setList", list);
    }
  }
});
