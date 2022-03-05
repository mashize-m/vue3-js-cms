<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab" @click="changeKeepPassword()">
      <el-tab-pane name="account">
        <template #label>
          <span>
            <el-icon style="top: 2px"><avatar /></el-icon>账号登录
          </span>
        </template>
        <!-- 3.组件中通过ref属性绑定accountRef -->
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span>
            <el-icon style="top: 2px"><iphone /></el-icon>手机登录
          </span>
        </template>
        <login-phone ref="phoneRef"></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword" :class="{ active: isActive }">记住密码</el-checkbox>
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

    // 1.定义一个null的ref对象
    const accountRef = ref(null)
    const phoneRef = ref(null)
    const currentTab = ref('account')
    const isActive = ref(false)

    const handleLoginClick = () => {
      console.log('立即登录')
      // 4.获取到组件对象，进行使用
      if (currentTab.value === 'account') {
        accountRef.value?.accountLoginAction(isKeepPassword)
      } else if (currentTab.value === 'phone') {
        phoneRef.value?.phoneLoginAction()
      }
    }
    // 账号登录和手机登录切换
    const changeKeepPassword = () => {
      if (currentTab.value === 'phone') {
        isActive.value = true
      } else if (currentTab.value === 'account') {
        isActive.value = false
      }
    }

    return {
      isKeepPassword,
      handleLoginClick,
      // 2.将accountRef返回出去
      accountRef,
      phoneRef,
      currentTab,
      isActive,
      changeKeepPassword
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
  .active {
    visibility: hidden;
  }
  .login-btn {
    width: 100%;
    margin-top: 1px;
  }
}
</style>
