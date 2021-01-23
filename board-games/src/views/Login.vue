<template>
    <div>
        <h3>Iniciar sesión</h3>
        <form>
            <div class="form-group">
                <label>
                    Usuario
                </label>
                <input v-model="username" type="text" class="form-control">
            </div>
            <div class="form-group">
                <label>
                    Contraseña
                </label>
                <input v-model="password" type="password" class="form-control">
            </div>
            <div class="form-group">
                <button v-on:click="login" class="btn btn-primary">Iniciar sesión</button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        login() {
            if (this.validate()) {
                var request = this.$store.dispatch('login', {username: this.username, password: this.password});
                request.then(resp => {
                    if (resp.status != 200) {
                        alert('Error en las credenciales, por favor, intente nuevamente')
                    } else {
                        this.$router.push('/my-groups');
                    }
                });
            }
        },
        validate() {
            return this.username.trim() && this.password.trim();
        }
    }
}
</script>