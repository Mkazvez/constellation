<template>
  <el-container :style="{ position: 'relative' }" class="container">
    <el-aside width="230px">
      <admin-aside />
      <el-button type="primary" @click="logout">Выйти</el-button>
    </el-aside>
    <el-main>
      <nuxt />
    </el-main>
  </el-container>
</template>

<script>
import AdminAside from '@/components/admin/Aside'

export default {
  components: { AdminAside },
  middleware: 'authAdmin',
  methods: {
    async logout() {
      await this.$axios.$get('/api/auth/logout')
      this.$store.commit('auth/setUser', { role: null, user: null })
      await this.$router.push('/')
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  position: relative
  height: 100%

button
  position: absolute
  left: 70px
  bottom: 30px
</style>
