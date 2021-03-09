<template>
  <div>
    <h1>{{ servicemanafacture.title }}</h1>
    <editor-servicemanafactures :servicemanafacture="servicemanafacture" />
  </div>
</template>

<script>
import EditorServiceManafactures from '@/components/admin/EditorServiceManafacture'

export default {
  components: { 'editor-servicemanafactures': EditorServiceManafactures },
  layout: 'admin',
  async asyncData({ params, $axios }) {
    const servicemanafacture = await $axios.$get(
      `/api/servicemanafacture/${params.id}`
    )
    return { servicemanafacture }
  },
  head() {
    return { title: this.servicemanafacture.title }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 50px
</style>
