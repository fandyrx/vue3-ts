<template>
  <div class="login-account">
    <el-form
      label-width="60px"
      status-icon
      :rules="rules"
      :model="account"
      class="form"
      ref="formRef"
    >
      <el-form-item label="账号" prop="name" class="input">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="account.password"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'
import localCache from '@/utils/cache'

import rules from './config/account-config'

export default defineComponent({
  setup() {
    const store = useStore()
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    // 登录
    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          //验证通过
          if (isKeepPassword) {
            //1.保存密码账户
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          //2.登录验证
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }

    return { account, rules, loginAction, formRef }
  }
})
</script>

<style scoped>
.login-account {
  padding: 0 20px;
}
.form {
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
</style>
