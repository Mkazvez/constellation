<template>
  <div>
    <h1>{{ account.idAccount }}</h1>
    <editor-accounts :account="account" />
  </div>
</template>

<script>
import EditorAccounts from '@/components/admin/EditorAccounts'

export default {
  components: { 'editor-accounts': EditorAccounts },
  layout: 'admin',
  async asyncData({ params, $axios }) {
    const account = await $axios.$get(`/api/accountFulls/${params.id}`)
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
