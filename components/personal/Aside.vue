<template>
  <el-menu class="menu" :default-active="$route.path" router>
    <el-menu-item index="/personal">
      <i class="el-icon-menu" />
      <span>Главная</span>
    </el-menu-item>
    <el-menu-item index="/personal/receipts">
      <i class="el-icon-document" />
      <span>Квитанции</span>
    </el-menu-item>
    <el-menu-item index="/personal/deviceresult">
      <i class="el-icon-document" />
      <span>Показания ИПУ</span>
    </el-menu-item>
    <el-menu-item index="/personal/receipts">
      <i class="el-icon-document" />
      <span>Обращения</span>
    </el-menu-item>
    <el-menu-item index="/personal/useraccount/">
      <i class="el-icon-document" />
      <span>Лицевый счета</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  layout: 'personal',
  data() {
    return { user: this.$store.state.auth.user }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  height: 100%;
}
</style>
