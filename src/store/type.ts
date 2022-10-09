import { ISystemState } from './main/system/types'
import { ILoginState } from './login/type'
import { IDashboardState } from './main/analysis/type'
//store 根类型
export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}
//模块类型
export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}
// 交叉并集 为了其他组件使用Store能获取到模块
export type IStoreType = IRootState & IRootWithModule
