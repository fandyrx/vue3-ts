<template>
  <div class="line-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue'
import BaseEchart from '@/base-ui/echart'

import { convertData } from '../utils/convertData'
import type { IDataType } from '../types'

const props = withDefaults(
  defineProps<{
    title?: string
    mapData: IDataType[]
  }>(),
  {
    title: ''
  }
)

const options = computed(() => {
  return {
    backgroundColor: '#fff',
    title: {
      text: props.title,
      left: 'center'
    },
    //空间间隔 比例 grid 布局
    grid: {
      bottom: '0%',
      top: '10%',
      left: '10%',
      right: '10%'
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: '#FFFFFF',
      borderWidth: 0,
      position: 'top',
      borderColor: '#FFFFFF',

      formatter: function (params: any) {
        if (params.value) {
          return params.name + ':' + params.value[2]
        }
        return
      }
    },

    //数据密集度 分析
    visualMap: [
      {
        min: 0,
        max: 70000,
        seriesIndex: 0,
        show: true,
        left: 20,
        bottom: 20,
        calculable: true,
        text: ['高', '低'],
        inRange: {
          color: ['#FFFFFF', 'lightskyblue', 'yellow', 'orangered']
        },
        textStyle: {
          color: '#0B1C51', //legend图标颜色  深灰
          size: 20
        },
        formatter: function (value) {
          return value.toFixed(1)
          //       return "";    左下角图例滑过时显示空值
        }
      }
    ],
    // geo:地图坐标系
    geo: {
      map: 'china',
      show: true,
      roam: false
    },
    series: [
      // 展示数据
      {
        name: '销量',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        showEffectOn: 'render',
        data: convertData(props.mapData),
        rippleEffect: {
          brushType: 'stroke',
          scale: 5,
          period: 2 // 秒数
        },
        symbolSize: 12,
        clickable: false,

        label: {
          formatter: '{b}',
          position: 'right',
          show: true
        }

        // zlevel: 1
      },
      // 地图
      {
        type: 'map',
        map: 'china',
        aspectScale: 0.75,
        clickable: false,
        geoIndex: 0,
        data: []
      }
    ]
  }
})
</script>

<style lang="scss" scoped></style>
