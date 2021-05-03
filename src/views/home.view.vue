<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column-1">
          <img class="chart-type" :class="chartType == 'bar' ? 'active' : null" src="@/assets/bar-chart.svg" @click="changeChartType('bar')" />
        </div>
        <div class="column-1">
          <img class="chart-type" :class="chartType == 'pie' ? 'active' : null" src="@/assets/pie-chart.svg" @click="changeChartType('pie')" />
        </div>
      </div>
    </div>
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-two-thirds">
          <BarChart
            v-if="state.labels.length > 0 && state.datasets.length > 0"
            :chartType="chartType"
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
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import BarChart from '../components/barChart.component'
export default {
  components: { BarChart },
  setup() {
    // store
    const store = useStore()

    // data
    const chartType = ref('bar')

    // methods
    const changeChartType = (ct) => chartType.value = ct

    // computed
    const data = computed(() => store.state.data)
    const year = computed(() => store.state.año)
    const department = computed(() => store.state.departamento)

    const state = computed(() => {
      const values = {}
      if (year.value > 0) {
        if (department.value > 0) {
          data.value.forEach(ea => {
            values[ea.economicActivity.name] = values[ea.economicActivity.name] === undefined ? ea.value : values[ea.economicActivity.name] + ea.value
          })
        } else {
          data.value.forEach(ea => {
            values[ea.department.name] = values[ea.department.name] === undefined ? ea.value : values[ea.department.name] + ea.value
          })
        }
      } else {
        data.value.forEach(ea => {
          values[ea.year] = values[ea.year] === undefined ? ea.value : values[ea.year] + ea.value
        })
      }
      const labels = Object.keys(values).sort((a, b) => a - b)
      const va = labels.map(k => values[k])
      const vaMax = Math.max(...va)
      const vaMin = Math.min(...va)
      const range = vaMax - vaMin
      return {
        departamento: '',
        titulo: '',
        valor: '',
        estructura: '',
        labels: labels,
        datasets: [{
          label: 'd.value.nombre',
          data: va,
          backgroundColor: va.map(a => {
            return `hsl(${Math.floor(((a - vaMin) / range) * 125)}, 50%, 50%)`
          }),
        }],
      }
    })

    return { state, data, chartType, changeChartType }
  }
}
</script>

<style scoped>
  .chart-type {
    width: 50px;
    margin: 0 10px;
    padding: .5em;
    cursor: pointer;
    border: 1px solid lightgray;
    border-radius: 5px;
  }
  .chart-type.active {
    border-color: rgb(25, 25, 92);
  }
</style>
