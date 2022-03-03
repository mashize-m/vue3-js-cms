<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const account = reactive({
      name: '',
      password: ''
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

    return { account, rules }
  }
})
</script>

<style lang="less" scoped></style>
