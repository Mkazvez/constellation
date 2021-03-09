<template>
  <div class="news-wrapper">
    <h1>Управляющие организации</h1>
    <el-button
      type="primary"
      class="add-news-button"
      @click="addServiceManafacture"
    >
      Добавить УО
    </el-button>
    <el-table
      :data="
        servicemanafacture.filter(
          (data) =>
            !search ||
            data.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      "
      size="medium"
    >
      <el-table-column label="Краткое наим-ие" width="80">
        <template slot-scope="{ row }">
          <span>{{ row.shottitle }}</span>
        </template>
      </el-table-column>
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
      <el-table-column label="Адрес">
        <template slot-scope="{ row }">
          <span>{{ row.adres }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Email">
        <template slot-scope="{ row }">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="URL">
        <template slot-scope="{ row }">
          <span href="https://www.e1.ru/">{{ row.url }}</span>
        </template>
      </el-table-column>
      <el-table-column label="URL администрирование">
        <template slot-scope="{ row }">
          <span>{{ row.urladmin }}</span>
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
            @click="editServiceManafacture(row.id)"
          />
          <el-button
            icon="el-icon-delete"
            type="danger"
            size="mini"
            circle
            @click="deleteServiceManafacture(row.id)"
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
    const servicemanafacture = await $axios.$get('/api/servicemanafacture')
    return { servicemanafacture }
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    async editServiceManafacture(id) {
      await this.$router.push(`/admin/servicemanafacture/${id}`)
    },
    async addServiceManafacture() {
      await this.$router.push('/admin/servicemanafacture/add')
    },
    async deleteServiceManafacture(id) {
      try {
        await this.$confirm('Удалить запись?', 'Внимание!', {
          confirmButtonText: 'Да',
          cancelButtonText: 'Отмена',
          type: 'warning'
        })
        await this.$axios.$delete(`/api/servicemanafacture/${id}`)
        this.servicemanafacture = this.servicemanafacture.filter(
          (post) => post.id !== id
        )
        this.$message.success('Запись удалена!')
      } catch (err) {
        this.$message.warning('Действие отменено!')
      }
    }
  },
  head() {
    return {
      title: 'Управляющие организации'
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
