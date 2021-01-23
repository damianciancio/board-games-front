<template>
<div>
    <h3>Mis grupos</h3>
    <group-search
        v-on:change="alert('asd')"
    >
    </group-search>
    <div :key="group._id" v-for="group in groups">
        <group-details :group="group" >
        </group-details>
    </div>
    <router-link :to="{name: 'groupnew'}">Nuevo grupo</router-link>
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
        });
    }
}
</script>