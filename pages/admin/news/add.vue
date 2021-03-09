<template>
  <div>
    <h1>Добавить новость</h1>
    <editor-news />
  </div>
</template>

<script>
import EditorNews from '@/components/admin/EditorNews'

export default {
  components: { EditorNews },
  layout: 'admin',
  head() {
    return {
      title: 'Добавить новость'
    }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 50px
</style>
