<template>
  <div class="header-nav">
    <div class="folder" @click="handleFoldChange">
      <i-ep-Expand v-if="isFold" />
      <i-ep-Fold v-else />
    </div>
    <div class="content">
      <my-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
import MyBreadcrumb from '@/base-ui/breadcrumb'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    UserInfo,
    MyBreadcrumb
  },

  emits: ['foldChange'],

  setup(props, { emit }) {
    const isFold = ref<boolean>(false)
    const handleFoldChange = function () {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    const store = useStore()

    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path

      return pathMapBreadcrumbs(userMenus, currentPath)
    })
    return { isFold, handleFoldChange, breadcrumbs }
  }
})
</script>

<style scoped lang="less">
.header-nav {
  display: flex;
  height: 100%;
  .folder {
    width: 30px;
    height: 30px;
    margin-top: 10px;
    font-size: 25px;
    cursor: pointer;
  }
  .content {
    padding: 0 10px;
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
