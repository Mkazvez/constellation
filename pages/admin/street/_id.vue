<template>
  <div>
    <h1>{{ street.title }}</h1>
    <editor-streets :street="street" />
  </div>
</template>

<script>
import EditorStreets from '@/components/admin/EditorStreets'

export default {
  components: { 'editor-streets': EditorStreets },
  layout: 'admin',
  async asyncData({ params, $axios }) {
    const street = await $axios.$get(`/api/street/${params.id}`)
    return { street }
  },
  head() {
    return { title: this.street.title }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 50px
</style>
