<template>
  <canvas class="bar-chart" ref="chartEl"></canvas>
</template>

<script>
import { Chart, LinearScale, BarController, CategoryScale, BarElement, Title } from 'chart.js'
import { onMounted, ref, watch } from 'vue';
Chart.register(LinearScale, BarController, CategoryScale, BarElement, Title);
export default {
  props: {
    title: String,
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
      type: 'bar',
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: props.title,
          }
        },
        aspectRatio: .6,
      },
    }
    // watch
    watch(() => props.title, () => {
      config.data.labels = props.labels
      config.data.datasets = props.datasets
      config.options.plugins.title.text = props.title
      chart.update()
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