<template>
    <v-autocomplete 
        v-model="selectedGroup"
        :loading="loading"
        :items="items"
        :search-input.sync="search"
        cache-items
        label="Buscar grupo"
        item-text="name"
        item-value="_id"
        v-on:change="$emit('change', {selected: selectedGroup, name: search})"
    >
    </v-autocomplete>
</template>
<script>
import { Autocomplete } from 'vuetify'

export default {
    data() {
        return {
            selectedGroup: null,
            loading: false,
            search: null,
            items: []
        }
    },
    name: 'GroupSearch',
    watch: {
        search(val) {
            this.querySelection(val);
        }
    },
    methods: {
        querySelection(input) {
            if (input.trim().length > 1) {
                this.loading = true;
                let request = this.$store.dispatch('searchGroup', input);
                request.then(resp => {
                    this.loading = false;
                    this.items = resp.data.groups;
                });
            }
        }
    }
}
</script>