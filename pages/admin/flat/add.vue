<template>
  <div>
    <h1>Добавить квартиру</h1>
    <editorFlats />
  </div>
</template>

<script>
import EditorFlats from '@/components/admin/EditorFlats'

export default {
  components: { EditorFlats },
  layout: 'admin',
  head() {
    return {
      title: 'Добавить квартиру'
    }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 50px
</style>
