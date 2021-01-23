import axios from 'axios';
const PlayersStore = {
    actions: {
        getUser(store, _id) {
            return axios.get(store.state.apiRoot + "/players/" + _id);
        },
        getCurrentUserGroups(store) {
            return axios.get(`${store.state.apiRoot}/players/${store.state.currentUser._id}/groups`);
        }
    }
}

export { PlayersStore }