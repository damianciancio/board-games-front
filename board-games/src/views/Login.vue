<template>
    <div>
        <div id="login" class="row">
            <div class="col-md-6">
                <div id="title" class="d-flex flex-column justify-content-center">
                    <h1>Sistema lúdico</h1>
                    <h3>Crecer jugando</h3>
                </div>
            </div>
            <div class="col-md-6">
                <div class="d-flex flex-column justify-content-center">
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
                        <div>¿No tenés cuenta? <router-link :to="{name:'register'}">Registrate</router-link></div>
                    </form>
                </div>
            </div>
        </div>
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
<style>
    #login .d-flex {
        height: 80vh;;
    }
</style>