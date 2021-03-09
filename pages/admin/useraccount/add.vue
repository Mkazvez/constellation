<template>
  <div>
    <h1>Добавить пользователь - лицевой счет</h1>
    <editor-useraccounts />
  </div>
</template>

<script>
import EditorUserAccounts from '@/components/admin/EditorUserAccounts'

export default {
  components: { 'editor-useraccounts': EditorUserAccounts },
  layout: 'admin',
  head() {
    return {
      title: 'Добавить пользователь - лицевой счет'
    }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 50px
</style>
