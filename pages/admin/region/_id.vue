<template>
  <div>
    <h1>{{ region.title }}</h1>
    <editor-regions :region="region" />
  </div>
</template>

<script>
import EditorRegions from '@/components/admin/EditorRegions'

export default {
  components: { 'editor-regions': EditorRegions },
  layout: 'admin',
  async asyncData({ params, $axios }) {
    const region = await $axios.$get(`/api/region/${params.id}`)
    return { region }
  },
  head() {
    return { title: this.regio.title }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 50px
</style>
