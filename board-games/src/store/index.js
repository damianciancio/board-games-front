import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import { GamesStore } from './games';
import { PlayersStore } from './players';
import { GroupsStore } from './groups';
import { PlaysStore } from './plays';

Vue.use(Vuex);

const updateHeaders = (token) => { axios.defaults.headers.common = {
  "Authorization": "Bearer " + token,
  'token': token
};}

let user;
const tokenData = localStorage.getItem('juegosmesa-jwt');
if (tokenData) {
  let payload = tokenData.split(".")[1];
  payload = window.atob(payload);
  user = JSON.parse(payload);
  if (!(user.exp > (Date.now() / 1000))) {
    console.log(1);
    user = null;
  } else {
    updateHeaders(tokenData);
  }
} 

const initialState = user
? { status: { loggedIn: true }, user }
: { status: { loggedIn: false }, user: null };

console.log(initialState);
export default new Vuex.Store({
  state: {
    ...initialState,
    token: null,
    apiRoot: '/api'
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("juegosmesa-jwt", token);
    },
    setCurrentUser(state, user) {
    },
    logout(state) {
      state.token = "";
      window.localStorage.removeItem("juegosmesa-jwt");
      state.status.loggedIn = false;
      state.user = null;
    },
    updateHeaders(state) {
      updateHeaders(state.token);
    },
    loggedIn(state, {token, user}) {
      state.user = user;
      window.localStorage.setItem('juegosmesa-jwt', token);
      state.token = token;
      console.log("state.status.loggedIn = true")
      state.status.loggedIn = true;
      updateHeaders(token);
    }
  },
  actions: {
    ...GamesStore.actions,
    ...PlayersStore.actions,
    ...GroupsStore.actions,
    ...PlaysStore.actions,
    login(store, loginData) {
      var request = axios.post(store.state.apiRoot + "/register/login", loginData)

      request.then(resp => 
        {
          if (resp.status == 200) {
            console.log('loggedin')
            store.commit('loggedIn', {token: resp.data.token, user: resp.data.user});
          }
        }
      );

      return request;
    },
    loadCurrentUser(store) {
      var request = axios.get(store.state.apiRoot + '/players/current-user');
      request.then(resp => {
        if (resp.status == 200) {
          store.commit('setCurrentUser', resp.data.user)
        }
      });
      return request;
    },
    register(store, registrationData) {
      var request = axios.post(store.state.apiRoot + "/register", registrationData);
      request.then(resp => 
        {
          if (resp.status == 200) {
            store.commit('loggedIn', {token: resp.data.token, user: resp.data.user});
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
      return state.status.loggedIn;
    },
    gameTypes() {
      return [
        'Eurogame',
        'Ameritrash',
        'Party'
      ]
    },
    currentUser(state) {
      return state.user;
    },
    loggedCurrentUser(state) {
      let token = state.token;
      let payload;
      if (token) {
        payload = token.split(".")[1];
        payload = window.atob(payload);
        let user = JSON.parse(payload);
        if (user.exp > Date.now() / 1000) {
           return user;
        }
      } 
      
      return null;
    }
  },
  modules: {
  }
})
