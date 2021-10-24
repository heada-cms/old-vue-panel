import { createStore } from 'vuex'
import useFetch from '@/hooks/useFetch';
export default createStore({
  state: {
    resources: []
  },
  mutations: {
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
    }
  },
  modules: {
  }
})
