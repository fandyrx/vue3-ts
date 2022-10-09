<template>
  <el-container class="layout">
    <el-aside :width="isCollapse ? '60px' : '200px'" class="aside">
      <AsideNav :isCollapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <HeaderNav @foldChange="handleChange" />
      </el-header>
      <el-main class="main-content">
        <div class="content-views">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { AsideNav, HeaderNav } from '@/components/main-nav'
export default defineComponent({
  components: {
    HeaderNav,
    AsideNav
  },
  setup() {
    const isCollapse = ref(false)
    const handleChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    return { handleChange, isCollapse }
  }
})
</script>

<style scoped lang="less">
.layout {
  width: 100%;
  height: 100%;

  .header {
    height: 50px;
  }
  .aside {
    overflow-x: hidden;
    // transition: all linear 0.33s;
    background-color: lightslategrey;
    transition: width 0.2s;
    -webkit-transition: width 0.2s;
    -moz-transition: width 0.2s;
    -webkit-transition: width 0.2s;
    -o-transition: width 0.2s;
  }
  .main-content {
    background-color: #f3f3f3;
    .content-views {
      background-color: #fff;
    }
  }
}
</style>
