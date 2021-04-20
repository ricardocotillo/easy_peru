import { createStore } from 'vuex'
import axios from 'axios'
import { departamentos } from '../commons/constants.common'

export default createStore({
  state: {
    departamentos,
    depSeleccionado: 0,
    data: [],
  },
  mutations: {
    seleccionarDep(state, d) {
      state.depSeleccionado = d
    },
    poblarData(state, ds) {
      state.data.push(...ds)
    }
  },
  actions: {
    seleccionarDep({ commit }, d) {
      commit('seleccionarDep', d)
    },
    async obtenerData({ commit }) {
      return new Promise((resolve) => {
        axios.get('http://localhost:8000/pbi/?valor=constante&estructura=soles')
          .then(res => {
            commit('poblarData', res.data.departamentos)
            resolve()
          })
      })
    }
  },
})
