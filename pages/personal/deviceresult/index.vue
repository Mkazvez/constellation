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
            data.titleDeviceResult
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase()) ||
            data.period_month
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase())
        )
      "
      size="medium"
    >
      <!-- <el-table-column label="Название" sortable width="100">
        <template slot-scope="{ row }">
          <span>{{ row.titleDeviceResult }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="Период" sortable width="100">
        <template slot-scope="{ row }">
          <span>{{ row.period_month }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Номер ПУ" sortable width="120">
        <template slot-scope="{ row }">
          <span>{{ row.numberDevice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Тип рес." sortable width="120">
        <template slot-scope="{ row }">
          <span>{{ row.typeResursShotTitle }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Тип прибора" width="120">
        <template slot-scope="{ row }">
          <span>{{ row.typeDeviceShotTitle }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="Квартира" sortable width="300">
        <template slot-scope="{ row }">
          <span>{{ row.nameFlat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Пр.пер." sortable width="120">
        <template slot-scope="{ row }">
          <span>{{ row.lperiod_month }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Пр.показ." sortable width="120">
        <template slot-scope="{ row }">
          <span>{{ row.lresult }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Пр.показ.2" sortable width="120">
        <template slot-scope="{ row }">
          <span>{{ row.lresult2 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Показ." sortable width="100">
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
      <el-table-column label="Показ.2" sortable width="100">
        <template slot-scope="{ row }">
          <template
            v-if="
              !isDefaultPeriod2(
                row.period,
                defaultDateA[0].defaultDate,
                row.qtyresult
              )
            "
          >
            <el-input
              v-model="row.result2"
              :disabled="true"
              @change="changeresult(row)"
            />
          </template>
          <template v-else>
            <el-input
              v-model="row.result2"
              :disabled="false"
              @change="changeresult(row)"
            />
          </template>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Пользователь" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.userFullName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Email" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column> -->
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
  layout: 'personal',
  async asyncData({ store, params, error, $axios }) {
    const iduserfilter = await store.state.auth.user.id

    const deviceresult = await $axios.$get(
      `/api/deviceResult/v/?idAccountUser=${iduserfilter}`
    )
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
    isDefaultPeriod2(periodP, defaultDatePeriod, qtyresultp) {
      // console.log(
      //   moment(periodP).format('DD.MM.YYYY') ===
      //     moment(defaultDatePeriod).format('DD.MM.YYYY'),
      //   periodP,
      //   defaultDatePeriod
      // )
      return (
        moment(periodP).format('DD.MM.YYYY') ===
          moment(defaultDatePeriod).format('DD.MM.YYYY') && qtyresultp > 1
      )
    },
    // async editDeviceResult(id) {
    //   await this.$router.push(`/admin/deviceResult/${id}`)
    // },
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
    }

    // async addDeviceResult() {
    //   await this.$router.push('/admin/deviceResult/add')
    // },
    // async deleteDevice(id) {
    //   try {
    //     await this.$confirm('Удалить запись?', 'Внимание!', {
    //       confirmButtonText: 'Да',
    //       cancelButtonText: 'Отмена',
    //       type: 'warning'
    //     })
    //     await this.$axios.$delete(`/api/deviceResult/${id}`)
    //     this.deviceresult = this.deviceresult.filter((post) => post.id !== id)
    //     this.$message.success('Запись удалена!')
    //   } catch (err) {
    //     this.$message.warning('Действие отменено!')
    //   }
    // }
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
