import axios from 'axios';
const PlayersStore = {
    actions: {
        getUser(store, _id) {
            return axios.get(store.state.apiRoot + "/players/" + _id);
        }
    }
}

export { PlayersStore }