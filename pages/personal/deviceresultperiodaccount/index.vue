<template>
  <div class="news-wrapper">
    <h1>
      Показания приборов учета за период, активный период {{ defaultPeriod }}
    </h1>
    <el-select
      v-model="filtervalue"
      placeholder="Период"
      default-first-option
      @change="changefilterselect()"
    >
      <el-option
        v-for="item in yearmonths"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-select
      v-model="accountvalue"
      placeholder="Выберите лицевой счет"
      filterable
      @change="changefilterselect()"
    >
      <el-option
        v-for="item in optionAccount"
        :key="item.value"
        :label="item.idAccount + ' ' + item.nameFlat"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <el-table
      ref="filterTable"
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
      <el-table-column
        label="Период"
        width="100"
        :filters="yearmonths"
        :filter-method="filterTag"
      >
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
      <el-table-column label="Комментарий" sortable width="140">
        <template slot-scope="{ row }">
          <span>{{ row.deviceTitle }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Тип прибора" width="120">
        <template slot-scope="{ row }">
          <span>{{ row.typeDeviceShotTitle }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="Квартира" sortable width="300">
        <template slot-scope="{ row }">
          <span>{{ row.nameFlat }}</span>
        </template>
      </el-table-column> -->
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
      <!-- <el-table-column label="Показания" width="400">
        <template slot-scope="{ row }">
          <el-row :gutter="20">
            <el-col :span="2" width="10">
              <el-input v-model="row.result" maxlength="1" minlength="1">
              </el-input>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple">
                <el-input v-model="input2"> </el-input>
              </div>
            </el-col>
            <el-col :span="2">
              <el-input v-model="input3"> </el-input>
            </el-col>
            <el-col :span="2">
              <el-input v-model="input4"> </el-input>
            </el-col>
            <el-col :span="2">
              <el-input v-model="input5"> </el-input>
            </el-col>
            <el-col :span="2">
              <el-input v-model="input6"></el-input>
            </el-col>
            <el-col :span="2">
              <el-input v-model="input7"> </el-input>
            </el-col>
            <el-col :span="2">
              <el-input v-model="input8"></el-input>
            </el-col>
            <el-col :span="2">
              <el-input v-model="input9"> </el-input>
            </el-col>
          </el-row>
        </template>
      </el-table-column> -->
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
            <!-- <el-input
              v-model="row.result2"
              :disabled="true"
              @change="changeresult(row)"
            /> -->
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
    // потом найти метод
    const deviceresultfull = deviceresult
    const optionAccount = await $axios.$get(
      `/api/accounts/v/?idUser=${iduserfilter}`
    )
    const defaultDateA1 = await $axios.$get('/api/statusPortals')
    const d1 = defaultDateA1[0].defaultDate.toString().substring(0, 10)
    const defaultPeriod = d1.substring(0, 4) + '-' + d1.substring(5, 7)
    const defaultDateA = defaultDateA1
    return {
      deviceresult,
      defaultPeriod,
      defaultDateA,
      optionAccount,
      deviceresultfull
    }
  },
  data() {
    return {
      filtervalue: '',
      accountvalue: '',
      search: '',
      input1: '',
      yearmonths: [
        {
          value: '2021-04',
          label: '2021-04',
          text: '2021-04'
        },
        {
          value: '2021-05',
          label: '2021-05',
          text: '2021-05'
        },
        {
          value: '2021-06',
          label: '2021-06',
          text: '2021-06'
        },
        {
          value: '2021-07',
          label: '2021-07',
          text: '2021-07'
        },
        {
          value: '2021-08',
          label: '2021-08',
          text: '2021-08'
        }
      ],
      optionAccount: null
    }
  },
  mounted() {
    this.filtervalue = this.defaultPeriod
    this.accountvalue = this.optionAccount[0].id
    this.changefilterselect()
    //   this.$axios
    //     .$get('/api/accountFulls/v/?idUser=' + iduserfilter)
    //     .then((response) => (this.optionAccount = response))
  },
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
    },
    changefilteraccount(accountvaluep, deviceresultp) {
      const vidflat = this.optionAccount.filter(
        (element) => element.id === accountvaluep
      )
      this.deviceresult = deviceresultp.filter(
        // eslint-disable-next-line camelcase
        (element) => element.idFlat === vidflat[0].idFlat
      )
      console.log(accountvaluep, deviceresultp, vidflat)
    },
    changefilterperiod(periodvaluep, deviceresultp) {
      // this.deviceresult = deviceresultp.filter(
      //   // eslint-disable-next-line camelcase
      //   (element) => element.period_month === periodvaluep
      // )
      this.deviceresult = this.deviceresultfull.filter(
        // eslint-disable-next-line camelcase
        (element) => element.period_month === this.filtervalue
      )
      console.log(this)
    },
    changefilterselect() {
      const vidflat = this.optionAccount.filter(
        (element) => element.id === this.accountvalue
      )
      this.deviceresult = this.deviceresultfull.filter(
        // eslint-disable-next-line camelcase
        (element) =>
          element.period_month === this.filtervalue &&
          element.idFlat === vidflat[0].idFlat
      )
    },
    filterTag(value, row) {
      return row.period_month === value
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
<style lang="sass">
.el-select
  width: 500px
.el-row
  margin-bottom: 20px;
  &:last-child
    margin-bottom: 0;

.el-col
  border-radius: 4px;

.bg-purple-dark
  background: #99a9bf;

.bg-purple
  background: #d3dce6;

.bg-purple-light
  background: #e5e9f2;

.grid-content
  border-radius: 4px;
  min-height: 36px;


.row-bg
  padding: 10px 0;
  background-color: #f9fafc;
</style>
