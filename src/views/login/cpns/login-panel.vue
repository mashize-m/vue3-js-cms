<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch>
      <el-tab-pane>
        <template #label>
          <span>
            <el-icon style="top: 2px"><avatar /></el-icon>账号登录
          </span>
        </template>
        <login-account></login-account>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span>
            <el-icon style="top: 2px"><iphone /></el-icon>手机登录
          </span>
        </template>
        <login-phone></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoginClick"> 立即登录 </el-button>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { Avatar, Iphone } from '@element-plus/icons-vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    Avatar,
    Iphone,
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isKeepPassword = ref(true)
    const handleLoginClick = () => {
      console.log('立即登录')
    }
    return {
      isKeepPassword,
      handleLoginClick
    }
  }
})
</script>

<style lang="less" scoped>
.login-panel {
  margin-bottom: 120px;
  width: 320px;

  .title {
    text-align: center;
  }
  .account-control {
    margin-top: 1px;
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
    margin-top: 1px;
  }
}
</style>
