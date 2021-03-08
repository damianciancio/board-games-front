import Vue from 'vue'
import moment from 'moment'

export default {
    filters: {
        date(value) {
            return moment(value).format('D/MM/YYYY');
        }
    },
    methods: {
        notify(text, type, title) {
            this.$notify({
                group: "boardgamesnotifications",
                type: type,
                title: title,
                text:  text
            });
        }
    }
}