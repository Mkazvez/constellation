<template>
  <div>
    <h1>Добавить модель прибора</h1>
    <editor-devicemarks />
  </div>
</template>

<script>
import EditorDeviceMarks from '@/components/admin/EditorDeviceMarks'

export default {
  components: { 'editor-devicemarks': EditorDeviceMarks },
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
