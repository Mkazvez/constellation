<template>
  <el-row class="row-wrapper" type="flex" justify="center">
    <el-col class="col-wrapper">
      <el-card class="card-wrapper">
        <el-form
          ref="form"
          :model="controls"
          :rules="rules"
          @submit.native.prevent="onSubmit"
        >
          <h2>Регистрация</h2>
          <el-form-item label="Email" prop="email">
            <el-input v-model.trim="controls.email" />
          </el-form-item>
          <el-form-item label="Телефон" prop="phone">
            <el-input v-model.trim="controls.phone" />
          </el-form-item>
          <el-form-item label="Пароль" prop="pass">
            <el-input v-model.trim="controls.pass" show-password />
          </el-form-item>
          <el-form-item label="Повторите пароль" prop="checkPass">
            <el-input v-model.trim="controls.checkPass" show-password />
          </el-form-item>
          <el-button
            v-loading.fullscreen.lock="fullScreenLoading"
            type="primary"
            native-type="submit"
            size="medium"
          >
            Регистрация
          </el-button>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    const validatePass = (rule, value, callback) => {
      if (this.controls.checkPass !== '') {
        this.$refs.form.validateField('checkPass')
      }
      callback()
    }

    const validateCheckPass = (rule, value, callback) => {
      if (value !== this.controls.pass) {
        callback(new Error('Пароли не совпадают!'))
      } else {
        callback()
      }
    }
    return {
      fullScreenLoading: false,
      controls: {
        email: '',
        pass: '',
        checkPass: '',
        phone: ''
      },
      rules: {
        email: [
          { required: true, message: 'Введите email', trigger: 'blur' },
          { type: 'email', message: 'Некорректный email', trigger: 'blur' }
        ],
        phone: [
          { required: false, message: 'Введите телефон', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: 'Введите пароль', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' },
          {
            min: 8,
            message: 'Пароль должен быть не менее 8-ми символов',
            trigger: 'blur'
          }
        ],
        checkPass: [
          { required: true, message: 'Ведите пароль еще раз', trigger: 'blur' },
          { validator: validateCheckPass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.fullScreenLoading = true
          try {
            const result = await this.$axios.$post('/api/auth/register', {
              email: this.controls.email,
              password: this.controls.pass,
              phone: this.controls.phone
            })
            this.fullScreenLoading = false
            if (result === 0) {
              this.$message.error('Пользователь с таким email уже существует!')
            } else {
              this.controls.email = ''
              this.controls.pass = ''
              this.controls.checkPass = ''
              this.$message.success('Регистрация прошла успешно!')
            }
          } catch (err) {
            this.fullScreenLoading = false
            this.$message.error('Произошла ошибка сервера, попробуйте еще раз!')
          }
        }
      })
    }
  },
  head() {
    return {
      title: 'Регистрация'
    }
  }
}
</script>

<style lang="sass" scoped>
.row-wrapper
  height: 100vh
  align-items: center

.col-wrapper
  display: flex
  justify-content: center

.card-wrapper
  width: 500px
  button
    margin-top: 10px
</style>
