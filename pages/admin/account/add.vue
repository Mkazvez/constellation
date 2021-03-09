<template>
  <div>
    <h1>Добавить лицевой счет</h1>
    <editor-accounts />
  </div>
</template>

<script>
import EditorAccounts from '@/components/admin/EditorAccounts'

export default {
  components: { 'editor-accounts': EditorAccounts },
  layout: 'admin',
  head() {
    return {
      title: 'Добавить лицевой счет'
    }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 50px
</style>
