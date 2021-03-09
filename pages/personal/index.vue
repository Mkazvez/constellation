<template>
  <div>
    <h1>Личный Кабинет {{ user.firstName }}</h1>
  </div>
</template>

<script>
export default {
  layout: 'personal',
  data() {
    return { user: this.$store.state.auth.user }
  }
}
</script>
