<template>
  <div>
    <h1>Добавить тип ресурса</h1>
    <editor-typeresurss />
  </div>
</template>

<script>
import EditorTypeResurss from '@/components/admin/EditorTypeResurs'

export default {
  components: { 'editor-typeresurss': EditorTypeResurss },
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
