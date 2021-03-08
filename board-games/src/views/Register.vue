<template>
    <div id="register">
        <div class="row">
            <div class="col-md-6">
                <div id="title" class="d-flex flex-column justify-content-center">
                    <h1>Sistema lúdico</h1>
                </div>
            </div>
            <div class="col-md-6">
                <div v-if="error_message" class="panel panel-danger">
                    {{ error_message }}
                </div>
                <div class="d-flex flex-column justify-content-center">
                    <h3>Registro</h3>
                    <form>
                        <div class="form-group">
                            <label>
                                Nombre de usuario
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
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username: "",
            name: "",
            password: "",
            error_message: ""
        }
    },
    methods: {
        register() {
            var request = this.$store.dispatch('register', {username: this.username, name: this.name, password: this.password});
            request.then(resp => {
                if (resp.status) {
                    this.$router.push('/');
                }
            })
            .catch(error =>{
                console.log(error.response)

                if (error.response.data.code == 'missing_username_or_password') {
                    this.notify(
                        "Datos faltantes",
                        'error',
                        'Error',
                    )

                    return;
                }

                if (error.response.data.code == 'username_already_taken') {
                    this.notify(
                        "El nombre de usuario ya existe, por favor, seleccione otro",
                        'error',
                        'Error',
                    );
                    return;
                }

            })
        }
    }
}
</script>
<style>
    #register .d-flex {
        height: 80vh;;
    }
    #title {
    }
</style>