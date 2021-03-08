import axios from 'axios';
const PlaysStore = {
    actions: {
        savePlay(store, play) {
            return axios.post(store.state.apiRoot + "/plays", play);
        },
        getCurrentUserPlays(store) {
            return axios.get(store.state.apiRoot + "/plays/my-plays");
        },
        getPlaysByGroup(store, group_id) {
            console.log(group_id)
            return axios.get(store.state.apiRoot + "/plays", {params: {'group_id': group_id}});
        },
        addCommentToPlay(store, {play_id, comment}) {
            return axios.post(store.state.apiRoot + "/plays/" + play_id + "/comment", {comment: comment})
        },
        getPlay(store, id) {
            return axios.get(store.state.apiRoot + "/plays/" + id);
        }
    }
}

export { PlaysStore }


















