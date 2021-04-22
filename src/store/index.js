import { createStore } from 'vuex'
import axios from 'axios'
import { departamentos, actividades, estructuras, años, valores } from '../commons/constants.common'
const apiUrl = process.env.NODE_ENV === 'development' ? 'https://easyperu.cotillo.tech/api' : '/api'

export default createStore({
  state: {
    requesting: false,
    cancelTokenSource: axios.CancelToken.source(),
    departamentos,
    departamento: 0,
    data: {},
    valores,
    valor: 0,
    estructuras,
    estructura: 0,
    actividades,
    actividad: 0,
    años,
    año: 0,
  },
  mutations: {
    seleccionarDep(state, d) {
      state.departamento = d
    },
    poblarData(state, data) {
      state.data = data
    },
    seleccionarValor(state, v) {
      state.valor = v
    },
    seleccionarEstructura(state, e) {
      state.estructura = e
    },
    seleccionarActividad(state, a) {
      state.actividad = a
    },
    startRequest(state) {
      state.requesting = true
    },
    endRequest(state) {
      state.requesting = false
    }
  },
  actions: {
    seleccionarDep({ commit }, d) {
      commit('seleccionarDep', d)
    },
    seleccionarValor({ dispatch, commit }, v) {
      commit('seleccionarValor', v)
      return dispatch('obtenerData')
    },
    seleccionarEstructura({ dispatch, commit }, e) {
      commit('seleccionarEstructura', e)
      return dispatch('obtenerData')
    },
    seleccionarActividad({ commit }, a) {
      commit('seleccionarActividad', a)
    },
    obtenerData({ commit, state }) {
      if (state.requesting) {
        state.cancelTokenSource.cancel()
      } else {
        commit('startRequest')
      }
      return new Promise((resolve) => {
        const valor = state.valores[state.valor].key
        const estructura = state.estructuras[state.estructura].key
        axios.get(`${apiUrl}/pbi/?valor=${valor}&estructura=${estructura}`)
          .then(res => {
            commit('poblarData', res.data)
            commit('endRequest')
            resolve()
          })
      })
    }
  },
})
