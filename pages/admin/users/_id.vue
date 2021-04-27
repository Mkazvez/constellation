<template>
  <div>
    <h1>
      {{ usere.firstName }} {{ usere.lastName }} {{ usere.patronymicName }}
    </h1>
    <editor-users :usere="usere" />
  </div>
</template>

<script>
import EditorUsers from '@/components/admin/editorUsers'

export default {
  components: { 'editor-users': EditorUsers },
  layout: 'admin',
  async asyncData({ params, $axios }) {
    const usere = await $axios.$get(`/api/user/${params.id}`)
    return { usere }
  },
  head() {
    return { title: this.usere.firstName }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 50px
</style>
