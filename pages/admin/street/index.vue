<template>
  <div class="news-wrapper">
    <h1>Улицы</h1>
    <el-button type="primary" class="add-news-button" @click="addStreet">
      Добавить улицу
    </el-button>
    <el-table
      :data="
        street.filter(
          (data) =>
            !search ||
            data.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      "
      size="medium"
    >
      <el-table-column label="Наименовение" width="150">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Комментарий">
        <template slot-scope="{ row }">
          <span>{{ row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Тип улицы">
        <template slot-scope="{ row }">
          <span>{{ row.shotNameTypeStreet }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Регион">
        <template slot-scope="{ row }">
          <span>{{ row.NameRegion }}</span>
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
            @click="editStreet(row.id)"
          />
          <el-button
            icon="el-icon-delete"
            type="danger"
            size="mini"
            circle
            @click="deleteStreet(row.id)"
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
    const street = await $axios.$get('/api/street/v')
    return { street }
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    async editStreet(id) {
      await this.$router.push(`/admin/street/${id}`)
    },
    async addStreet() {
      await this.$router.push('/admin/street/add')
    },
    async deleteStreet(id) {
      try {
        await this.$confirm('Удалить запись?', 'Внимание!', {
          confirmButtonText: 'Да',
          cancelButtonText: 'Отмена',
          type: 'warning'
        })
        await this.$axios.$delete(`/api/street/${id}`)
        this.street = this.street.filter((post) => post.id !== id)
        this.$message.success('Запись удалена!')
      } catch (err) {
        this.$message.warning('Действие отменено!')
      }
    }
  },
  head() {
    return {
      title: 'Улицы'
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
