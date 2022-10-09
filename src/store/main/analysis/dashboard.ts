import { Module } from 'vuex'

import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/services/main/analysis/dashboard'

import { IDashboardState } from './type'
import { IRootState } from '../../type'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,

  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const res1 = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', res1.data)

      const res2 = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', res2.data)

      const res3 = await getCategoryGoodsFavor()
      commit('changeCategoryGoodsFavor', res3.data)

      const res4 = await getAddressGoodsSale()
      commit('changeAddressGoodsSale', res4.data)
    }
  }
}

export default dashboardModule
