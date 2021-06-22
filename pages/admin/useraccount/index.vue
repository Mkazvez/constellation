<template>
  <div class="news-wrapper">
    <h1>Пользователи - Лицевые счета</h1>
    <el-button type="primary" class="add-news-button" @click="addUserAccount">
      Добавить пользователь ЛС
    </el-button>
    <el-table
      :data="
        useraccount.filter(
          (data) =>
            !search ||
            data.firstName
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase())
        )
      "
      size="medium"
    >
      <el-table-column label="Фамилия" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.firstName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Имя" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.patronymicName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Отчество" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.lastName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Email" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Лиц.счет" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.idAccount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Квартира" width="250">
        <template slot-scope="{ row }">
          <span>{{ row.nameFlat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Ак." width="70">
        <template slot-scope="{ row }">
          <el-checkbox v-model="row.confirm" change="changeActivate(row)" />
        </template>
      </el-table-column>
      <el-table-column align="center" width="300">
        <!-- eslint-disable -->
        <template slot="header" slot-scope="scope">
          <!-- eslint-enable -->
          <el-input v-model="search" size="mini" placeholder="Поиск" />
        </template>
        <template slot-scope="{ row }">
          <el-button
            icon="el-icon-edit"
            type="primary"
            size="mini"
            circle
            @click="editUserAccount(row.id)"
          />
          <el-button
            icon="el-icon-delete"
            type="danger"
            size="mini"
            circle
            @click="deleteUserAccount(row.id)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import consola from 'consola'

export default {
  layout: 'admin',
  async asyncData({ $axios }) {
    const useraccount = await $axios.$get('/api/accounts/v/')
    return { useraccount }
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    async changeActivate(data) {
      try {
        await this.$axios.$put(`/api/accounts/${data.id}`, data)
      } catch (err) {
        consola.error(err.message)
      }
    },
    async editUserAccount(id) {
      await this.$router.push(`/admin/useraccount/${id}`)
    },
    async addUserAccount() {
      await this.$router.push('/admin/useraccount/add')
    },
    async deleteUserAccount(id) {
      try {
        await this.$confirm('Удалить запись?', 'Внимание!', {
          confirmButtonText: 'Да',
          cancelButtonText: 'Отмена',
          type: 'warning'
        })
        await this.$axios.$delete(`/api/accounts/${id}`)
        this.useraccount = this.useraccount.filter((post) => post.id !== id)
        this.$message.success('Запись удалена!')
      } catch (err) {
        this.$message.warning('Действие отменено!')
      }
    }
  },
  head() {
    return {
      title: 'Пользователь - Лицевые счета'
    }
  }
}
</script>

<style lang="sass" scoped>
.news-wrapper
  position: relative

h1
  margin-bottom: 40px

.add-news-button
  position: absolute
  top: 15px
  right: 10px

.el-row
  margin-bottom: 20px;
  &:last-child
    margin-bottom: 0;

.el-col
  border-radius: 4px;

.bg-purple-dark
  background: #99a9bf;

.bg-purple
  background: #d3dce6;

.bg-purple-light
  background: #e5e9f2;

.grid-content
  border-radius: 4px;
  min-height: 36px;


.row-bg
  padding: 10px 0;
  background-color: #f9fafc;
</style>
