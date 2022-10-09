<template>
  <div class="login-panel">
    <h2 class="title">后台管理系统</h2>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><i-ep-User /> </el-icon>
            <span>用户登录</span>
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><i-ep-Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link :underline="false">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-button" @click="handleLogin"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: { LoginPhone, LoginAccount },
  setup() {
    const isKeepPassword = ref(true)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref<string>('account')

    const handleLogin = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        phoneRef.value?.phoneLoginAction(isKeepPassword.value)
      }
    }
    return {
      isKeepPassword,
      accountRef,
      phoneRef,
      currentTab,
      handleLogin
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 380px;
  margin-bottom: 150px;
  .title {
    text-align: center;
  }
  .account-control {
    display: flex;
    justify-content: space-between;
    .el-checkbox {
      font-weight: 700;
      --el-checkbox-text-color: var(--el-color-danger-light-9);
    }
    .el-link {
      font-weight: 700;
      --el-link-text-color: var(--el-color-danger-light-9);
      --el-link-hover-text-color: var(--el-color-primary);
    }
  }

  .login-button {
    margin-top: 10px;

    width: 100%;
  }
}
</style>
