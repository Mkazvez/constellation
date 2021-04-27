<template>
  <el-header>
    <p>Группа компаний "Созвездия"</p>
    <div v-if="user" class="user">
      <p class="user-name">
        {{ user.firstName }} {{ user.patronymicName }} {{ user.lastName }}
      </p>
      <el-button type="primary" size="medium" @click="goPersonal">
        Личный кабинет
      </el-button>
    </div>
    <div v-else class="user">
      <el-button type="primary" size="medium" @click="authRedirect">
        Войти
      </el-button>
    </div>
  </el-header>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    authRedirect() {
      this.$router.push('/auth')
    },
    goPersonal() {
      this.$router.push('/personal')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 38px;
    color: #333;
    font-weight: 300;
  }
  .user {
    position: absolute;
    right: 60px;
  }
  .user-name {
    font-size: 20px;
  }
}
</style>
