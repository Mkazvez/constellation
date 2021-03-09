<template>
  <div>
    <h1>Добавить улицу</h1>
    <editor-streets />
  </div>
</template>

<script>
import EditorStreets from '@/components/admin/EditorStreets'

export default {
  components: { 'editor-streets': EditorStreets },
  layout: 'admin',
  head() {
    return {
      title: 'Добавить улицу'
    }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 50px
</style>
