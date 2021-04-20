<template>
  <main>
    <div class="container">
      <h1 class="is-size-1 has-text-centered">Easy Perú</h1>
      <nav class="buttons">
        <button
          v-for="(item, i) in navItems"
          :key="i"
          class="button"
          :class="i % 2 === 0 ? 'is-danger is-light' : 'is-light'"
        >
          {{ item }}
        </button>
      </nav>
      <slot></slot>
    </div>
  </main>
</template>

<script>
import { departamentos } from '../commons/constants.common'
export default {
  setup() {
    const navItems = departamentos.map(d => d.charAt(0).toUpperCase() + d.slice(1))
    return { navItems }
  }
}
</script>

<style scoped>
  button::first-letter {
    text-transform:capitalize;
  }
</style>