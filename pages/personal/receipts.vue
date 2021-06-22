<template>
  <div>
    <h1>Квитанции</h1>
    <!--    <el-table :data="searchData(tableData)" stripe>-->
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
    <el-table :data="document" stripe>
      <el-table-column
        prop="period_month"
        label="Период"
        sortable
        width="130"
      />
      <el-table-column prop="nameFlat" label="Дом" width="300" sortable />
      <el-table-column
        prop="typedocument"
        label="Квитанция"
        width="250"
        align="center"
        sortable
      />
      <el-table-column
        prop="idAccount"
        label="Лицевой счет"
        width="250"
        align="center"
        sortable
      />
      <el-table-column label="Квитанция" width="230" align="center">
        <!-- eslint-disable -->
        <template slot="header" slot-scope="scope">
          <!-- eslint-enable -->
          <el-input v-model="search" size="mini" placeholder="Поиск" />
        </template>
        <template slot-scope="{ row }">
          <el-button
            size="mini"
            type="primary"
            plain
            @click="downloadReceipt(row.url, row.idAccount, row.period)"
          >
            скачать
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment'
import consola from 'consola'

export default {
  layout: 'personal',
  async asyncData({ store, params, error, $axios }) {
    try {
      const iduserfilter = await store.state.auth.user.id
      // eslint-disable-next-line no-console
      console.log(
        store.state.auth.user.id,
        iduserfilter,
        `/api/document/v/?idUser=${iduserfilter}`
      )
      const document = await $axios.$get(
        `/api/document/v/?iduser=${iduserfilter}`
      )
      const documentfull = await $axios.$get(
        `/api/document/v/?iduser=${iduserfilter}`
      )
      const optionAccount = await $axios.$get(
        `/api/accounts/v/?idUser=${iduserfilter}`
      )
      const defaultDateA1 = await $axios.$get('/api/statusPortals')
      const d1 = defaultDateA1[0].defaultDate.toString().substring(0, 10)
      const defaultPeriod = d1.substring(0, 4) + '-' + d1.substring(5, 7)
      const defaultDateA = defaultDateA1
      return {
        document,
        optionAccount,
        defaultPeriod,
        defaultDateA,
        documentfull
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
      error({ statusCode: 404, message: 'Ошибка сервера попробуйте позже' })
    }
  },
  data() {
    return {
      filtervalue: '',
      accountvalue: '',
      search: '',
      yearmonths: [
        {
          value: '2020-06',
          label: '2020-06',
          text: '2020-06'
        },
        {
          value: '2020-07',
          label: '2020-07',
          text: '2020-07'
        },
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
    formatDate(row) {
      return moment(row.date).format('DD.MM.YYYY')
    },
    async downloadReceipt(receipt, personalScore, date) {
      try {
        const d1 = date.toString().substring(0, 10)
        const period1 = d1.substring(5, 7) + '_' + d1.substring(0, 4)
        const fromFile1 =
          'server/files/receipts/' +
          period1 +
          '/' +
          receipt +
          '/' +
          personalScore +
          '.pdf'
        const toFile1 = 'static/receipts/' + personalScore + '.pdf'
        // eslint-disable-next-line no-console
        // window.alert(fromFile1)
        // window.alert(__dirname)
        this.loading = true
        await this.$axios.$post('/api/receipts/movedReceipt', {
          fromFile: fromFile1,
          toFile: toFile1
        })
        this.loading = false
        await this.$router.push('/personal/receipts')
      } catch (err) {
        this.loading = false
        this.$message.error('Произошла ошибка сервера, попробуйте еще раз!')
        consola.error(err.message)
      }
      const toFile1 = 'receipts/' + personalScore + '.pdf'
      // window.alert(toFile1)
      // const searchHost = window.location.host
      const link = document.createElement('a')
      const urlPdf = toFile1
      // window.alert(urlPdf)
      link.href = `/${urlPdf}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    searchData(tableData) {
      return tableData.filter((data) => {
        for (const key in data) {
          if (key === 'date') {
            moment(data[key]).format('DD.MM.YYYY')
          }
        }
      })
    },
    changefilterselect() {
      const vidflat = this.optionAccount.filter(
        (element) => element.id === this.accountvalue
      )
      console.log(vidflat[0].idFlat, this.filtervalue, this.documentfull)
      this.document = this.documentfull.filter(
        (element) =>
          element.period_month === this.filtervalue &&
          element.idFlat === vidflat[0].idFlat
      )
    }
  },
  head() {
    return { title: 'Квитанции' }
  }
}
</script>

<style lang="scss">
h1 {
  margin-bottom: 40px;
}
</style>

<style lang="sass">
.el-select
  width: 500px;
</style>
