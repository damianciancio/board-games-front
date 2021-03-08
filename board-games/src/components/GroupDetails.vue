<template>
    <div class="d-flex justify-content-between">
        <span><router-link :to="{name: 'groupview', params: {id: group._id}}" >{{ group.name }}</router-link></span> <span><fa-icon icon="users"></fa-icon> {{ group.members.length}}</span>
    </div>
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

library.add(faUsers)

export default {
    name: 'GroupRow',
    data() {
        return {}
    },
    props: ['group']
}
</script>