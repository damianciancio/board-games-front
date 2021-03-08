import axios from 'axios';
const GamesStore = {
    actions: {
        addGame(store, game) {
            return axios.post(store.state.apiRoot + "/games", game);
        },
        searchGame(store, q){
            return axios.get(store.state.apiRoot + "/games", {params: {q: q}});
        },
        addGameToCurrentUser(store, _id) {
            return axios.post(store.state.apiRoot + '/players/' + store.getters.currentUser._id + "/games",{game: _id});
        },
        getCurrentUserGames(store){
          var request = axios.get(`${store.state.apiRoot}/players/${store.getters.currentUser._id}/games`);
          return request;
        }
    }
}

export {  GamesStore}