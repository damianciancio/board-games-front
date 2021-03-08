<template>
    <div>
        <box>
            <template v-slot:header>
                <div class="d-flex justify-content-between">
                    <router-link :to="{name: 'playview', params: { id: play._id } }" > {{ play.name }}</router-link> 
                    <div><fa-icon icon="clock"></fa-icon> {{ play.duration }} min</div>
                </div>
            </template>
            <template>
                <div><fa-icon icon="dice"></fa-icon> {{ play.game.name }} </div>
                <div><fa-icon icon="calendar-day"></fa-icon> {{ play.date | date }} </div>
                <div>
                    <list :items="play.players" prop_key="_id" >
                        <template v-slot:title>
                            <fa-icon icon="users"></fa-icon> Jugadores
                        </template>
                        <template v-slot:default="{item}">
                            <div class="d-flex justify-content-between">
                                <span> {{ item.name }}</span> 
                                <span  v-if="isPlayerWinner(item._id, play)" ><fa-icon icon="trophy"></fa-icon> Ganador</span>
                            </div>
                        </template>
                    </list>
                </div>
            </template>
        </box>
    </div>
</template>
<script>

import { library } from '@fortawesome/fontawesome-svg-core'
import Box from './Box'
import List from './List'
import { faClock, faDice, faCalendarDay, faUsers, faTrophy } from '@fortawesome/free-solid-svg-icons'
import utilsMixin from '../mixins/utils';


library.add(faClock)
library.add(faDice)
library.add(faCalendarDay)
library.add(faUsers)
library.add(faTrophy)

export default {
  components: { Box, List },
    data() {
        return {}
    },
    mixins: [utilsMixin],
    props: ['play'],
    methods: {
        isPlayerWinner(id, play) {
            return play.winner == id;
        }
    }
}
</script>