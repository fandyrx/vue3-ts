<template>
  <div class="base-echart">
    <div ref="echartRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'

import type { EChartsOption } from 'echarts'
import useEchart from '../hooks/useEchart'

const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
    clickCb?: any
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const echartRef = ref<HTMLElement>()

onMounted(() => {
  const { setOptions, echartInstance } = useEchart(echartRef.value)
  watchEffect(() => {
    setOptions(props.options)
  })

  if (props.clickCb) {
    echartInstance.on('click', function (params) {
      props.clickCb(echartInstance, params)
    })
  }
})
</script>

<style lang="scss" scoped></style>
