import { Module } from 'vuex'
import { ILoginState } from './type'
import { IRootState } from '../type'
import { IAccount } from '@/services/login/type'
import LocalCache from '@/utils/cache'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'

import {
  accountLoginRequest,
  reqUserInfoById,
  reqUserMenusByRoleId
} from '@/services/login/login'
import router from '@/router'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, token) {
      state.token = token
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus) {
      state.userMenus = userMenus

      //useMenus = > routes    //路由
      const routes = mapMenusToRoutes(userMenus)
      //routes => router.main.children    面包屑
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      //按钮权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  getters: {},
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      //1.用户登录
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)

      LocalCache.setCache('token', token)
      //获取 初始化请求 角色,department
      dispatch('getInitialDataAction', null, { root: true })
      //2.获取用户信息
      const userInfoResult = await reqUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)

      LocalCache.setCache('userInfo', userInfo)
      //3.获取用户菜单权限
      const userMenuResult = await reqUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenuResult.data
      console.log(userMenus)
      commit('changeUserMenus', userMenus)
      LocalCache.setCache('userMenus', userMenus)

      // 页面跳转
      router.push('/main')
    },
    // 手机登录
    // phoneLoginAction({ commit }, payload: any) {
    //   console.log('store手机验证登录触发', payload)
    // },
    //初始化用户 数据
    loadLocalLogin({ commit, dispatch }) {
      const token = LocalCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        //获取 初始化请求 角色,department
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = LocalCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = LocalCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
