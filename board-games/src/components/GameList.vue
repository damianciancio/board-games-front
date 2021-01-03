<template>
    <div>
        <div :key="game._id" v-for="game in games">
            <div> {{ game.name }} </div>
            <div>De {{ game.min_players }} a {{ game.max_players }} jugadores</div>
            <div>Duración aproximada: {{ game.duration }} minutos</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    },
    props: ['games']
}
</script>