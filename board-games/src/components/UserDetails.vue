<template>
    <div>
        <div>
            <label>
                Nombre completo: {{ user.name }}
            </label>
        </div>
        <div>
            <label>
                Nombre de usuario: {{ user.username }}
            </label>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    },
    props:['user']
}
</script>