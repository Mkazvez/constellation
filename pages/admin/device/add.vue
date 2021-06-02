<template>
  <div>
    <h1>Добавить модель прибора</h1>
    <editor-devices />
  </div>
</template>

<script>
import EditorDevices from '@/components/admin/EditorDevices'

export default {
  components: { 'editor-devices': EditorDevices },
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
