<template>
    <div>
        <h3>{{ play.name }}</h3>
        <h5>
            Comentarios
        </h5>
        <div v-for="comment in play.comments" :key="comment.date" >
            {{ comment.comment }}
        </div>
        <textarea v-model="currentComment"></textarea>
        <button v-on:click="addComment">Comentar</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            play: {},
            currentComment: ""
        }
    },
    mounted() {
        let play_id = this.$route.params.id;
        let request = this.$store.dispatch('getPlay', play_id);
        request.then(resp => {
            if (resp.status == 200) {
                this.play = resp.data;
            }
        });
    },
    methods: {
        addComment() {
            let comment = this.currentComment;
            let play_id = this.play._id;

            let request = this.$store.dispatch('addCommentToPlay', {play_id, comment});
            request.then(resp => {
                console.log(resp)
                if (resp.status == 200) {
                }
            })
        },
        validateComment() {
            let errors = [];

            if (this.currentComment.trim() == "") {
                errors.push('Ingrese el texto del comentario');
            }

            if (errors.length) {
                let app = this;
                errors.forEach(err => app.notify(err, "error"));
                return false;
            }

            return true;
        }
    }
}
</script>