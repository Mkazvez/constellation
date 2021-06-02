<template>
  <el-form
    ref="form"
    :model="controls"
    :rules="rules"
    label-width="150px"
    @submit.native.prevent="onSubmit"
  >
    <el-form-item label="Квартира" prop="idFlat">
      <el-select
        v-model="controls.idFlat"
        filterable
        placeholder="Выберите квартиру"
      >
        <el-option
          v-for="item in optionFlat"
          :key="item.value"
          :label="
            item.nameHouse +
              ' кв. ' +
              item.number +
              ' ' +
              item.build +
              ' ' +
              item.litera
          "
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Лицевой счет" prop="idAccount">
      <el-input v-model="controls.idAccount" />
    </el-form-item>
    <!-- <el-form-item label="Квартира" prop="idFlat">
      <el-input v-model="controls.idFlat" />
    </el-form-item> -->
    <el-form-item label="Процент" prop="procent">
      <el-input v-model="controls.procent" />
    </el-form-item>
    <el-form-item label="Площадь" prop="sq">
      <el-input v-model="controls.sq" />
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
        procent: this.account ? this.account.procent : '',
        sq: this.account ? this.account.sq : '',
        idFlat: this.account ? this.account.idFlat : ''
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
        procent: [{ required: false, message: 'Процент', trigger: 'blur' }],
        sq: [{ required: false, message: 'Площадь', trigger: 'blur' }],
        idFlat: [{ required: false, message: 'Квартира', trigger: 'blur' }]
      },
      optionFlat: null
    }
  },
  mounted() {
    this.$axios
      .$get('/api/flat/v')
      .then((response) => (this.optionFlat = response))
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (!this.account) {
            try {
              this.loading = true
              await this.$axios.$post('/api/accountFulls', {
                idAccount: this.controls.idAccount,
                procent: this.controls.procent,
                sq: this.controls.sq,
                idFlat: this.controls.idFlat
              })
              this.loading = false
              await this.$router.push('/admin/account')
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
              await this.$axios.$put(`/api/accountFulls/${this.account.id}`, {
                idAccount: this.controls.idAccount,
                procent: this.controls.procent,
                sq: this.controls.sq,
                idFlat: this.controls.idFlat
              })
              this.loading = false
              await this.$router.push('/admin/account')
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
  line-height: 50px
  width: 300px
</style>

<style lang="sass">
.el-select
  width: 500px
</style>
