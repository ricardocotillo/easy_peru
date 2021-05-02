<template>
  <MainLayout>
    <router-view v-if="!cargando" />
  </MainLayout>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import MainLayout from './layouts/main.layout'
export default {
  name: 'App',
  components: { MainLayout },
  setup() {
    const store = useStore()
    // data
    const cargando = ref(true)
    // created
    store.dispatch('getDepartments')
    store.dispatch('getEconomicActivities')
    store.dispatch('getData').then(() => cargando.value = false)
    return { cargando }
  }
}
</script>

<style>
</style>
