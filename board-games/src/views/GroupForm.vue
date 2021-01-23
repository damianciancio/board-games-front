<template>
    <div>
        <h1>Agregar juego</h1>
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
                });
            }
        },
        validate() {
            return this.group.name.trim() != "";
        }
    }
}
</script>