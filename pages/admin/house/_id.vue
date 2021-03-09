<template>
  <div>
    <h1>{{ house.title }}</h1>
    <editor-houses :house="house" />
  </div>
</template>

<script>
import EditorHouses from '@/components/admin/EditorHouses'

export default {
  components: { 'editor-houses': EditorHouses },
  layout: 'admin',
  async asyncData({ params, $axios }) {
    const house = await $axios.$get(`/api/house/${params.id}`)
    return { house }
  },
  head() {
    return { title: this.house.title }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 50px
</style>
