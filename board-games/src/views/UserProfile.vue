<template>
    <div>
        <template v-if="user">
            <h1>Perfil de {{ user.username }}</h1>
            <user-details :user="user"></user-details>
            <h3>Juegos de {{ user.username }}</h3>
            <game-list :games="user.games"></game-list>
        </template>
    </div>
</template>
<script>
import UserDetails from './../components/UserDetails'
import GameList from './../components/GameList'

export default {
    data(){
        return {
            user: null
        }
    },
    components: {
        UserDetails,
        GameList
    },
    mounted() {
        let user_id = this.$route.params.id;
        this.$store.dispatch('getUser', user_id)
            .then(resp => {
                if (resp.status == 200) {
                    this.user = resp.data.player;
                }
            });
    }
}
</script>