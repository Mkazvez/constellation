<template>
  <el-form
    ref="form"
    :model="controls"
    :rules="rules"
    label-width="150px"
    @submit.native.prevent="onSubmit"
  >
    <el-form-item label="Фамилия" prop="lastName">
      <el-input v-model="controls.lastName" />
    </el-form-item>
    <el-form-item label="Имя" prop="firstName">
      <el-input v-model="controls.firstName" />
    </el-form-item>
    <el-form-item label="Отчество" prop="patronymicName">
      <el-input v-model="controls.patronymicName" />
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input v-model="controls.email" />
    </el-form-item>
    <el-form-item label="Телефон" prop="phone">
      <el-input v-model="controls.phone" />
    </el-form-item>
    <el-form-item label="Роль" prop="role">
      <el-input v-model="controls.role" />
    </el-form-item>
    <el-button
      :loading="loading"
      type="primary"
      icon="el-icon-check"
      native-type="submit"
    >
      {{ usere ? 'Изменить' : 'Добавить' }}
    </el-button>
  </el-form>
</template>

<script>
import consola from 'consola'

export default {
  props: {
    usere: {
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
        email: this.usere ? this.usere.email : '',
        role: this.usere ? this.usere.role : '',
        firstName: this.usere ? this.usere.firstName : '',
        patronymicName: this.usere ? this.usere.patronymicName : '',
        lastName: this.usere ? this.usere.lastName : '',
        phone: this.usere ? this.usere.phone : ''
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
        email: [{ required: false, message: 'Email', trigger: 'blur' }],
        role: [{ required: false, message: 'Роль', trigger: 'blur' }],
        firstName: [{ required: false, message: 'Фамилия', trigger: 'blur' }],
        patronymicName: [
          { required: false, message: 'Отчество', trigger: 'blur' }
        ],
        lastName: [{ required: false, message: 'Имя', trigger: 'blur' }],
        phone: [{ required: false, message: 'Телефон', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (!this.usere) {
            try {
              this.loading = true
              await this.$axios.$post('/api/user', {
                email: this.controls.email,
                role: this.controls.role,
                firstName: this.controls.firstName,
                patronymicName: this.controls.patronymicName,
                lastName: this.controls.lastName,
                phone: this.controls.phone
              })
              this.loading = false
              await this.$router.push('/admin/users')
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
              await this.$axios.$put(`/api/user/${this.usere.id}`, {
                email: this.controls.email,
                role: this.controls.role,
                firstName: this.controls.firstName,
                patronymicName: this.controls.patronymicName,
                lastName: this.controls.lastName,
                phone: this.controls.phone
              })
              this.loading = false
              await this.$router.push('/admin/users')
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
