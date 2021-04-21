<template>
  <section class="section">
    <div class="container">
      {{state.datasets}}
      <div class="columns is-centered">
        <div class="column is-two-thirds">
          <BarChart
            v-if="state.labels.length > 0 && state.datasets.length > 0"
            :departamento="state.departamento"
            :valor="state.valor"
            :estructura="state.estructura"
            :titulo="state.titulo"
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
import { capitalizeText } from '../commons/helpers.common'
import BarChart from '../components/barChart.component'
export default {
  components: { BarChart },
  name: 'HelloWorld',
  setup() {
    // data
    const store = useStore()

    // computed
    const data = computed(() => store.state.data)
    const departamento = computed(() => store.state.departamento)
    const d = computed(() => data.value.departamentos[departamento.value])
    const state = computed(() => {
      const vapas = d.value.años.map(a => a.vapas_agregado_bruto)
      const vapaMax = Math.max(...vapas)
      const vapaMin = Math.min(...vapas)
      const range = vapaMax - vapaMin
      return {
        departamento: capitalizeText(d.value.nombre),
        titulo: capitalizeText(`${data.value.titulo} ${data.value.tipo_de_valores} ${data.value.estructura}`),
        valor: capitalizeText(data.value.tipo_de_valores),
        estructura: capitalizeText(data.value.estructura),
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

    return { state, data }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
