<template>
    <div>
        <h3>Mis partidas</h3>
        <play-details :key="play._id" v-for="play in plays" :play="play"></play-details>
    </div>
</template>
<script>
import PlayDetails from '../components/PlayDetails'
export default {
    data() {
        return {
            plays: []
        }
    },
    components: {PlayDetails},
    mounted() {
        let request = this.$store.dispatch('getCurrentUserPlays');
        request.then(resp => {
            this.plays = resp.data;
        })
        .catch(err => {
            this.notify('Error al obtener las partidas el usuario actual', 'error');
        })
    },
    methods: {
    }
}
</script>