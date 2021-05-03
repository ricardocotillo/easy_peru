import { createStore } from 'vuex'
import axios from 'axios'
import { estructuras, años, valores } from '../commons/constants.common'
const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : '/api'

export default createStore({
  state: {
    requesting: false,
    cancelTokenSource: axios.CancelToken.source(),
    departamentos: [],
    departamento: 0,
    data: {},
    valores,
    valor: 0,
    estructuras,
    estructura: 0,
    actividades: [],
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
    seleccionarAño(state, a) {
      state.año = a
    },
    startRequest(state) {
      state.data = []
      state.requesting = true
    },
    endRequest(state) {
      state.requesting = false
    },
    setDepartments(state, payload) {
      state.departamentos = payload
    },
    setEconomicActivities(state, payload) {
      state.actividades = payload
    }
  },
  actions: {
    seleccionarDep({ dispatch, commit }, d) {
      commit('seleccionarDep', d)
      return dispatch('getData')
    },
    seleccionarValor({ dispatch, commit }, v) {
      commit('seleccionarValor', v)
      return dispatch('getData')
    },
    seleccionarEstructura({ dispatch, commit }, e) {
      commit('seleccionarEstructura', e)
      return dispatch('getData')
    },
    seleccionarActividad({ dispatch, commit }, a) {
      commit('seleccionarActividad', a)
      return dispatch('getData')
    },
    seleccionarAño({ dispatch, commit }, a) {
      commit('seleccionarAño', a)
      return dispatch('getData')
    },
    getData({ commit, state }) {
      if (state.requesting) {
        state.cancelTokenSource.cancel()
      } else {
        commit('startRequest')
      }
      return new Promise((resolve) => {
        const valueType = state.valores[state.valor].key
        const structure = state.estructuras[state.estructura].key
        const department = state.departamento
        const activity = state.actividad
        const year = state.año === 0 ? '' : state.años[state.año]
        axios.get(`${apiUrl}/products/?valueType=${valueType}&structure=${structure}&department=${department}&economicActivity=${activity}&year=${year}`)
          .then(res => {
            commit('poblarData', res.data)
            commit('endRequest')
            resolve()
          })
      })
    },
    getDepartments({ commit }) {
      axios.get(`${apiUrl}/departments/`)
        .then(res => {
          commit('setDepartments', res.data)
        })
    },
    getEconomicActivities({ commit }) {
      axios.get(`${apiUrl}/economic_activities/`)
        .then(res => {
          commit('setEconomicActivities', res.data)
        })
    }
  },
})
