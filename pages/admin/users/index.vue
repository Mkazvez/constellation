<template>
  <div>
    <h1>Пользователи</h1>
    <el-table
      :data="
        users.filter(
          (data) =>
            !search ||
            data.email.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      "
      size="medium"
    >
      <el-table-column label="Актив." width="70" align="center">
        <template slot-scope="{ row }">
          <el-checkbox v-model="row.active" @change="changeActivate(row)" />
        </template>
      </el-table-column>
      <el-table-column label="Email">
        <template slot-scope="{ row }">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Фамилия">
        <template slot-scope="{ row }">
          <span>{{ row.lastName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Имя">
        <template slot-scope="{ row }">
          <span>{{ row.firstName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Отчество">
        <template slot-scope="{ row }">
          <span>{{ row.patronymicName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Телефон">
        <template slot-scope="{ row }">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center">
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
            @click="editUser(row.id)"
          />
          <el-button
            icon="el-icon-delete"
            type="danger"
            size="mini"
            circle
            @click="deleteUser(row.id)"
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
    const users = await $axios.$get('/api/user')
    return { users }
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    async changeActivate(data) {
      try {
        await this.$axios.$put(`/api/user/activate-user/${data.id}`, data)
      } catch (err) {
        consola.error(err.message)
      }
    },
    async editUser(id) {
      await this.$router.push(`/admin/users/${id}`)
    },
    async deleteUser(id) {
      try {
        await this.$confirm('Удалить пользователя?', 'Внимание!', {
          confirmButtonText: 'Да',
          cancelButtonText: 'Нет',
          type: 'warning'
        })
        await this.$axios.$delete(`/api/user/${id}`)
        this.users = this.users.filter((user) => user.id !== id)
        this.$message.success('Пользователь удален!')
      } catch (err) {
        this.$message.warning('Действие отменено!')
      }
    }
  },
  head() {
    return { title: 'Пользователи' }
  }
}
</script>

<style lang="sass" scoped>
h1
  margin-bottom: 40px
</style>
