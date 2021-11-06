import { createStore } from 'vuex'
import useFetch from '@/hooks/useFetch';
export default createStore({
  state: {
    resources: [],
    token: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setResources(state, newResources) {
      state.resources = newResources;
    }
  },
  actions: {
    async fetchResources(context) {
      const {getMany} = useFetch(`${process.env.VUE_APP_API_URL}/template`);

      const fetched = await getMany();
      if (context.state.resources !== fetched)
        context.commit('setResources', fetched);
    },
    async login(context, payload: {username: string, password: string}) {
      const response = await fetch(`${process.env.VUE_APP_API_URL}/user/auth`, { 
        body: JSON.stringify(payload),
        headers: { 
          "Content-Type": "application/json"
        },
        method: 'POST'
      });
      console.log(response);
      const {token} = await response.json();
      console.log(token);
      context.commit('setToken', token);
    },
    async logout({commit}) {
      commit('setToken', '');
    }
  },
  getters: {
    loggedIn(state) {
      return state.token.length > 0;
    }
  },
  modules: {
  }
})
