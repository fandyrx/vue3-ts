<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <my-card title="分类商品数量(饼图)">
          <pie-echarts :pieData="categoryGoodsCount" />
        </my-card>
      </el-col>
      <el-col :span="10"
        ><my-card title="不同城市商品销量">
          <map-echarts :mapData="addressGoodsSale" title="城市销量" />
        </my-card>
      </el-col>
      <el-col :span="7">
        <my-card title="分类商品数量(玫瑰图)">
          <rose-echarts :rose-data="categoryGoodsCount" :radius="[20, 80]" />
        </my-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <my-card title="分类商品销量">
          <line-echarts v-bind="categoryGoodsSale" />
        </my-card>
      </el-col>
      <el-col :span="12">
        <my-card title="分类商品收藏">
          <bar-echarts v-bind="categoryGoodsFavor" />
        </my-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import MyCard from '@/base-ui/card'
import {
  PieEcharts,
  RoseEcharts,
  LineEcharts,
  MapEcharts,
  BarEcharts
} from '@/components/page-echart'

export default defineComponent({
  name: 'dashboard',
  components: {
    MyCard,
    PieEcharts,
    RoseEcharts,
    LineEcharts,
    MapEcharts,
    BarEcharts
  },
  setup() {
    //1.获取页面数据存储在vuex
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')
    //2.获取 饼图 图表数据
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    //3.折线图
    const categoryGoodsSale = computed(() => {
      const XAxisData: string[] = []
      const values: any[] = []

      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        XAxisData.push(item.name)
        values.push(item.goodsCount)
      }
      return { XAxisData, values }
    })

    //4.地图
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })

    //5.柱状图
    const categoryGoodsFavor = computed(() => {
      const XAxisData: string[] = []
      const values: any[] = []

      const goodsFavorResult = store.state.dashboard.categoryGoodsFavor
      for (const item of goodsFavorResult) {
        XAxisData.push(item.name)
        values.push(item.goodsFavor)
      }
      return { XAxisData, values }
    })

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      addressGoodsSale,
      categoryGoodsFavor
    }
  }
})
</script>

<style scoped lang="less">
.content-row {
  margin-top: 20px;
}
</style>
