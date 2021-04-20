<template>
  <main>
    <h1 class="is-size-1 has-text-centered">Easy Perú</h1>
    <h4 class="is-size-4 has-text-centered">Departamentos</h4>
    <div class="buttons is-justify-content-center">
      <button
        v-for="item, i in navItems"
        :key="i"
        class="button is-danger"
        :class="departamento != i ? 'is-light' : null"
        @click="seleccionarDep(i)"
      >
        {{ item }}
      </button>
    </div>
    <slot></slot>
    <h4 class="is-size-4 has-text-centered">Tipos de valores</h4>
    <div class="buttons is-justify-content-center">
      <button
        v-for="v, i in valores"
        :key="v.key"
        class="button is-success"
        :class="valor != i ? 'is-light': null"
      >
        {{ v.title }}
      </button>
    </div>
    <div class="buttons is-justify-content-center">
      <button
        v-for="e, i in estructuras"
        :key="e.key"
        class="button is-info"
        :class="estructura != i ? 'is-light' : null"
      >
        {{ e.title }}
      </button>
    </div>
  </main>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    // data
    const store = useStore()
    const departamento = computed(() => store.state.departamento)
    const valores = store.state.valores
    const valor = computed(() => store.state.valor)
    const estructuras = store.state.estructuras
    const estructura = computed(() => store.state.estructura)
    const navItems = store.state.departamentos.map(d => d.charAt(0).toUpperCase() + d.slice(1))

    // methods
    const seleccionarDep = i => {
      store.dispatch('seleccionarDep', i)
    }

    return { navItems, seleccionarDep, valores, estructuras, valor, estructura, departamento }
  }
}
</script>

<style>
</style>