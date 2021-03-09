<template>
  <div class="news-wrapper">
    <h1>Регионы</h1>
    <el-button type="primary" class="add-news-button" @click="addRegion">
      Добавить регион
    </el-button>
    <el-table
      :data="
        region.filter(
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
      <el-table-column label="ФИАС">
        <template slot-scope="{ row }">
          <span>{{ row.fias }}</span>
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
            @click="editRegion(row.id)"
          />
          <el-button
            icon="el-icon-delete"
            type="danger"
            size="mini"
            circle
            @click="deleteRegion(row.id)"
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
    const region = await $axios.$get('/api/region')
    return { region }
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    async editRegion(id) {
      await this.$router.push(`/admin/region/${id}`)
    },
    async addRegion() {
      await this.$router.push('/admin/region/add')
    },
    async deleteRegion(id) {
      try {
        await this.$confirm('Удалить запись?', 'Внимание!', {
          confirmButtonText: 'Да',
          cancelButtonText: 'Отмена',
          type: 'warning'
        })
        await this.$axios.$delete(`/api/region/${id}`)
        this.region = this.region.filter((post) => post.id !== id)
        this.$message.success('Запись удалена!')
      } catch (err) {
        this.$message.warning('Действие отменено!')
      }
    }
  },
  head() {
    return {
      title: 'Регион'
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
