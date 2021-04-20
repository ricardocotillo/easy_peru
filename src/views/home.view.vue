<template>
  <BarChart
    v-if="labels.length > 0 && datasets.length > 0"
    title="Tumbes"
    :labels="labels"
    :datasets="datasets"
  />
</template>

<script>
import { reactive } from 'vue'
import axios from 'axios'
import BarChart from '../components/barChart.component'
export default {
  components: { BarChart },
  name: 'HelloWorld',
  setup() {
    const labels = reactive([])
    const datasets = reactive([])
    axios.get('http://localhost:8000/pbi/?valor=constante&estructura=soles')
      .then(res => {
        const departamentos = res.data.departamentos
        const d = departamentos[0]
        const vapas = d.años.map(a => a.vapas_agregado_bruto)
        const vapaMax = Math.max(...vapas)
        const vapaMin = Math.min(...vapas)
        const range = vapaMax - vapaMin
        labels.push(...d.años.map(a => a.año))
        datasets.push({
          label: d.nombre,
          data: vapas,
          backgroundColor: d.años.map(a => {
            return `hsl(${Math.floor(((a.vapas_agregado_bruto - vapaMin) / range) * 125)}, 50%, 50%)`
          }),
          barThickness: 40,
        })
      })
    return { labels, datasets }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
