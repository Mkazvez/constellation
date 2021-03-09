<template>
  <el-container :style="{ position: 'relative' }" class="container">
    <el-aside width="230px">
      <personal-aside />
      <el-button type="primary" @click="logout">Выйти</el-button>
    </el-aside>
    <el-main>
      <nuxt />
    </el-main>
  </el-container>
</template>

<script>
import PersonalAside from '@/components/personal/Aside'

export default {
  components: { PersonalAside },
  middleware: 'authUser',
  methods: {
    async logout() {
      await this.$axios.$get('/api/auth/logout')
      this.$store.commit('auth/setUser', { user: null, role: null })
      await this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  height: 100%;
}

button {
  position: absolute;
  left: 70px;
  bottom: 30px;
}
</style>
