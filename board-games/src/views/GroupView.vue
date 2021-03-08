<template>
    <div class="row">
        <div class="col-md-12">
            <h3>{{ group.name }}</h3> 
        </div>
        <div class="col-md-6">
            <h4>Miembros</h4>
            <ul class="list-group list-group-flush members-list">
                <li class="list-group-item d-flex justify-content-between" :key="member._id" v-for="member in group.members">
                    <span>
                        {{ member.player.name }}
                    </span>
                    <span v-if="member.is_admin" ><fa-icon icon="user-shield"></fa-icon></span>
                    <span v-if="member.status != 'accepted'" ><fa-icon icon="user-clock"></fa-icon> <button v-if="currentUserIsAdminOfGroup" v-on:click="acceptMember(member)">Aceptar</button></span>
                </li>
            </ul>
        </div>
        <div v-if="currentUserIsActiveMember" class="col-md-6 form-group">
            <label>Agregar usuario</label>
            <player-search v-on:change="addUserToGroup($event)" ></player-search>
        </div>
        <div class="col-md-12" v-if="currentUserIsActiveMember" >
            <h4>Partidas</h4>
            <div class="row plays-container">
                <div class="play-item" v-for="play in group.plays" :key="play._id">
                    <play-details  :play="play" ></play-details>
                </div>
            </div>
        </div>
        <template v-else >
            <div class="col-md-12" v-if="currentUserIsMember">
                Un administrador está evaluando tu ingreso
            </div>
            <div class="col-md-12" v-else>
                Para ver las partidas del grupo, debes unirte
                <button v-if="!currentUserIsMember" class="btn btn-default" v-on:click="requestJoinToGroup()" >Unirse</button>
            </div>
        </template>
    </div>
</template>
<script>
import PlayDetails from '../components/PlayDetails.vue';
import PlayerSearch from '../components/PlayerSearch';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserShield, faUserClock } from '@fortawesome/free-solid-svg-icons'

library.add(faUserShield);
library.add(faUserClock);

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
        },
        currentUserIsMember() {
            return this.group.members.some(member => {
                return member.player._id == this.currentUser._id;
            });
        },
        currentUserIsActiveMember() {
            return this.group.members.some(member => {
                return member.player._id == this.currentUser._id && member.status == 'accepted';
            });
        }
    },
    mounted() {
        this.refreshGroup();
    },
    methods: {
        refreshGroup() {
            var groupId = this.$route.params.id;
            let request = this.$store.dispatch('getGroup', groupId);
            let app = this;
            request.then(response => {
                if (response.status == 200) {
                    app.group = response.data.group;
                    let requestPlays = this.$store.dispatch('getPlaysByGroup', groupId);
                    requestPlays.then(resp => {
                        if (resp.status == 200) {
                            app.group.plays = resp.data;
                            this.$forceUpdate();
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
            })
            .catch(err => {
                if (err.response.status == 401) {
                    this.notify('Usted no tiene permisos para realizar la acción', 'warn');
                }

                if (err.response.status == 409) {
                    this.notify('El usuario ya pertenece al grupo', 'success');
                }
            })
        },
        requestJoinToGroup() {
            let req = this.$store.dispatch('requestJoinToGroup', { id_user: this.currentUser._id, id_group: this.group._id })
            req.then(resp => {
                if (resp.status == 200) {
                    this.$router.push({name: 'mygroups'});
                }
            })
            .catch(err => {
                this.notify('Ha ocurrido un error al solicitar acceso al grupo', 'error')
            })
        }
    }
}
</script>
<style scoped>
    .members-list {
        padding-left: 0;
    }

    .play-item {
        margin-bottom: 30px;
        min-width: 350px;
        flex-grow: 1;        
    }
    .plays-container {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>