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
    <el-form-item label="Адрес" prop="adres">
      <el-input v-model="controls.adres" />
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input v-model="controls.email" />
    </el-form-item>
    <el-form-item label="URL" prop="url">
      <el-input v-model="controls.url" />
    </el-form-item>
    <el-form-item label="URL администрирования" prop="urladmin">
      <el-input v-model="controls.urladmin" />
    </el-form-item>
    <el-button
      :loading="loading"
      type="primary"
      icon="el-icon-check"
      native-type="submit"
    >
      {{ typedevice ? 'Изменить' : 'Добавить' }}
    </el-button>
  </el-form>
</template>

<script>
import consola from 'consola'

export default {
  props: {
    servicemanafacture: {
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
        shottitle: this.servicemanufacture
          ? this.servicemanufacture.shottitle
          : '',
        title: this.servicemanufacture ? this.servicemanufacture.title : '',
        description: this.servicemanufacture
          ? this.servicemanufacture.description
          : '',
        adres: this.servicemanufacture ? this.servicemanufacture.adres : '',
        email: this.servicemanufacture ? this.servicemanufacture.email : '',
        url: this.servicemanufacture ? this.servicemanufacture.url : '',
        urladmin: this.servicemanufacture
          ? this.servicemanufacture.urladmin
          : ''
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
        description: [{ required: true, message: 'Описание', trigger: 'blur' }],
        adres: [{ required: true, message: 'Адрес', trigger: 'blur' }],
        email: [{ required: true, message: 'Email', trigger: 'blur' }],
        url: [{ required: true, message: 'URL', trigger: 'blur' }],
        urladmin: [{ required: true, message: 'URL админ', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (!this.servicemanafacture) {
            try {
              this.loading = true
              await this.$axios.$post('/api/servicemanafacture', {
                shottitle: this.controls.shottitle,
                title: this.controls.title,
                description: this.controls.description,
                adres: this.controls.adres,
                email: this.controls.email,
                url: this.controls.url,
                urlAdmin: this.controls.urladmin
              })
              this.loading = false
              await this.$router.push('/admin/servicemanafacture')
            } catch (err) {
              this.loading = false
              this.$message.error(
                'Произошла ошибка сервера, при добавлении, попробуйте еще раз!'
              )
              consola.error(err.message)
            }
          } else {
            try {
              this.loading = true
              await this.$axios.$put(
                `/api/servicemanafacture/${this.servicemanafacture.id}`,
                {
                  shottitle: this.controls.shottitle,
                  title: this.controls.title,
                  description: this.controls.description,
                  adres: this.controls.adres,
                  email: this.controls.email,
                  url: this.controls.url,
                  urladmin: this.controls.urladmin
                }
              )
              this.loading = false
              await this.$router.push('/admin/servicemanafacture')
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
