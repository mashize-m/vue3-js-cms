<template>
  <div class="login-phone">
    <el-form label-width="auto" :rules="rules" :model="phone">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num" />
      </el-form-item>

      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code" />
          <el-button type="primary" class="code-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const phone = reactive({
      num: '',
      code: ''
    })

    // 编写规则
    const rules = {
      // name:[{验证规则1},{验证规则2}]
      // password：[{验证规则1},{验证规则2}]
      num: [
        {
          // 是否必填
          required: true,
          // 不符合条件时，页面显示
          message: '手机号码是必需提供的内容',
          // 触发时机，blur失去焦点时，change只要有改变时
          trigger: 'blur'
        },
        {
          // 正则规则
          pattern: /^[0-9]{11}$/,
          message: '请输入正确的手机号码',
          trigger: 'blur'
        }
      ],
      code: [
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
          pattern: /^[0-9]{4}$/,
          message: '请输入正确的验证码',
          trigger: 'blur'
        }
      ]
    }
    return {
      phone,
      rules
    }
  }
})
</script>

<style scoped>
.get-code {
  display: flex;
}
.code-btn {
  margin-left: 8px;
}
</style>
