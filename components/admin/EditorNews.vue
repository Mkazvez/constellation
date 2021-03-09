<template>
  <el-form
    ref="form"
    :model="controls"
    :rules="rules"
    label-width="150px"
    @submit.native.prevent="onSubmit"
  >
    <el-form-item label="Заголовок" prop="title">
      <el-input v-model="controls.title" />
    </el-form-item>
    <el-form-item label="Краткое описание" prop="description">
      <el-input
        v-model="controls.description"
        type="textarea"
        resize="none"
        :rows="3"
      />
    </el-form-item>
    <el-form-item label="Текст новости" prop="text">
      <client-only>
        <quill-editor
          ref="editor"
          v-model="controls.text"
          :options="editorOption"
        />
      </client-only>
    </el-form-item>
    <el-button
      :loading="loading"
      type="primary"
      icon="el-icon-check"
      native-type="submit"
    >
      {{ post ? 'Изменить' : 'Добавить' }}
    </el-button>
  </el-form>
</template>

<script>
import consola from 'consola'

export default {
  props: {
    post: {
      type: Object,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      loading: false,
      controls: {
        title: this.post ? this.post.title : '',
        description: this.post ? this.post.description : '',
        text: this.post ? this.post.text : ''
      },
      editorOption: {
        modules: {
          toolbar: [
            [{ size: ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ align: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['link', 'image', 'video'],
            ['clean']
          ]
        },
        placeholder: ''
      },
      rules: {
        title: [
          { required: true, message: 'Заголовок новости', trigger: 'blur' }
        ],
        description: [
          { required: true, message: 'Краткое описание', trigger: 'blur' }
        ],
        text: [{ required: true, message: 'Текст новости', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (!this.post) {
            try {
              this.loading = true
              await this.$axios.$post('/api/post', {
                title: this.controls.title,
                description: this.controls.description,
                text: this.controls.text
              })
              this.loading = false
              await this.$router.push('/admin/news')
            } catch (err) {
              this.loading = false
              this.$message.error(
                'Произошла ошибка сервера, попробуйте еще раз!'
              )
              consola.error(err.message)
            }
          } else {
            try {
              this.loading = true
              await this.$axios.$put(`/api/post/${this.post.id}`, {
                title: this.controls.title,
                description: this.controls.description,
                text: this.controls.text
              })
              this.loading = false
              await this.$router.push('/admin/news')
            } catch (err) {
              this.loading = false
              this.$message.error(
                'Произошла ошибка сервера, попробуйте еще раз!'
              )
              consola.error(err.message)
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.quill-editor
  color: #606266

form
  position: relative

button
  position: absolute
  left: 150px
  margin: 10px 0 30px
</style>

<style lang="sass">
.el-form-item__content
  line-height: 25px
</style>
