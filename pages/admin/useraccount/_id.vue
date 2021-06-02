<template>
  <div>
    <h1>Лицевой счет - пользователь</h1>
    <editor-useraccounts :account="account" />
  </div>
</template>

<script>
import EditorUserAccounts from '@/components/admin/EditorUserAccounts'

export default {
  components: { 'editor-useraccounts': EditorUserAccounts },
  layout: 'admin',
  async asyncData({ params, $axios }) {
    const account = await $axios.$get(`/api/accounts/${params.id}`)
    return { account }
  },
  head() {
    return { idAccount: this.account.idAccount }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 50px
</style>
