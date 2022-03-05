<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import localCache from '@/utils/localcache.js'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    // 编写rule规则，elementplus框架也是应用的async-validator库。
    // 常见的两个规则：Required（是否必传）和Pattern（正则规则）
    // rules绑定到 el-form 时，el-form-item 需要通过prop拿到具体的规则
    const rules = {
      // name:[{验证规则1},{验证规则2}]
      // password：[{验证规则1},{验证规则2}]
      name: [
        {
          // 是否必填
          required: true,
          // 不符合条件时，页面显示
          message: '用户名是必需提供的内容',
          // 触发时机，blur失去焦点时，change只要有改变时
          trigger: 'blur'
        },
        {
          // 正则规则
          pattern: /^[a-z0-9]{5,10}$/,
          message: '用户名不符合规则，需要5-10位数',
          trigger: 'blur'
        }
      ],
      password: [
        {
          // 是否必填
          required: true,
          // 不符合条件时，页面显示
          message: '密码是必需提供的内容',
          // 触发时机，blur失去焦点时，change只要有改变时
          trigger: 'blur'
        },
        {
          // 正则规则
          pattern: /^[a-z0-9]{3,}$/,
          message: '用户名不符合规则，需要3位以上的数字或字母',
          trigger: 'blur'
        }
      ]
    }

    // 为了表单信息验证，先获取当前的表单对象
    const formRef = ref()

    const accountLoginAction = (isKeepPassword) => {
      // ElementPlus的Form组件的方法 validate（验证）
      formRef.value.validate((valid) => {
        if (valid) {
          console.log('验证信息通过--提交账号登录的逻辑')
          // 1.判断是否需要记住密码
          if (isKeepPassword.value) {
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          // 2.开始进行登录验证
          // loginModule --> 模块名
          store.dispatch('loginModule/accountLoginAction', { ...account })
        }
      })
    }

    return {
      account,
      rules,
      accountLoginAction,
      formRef
    }
  }
})
</script>

<style lang="less" scoped></style>
