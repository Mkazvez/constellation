<template>
  <div>
    <h1>Добавить регион</h1>
    <editor-regions />
  </div>
</template>

<script>
import EditorRegions from '@/components/admin/EditorRegions'

export default {
  components: { 'editor-regions': EditorRegions },
  layout: 'admin',
  head() {
    return {
      title: 'Добавить регион'
    }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 50px
</style>
