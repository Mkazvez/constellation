<template>
  <div class="news-wrapper">
    <h1>Приборы учета</h1>
    <el-button type="primary" class="add-news-button" @click="addDevice">
      Добавить прибор учета
    </el-button>
    <el-table
      :data="
        device.filter(
          (data) =>
            !search ||
            data.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      "
      size="medium"
    >
      <el-table-column label="Название" width="200">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Номер" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Номер ГИС" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.idGis }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Описание" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Ресурс" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.typeResursShotTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Тип прибора" width="150">
        <template slot-scope="{ row }">
          <span>{{ row.typeDeviceShotTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Марка прибора" width="150">
        <template slot-scope="{ row }">
          <span>{{ row.markShotTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Модель прибора" width="150">
        <template slot-scope="{ row }">
          <span>{{ row.modelShotTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="МКД" width="200">
        <template slot-scope="{ row }">
          <span>{{ row.nameHouse }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Номер квартиры" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.numberFlat }} {{ row.buildFlat }} {{ literaFlat }}</span>
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
            @click="editDevice(row.id)"
          />
          <el-button
            icon="el-icon-delete"
            type="danger"
            size="mini"
            circle
            @click="deleteDevice(row.id)"
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
    const device = await $axios.$get('/api/device/v')
    return { device }
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    async editDevice(id) {
      await this.$router.push(`/admin/device/${id}`)
    },
    async addDevice() {
      await this.$router.push('/admin/device/add')
    },
    async deleteDevice(id) {
      try {
        await this.$confirm('Удалить запись?', 'Внимание!', {
          confirmButtonText: 'Да',
          cancelButtonText: 'Отмена',
          type: 'warning'
        })
        await this.$axios.$delete(`/api/device/${id}`)
        this.device = this.device.filter((post) => post.id !== id)
        this.$message.success('Запись удалена!')
      } catch (err) {
        this.$message.warning('Действие отменено!')
      }
    }
  },
  head() {
    return {
      title: 'Прибор учета'
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
