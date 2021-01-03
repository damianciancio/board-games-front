<template>
    <v-dialog v-model="open">
        {{ question }}
        <button v-on:click="accept">Aceptar</button>
        <button v-on:click="cancel">Cancelar</button>
    </v-dialog>
</template>
<script>
export default {
    data() {
        return {};
    },
    props: ['question', 'open'],
    methods: {
        accept() {
            this.$emit('accept');
        },
        cancel() {
            this.$emit('cancel');
        },
    }
}
</script>
