<template>
    <div class="d-flex justify-content-between">
        <span><router-link :to="{name: 'groupview', params: {id: group._id}}" >{{ group.name }}</router-link></span> <span>({{ group.members.length}} miembros)</span>
    </div>
</template>
<script>
export default {
    name: 'GroupRow',
    data() {
        return {}
    },
    props: ['group']
}
</script>