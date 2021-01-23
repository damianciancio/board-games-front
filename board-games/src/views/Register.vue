<template>
    <div>
        <h3>Registrate!</h3>
        <form>
            <div class="form-group">
                <label>
                    Nombre de usuario
                </label>
                <input v-model="username" type="text" class="form-control">
            </div>
            <div class="form-group">
                <label>
                    Nombre y apellido
                </label>
                <input v-model="name" type="text" class="form-control">
            </div>
            <div class="form-group">
                <button v-on:click="register" class="btn btn-primary">Registrarse</button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username: "",
            name: ""
        }
    },
    methods: {
        register() {
            var request = this.$store.dispatch('register', {username: this.username, name: this.name});
            request.then(resp => {
                if (resp.status == 200) {
                    this.$router.push('/');
                } else {
                    alert('Hubo un problema al crear el usuario');
                }
            })
        }
    }
}
</script>