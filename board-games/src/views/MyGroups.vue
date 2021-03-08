<template>
<div>
    <div class="row">
        <div class="col-md-12">
            <h3>Grupos</h3>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <h5>
                Grupos a los que pertenezco
            </h5>
            <div :key="group._id" v-for="group in groups">
                <group-details :group="group" >
                </group-details>
            </div>
        </div>
        <div class="col-md-6">
            <div>
                <h6>¿Unirte a un grupo existente?</h6>
                <group-search
                    v-on:change="groupSearch($event)"
                >
                </group-search>
            </div>
            <h6>
                ¿Querés 
                <router-link :to="{name: 'groupnew'}">crear un nuevo grupo</router-link>?
            </h6>
        </div>
    </div>
</div>
</template>
<script>
import GroupDetails from "../components/GroupDetails"
import GroupSearch from "../components/GroupSearch"


export default {
    components: {
        GroupDetails,
        GroupSearch
    },
    data() {
        return {
            groups: []
        }
    },
    mounted() {
        let request = this.$store.dispatch('getCurrentUserGroups');
        request.then(resp => {
            if (resp.status == 200) {
                this.groups = resp.data.groups;
            }
        })
        .catch(err => {
            this.notify('Error al cargar los grupos del usuario actual', 'error')
        })
    },
    methods: {
        groupSearch(group) {
            this.$router.push({name: 'groupview', params: {id: group.selected}})
        }
    }
}
</script>