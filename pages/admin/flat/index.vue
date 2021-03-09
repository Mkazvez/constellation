<template>
  <div class="news-wrapper">
    <h1>Квартиры</h1>
    <el-button type="primary" class="add-news-button" @click="addFlat">
      Добавить квартиру
    </el-button>
    <el-table
      :data="
        flat.filter(
          (data) =>
            !search ||
            data.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      "
      size="medium"
    >
      <el-table-column label="Дом" width="200">
        <template slot-scope="{ row }">
          <span>{{ row.nameHouse }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Номер" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Блок" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.build }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Литера" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.litera }}</span>
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
            @click="editFlat(row.id)"
          />
          <el-button
            icon="el-icon-delete"
            type="danger"
            size="mini"
            circle
            @click="deleteFlat(row.id)"
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
    const flat = await $axios.$get('/api/flat/v')
    return { flat }
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    async editFlat(id) {
      await this.$router.push(`/admin/flat/${id}`)
    },
    async addFlat() {
      await this.$router.push('/admin/flat/add')
    },
    async deleteFlat(id) {
      try {
        await this.$confirm('Удалить запись?', 'Внимание!', {
          confirmButtonText: 'Да',
          cancelButtonText: 'Отмена',
          type: 'warning'
        })
        await this.$axios.$delete(`/api/flat/${id}`)
        this.flat = this.flat.filter((post) => post.id !== id)
        this.$message.success('Запись удалена!')
      } catch (err) {
        this.$message.warning('Действие отменено!')
      }
    }
  },
  head() {
    return {
      title: 'Квартира'
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
