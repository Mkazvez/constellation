<template>
  <el-form
    ref="form"
    :model="controls"
    :rules="rules"
    label-width="150px"
    @submit.native.prevent="onSubmit"
  >
    <el-form-item label="Наименование" prop="title">
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
    <el-button
      :loading="loading"
      type="primary"
      icon="el-icon-check"
      native-type="submit"
    >
      {{ typedocument ? 'Изменить' : 'Добавить' }}
    </el-button>
  </el-form>
</template>

<script>
import consola from 'consola'

export default {
  props: {
    typedocument: {
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
        shottitle: this.typedocument ? this.typedocument.shottitle : '',
        title: this.typedocument ? this.typedocument.title : '',
        description: this.typedocument ? this.typedocument.description : ''
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
        shottitle: [
          { required: true, message: 'Краткое наименование', trigger: 'blur' }
        ],
        title: [{ required: true, message: 'Наименование', trigger: 'blur' }],
        description: [
          { required: true, message: 'Краткое описание', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (!this.typedocument) {
            try {
              this.loading = true
              await this.$axios.$post('/api/typedocument', {
                shottitle: this.controls.shottitle,
                title: this.controls.title,
                description: this.controls.description
              })
              this.loading = false
              await this.$router.push('/admin/typedocument')
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
              await this.$axios.$put(
                `/api/typedocument/${this.typedocument.id}`,
                {
                  shottitle: this.controls.shottitle,
                  title: this.controls.title,
                  description: this.controls.description
                }
              )
              this.loading = false
              await this.$router.push('/admin/typedocument')
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
