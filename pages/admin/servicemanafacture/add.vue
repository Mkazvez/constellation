<template>
  <div>
    <h1>Добавить Управляющую Организацию</h1>
    <editor-servicemanafactures />
  </div>
</template>

<script>
import EditorServiceManafactures from '@/components/admin/EditorServiceManafacture'

export default {
  components: { 'editor-servicemanafactures': EditorServiceManafactures },
  layout: 'admin',
  head() {
    return {
      title: 'Добавить управляющую организацию'
    }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 50px
</style>
