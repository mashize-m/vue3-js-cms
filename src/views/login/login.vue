<template>
  <div class="login">
    <login-panel></login-panel>
  </div>
</template>

<script>
import LoginPanel from './cpns/login-panel.vue'
export default {
  components: {
    LoginPanel
  },
  setup() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
}
</style>
