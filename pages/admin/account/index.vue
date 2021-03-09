<template>
  <div class="news-wrapper">
    <h1>Лицевые счета</h1>
    <el-button type="primary" class="add-news-button" @click="addAccount">
      Добавить лицевой счет
    </el-button>
    <el-table
      :data="
        accountfull.filter(
          (data) =>
            !search ||
            data.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      "
      size="medium"
    >
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
      <el-table-column label="Процент" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.procent }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Площадь" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.sq }}</span>
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
            @click="editAccount(row.id)"
          />
          <el-button
            icon="el-icon-delete"
            type="danger"
            size="mini"
            circle
            @click="deleteAccount(row.id)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import consola from 'consola'

export default {
  layout: 'admin',
  async asyncData({ $axios }) {
    const accountfull = await $axios.$get('/api/accountFulls/v/')
    return { accountfull }
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    async editAccount(id) {
      await this.$router.push(`/admin/account/${id}`)
    },
    async addAccount() {
      await this.$router.push('/admin/account/add')
    },
    async deleteAccount(id) {
      try {
        await this.$confirm('Удалить запись?', 'Внимание!', {
          confirmButtonText: 'Да',
          cancelButtonText: 'Отмена',
          type: 'warning'
        })
        await this.$axios.$delete(`/api/accountFulls/${id}`)
        this.accountfull = this.accountfull.filter((post) => post.id !== id)
        this.$message.success('Запись удалена!')
      } catch (err) {
        this.$message.warning('Действие отменено!')
      }
    }
  },
  head() {
    return {
      title: 'Лицевые счета'
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
</style>
