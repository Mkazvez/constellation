<template>
  <div class="news-wrapper">
    <h1>
      Показания приборов учета за период, активный период {{ defaultPeriod }}
    </h1>

    <el-table
      :data="
        deviceresult.filter(
          (data) =>
            !search ||
            data.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      "
      size="medium"
    >
      <el-table-column label="Название" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.titleDeviceResult }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Период" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.period_month }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Номер ПУ" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.numberDevice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Тип ресурса" width="120">
        <template slot-scope="{ row }">
          <span>{{ row.typeResursShotTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Тип прибора" width="120">
        <template slot-scope="{ row }">
          <span>{{ row.typeDeviceShotTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Квартира" width="150">
        <template slot-scope="{ row }">
          <span>{{ row.nameFlat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Прошлый период" width="150">
        <template slot-scope="{ row }">
          <span>{{ row.lperiod_month }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Прошлый результат" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.lresult }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Результат" width="100">
        <template slot-scope="{ row }">
          <template
            v-if="!isDefaultPeriod(row.period, defaultDateA[0].defaultDate)"
          >
            <el-input
              v-model="row.result"
              :disabled="true"
              @change="changeresult(row)"
            />
          </template>
          <template v-else>
            <el-input
              v-model="row.result"
              :disabled="false"
              @change="changeresult(row)"
            />
          </template>
        </template>
      </el-table-column>
      <el-table-column label="Пользователь" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.userFullName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Email" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="300">
        <!-- eslint-disable -->
        <template slot="header" slot-scope="scope">
          <!-- eslint-enable -->
          <el-input v-model="search" size="mini" placeholder="Поиск" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import consola from 'consola'
import moment from 'moment'

export default {
  layout: 'admin',
  async asyncData({ $axios }) {
    const deviceresult = await $axios.$get('/api/deviceResult/v')
    const defaultDateA1 = await $axios.$get('/api/statusPortals')
    const d1 = defaultDateA1[0].defaultDate.toString().substring(0, 10)
    const defaultPeriod = d1.substring(5, 7) + '_' + d1.substring(0, 4)
    const defaultDateA = defaultDateA1
    return { deviceresult, defaultPeriod, defaultDateA }
  },
  data() {
    return {
      search: ''
    }
  },
  // mounted() {
  //   // let defaultDateA1
  //   this.$axios
  //     .$get('/api/statusPortals')
  //     .then((response) => (this.defaultDateA = response))
  // },
  methods: {
    isDefaultPeriod(periodP, defaultDatePeriod) {
      // console.log(
      //   moment(periodP).format('DD.MM.YYYY') ===
      //     moment(defaultDatePeriod).format('DD.MM.YYYY'),
      //   periodP,
      //   defaultDatePeriod
      // )
      return (
        moment(periodP).format('DD.MM.YYYY') ===
        moment(defaultDatePeriod).format('DD.MM.YYYY')
      )
    },
    async editDeviceResult(id) {
      await this.$router.push(`/admin/deviceResult/${id}`)
    },
    async changeresult(data) {
      // eslint-disable-next-line no-console
      console.log(data.id, data.result)
      try {
        // eslint-disable-next-line no-console
        console.log(2)
        await this.$axios.$put(`/api/deviceResult/r/${data.id}`, data)
      } catch (err) {
        consola.error(err.message)
      }
    },

    async addDeviceResult() {
      await this.$router.push('/admin/deviceResult/add')
    },
    async deleteDevice(id) {
      try {
        await this.$confirm('Удалить запись?', 'Внимание!', {
          confirmButtonText: 'Да',
          cancelButtonText: 'Отмена',
          type: 'warning'
        })
        await this.$axios.$delete(`/api/deviceResult/${id}`)
        this.deviceresult = this.deviceresult.filter((post) => post.id !== id)
        this.$message.success('Запись удалена!')
      } catch (err) {
        this.$message.warning('Действие отменено!')
      }
    }
  },
  head() {
    return {
      title: 'Показания прибора учета'
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
