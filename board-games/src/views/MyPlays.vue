<template>
    <div>
        <div :key="play._id" v-for="play in plays" >
            {{ play }}
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            plays: []
        }
    },
    mounted() {
        let request = this.$store.dispatch('getCurrentUserPlays');
        request.then(resp => {
            this.plays = resp.data;
        })
    }
}
</script>