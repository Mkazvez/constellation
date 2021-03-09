<template>
  <div class="news-wrapper">
    <h1>Новости</h1>
    <el-button type="primary" class="add-news-button" @click="addPost">
      Добавить новость
    </el-button>
    <el-table
      :data="
        posts.filter(
          (data) =>
            !search ||
            data.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      "
      size="medium"
    >
      <el-table-column label="Вкл" width="70" align="center">
        <template slot-scope="{ row }">
          <el-checkbox v-model="row.published" @change="changePublished(row)" />
        </template>
      </el-table-column>
      <el-table-column label="Дата" width="200">
        <template slot-scope="{ row }">
          <span>{{ $moment(row.createdAt).format('LLL') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Заголовок">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
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
            @click="editPost(row.id)"
          />
          <el-button
            icon="el-icon-delete"
            type="danger"
            size="mini"
            circle
            @click="deletePost(row.id)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import consola from 'consola'

export default {
  layout: 'admin',
  async asyncData({ $axios }) {
    const posts = await $axios.$get('/api/post')
    return { posts }
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    async changePublished(data) {
      try {
        await this.$axios.$put(`/api/post/published/${data.id}`, data)
      } catch (err) {
        consola.error(err.message)
      }
    },
    async editPost(id) {
      await this.$router.push(`/admin/news/${id}`)
    },
    async addPost() {
      await this.$router.push('/admin/news/add')
    },
    async deletePost(id) {
      try {
        await this.$confirm('Удалить запись?', 'Внимание!', {
          confirmButtonText: 'Да',
          cancelButtonText: 'Отмена',
          type: 'warning'
        })
        await this.$axios.$delete(`/api/post/${id}`)
        this.posts = this.posts.filter((post) => post.id !== id)
        this.$message.success('Запись удалена!')
      } catch (err) {
        this.$message.warning('Действие отменено!')
      }
    }
  },
  head() {
    return {
      title: 'Новости'
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
