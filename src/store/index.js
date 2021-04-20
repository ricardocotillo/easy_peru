import { createStore } from 'vuex'
import axios from 'axios'
import { departamentos } from '../commons/constants.common'

export default createStore({
  state: {
    departamentos,
    departamento: 0,
    data: [],
    valores: [
      {
        key: 'constante', 
        title: 'Valores a precios constantes 2007',
      },
      {
        key: 'corriente', 
        title: 'Valores a precios corrientes',
      },
    ],
    valor: 0,
    estructuras: [
      {
        key: 'soles',
        title: 'Miles de soles',
      },
      {
        key: 'porcentual',
        title: 'Estructura porcentual',
      },
      {
        key: 'variacion_porcentual',
        title: 'Variación porcentual del índice de volumen físico',
      },
    ],
    estructura: 0,
  },
  mutations: {
    seleccionarDep(state, d) {
      state.departamento = d
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
