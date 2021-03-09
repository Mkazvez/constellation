<template>
  <div>
    <h1>Квитанции</h1>
    <!--    <el-table :data="searchData(tableData)" stripe>-->
    <el-table :data="tableData" stripe>
      <el-table-column
        prop="date"
        label="Период"
        sortable
        width="130"
        :formatter="formatDate"
      />
      <el-table-column prop="address" label="Дом" sortable />
      <el-table-column
        prop="flat"
        label="Квартира"
        width="130"
        align="center"
        sortable
      />
      <el-table-column
        prop="personalScore"
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
            @click="downloadReceipt(row.receipt)"
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

export default {
  layout: 'personal',
  data() {
    return {
      search: '',
      tableData: [
        {
          date: new Date(2020, 5, 23),
          address: 'Победы ул. 44',
          flat: 127,
          personalScore: 520204307120,
          receipt: 'receipts/1010540680.pdf'
        },
        {
          date: new Date(2020, 4, 25),
          address: 'Ленина ул. 22',
          flat: 284,
          personalScore: 126128248842,
          receipt: '/file/366132899820.pdf'
        },
        {
          date: new Date(2020, 3, 22),
          address: 'Челюскинцев ул. 31',
          flat: 24,
          personalScore: 905167554080,
          receipt: '/file/366132899820.pdf'
        },
        {
          date: new Date(2020, 2, 20),
          address: 'Гоголя ул. 19',
          flat: 45,
          personalScore: 954727585289,
          receipt: '/file/366132899820.pdf'
        },
        {
          date: new Date(2020, 1, 21),
          address: 'Комсомольский пр-кт 57',
          flat: 276,
          personalScore: 264277930517,
          receipt: '/file/366132899820.pdf'
        }
      ]
    }
  },
  methods: {
    formatDate(row) {
      return moment(row.date).format('DD.MM.YYYY')
    },
    downloadReceipt(receipt) {
      // const searchHost = window.location.host
      const link = document.createElement('a')
      const urlPdf = receipt
      window.alert(urlPdf)
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
