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
                    <span v-if="member.status != 'accepted'" ><button v-if="currentUserIsAdminOfGroup" v-on:click="acceptMember(member)"></button> de aceptación</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            group: {
                name: "",
                members: []
            }
        }
    },
    computed: {
        currentUser() {
            return this.$store.getters.currentUser;
        }
    },
    mounted() {
        let groupId = this.$route.params.id;
        let request = this.$store.dispatch('getGroup', groupId);
        request.then(response => {
            console.log(response);
            if (response.status == 200) {
                this.group = response.data.group;
            }
        });
    },
    methods: {
        currentUserIsAdminOfGroup() {
            this.group.members.some(member => {
                return member.player._id == this.currentUser._id && member.is_admin;
            });
        },
        acceptMember(member) {

        }
    }
}
</script>