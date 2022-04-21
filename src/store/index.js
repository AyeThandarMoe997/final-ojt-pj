import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user_id: 0,
        users: []
    },
    mutations: {
        addUsers: (state, user) => {
            state.users.push(user)
        },
        addUserId: (state) => {
            state.user_id++;
        }
    },
    actions: {
        async createUser({commit}, user) {
            commit("addUsers", user)
        }
    }
})
