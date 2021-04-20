<template>
  <canvas class="bar-chart" ref="chartEl"></canvas>
</template>

<script>
import { Chart, LinearScale, BarController, CategoryScale, BarElement, Title } from 'chart.js'
import { onMounted, ref } from 'vue';
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
        aspectRatio: .9
      },
    }

    onMounted(() => {
      chart = new Chart(chartEl.value, config)
    })

    console.log(chart)

    return { chartEl, mydiv }
  }
}
</script>

<style>
</style>