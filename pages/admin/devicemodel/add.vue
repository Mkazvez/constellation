<template>
  <div>
    <h1>Добавить модель прибора</h1>
    <editor-devicemodels />
  </div>
</template>

<script>
import EditorDeviceModels from '@/components/admin/EditorDeviceModels'

export default {
  components: { 'editor-devicemodels': EditorDeviceModels },
  layout: 'admin',
  head() {
    return {
      title: 'Добавить модель прибора'
    }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 50px
</style>
