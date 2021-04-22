<template>
  <main>
    <h1 class="is-size-1 has-text-centered">Easy Perú</h1>
    <h3 class="is-size-3 has-text-centered">
      PBI de los Departamentos, según actividades económicas
    </h3>
    <div style="height: 10px"></div>
    <div class="container">
      <div class="field is-grouped">
        <div class="control">
          <div class="select">
            <select @change="seleccionarDep">
              <option>Departamentos</option>
              <option v-for="(item, i) in navItems" :key="item" :value="i">
                {{ item }}
              </option>
            </select>
          </div>
        </div>
        <div class="control">
          <div class="select">
            <select @change="seleccionarActividad">
              <option value="" disabled selected>Actividades económicas</option>
              <option v-for="(a, i) in actividades" :key="a" :value="i">
                {{ a }}
              </option>
            </select>
          </div>
        </div>
        <div class="control">
          <div class="select" @change="seleccionarValor">
            <select>
              <option value="" disabled selected>Tipos de valores</option>
              <option v-for="(v, i) in valores" :key="v.key" :value="i">
                {{ v.title }}
              </option>
            </select>
          </div>
        </div>
        <div class="control">
          <div class="select">
            <select @change="seleccionarEstructura">
              <option value="" disabled selected>Estructura</option>
              <option v-for="(v, i) in estructuras" :key="v.key" :value="i">
                {{ v.title }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <slot></slot>
  </main>
  <div style="height: 40px"></div>
  <footer>
    <div class="container">
      <p class="has-text-centered">
        Este es un proyecto personal que pretende mostrar los datos estadísticos
        del Perú de forma dináamica y fácil de vizualizar. Todos los datos han
        sido extraidos del INEI
      </p>
    </div>
  </footer>
  <div style="height: 40px"></div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { capitalizeText } from '../commons/helpers.common'
export default {
  setup() {
    // data
    const store = useStore()
    const departamento = computed(() => store.state.departamento)
    const valores = store.state.valores
    const valor = computed(() => store.state.valor)
    const estructuras = store.state.estructuras
    const estructura = computed(() => store.state.estructura)
    const navItems = store.state.departamentos.map(d => capitalizeText(d))
    const actividades = store.state.actividades
    const actividad = computed(() => store.state.actividad)

    // methods
    const seleccionarDep = e => store.dispatch('seleccionarDep', Number(e.target.value))
    const seleccionarValor = e => store.dispatch('seleccionarValor', Number(e.target.value))
    const seleccionarEstructura = e => store.dispatch('seleccionarEstructura', Number(e.target.value))
    const seleccionarActividad = e => store.dispatch('seleccionarActividad', Number(e.target.value))

    return {
      navItems,
      seleccionarDep,
      valores,
      estructuras,
      valor,
      estructura,
      departamento,
      seleccionarValor,
      seleccionarEstructura,
      seleccionarActividad,
      actividades,
      actividad,
    }
  }
}
</script>

<style>
</style>