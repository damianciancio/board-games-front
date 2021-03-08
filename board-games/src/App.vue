<template>
  <v-app>
    <v-app-bar
      app
      dark
    >
      <div class="container">
        <div id="links-container" class="d-flex">
          <template v-if="isLoggedIn">
            <router-link :to="{name: 'mygames'}">Mis juegos</router-link>
            <router-link :to="{name: 'addgame'}">Agregar juego</router-link>
            <router-link :to="{name: 'userprofile', params: { id: $store.getters.currentUser._id }}">Mi cuenta</router-link>
            <router-link :to="{name: 'mygroups'}">Mis grupos</router-link>
            <router-link :to="{name: 'newplay'}">Cargar partida</router-link>
            <a id="logout-link" v-on:click="logout()"> Cerrar sesión </a>
          </template>
          <template v-else>
                <router-link :to="{name: 'login'}">Iniciar sesión</router-link>
                <router-link :to="{name: 'register'}">Registrarse</router-link>
          </template>
        </div>
      </div>
    </v-app-bar>

    <v-main>
      <notifications group="boardgamesnotifications" />
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
import PlayerSearch from './components/PlayerSearch'
import PlayDetails from './components/PlayDetails'

export default {
  name: 'App',

  components: {
    GroupDetails,
    GameSearch,
    ConfirmDialog,
    GroupSearch,
    PlayerSearch,
    UserDetails,
    PlayDetails
  },
  mounted() {
    console.log(this.isLoggedIn)
    if (this.isLoggedIn) {
      let req = this.$store.dispatch('loadCurrentUser');
      req.then(resp => {
        if (resp.status == 200) {
          this.$router.push({name: 'mygroups'});
        }
      })
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({name: 'login'});
    }
  },
  data: () => ({
    //
  }),
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap');
#main-container {
  padding-top: 40px;;
}

#logout-link {
  margin-left: auto;
}

#links-container a {
  padding: 0 10px;
}
* {
  font-family: 'Ubuntu', sans-serif;
}
</style>
