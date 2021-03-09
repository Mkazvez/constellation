<template>
  <div>
    <h1>Добавить дом</h1>
    <editor-houses />
  </div>
</template>

<script>
import EditorHouses from '@/components/admin/EditorHouses'

export default {
  components: { 'editor-houses': EditorHouses },
  layout: 'admin',
  head() {
    return {
      title: 'Добавить дом'
    }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 50px
</style>
