<template>
  <section class="section">
    <div class="container">
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
    const actividades = store.state.actividades
    const actividad = computed(() => store.state.actividad)
    const data = computed(() => store.state.data)
    const departamento = computed(() => store.state.departamento)
    const d = computed(() => data.value.departamentos[departamento.value])
    const state = computed(() => {
      const va = d.value.años.map(a => {
        const acs = actividad.value === 0 ? a.actividades : a.actividades.filter(ac => ac.nombre === actividades[actividad.value])
        return acs.reduce((p, c) => p + c.valor, 0)
      })
      const vaMax = Math.max(...va)
      const vaMin = Math.min(...va)
      const range = vaMax - vaMin
      return {
        departamento: capitalizeText(d.value.nombre),
        titulo: capitalizeText(`${data.value.titulo}. ${data.value.tipo_de_valores}. ${data.value.estructura}`),
        valor: capitalizeText(data.value.tipo_de_valores),
        estructura: capitalizeText(data.value.estructura),
        labels: d.value.años.map(a => a.año),
        datasets: [{
          label: d.value.nombre,
          data: va,
          backgroundColor: va.map(a => {
            return `hsl(${Math.floor(((a - vaMin) / range) * 125)}, 50%, 50%)`
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
