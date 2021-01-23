<template>
<div>
    <h1>
        Mis juegos
    </h1>
    <game-search
        v-on:change="askForAddGameToUser($event)"
    ></game-search>
    <confirm-dialog
        :open="openConfirmDialog"
        question="¿Está seguro que desea agregar este juego a su biblioteca?"
        v-on:accept="addGameToUser"
        v-on:cancel="openConfirmDialog = false"
    ></confirm-dialog>
    <div>
        ¿No encontraste el juego? Podés cargarlo mediante <router-link to="/games/new">este link</router-link>
    </div>
    <div>
        <div :key="game._id" v-for="game in games">
            {{  game.name }}
        </div>
    </div>
</div>
</template>
<script>
import ConfirmDialog from '../components/ConfirmDialog.vue';
import GameSearch from "../components/GameSearch.vue"

export default {
    components: {
        GameSearch,
        ConfirmDialog,
    },
    data() {
        return {
            selectedGame: null,
            openConfirmDialog: false,
            games: []
        }
    },
    computed: {
    },
    mounted() {
        let request = this.$store.dispatch('getCurrentUserGames');
        request.then(resp => {
            if (resp.status == 200) {
                this.games = resp.data.games;
            }
        }); 
    },
    methods: {
        newGame() {
            this.$router.push('/games/new');
        },
        askForAddGameToUser(data) {
            this.selectedGame = data.selected;
            this.openConfirmDialog = true;
        },
        addGameToUser() {
            var request = this.$store.dispatch('addGameToCurrentUser', this.selectedGame);
            request.then(resp => {
                this.openConfirmDialog = false;
            });
        }
    }
}
</script>