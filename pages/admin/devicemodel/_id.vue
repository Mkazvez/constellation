<template>
  <div>
    <h1>{{ devicemodel.title }}</h1>
    <editor-devicemodels :devicemodel="devicemodel" />
  </div>
</template>

<script>
import EditorDeviceModels from '@/components/admin/EditorDeviceModels'

export default {
  components: { 'editor-devicemodels': EditorDeviceModels },
  layout: 'admin',
  async asyncData({ params, $axios }) {
    const devicemodel = await $axios.$get(`/api/devicemodel/${params.id}`)
    return { devicemodel }
  },
  head() {
    return { title: this.devicemodel.title }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 50px
</style>
