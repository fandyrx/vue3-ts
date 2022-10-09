<template>
  <div class="bar-echart">
    <base-echart :options="options" :clickCb="clickCbs"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue'
import BaseEchart from '@/base-ui/echart'
import * as echarts from 'echarts'

const props = withDefaults(
  defineProps<{
    XAxisData: string[]
    values: any[]
    title?: string
    subTitle?: string
  }>(),
  {
    title: '',
    subTitle: ''
  }
)

let yMax = 500
let dataShadow = []
for (let i = 0; i < props.values.length; i++) {
  dataShadow.push(yMax)
}

const options = computed(() => {
  return {
    title: {
      text: props.title,
      subtext: props.subTitle
    },
    xAxis: {
      data: props.XAxisData,
      axisLabel: {
        inside: true,
        color: '#fff'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: props.values
      }
    ]
  }
})

const clickCbs = function (echartInstance, params) {
  const zoomSize = 6
  //1.获取 echart 实例
  // console.log(props.XAxisData[Math.max(params.dataIndex - zoomSize / 2, 0)])
  //2.绑定点击事件 ,   发射事件
  echartInstance.dispatchAction({
    type: 'dataZoom',
    startValue: props.XAxisData[Math.max(params.dataIndex - zoomSize / 2, 0)],
    endValue:
      props.XAxisData[
        Math.min(params.dataIndex + zoomSize / 2, props.values.length - 1)
      ]
  })
}
</script>

<style lang="scss" scoped></style>
