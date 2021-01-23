<template>
  <v-app>
    <v-app-bar
      app
      dark
    >
      <router-link :to="{name: 'mygames'}">Mis juegos</router-link>
      <router-link :to="{name: 'addgame'}">Agregar juego</router-link>
      <router-link v-if="!isLoggedIn" :to="{name: 'userprofile', params: { id: $store.getters.currentUser._id }}">Agregar juego</router-link>
      <router-link :to="{name: 'mygroups'}">Mis grupos</router-link>
      <router-link :to="{name: 'newplay'}">Cargar partida</router-link>
    </v-app-bar>

    <v-main>
      <div id="main-container" class="container">
        <router-view></router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import GameSearch from './components/GameSearch'
import ConfirmDialog from './components/ConfirmDialog'
import UserDetails from './components/UserDetails'
import GroupDetails from './components/GroupDetails'
import GroupSearch from './components/GroupSearch'

export default {
  name: 'App',

  components: {
    GroupDetails,
    GameSearch,
    ConfirmDialog,
    GroupSearch,
    UserDetails,
  },
  mounted() {
    let accessToken = window.localStorage.getItem('board_games_access_token');
    if (accessToken) {
      this.$store.commit('setToken', accessToken);
      this.$store.commit('updateHeaders');
    }
  },
  methods: {
    isLoggedIn() {
      return this.$store.getters.currentUser != null;
    }
  },
  data: () => ({
    //
  }),
};
</script>
<style>
#main-container {
  padding-top: 40px;;
}
</style>