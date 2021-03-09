<template>
  <div>
    <h1>{{ typestreet.title }}</h1>
    <editor-typestreets :typestreet="typestreet" />
  </div>
</template>

<script>
import EditorTypeStreets from '@/components/admin/EditorTypeStreets'

export default {
  components: { 'editor-typestreets': EditorTypeStreets },
  layout: 'admin',
  async asyncData({ params, $axios }) {
    const typestreet = await $axios.$get(`/api/typeStreet/${params.id}`)
    return { typestreet }
  },
  head() {
    return { title: this.typestreet.title }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 50px
</style>
