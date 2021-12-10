import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    libroSelected : {},
    userSelected : {},
    libros: [],
  },
  mutations: {

    selectLibro(state, libro){
      state.libroSelected = libro;

    },
    selectUser(state, user){
      state.userSelected = user;

    },

  },
  actions: {


    accionSetLibro({commit},libro){
      commit('selectLibro',libro);
    },

    accionSetUser({commit},user){
      commit('selectUser',user);
    },


  },
  modules: {
  }
})
