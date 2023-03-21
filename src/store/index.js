import Vue from 'vue';
import Vuex from 'vuex';
import mock from '../mock/posts.json';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    posts: mock.posts,
    popupName: '',
    popupContent: {},
  },
  mutations: {
    addPost(state, payload) {
      state.posts = [payload, ...state.posts];
    },
    setPosts(state, payload) {
      state.posts = payload;
    },
    setPopupName(state, payload) {
      state.popupName = payload;
    },
    setPopupContent(state, payload) {
      state.popupContent = payload;
    },
  },
});

export { store };
