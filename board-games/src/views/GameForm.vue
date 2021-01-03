<template>
    <div>
        <h1>Agregar juego</h1>
        <form>
            <div class="form-group">
                <label>
                    Nombre
                </label>
                <input v-model="game.name" type="text" class="form-control">
            </div>
            <div class="form-group">
                <label>
                    Cant- mínima de jugadores
                </label>
                <input v-model="game.min_players" type="text" class="form-control">
            </div>
            <div class="form-group">
                <label>
                    Cant- máxima de jugadores
                </label>
                <input v-model="game.max_players" type="text" class="form-control">
            </div>
            <div class="form-group">
                <label>
                    Duración aproximada (en minutos)
                </label>
                <input v-model="game.duration" type="number" class="form-control">
            </div>
            <div class="form-group">
                <label>
                    Tipo
                </label>
                <select class="form-control" v-model="game.type">
                    <option :key="type" v-for="type in gameTypes">
                        {{type}}
                    </option>
                </select>
            </div>
            <div class="form-group">
                    <input v-model="game.add_to_library" id="add-to-library" type="checkbox" class="form-control">
                <label for="add-to-library">
                    Agregar a mi ludoteca
                </label>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" v-on:click="add">Agregar</button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            game: {
                name: "",
                min_players: 0,
                max_players: 0,
                duration: 0,
                type: null,
                add_to_library: false
            }
        }
    },
    computed: {
        gameTypes() {
            return this.$store.getters.gameTypes;
        }
    },
    methods: {
        add() {
            if (this.validate()) {
                let request = this.$store.dispatch('addGame', this.game);
                request.then(resp => {
                    if (resp.status == 200) {
                        this.$router.push('/');
                    } else {
                        alert('No ha sido posible agregar el juego')
                    }
                });
            }
        },
        validate() {
            return true;
        }
    }
}
</script>