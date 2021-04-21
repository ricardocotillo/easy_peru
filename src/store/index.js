import { createStore } from 'vuex'
import axios from 'axios'
import { departamentos } from '../commons/constants.common'

export default createStore({
  state: {
    requesting: false,
    cancelTokenSource: axios.CancelToken.source(),
    departamentos,
    departamento: 0,
    data: {},
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
    actividades: [
      "Agricultura, Ganadería, Caza y Silvicultura",
      "Pesca y Acuicultura",
      "Extracción de Petróleo, Gas y Minerales",
      "Manufactura",
      "Electricidad, Gas y Agua",
      "Construcción",
      "Comercio", 
      "Transporte, Almacen., Correo y Mensajería",
      "Alojamiento y Restaurantes",
      "Telecom. y Otros Serv. de Información",
      "Administración Pública y Defensa",
      "Otros Servicios",
    ],
    actividad: 0,
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
    obtenerData({ commit, state }) {
      if (state.requesting) {
        state.cancelTokenSource.cancel()
      } else {
        commit('startRequest')
      }
      return new Promise((resolve) => {
        const valor = state.valores[state.valor].key
        const estructura = state.estructuras[state.estructura].key
        axios.get(`http://localhost:8000/pbi/?valor=${valor}&estructura=${estructura}`)
          .then(res => {
            commit('poblarData', res.data)
            commit('endRequest')
            resolve()
          })
      })
    }
  },
})
