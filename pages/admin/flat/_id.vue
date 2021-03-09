<template>
  <div>
    <h1>{{ flat.title }}</h1>
    <editor-flats :flat="flat" />
  </div>
</template>

<script>
import EditorFlats from '@/components/admin/EditorFlats'

export default {
  components: { 'editor-flats': EditorFlats },
  layout: 'admin',
  async asyncData({ params, $axios }) {
    const flat = await $axios.$get(`/api/flat/${params.id}`)
    return { flat }
  },
  head() {
    return { title: this.flat.title }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 50px
</style>
