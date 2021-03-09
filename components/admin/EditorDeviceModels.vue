<template>
  <el-form
    ref="form"
    :model="controls"
    :rules="rules"
    label-width="150px"
    @submit.native.prevent="onSubmit"
  >
    <el-form-item label="Краткое наименование" prop="shottitle">
      <el-input v-model="controls.shottitle" />
    </el-form-item>
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
      {{ devicemodel ? 'Изменить' : 'Добавить' }}
    </el-button>
  </el-form>
</template>

<script>
import consola from 'consola'

export default {
  props: {
    devicemodel: {
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
        shottitle: this.devicemodel ? this.devicemodel.shottitle : '',
        title: this.devicemodel ? this.devicemodel.title : '',
        description: this.devicemodel ? this.devicemodel.description : ''
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
          if (!this.devicemodel) {
            try {
              this.loading = true
              await this.$axios.$post('/api/devicemodel', {
                shottitle: this.controls.shottitle,
                title: this.controls.title,
                description: this.controls.description
              })
              this.loading = false
              await this.$router.push('/admin/devicemodel')
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
                `/api/devicemodel/${this.devicemodel.id}`,
                {
                  shottitle: this.controls.shottitle,
                  title: this.controls.title,
                  description: this.controls.description
                }
              )
              this.loading = false
              await this.$router.push('/admin/devicemodel')
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
