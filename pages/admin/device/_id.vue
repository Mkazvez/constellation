<template>
  <div>
    <h1>{{ device.title }}</h1>
    <editor-devices :device="device" />
  </div>
</template>

<script>
import EditorDevices from '@/components/admin/EditorDevices'

export default {
  components: { 'editor-devices': EditorDevices },
  layout: 'admin',
  async asyncData({ params, $axios }) {
    const device = await $axios.$get(`/api/device/${params.id}`)
    return { device }
  },
  head() {
    return { title: this.device.title }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 50px
</style>
