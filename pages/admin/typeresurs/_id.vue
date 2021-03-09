<template>
  <div>
    <h1>{{ typeresurs.title }}</h1>
    <editor-typeresurss :typeresurs="typeresurs" />
  </div>
</template>

<script>
import EditorTypeResurss from '@/components/admin/EditorTypeResurs'

export default {
  components: { 'editor-typeresurss': EditorTypeResurss },
  layout: 'admin',
  async asyncData({ params, $axios }) {
    const typeresurs = await $axios.$get(`/api/typeresurs/${params.id}`)
    return { typeresurs }
  },
  head() {
    return { title: this.typeresurs.title }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 50px
</style>
