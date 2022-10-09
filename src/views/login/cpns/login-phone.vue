<template>
  <div class="login-phone">
    <el-form label-width="60px" class="form" :model="phone">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="code">
          <el-input v-model="phone.code"></el-input>
          <el-button type="primary" class="code-btn"> 获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const store = useStore()
    const phone = reactive({
      num: '',
      code: ''
    })

    //登录
    const phoneLoginAction = (isKeepPassword: boolean) => {
      console.log('手机登录验证', isKeepPassword)
      store.dispatch('login/phoneLoginAction', { ...phone })
    }
    return { phone, phoneLoginAction }
  }
})
</script>

<style scoped>
.login-phone {
  padding: 0 20px;
}
.form {
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.code {
  display: flex;
}
.code-btn {
  margin-left: 15px;
}
</style>
