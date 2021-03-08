<template>
    <v-autocomplete 
        v-model="selectedGame"
        :loading="loading"
        :items="items"
        :search-input.sync="search"
        cache-items
        label="Buscar juego"
        item-text="name"
        item-value="_id"
        v-on:change="$emit('change', {selected: selectedGame, name: search})"
    >
    </v-autocomplete>
</template>
<script>
import { Autocomplete } from 'vuetify'

export default {
    data() {
        return {
            selectedGame: null,
            loading: false,
            search: null,
            items: []
        }
    },
    watch: {
        search(val) {
            this.querySelection(val);
        }
    },
    methods: {
        querySelection(input) {
            if (input.trim().length > 1) {
                this.loading = true;
                let request = this.$store.dispatch('searchGame', input);
                request.then(resp => {
                    this.loading = false;
                    this.items = resp.data;
                })
                .catch(err => {
                    this.notify('Error al buscar juego', 'error');
                })
            }
        }
    }
}
</script>