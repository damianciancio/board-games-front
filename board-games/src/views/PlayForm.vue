<template>
    <div>
        <div class="form-group">
            <label>Titulo de la partida</label>
            <input class="form-control" type="text" v-model="play.name">
        </div>
        <div class="form-group">
            <label>Duración (en minutos)</label>
            <input class="form-control" type="number" v-model="play.duration">
        </div>
        <div class="form-group">
            <label> Grupo </label>
            <select v-model="play.group" class="form-control">
                <option :key="group._id" :value="group._id" v-for="group in groups" >
                    {{ group.name }}
                </option>
            </select>
        </div>
        <div class="form-group">
            <label>Juego</label>
            <game-search
                v-on:change="setGame($event)"
                :group="play.group"
            ></game-search>
        </div>
        <div v-if="selectedGroup">
            <v-autocomplete 
                v-model="memberToAdd"
                :items="selectedGroup.members"
                label="Agregar miembros"
                item-text="player.name"
                item-value="player._id"
                v-on:change="addMember"
            >
            </v-autocomplete>
            <ul>
                <li :key="member._id" v-for="member in selectedMembers" >
                    {{ member.player.name }}
                    <button v-if="!isMemberWinner(member)" v-on:click="setAsWinner(member)"> Establecer como ganador</button>
                    <button v-else v-on:click="removeWinner()"> Quitar ganador</button>
                </li>
            </ul>
        </div>
        <div>
            <button v-on:click="savePlay">
                Guardar
            </button>

        </div>
    </div>
</template>
<script>
import { Autocomplete } from 'vuetify'
import GameSearch from '../components/GameSearch.vue';
export default {
  components: { GameSearch },
    data(){ 
        return {
            groups: [],
            memberToAdd: null,
            selectedGroup: null,
            play: {
                duration: 0,
                group: "",
                winner: "",
                players: [],
                game: "",
                name: ""
            }
        }
    },
    computed: {
        selectedMembers() {
            return this.selectedGroup.members.filter(mem => {
                return this.play.players.includes(mem.player._id)
            });
        }
    },
    watch: {
        'play.group': function() {
            let request = this.$store.dispatch('getGroup', this.play.group);
            request.then(resp => {
                if (resp.status == 200) {
                    this.selectedGroup = resp.data.group;
                }
            });
        }
    },
    mounted() {
        let request = this.$store.dispatch('getCurrentUserGroups', {status: 'accepted'});
        request.then(resp => {
            if (resp.status == 200) {
                this.groups = resp.data.groups;
            }
        })
        .catch(err => {
            console.log(err);
        })
        .finally();
    },
    methods: {
        addMember() {
            this.play.players.push(this.memberToAdd);
        },
        setAsWinner(member) {
            this.play.winner = member.player._id;
        },
        isMemberWinner(member) {
            return this.play.winner == member.player._id;
        },
        removeWinner() {
            return this.play.winner = "";
        },
        setGame(game) {
            this.play.game = game.selected;
        },
        savePlay() {
            if (this.validate()) {
                let request = this.$store.dispatch('savePlay', this.play);
                request.then(resp => {
                    if (resp.status == 200) {
                        this.notify('Partida guardada correctamente');
                        this.$router.push('/my-groups');
                    } else {
                        this.notify('Hubo un error al guardar la partida');
                    }
                })
                .catch(err => {
                    alert('Hubo un error al guardar la partida');
                    console.log(err);
                });
            }
        },
        validate() {
            let errors = [];

            if (this.play.duration == 0) {
                errors.push('Ingrese duración');
            }

            if (!this.play.group) {
                errors.push('Seleccione grupo');
            }

            if (!this.play.winner) {
                errors.push('Seleccione el ganador de la partida');
            }

            if (!this.play.game) {
                errors.push('Seleccione el juego de la partida');
            }

            if (this.play.name.trim() == "") {
                errors.push('Ingrese un nombre para la partida');
            }

            if (errors.length) {
                let app = this;
                errors.forEach(err => app.notify(err, 'error'));
                return false;
            }

            return true;
        }
    }
}
</script>