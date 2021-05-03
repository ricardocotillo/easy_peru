<template>
  <canvas class="bar-chart" ref="chartEl"></canvas>
</template>

<script>
import { Chart, LinearScale, BarController, CategoryScale, BarElement, Tooltip, Title, PieController, ArcElement } from 'chart.js'
import { onMounted, ref, watch } from 'vue';
Chart.register(LinearScale, BarController, CategoryScale, BarElement, Tooltip, Title, PieController, ArcElement);
export default {
  props: {
    chartType: {
      type: String,
      default: 'bar',
    },
    departamento: String,
    titulo: String,
    valor: String,
    estructura: String,
    labels: {
      type: Array,
      default: () => [],
    },
    datasets: {
      type: Array,
      default: () => [],
    }
  },
  setup(props) {
    // data
    let chart;
    const chartEl = ref(null)
    const mydiv = ref(null)
    const data = {
      labels: props.labels,
      datasets: props.datasets,
    }
    const config = {
      type: props.chartType,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: props.titulo,
          },
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 0
            }
          },
          tooltip: {
            callbacks: {
              label(ctx) {
                return ' ' + ctx.formattedValue
              }
            }
          },
        },
        aspectRatio: .6,
      },
    }
    // watch
    watch(() => props.datasets, () => {
      config.data.labels = props.labels
      config.data.datasets = props.datasets
      config.options.plugins.title.text = props.titulo
      chart.update()
    })

    watch(() => props.chartType, () => {
      chart.destroy()
      config.type = props.chartType
      chart = new Chart(chartEl.value, config)
    })

    // hooks
    onMounted(() => {
      chart = new Chart(chartEl.value, config)
    })
    return { chartEl, mydiv }
  }
}
</script>

<style>
</style>