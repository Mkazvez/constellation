<template>
  <div>
    <h1>Добавить тип документа</h1>
    <editor-typedocuments />
  </div>
</template>

<script>
import EditorTypeDocuments from '@/components/admin/EditorTypeDocuments'

export default {
  components: { 'editor-typedocuments': EditorTypeDocuments },
  layout: 'admin',
  head() {
    return {
      title: 'Добавить тип документа'
    }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 50px
</style>
