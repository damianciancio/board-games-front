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
        },
        addUserMember(store, {user_id, group_id, initialStatus}) {
            return axios.post(store.state.apiRoot + "/groups/" + group_id + "/members", {member_id: user_id, initial_status: initialStatus});
        },
        updateGroupMemberStatus(store, {user_id, group_id, status}) {
            return axios.put(store.state.apiRoot + "/groups/" + group_id + "/members/" + user_id, {newStatus: status});
        },
        requestJoinToGroup(store, {id_user, id_group}) {
            return store.dispatch('addUserMember',{user_id: id_user, group_id: id_group, initialStatus: 'pending'});
        }
    }
}

export { GroupsStore }