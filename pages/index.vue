<template>
  <el-row :gutter="20" class="post-wrapper">
    <el-col v-for="post in posts" :key="post.id" :span="8">
      <app-post :post="post" />
    </el-col>
  </el-row>
</template>

<script>
import consola from 'consola'
import AppPost from '@/components/Post'

export default {
  components: { AppPost },
  async asyncData({ $axios }) {
    try {
      const posts = await $axios.$get('/api/post?value=3')
      return { posts }
    } catch (err) {
      consola.error(err.message)
    }
  },
  head() {
    return { title: 'Management Company' }
  }
}
</script>

<style lang="scss" scoped>
.post-wrapper {
  display: flex;
  align-items: inherit;
  flex-wrap: wrap;
  .el-col {
    margin-bottom: 20px;
  }
}
</style>
