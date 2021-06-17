<template>
  <el-menu class="menu" :default-active="$route.path" router>
    <el-menu-item index="/personal">
      <i class="el-icon-menu" />
      <span>Главная</span>
    </el-menu-item>
    <el-menu-item index="/personal/receipts">
      <i class="el-icon-s-order" />
      <span>Квитанции</span>
    </el-menu-item>
    <el-menu-item index="/personal/deviceresult">
      <i class="el-icon-odometer" />
      <span>Показания ИПУ</span>
    </el-menu-item>
    <el-menu-item index="/personal/deviceresultperiodaccount">
      <i class="el-icon-odometer" />
      <span>Показания ИПУ 2</span>
    </el-menu-item>
    <el-menu-item index="/personal/receipts">
      <i class="el-icon-document-copy" />
      <span>Обращения</span>
    </el-menu-item>
    <el-menu-item index="/personal/useraccount/">
      <i class="el-icon-tickets" />
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
