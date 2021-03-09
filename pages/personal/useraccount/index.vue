/* eslint-disable nuxt/no-this-in-fetch-data */
<template>
  <div class="news-wrapper">
    <h1>Пользователи - Лицевые счета {{ user.id }} a</h1>
    <el-button type="primary" class="add-news-button" @click="reload(user.id)">
      Обновить
    </el-button>
    <el-table
      :data="
        useraccount.filter(
          (data) =>
            !search ||
            data.firstName
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase())
        )
      "
      size="medium"
    >
      <el-table-column label="Фамилия" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.firstName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Имя" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.patronymicName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Отчество" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.lastName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Email" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Лиц.счет" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.idAccount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Квартира" width="250">
        <template slot-scope="{ row }">
          <span>{{ row.nameFlat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Ак." width="250">
        <template slot-scope="{ row }">
          <el-checkbox v-model="row.confirm" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import consola from 'consola'
// import store from 'store'
// const iduserfilter = this.$store.state.auth.user.iduser
// eslint-disable-next-line no-console
// console.log(this.$store.state.auth.user.iduser)
export default {
  layout: 'personal',
  async asyncData({ store, params, error, $axios }) {
    try {
      const iduserfilter = store.getters.auth.user.iduser
      // eslint-disable-next-line no-console
      console.log(store.state.auth.getters.user)
      const useraccount = await $axios.$get(
        '/api/accounts/v/?idUser=' + iduserfilter
      )
      return { useraccount }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data() {
    return {
      search: '',
      user: this.$store.state.auth.user,
      userA: [
        {
          id: 0,
          idUser: 0,
          firstName: '',
          patronymicName: '',
          lastName: '',
          idAccountFull: 0,
          idAccount: 0,
          nameFlat: '',
          email: '',
          confirm: 0
        }
      ]
    }
  },
  mounted() {
    const iduserfilter = this.$store.state.auth.user.iduser
    this.$axios
      .$get('/api/accounts/v/?idUser=' + iduserfilter)
      .then((response) => (this.useraccount = response))
  },

  methods: {
    async reload(idUserL) {
      try {
        await this.$axios
          .$get('/api/accounts/v/?idUser=' + idUserL)
          .then((response) => (this.useraccount = response))
      } catch (err) {
        consola.error(err.message)
      }
    },

    async changeActivate(data) {
      try {
        await this.$axios.$put(`/api/accounts/${data.id}`, data)
      } catch (err) {
        consola.error(err.message)
      }
    },
    async editUserAccount(id) {
      await this.$router.push(`/admin/useraccount/${id}`)
    },
    async addUserAccount() {
      await this.$router.push('/admin/useraccount/add')
    },
    async deleteUserAccount(id) {
      try {
        await this.$confirm('Удалить запись?', 'Внимание!', {
          confirmButtonText: 'Да',
          cancelButtonText: 'Отмена',
          type: 'warning'
        })
        await this.$axios.$delete(`/api/accounts/${id}`)
        this.useraccount = this.useraccount.filter((post) => post.id !== id)
        this.$message.success('Запись удалена!')
      } catch (err) {
        this.$message.warning('Действие отменено!')
      }
    }
  },
  head() {
    return {
      title: 'Пользователь - Лицевые счета'
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
