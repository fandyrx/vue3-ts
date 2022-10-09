<template>
  <div class="aside-nav">
    <div class="logo">
      <i class="iconfont icon-houtaiguanlixitong"></i>
      <h3 v-if="!isCollapse" class="title">管理系统</h3>
    </div>
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      :collapse="isCollapse"
      :collapse-transition="false"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 最外层id为1 内含多个导航 -->

        <!-- 1级导航 -->
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <template v-if="item.icon">
                <template v-if="item.icon === 'el-icon-monitor'">
                  <i-ep-monitor />
                </template>
                <template v-if="item.icon === 'el-icon-setting'">
                  <i-ep-setting />
                </template>
                <template v-if="item.icon === 'el-icon-goods'">
                  <i-ep-monitor />
                </template>
                <template v-if="item.icon === 'el-icon-chat-line-round'">
                  <i-ep-chat-line-round />
                </template>

                <!-- <el-icon><component :is="'i-ep-' + item.icon" /></el-icon> -->
                <!-- <el-icon><el-icon-monitor /></el-icon> -->
              </template>
              <span class="menu-name">{{ item.name }}</span>
            </template>
            <!-- 2级导航 -->
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item
                :index="subItem.id + ''"
                @click="handleMenuItemClick(subItem)"
              >
                <i v-if="subItem.icon" :class="subitem.icon"></i>
                {{ subItem.name }}</el-menu-item
              >
            </template>
          </el-sub-menu>
        </template>

        <!-- 1级导航 只有一层-->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span> </el-menu-item
          >>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { pathMapToMenu } from '@/utils/map-menus'

export default defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenus)
    const icon = ref('el-icon-setting')
    //router
    const router = useRouter()
    const route = useRoute()
    const currentPath = route.path

    //data
    const menu = pathMapToMenu(userMenus.value, currentPath)
    //默认激活标题 id
    const defaultValue = ref(menu.id + '')

    //event callback
    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? '/not-found'
      })
    }
    return { userMenus, icon, defaultValue, handleMenuItemClick }
  }
})
</script>

<style scoped lang="less">
.aside-nav {
  overflow: hidden;
  background-color: lightseagreen;

  .logo {
    height: 50px;
    margin: 0 10px;
    display: flex;
    align-items: center;
  }
  .title {
    overflow: hidden;
    color: white;
  }

  .el-menu {
    //一级菜单(子菜单背景)
    border-right: none;
    .el-sub-menu {
      background-color: lightslategrey !important; //菜单默认背景
      .menu-name {
        padding-left: 5px;
      }
      .el-menu-item {
        background-color: #3c7cb9 !important; //二级菜单背景
      }
    }
  }

  ::v-deep .el-sub-menu__title {
    background-color: gray; //一级菜单默认背景
  }

  .el-menu-item:hover {
    color: #fff !important; //文字高亮样式
  }
  .el-menu-item.is-active {
    color: #fff !important; //文字选择中颜色
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100%-50px);
}

.icon-houtaiguanlixitong {
  font-size: 40px;
}
</style>
