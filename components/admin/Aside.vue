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
    <el-menu-item index="/admin/useraccount"
      ><i class="el-icon-s-check"></i>Пользователь - лицевые счета</el-menu-item
    >
    <el-menu-item index="/admin/servicemanafacture"
      ><i class="el-icon-s-home"></i>Предприятия</el-menu-item
    >
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-setting" />Справочники</template>
      <el-menu-item index="/admin/typestreet">
        <i class="el-icon-office-building"></i>
        <span>Тип улиц</span>
      </el-menu-item>
      <el-menu-item index="/admin/street"
        ><i class="el-icon-truck"></i>Улицы</el-menu-item
      >
      <el-menu-item index="/admin/region"
        ><i class="el-icon-map-location"></i>Регионы</el-menu-item
      >
      <el-menu-item index="/admin/house"
        ><i class="el-icon-school"></i>Дома</el-menu-item
      >
      <el-menu-item index="/admin/flat"
        ><i class="el-icon-table-lamp"></i>Квартира</el-menu-item
      >
      <el-menu-item index="/admin/account"
        ><i class="el-icon-tickets"></i>Лицевые счета</el-menu-item
      >
      <el-menu-item index="/admin/typedocument"
        ><i class="el-icon-reading"></i>Типы документов</el-menu-item
      >
    </el-submenu>
    <el-submenu index="3">
      <template slot="title"
        ><i class="el-icon-s-tools" />Приборы учета</template
      >
      <el-menu-item index="/admin/devicemodel"
        ><i class="el-icon-odometer"></i>Модели приборов</el-menu-item
      >
      <el-menu-item index="/admin/devicemark"
        ><i class="el-icon-odometer"></i>Марка приборов</el-menu-item
      >
      <el-menu-item index="/admin/typedevice"
        ><i class="el-icon-odometer"></i>Вид приборов</el-menu-item
      >
      <el-menu-item index="/admin/device"
        ><i class="el-icon-odometer"></i>Приборы</el-menu-item
      >
      <el-menu-item index="/admin/typeresurs"
        ><i class="el-icon-odometer"></i>Типы ресурсов</el-menu-item
      >
      <el-menu-item index="/admin/deviceresult"
        ><i class="el-icon-odometer"></i>Показания</el-menu-item
      >
    </el-submenu>
  </el-menu>
</template>

<style lang="sass" scoped>
.menu
  height: 100%
</style>
