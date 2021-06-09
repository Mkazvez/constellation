<template>
  <div class="news-wrapper">
    <h1>Марки приборов</h1>
    <el-button type="primary" class="add-news-button" @click="addDeviceMark">
      Добавить марку прибора
    </el-button>
    <el-table
      :data="
        devicemark.filter(
          (data) =>
            !search ||
            data.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      "
      size="medium"
    >
      <el-table-column label="Краткое наим-ие" width="150">
        <template slot-scope="{ row }">
          <span>{{ row.shottitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Наименовение" width="150">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Комментарий" width="150">
        <template slot-scope="{ row }">
          <span>{{ row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Кол-во показаний" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.qtyresult }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Максимальное значение" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.qtymax }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Дробная часть" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.qtyfractional }}</span>
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
            @click="editDeviceMark(row.id)"
          />
          <el-button
            icon="el-icon-delete"
            type="danger"
            size="mini"
            circle
            @click="deleteDeviceMark(row.id)"
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
    const devicemark = await $axios.$get('/api/devicemark')
    return { devicemark }
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    async editDeviceMark(id) {
      await this.$router.push(`/admin/devicemark/${id}`)
    },
    async addDeviceMark() {
      await this.$router.push('/admin/devicemark/add')
    },
    async deleteDeviceMark(id) {
      try {
        await this.$confirm('Удалить запись?', 'Внимание!', {
          confirmButtonText: 'Да',
          cancelButtonText: 'Отмена',
          type: 'warning'
        })
        await this.$axios.$delete(`/api/devicemark/${id}`)
        this.devicemark = this.devicemark.filter((post) => post.id !== id)
        this.$message.success('Запись удалена!')
      } catch (err) {
        this.$message.warning('Действие отменено!')
      }
    }
  },
  head() {
    return {
      title: 'Марки приборов'
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
