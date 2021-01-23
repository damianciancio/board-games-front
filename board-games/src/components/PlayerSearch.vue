<template>
    <v-autocomplete 
        v-model="selectedPlayer"
        :loading="loading"
        :items="items"
        :search-input.sync="search"
        cache-items
        label="Buscar usuario"
        item-text="username"
        item-value="_id"
        v-on:change="$emit('change', {selected: selectedPlayer, name: search})"
    >
    </v-autocomplete>
</template>
<script>
import { Autocomplete } from 'vuetify'

export default {
    data() {
        return {
            selectedPlayer: null,
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
                let request = this.$store.dispatch('searchUser', input);
                request.then(resp => {
                    this.loading = false;
                    this.items = resp.data.players;
                });
            }
        }
    }
}
</script>