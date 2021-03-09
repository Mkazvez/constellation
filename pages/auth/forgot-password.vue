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
          <h2>Изменение пароля</h2>
          <el-form-item label="Email" prop="email">
            <el-input v-model.trim="controls.email" />
          </el-form-item>
          <el-button
            v-loading.fullscreen.lock="fullScreenLoading"
            type="primary"
            native-type="submit"
            size="medium"
          >
            Отправить
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
    return {
      fullScreenLoading: false,
      controls: { email: '' },
      rules: {
        email: [
          { required: true, message: 'Введите email', trigger: 'blur' },
          { type: 'email', message: 'Некорректный email', trigger: 'blur' }
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
            await this.$axios.$post('/api/auth/forgot-password', {
              email: this.controls.email
            })
            this.fullScreenLoading = false
            this.$message.success(
              'Если существует пользователь с таким email-адресом, то ему будет отправлено письмо с сылкой для восстановления пароля'
            )
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
      title: 'Изменение пароля'
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
</style>
