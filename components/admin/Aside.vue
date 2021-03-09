<template>
  <el-menu class="menu" :default-active="$route.path" router>
    <el-menu-item index="/admin">
      <i class="el-icon-menu"></i>
      <span>Главная</span>
    </el-menu-item>
    <el-menu-item index="/admin/users">
      <i class="el-icon-user"></i>
      <span>Пользователи</span>
    </el-menu-item>
    <el-menu-item index="/admin/news">
      <i class="el-icon-reading"></i>
      <span>Новости</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-setting" />Справочники</template>
      <el-menu-item index="/admin/typestreet">
        <i class="el-icon-reading"></i>
        <span>Тип улиц</span>
      </el-menu-item>
      <el-menu-item index="/admin/street">Улицы</el-menu-item>
      <el-menu-item index="/admin/region">Регионы</el-menu-item>
      <el-menu-item index="/admin/house">Дома</el-menu-item>
      <el-menu-item index="/admin/flat">Квартира</el-menu-item>
      <el-menu-item index="/admin/account">Лицевые счета</el-menu-item>
      <el-menu-item index="/admin/servicemanafacture">Предприятия</el-menu-item>
      <el-menu-item index="/admin/typeresurs">Типы ресурсов</el-menu-item>
      <el-menu-item index="/admin/typedocument">Типы документов</el-menu-item>
      <el-menu-item index="/admin/devicemodel">Модели приборов</el-menu-item>
      <el-menu-item index="/admin/devicemark">Марка приборов</el-menu-item>
      <el-menu-item index="/admin/typedevice">Вид приборов</el-menu-item>
      <el-menu-item index="/admin/useraccount"
        >Пользователь - лицевые счета</el-menu-item
      >
    </el-submenu>
  </el-menu>
</template>

<style lang="sass" scoped>
.menu
  height: 100%
</style>
