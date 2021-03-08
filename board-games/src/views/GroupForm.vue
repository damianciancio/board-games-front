<template>
    <div>
        <h1>Crear Grupo</h1>
        <form>
            <div class="form-group">
                <label>
                    Nombre
                </label>
                <input v-model="group.name" type="text" class="form-control">
            </div>
            <div class="form-group">
                <button class="btn btn-primary" v-on:click="add">Agregar</button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            group: {
                name: ""
            }
        }
    },
    methods: {
        add(){
            if (this.validate()) {
                let request = this.$store.dispatch('addGroup', this.group);
                request.then((resp) => {
                    if (resp.status == 200) {
                        this.$router.push({name: 'groupview', params:{id:resp.data._id}});
                    }
                })
                .catch(err => {
                    this.notify('Ha ocurrido un error al guardar el grupo', 'error');
                })
            }
        },
        validate() {
            let errors = [];
            if (this.group.name.trim() == "") {
                errors.push('Ingrese un nombre para el grupo');
            }
            if (errors.length) {
                let app = this;
                errors.forEach(err => app.notify(err, 'error'));
                return false;
            }
            return true;
        }
    }
}
</script>