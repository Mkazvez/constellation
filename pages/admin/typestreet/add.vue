<template>
  <div>
    <h1>Добавить тип улицы</h1>
    <editor-typestreets />
  </div>
</template>

<script>
import EditorTypeStreets from '@/components/admin/EditorTypeStreets'

export default {
  components: { 'editor-typestreets': EditorTypeStreets },
  layout: 'admin',
  head() {
    return {
      title: 'Добавить тип улицы'
    }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 50px
</style>
