<template>
  <div>
    <h1>{{ devicemark.title }}</h1>
    <editor-devicemarks :devicemark="devicemark" />
  </div>
</template>

<script>
import EditorDeviceMarks from '@/components/admin/EditorDeviceMarks'

export default {
  components: { 'editor-devicemarks': EditorDeviceMarks },
  layout: 'admin',
  async asyncData({ params, $axios }) {
    const devicemark = await $axios.$get(`/api/devicemark/${params.id}`)
    return { devicemark }
  },
  head() {
    return { title: this.devicemark.title }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 50px
</style>
