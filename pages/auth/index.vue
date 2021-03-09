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
          <h2>Авторизация</h2>
          <el-form-item label="Email" prop="email">
            <el-input v-model.trim="controls.email" />
          </el-form-item>
          <el-form-item label="Пароль" prop="pass">
            <el-input v-model.trim="controls.pass" show-password />
          </el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            native-type="submit"
            size="medium"
          >
            Вход
          </el-button>
        </el-form>
      </el-card>
      <div class="footer-link">
        <nuxt-link class="primary-link" to="/auth/registration">
          Регистрация
        </nuxt-link>
        <nuxt-link class="primary-link" to="/auth/forgot-password">
          Забыли пароль?
        </nuxt-link>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    return {
      loading: false,
      controls: { email: '', pass: '' },
      rules: {
        email: [
          { required: true, message: 'Введите email', trigger: 'blur' },
          { type: 'email', message: 'Некорректный email', trigger: 'blur' }
        ],
        pass: [{ required: true, message: 'Введите пароль', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            const user = await this.$store.dispatch('auth/loginUser', {
              email: this.controls.email,
              password: this.controls.pass
            })
            this.loading = false
            if (user) {
              this.$message.success('Успешная авторизация')
              if (user.role === 'admin') await this.$router.push('/admin')
              if (user.role === 'user') await this.$router.push('/')
            } else {
              this.$message.error('Неверный логин или пароль')
            }
          } catch (err) {
            this.loading = false
            this.$message.error('Произошла ошибка сервера, попробуйте еще раз!')
          }
        }
      })
    }
  },
  head() {
    return {
      title: 'Авторизация'
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
  flex-direction: column
  align-items: center

.card-wrapper
  width: 500px
  button
    margin-top: 10px

.footer-link
  margin-top: 10px
  padding: 0 15px
  display: flex
  justify-content: space-between
  width: 500px
</style>
