<template>
    <div>
        <div>
            <h3>{{ group.name }}</h3> 
        </div>
        <div>
            <h4>Miembros</h4>
            <ul>
                <li :key="member._id" v-for="member in group.members">
                    <span>
                        {{ member.player.name }}
                    </span>
                    <span v-if="member.is_admin" >Administrador!</span>
                    <span v-if="member.status != 'accepted'" >Pendiente de aceptación <button v-if="currentUserIsAdminOfGroup" v-on:click="acceptMember(member)">Aceptar</button></span>
                </li>
            </ul>
        </div>
        <div class="form-group">
            <label>Agregar usuario</label>
            <player-search v-on:change="addUserToGroup($event)" ></player-search>
        </div>
        <div>
            <h4>Partidas</h4>
            <div v-for="play in group.plays" :key="play._id">
                asd
                <play-details  :play="play" ></play-details>
            </div>
        </div>
    </div>
</template>
<script>
import PlayDetails from '../components/PlayDetails.vue';
import PlayerSearch from '../components/PlayerSearch'
export default {
    data() {
        return {
            group: {
                name: "",
                members: [],
                plays: []
            }
        }
    },
    components:{
        PlayerSearch,
        PlayDetails
    },
    computed: {
        currentUser() {
            return this.$store.getters.currentUser;
        },
        groupMembersIds() {
            return this.group.members.map(mem => mem.player._id);
        },
        currentUserIsAdminOfGroup() {
            return this.group.members.some(member => {
                return member.player._id == this.currentUser._id && member.is_admin;
            });
        }
    },
    mounted() {
        this.refreshGroup();
    },
    methods: {
        refreshGroup() {
            let groupId = this.$route.params.id;
            let request = this.$store.dispatch('getGroup', groupId);
            request.then(response => {
                if (response.status == 200) {
                    this.group = response.data.group;
                    let requestPlays = this.$store.dispatch('getPlaysByGroup', groupId);
                    requestPlays.then(resp => {
                        if (resp.status == 200) {
                            this.group.plays = resp.data;
                        }
                    });
                }
            });
        },
        acceptMember(member) {
            if (member.status != 'accepted' && this.currentUserIsAdminOfGroup) {
                let request = this.$store.dispatch('updateGroupMemberStatus', {user_id: member._id, group_id: this.group._id, status: "accepted"});
                request.then(resp => {
                    this.refreshGroup();
                })
            }
        },
        addUserToGroup(user) {

            if(this.groupMembersIds.includes(user.selected)) {
                return false;
            }

            let initialStatus = 'pending';
            if (this.currentUserIsAdminOfGroup) {
                initialStatus = 'accepted';
            }

            var request = this.$store.dispatch('addUserMember', {user_id: user.selected, group_id: this.group._id, initialStatus: initialStatus});
            request.then(resp => {
                if (resp.status == 200) {
                    this.refreshGroup();
                }
            });
        }
    }
}
</script>