import { IBreadcrumb } from './../base-ui/breadcrumb/types/index'
import { RouteRecordRaw } from 'vue-router' //路由数组类型

let firstMenu: any = null
//2.根据请求到的用户权限,获取对应路由地址
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  //1.加载默认所有routes
  const allRoutes: RouteRecordRaw[] = []

  const routeFiles = require.context('../router/main/', true, /\.ts/) //webpack 工具函数:  获取工作区,对应文件夹下,递归查找(true),.ts文件

  routeFiles.keys().forEach((key) => {
    // .keys() 获取文件路径  ['./analysis/dashboard/dashboard.ts', './analysis/overview/overview.ts'...]
    const route = require('../router/main' + key.split('.')[1]) //根据路径获取模块对象Modules
    allRoutes.push(route.default)
  })

  //2.根据菜单获取需要添加的routes  递归查找(根据allRoutes,查找符合用户权限菜单的2级路由,并返回)
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) {
          routes.push(route)
        }
        if (!firstMenu) {
          firstMenu = menu //用于页面刷新,保留在第一个默认菜单
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)
  return routes
}
//1.根据用户权限 , 获取侧边栏导航组件 点击时对应 路径
//  /main/system/role =>  type===2 二级菜单 对应menu
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)

  return breadcrumbs
}

export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)

  return permissions
}

export function getMenuLeafKeys(menuList: any[]) {
  const leafKeys: number[] = []

  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leafKeys.push(menu.id)
      }
    }
  }

  _recurseGetLeaf(menuList)

  return leafKeys
}

export { firstMenu }
