import axios from 'axios';
const PlaysStore = {
    actions: {
        savePlay(store, play) {
            return axios.post(store.state.apiRoot + "/plays", play);
        }
    }
}

export { PlaysStore }


















