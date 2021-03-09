<template>
  <div>
    <h1>Добавить тип прибора</h1>
    <editor-typedevices />
  </div>
</template>

<script>
import EditorTypeDevices from '@/components/admin/EditorTypeDevices'

export default {
  components: { 'editor-typedevices': EditorTypeDevices },
  layout: 'admin',
  head() {
    return {
      title: 'Добавить тип прибора'
    }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 50px
</style>
