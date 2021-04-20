<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <BarChart
            v-if="state.labels.length > 0 && state.datasets.length > 0"
            :title="state.title"
            :labels="state.labels"
            :datasets="state.datasets"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
// import axios from 'axios'
import BarChart from '../components/barChart.component'
export default {
  components: { BarChart },
  name: 'HelloWorld',
  setup() {
    // data
    const store = useStore()

    // computed
    const data = computed(() => store.state.data)
    const depSelec = computed(() => store.state.depSeleccionado)
    const d = computed(() => data.value[depSelec.value])
    const state = computed(() => {
      const vapas = d.value.años.map(a => a.vapas_agregado_bruto)
      const vapaMax = Math.max(...vapas)
      const vapaMin = Math.min(...vapas)
      const range = vapaMax - vapaMin
      return {
        title: d.value.nombre,
        labels: d.value.años.map(a => a.año),
        datasets: [{
          label: d.value.nombre,
          data: vapas,
          backgroundColor: d.value.años.map(a => {
            return `hsl(${Math.floor(((a.vapas_agregado_bruto - vapaMin) / range) * 125)}, 50%, 50%)`
          }),
        }],
      }
    })

    return { state }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
