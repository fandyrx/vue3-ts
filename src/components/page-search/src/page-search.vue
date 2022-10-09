<template>
  <my-form v-bind="searchFormConfig" v-model="formData">
    <template #header>
      <h1 class="title">高级检索</h1>
    </template>
    <template #footer>
      <div class="btn">
        <el-button @click="handleResetClick"
          ><i-ep-RefreshRight />重置</el-button
        >
        <el-button @click="handleSearchClick"><i-ep-Search />搜索</el-button>
      </div>
    </template>
  </my-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MyForm from '@/base-ui/form'
export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    MyForm
  },
  emits: ['resetBtnClick', 'searchBtnClick'],
  setup(props, { emit }) {
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}

    for (const item of formItems) {
      formOriginData[item.field] = ''
    }

    const formData = ref(formOriginData)

    const handleResetClick = () => {
      // for (const key in formOriginData) {
      //   formData[`${key}`] = formOriginData[key]
      // }
      formData.value = formOriginData
      emit('resetBtnClick')
    }
    const handleSearchClick = () => {
      emit('searchBtnClick', formData.value)
    }
    return { formData, handleResetClick, handleSearchClick }
  }
})
</script>

<style lang="less" scoped>
.title {
  text-align: center;
}
.btn {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
