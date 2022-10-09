<template>
  <div class="user">
    <div class="search">
      <page-search
        :searchFormConfig="searchFormConfig"
        @resetBtnClick="handleResetClick"
        @searchBtnClick="handleSelectClick"
      />
      <page-content
        :contentTableConfig="contentTableConfig"
        pageName="users"
        ref="pageContentRef"
        @newBtnClick="handleNewData"
        @editBtnClick="handleEditData"
      />
      <PageModal
        :defaultInfo="defaultInfo"
        ref="pageModalRef"
        :modalConfig="modalConfigRef"
        pageName="users"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store/index'

import PageSearch from '@/components/page-search/index'
import PageContent from '@/components/page-content/index'
import PageModal from '@/components/page-modal'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
//hooks
import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleSelectClick] =
      usePageSearch()

    //密码框显示逻辑
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find((item) => {
        return item.field === 'password'
      })

      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find((item) => {
        return item.field === 'password'
      })

      passwordItem!.isHidden = true
    }
    //动态添加部门,角色列表
    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find((item) => {
        return item.field === 'departmentId'
      })
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      //role
      const roleItem = modalConfig.formItems.find((item) => {
        return item.field === 'roleId'
      })
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })

      return modalConfig
    })

    //hooks 获取公共变量,函数
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newCallback, editCallback)

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfigRef,
      pageContentRef,
      pageModalRef,
      handleResetClick,
      handleSelectClick,
      handleNewData,
      handleEditData,
      defaultInfo
    }
  }
})
</script>

<style scoped></style>
