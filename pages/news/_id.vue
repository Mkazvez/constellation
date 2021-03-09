<template>
  <div class="post-wrapper">
    <h1>{{ post.title }}</h1>
    <p class="date">{{ $moment(post.createdAt).format('LL') }}</p>
    <div class="text-container">
      <client-only>
        <quill-editor :content="post.text" :options="editorOption" disabled />
      </client-only>
    </div>
  </div>
</template>

<script>
import consola from 'consola'

export default {
  async asyncData({ $axios, params }) {
    try {
      const post = await $axios.$get(`/api/post/${params.id}`)
      return { post }
    } catch (err) {
      consola.error(err.message)
    }
  },
  data() {
    return {
      editorOption: {
        // modules: { toolbar: false },
        theme: 'bubble'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.post-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    margin: 10px 0;
  }
  .date {
    margin-bottom: 10px;
    color: #a0a0a0;
  }
  .text-container {
    width: 100%;
  }
}
</style>
