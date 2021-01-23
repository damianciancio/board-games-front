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
            return axios.get(store.state.apiRoot + "/plays/", {group_id: group_id});
        },
    }
}

export { PlaysStore }


















