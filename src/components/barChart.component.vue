<template>
  <canvas class="bar-chart" ref="chartEl" width="400" height="400"></canvas>
</template>

<script>
import { Chart, LinearScale, BarController, CategoryScale, BarElement } from 'chart.js'
import { onMounted, ref } from 'vue';
Chart.register(LinearScale, BarController, CategoryScale, BarElement);
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
        scales: {
          y: {
            beginAtZero: true
          }
        },
        aspectRatio: 2
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
.bar-chart {
  width: 700px;
}
</style>