<template>
  <main>
    <h1 class="is-size-1 has-text-centered">Easy Perú</h1>
    <h3 class="is-size-3 has-text-centered">
      PBI de los Departamentos, según actividades económicas
    </h3>
    <h4 class="is-size-4 has-text-centered">Departamentos</h4>
    <div style="height: 10px"></div>
    <div class="buttons is-justify-content-center">
      <button
        v-for="(item, i) in navItems"
        :key="i"
        class="button is-danger is-small"
        :class="departamento != i ? 'is-light' : null"
        @click="seleccionarDep(i)"
      >
        {{ item }}
      </button>
    </div>
    <h4 class="is-size-4 has-text-centered">Actividades económicas</h4>
    <div class="buttons is-justify-content-center">
      <button
        class="button is-warning is-small"
        :class="actividad == null ? null : 'is-light'"
        @click="seleccionarActividad(null)"
      >
        Agregado Bruto
      </button>
      <button
        v-for="(a, i) in actividades"
        :key="i"
        class="button is-warning is-small"
        :class="actividad != i ? 'is-light' : null"
        @click="seleccionarActividad(i)"
      >
        {{ a }}
      </button>
    </div>
    <slot></slot>
    <h4 class="is-size-4 has-text-centered">Tipos de valores</h4>
    <div style="height: 10px"></div>
    <div class="buttons is-justify-content-center">
      <button
        v-for="(v, i) in valores"
        :key="v.key"
        class="button is-success is-small"
        :class="valor != i ? 'is-light' : null"
        @click="seleccionarValor(i)"
      >
        {{ v.title }}
      </button>
    </div>
    <div class="buttons is-justify-content-center">
      <button
        v-for="(e, i) in estructuras"
        :key="e.key"
        class="button is-info is-small"
        :class="estructura != i ? 'is-light' : null"
        @click="seleccionarEstructura(i)"
      >
        {{ e.title }}
      </button>
    </div>
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
    const seleccionarDep = d => store.dispatch('seleccionarDep', d)
    const seleccionarValor = v => store.dispatch('seleccionarValor', v)
    const seleccionarEstructura = e => store.dispatch('seleccionarEstructura', e)
    const seleccionarActividad = a => store.dispatch('seleccionarActividad', a)

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