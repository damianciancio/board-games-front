import axios from 'axios';
const PlayersStore = {
    actions: {
        getUser(store, _id) {
            return axios.get(store.state.apiRoot + "/players/" + _id);
        },
        getCurrentUserGroups(store, params) {
            return axios.get(`${store.state.apiRoot}/players/${store.getters.currentUser._id}/groups`, {params:params});
        },
        searchUser(store, input) {
            return axios.get(`${store.state.apiRoot}/players`, {params: {q: input}});
        }
    }
}

export { PlayersStore }