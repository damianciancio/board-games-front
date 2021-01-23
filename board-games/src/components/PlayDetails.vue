<template>
    <div>
        <div> {{ play.name }} </div>
        <div> {{ play.game.name }} </div>
        <div> {{ play.date }} </div>
        <div> {{ play.duration }} minutos</div>
        <div>Jugadores</div>
        <div :key="player._id" v-for="player in play.players"> {{ player.name }} <span  v-if="isPlayerWinner(player._id, play)" > Ganador</span></div>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    },props: ['play'],
    methods: {
        isPlayerWinner(id, play) {
            console.log(play.winner);
            console.log(id);
            console.log(play.winner == id);
            return play.winner == id;
        }
    }
}
</script>