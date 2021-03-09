<template>
  <div>
    <h1>{{ post.title }}</h1>
    <editor-news :post="post" />
  </div>
</template>

<script>
import EditorNews from '@/components/admin/EditorNews'

export default {
  components: { EditorNews },
  layout: 'admin',
  async asyncData({ params, $axios }) {
    const post = await $axios.$get(`/api/post/${params.id}`)
    return { post }
  },
  head() {
    return { title: this.post.title }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 50px
</style>
