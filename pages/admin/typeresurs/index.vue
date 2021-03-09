<template>
  <div class="news-wrapper">
    <h1>Типы ресурсов</h1>
    <el-button type="primary" class="add-news-button" @click="addTypeResurs">
      Добавить тип ресурса
    </el-button>
    <el-table
      :data="
        typeresurs.filter(
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
            @click="editTypeResurs(row.id)"
          />
          <el-button
            icon="el-icon-delete"
            type="danger"
            size="mini"
            circle
            @click="deleteTypeResurs(row.id)"
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
    const typeresurs = await $axios.$get('/api/typeresurs')
    return { typeresurs }
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    async editTypeResurs(id) {
      await this.$router.push(`/admin/typeresurs/${id}`)
    },
    async addTypeResurs() {
      await this.$router.push('/admin/typeresurs/add')
    },
    async deleteTypeResurs(id) {
      try {
        await this.$confirm('Удалить запись?', 'Внимание!', {
          confirmButtonText: 'Да',
          cancelButtonText: 'Отмена',
          type: 'warning'
        })
        await this.$axios.$delete(`/api/typeresurs/${id}`)
        this.typeresurs = this.typeresurs.filter((post) => post.id !== id)
        this.$message.success('Запись удалена!')
      } catch (err) {
        this.$message.warning('Действие отменено!')
      }
    }
  },
  head() {
    return {
      title: 'Тип ресурсов'
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
