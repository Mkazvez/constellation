<template>
  <div>
    <h1>{{ typedevice.title }}</h1>
    <editor-typedevices :typedevice="typedevice" />
  </div>
</template>

<script>
import EditorTypeDevices from '@/components/admin/EditorTypeDevices'

export default {
  components: { 'editor-typedevices': EditorTypeDevices },
  layout: 'admin',
  async asyncData({ params, $axios }) {
    const typedevice = await $axios.$get(`/api/typedevice/${params.id}`)
    return { typedevice }
  },
  head() {
    return { title: this.typedevice.title }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 50px
</style>
