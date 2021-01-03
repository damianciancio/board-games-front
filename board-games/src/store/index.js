import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import { GamesStore } from './games';
import { PlayersStore } from './players'


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    token: null,
    apiRoot: '/api'
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    logout(state) {
      state.token = "";
      state.currentUser = null;
    },
    updateHeaders(state) {
      axios.defaults.headers.common = {
        "Authorization": "Bearer " + state.token,
        'token': state.token
      };

    }
  },
  actions: {
    ...GamesStore.actions,
    ...PlayersStore.actions,
    login(store, loginData) {
      var request = axios.post(store.state.apiRoot + "/register/login", loginData)

      request.then(resp => 
        {
          if (resp.status == 200) {
            store.commit('setToken', resp.data.token);
            store.commit('setCurrentUser', resp.data.user);
            store.commit('updateHeaders');
          }
        }
      );

      return request;
    },
    register(store, registrationData) {
      var request = axios.post(store.state.apiRoot + "/register", registrationData);
      request.then(resp => 
        {
          if (resp.status == 200) {
            store.commit('setToken', resp.data.token);
            store.commit('setCurrentUser', resp.data.user);
            store.commit('updateHeaders');
          }
        }
      );

      return request;

    },
    logout(store) {
      store.commit('logout');
      store.commit('updateHeaders');
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.token != null;
    },
    gameTypes() {
      return [
        'Eurogame',
        'Ameritrash',
        'Party'
      ]
    },
    currentUser(state) {
      return state.currentUser;
    }
  },
  modules: {
  }
})
