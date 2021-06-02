<template>
  <div>
    <h1>Квитанции</h1>
    <!--    <el-table :data="searchData(tableData)" stripe>-->
    <el-table :data="document" stripe>
      <el-table-column
        prop="period_month"
        label="Период"
        sortable
        width="130"
      />
      <el-table-column prop="nameFlat" label="Дом" sortable />
      <el-table-column
        prop="typedocument"
        label="Квитанция"
        width="130"
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
      return { document }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
      error({ statusCode: 404, message: 'Ошибка сервера попробуйте позже' })
    }
  },
  data() {
    return {
      search: ''
    }
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
        window.alert(fromFile1)
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
