<template>
  <el-form
    ref="form"
    :model="controls"
    :rules="rules"
    label-width="150px"
    @submit.native.prevent="onSubmit"
  >
    <el-form-item label="Пользователь" prop="idUser">
      <el-select v-model="controls.idUser" placeholder="Выберите пользователя">
        <el-option
          v-for="item in optionUsers"
          :key="item.value"
          :label="
            item.firstName +
              ' ' +
              item.patronymicName +
              ' ' +
              item.lastName +
              ' ' +
              item.email
          "
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Лицевой счет" prop="idAccount">
      <el-select
        v-model="controls.idAccount"
        placeholder="Выберите лицевой счет"
      >
        <el-option
          v-for="item in optionAccount"
          :key="item.value"
          :label="item.idAccount + ' ' + item.nameFlat"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Активный" prop="confirm">
      <el-checkbox v-model="controls.confirm" />
    </el-form-item>
    <el-button
      :loading="loading"
      type="primary"
      icon="el-icon-check"
      native-type="submit"
    >
      {{ account ? 'Изменить' : 'Добавить' }}
    </el-button>
  </el-form>
</template>

<script>
import consola from 'consola'

export default {
  props: {
    account: {
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
        idAccount: this.account ? this.account.idAccount : '',
        idUser: this.account ? this.account.idUser : '',
        confirm: this.account ? this.account.confirm : ''
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
        idAccount: [{ required: false, message: 'ЛС', trigger: 'blur' }],
        idUser: [{ required: false, message: 'Пользователь', trigger: 'blur' }],
        confirm: [{ required: false, message: 'АК', trigger: 'blur' }]
      },
      optionUsers: null,
      optionAccount: null
    }
  },
  mounted() {
    this.$axios
      .$get('/api/user/all/')
      .then((response) => (this.optionUsers = response))
    this.$axios
      .$get('/api/accountFulls/v/')
      .then((response) => (this.optionAccount = response))
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (!this.account) {
            try {
              this.loading = true
              await this.$axios.$post('/api/accounts', {
                idAccount: this.controls.idAccount,
                idUser: this.controls.idUser,
                confirm: this.controls.confirm
              })
              this.loading = false
              await this.$router.push('/admin/useraccount')
            } catch (err) {
              this.loading = false
              this.$message.error(
                'Произошла ошибка добавления сервера, попробуйте еще раз!'
              )
              consola.error(err.message)
            }
          } else {
            try {
              this.loading = true
              await this.$axios.$put(`/api/accounts/${this.account.id}`, {
                idAccount: this.controls.idAccount,
                idUser: this.controls.idUser,
                confirm: this.controls.confirm
              })
              this.loading = false
              await this.$router.push('/admin/useraccount')
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
