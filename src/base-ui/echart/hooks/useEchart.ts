import * as echart from 'echarts'
import type { EChartsOption } from 'echarts'

// import ChinaMapData from '../data/china.json'
import ChinaMapData from '../map/json/china.json'
// 中国地图注册
echart.registerMap('china', ChinaMapData)

export default function (el: HTMLElement) {
  const echartInstance = echart.init(el)

  const setOptions = (options: EChartsOption) => {
    echartInstance.setOption(options)
  }
  const updataSize = () => {
    echartInstance.resize()
  }

  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
  return { echartInstance, setOptions, updataSize }
}
