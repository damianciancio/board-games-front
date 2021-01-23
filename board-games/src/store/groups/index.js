import axios from 'axios';
const GroupsStore = {
    actions: {
        getGroup(store, _id) {
            return axios.get(store.state.apiRoot + "/groups/" + _id)
        },
        searchGroup(store, text) {
            return axios.get(store.state.apiRoot + "/groups", {params: {q: text}})
        },
        addGroup(store, group){
            return axios.post(store.state.apiRoot + "/groups", {name: group.name});
        }
    }
}

export { GroupsStore }