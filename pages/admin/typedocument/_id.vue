<template>
  <div>
    <h1>{{ typedocument.title }}</h1>
    <editor-typedocuments :typedocument="typedocument" />
  </div>
</template>

<script>
import EditorTypeDocuments from '@/components/admin/EditorTypeDocuments'

export default {
  components: { 'editor-typedocuments': EditorTypeDocuments },
  layout: 'admin',
  async asyncData({ params, $axios }) {
    const typedocument = await $axios.$get(`/api/typedocument/${params.id}`)
    return { typedocument }
  },
  head() {
    return { title: this.typedocument.title }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 50px
</style>
