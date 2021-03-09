<template>
  <el-card
    :body-style="{ height: '100%', position: 'relative' }"
    shadow="hover"
  >
    <p class="title">{{ post.title }}</p>
    <p class="date">{{ $moment(post.createdAt).format('LL') }}</p>
    <nuxt-link :to="`/news/${post.id}`" class="primary-link">
      читать еще...
    </nuxt-link>
  </el-card>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default() {
        return null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  height: 100%;
  .title {
    margin-bottom: 40px;
  }
  .date {
    position: absolute;
    bottom: 20px;
    left: 20px;
    color: #a0a0a0;
    font-size: 14px;
  }
  a {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
}
</style>
