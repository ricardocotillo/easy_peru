<template>
  <main>
    <h1 class="is-size-1 has-text-centered">Easy Perú</h1>
    <nav class="buttons is-justify-content-center">
      <button
        v-for="(item, i) in navItems"
        :key="i"
        class="button"
        :class="i % 2 === 0 ? 'is-danger is-light' : 'is-light'"
        @click="seleccionarDep(i)"
      >
        {{ item }}
      </button>
    </nav>
    <slot></slot>
  </main>
</template>

<script>
import { useStore } from 'vuex'
export default {
  setup() {
    // data
    const store = useStore()
    const navItems = store.state.departamentos.map(d => d.charAt(0).toUpperCase() + d.slice(1))

    // methods
    const seleccionarDep = i => {
      store.dispatch('seleccionarDep', i)
    }

    return { navItems, seleccionarDep }
  }
}
</script>

<style>
</style>