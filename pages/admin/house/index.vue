<template>
  <div class="news-wrapper">
    <h1>Дома</h1>
    <el-button type="primary" class="add-news-button" @click="addHouse">
      Добавить дом
    </el-button>
    <el-table
      :data="
        house.filter(
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
      <el-table-column label="Улица">
        <template slot-scope="{ row }">
          <span>{{ row.shotTypeStreet + ' ' + row.titleStreet }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Номер">
        <template slot-scope="{ row }">
          <span>{{ row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Корпус">
        <template slot-scope="{ row }">
          <span>{{ row.build }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Литера">
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
            @click="editHouse(row.id)"
          />
          <el-button
            icon="el-icon-delete"
            type="danger"
            size="mini"
            circle
            @click="deleteHouse(row.id)"
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
    const house = await $axios.$get('/api/house/v')
    return { house }
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    async editHouse(id) {
      await this.$router.push(`/admin/house/${id}`)
    },
    async addHouse() {
      await this.$router.push('/admin/house/add')
    },
    async deleteHouse(id) {
      try {
        await this.$confirm('Удалить запись?', 'Внимание!', {
          confirmButtonText: 'Да',
          cancelButtonText: 'Отмена',
          type: 'warning'
        })
        await this.$axios.$delete(`/api/house/${id}`)
        this.house = this.house.filter((post) => post.id !== id)
        this.$message.success('Запись удалена!')
      } catch (err) {
        this.$message.warning('Действие отменено!')
      }
    }
  },
  head() {
    return {
      title: 'Дома'
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
