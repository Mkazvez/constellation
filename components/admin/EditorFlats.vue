<template>
  <el-form
    ref="form"
    :model="controls"
    :rules="rules"
    label-width="150px"
    @submit.native.prevent="onSubmit"
  >
    <el-form-item label="Дом" prop="idHouse">
      <el-select
        v-model="controls.idHouse"
        filterable
        placeholder="Выберите дом"
      >
        <el-option
          v-for="item in optionHouse"
          :key="item.value"
          :label="
            item.shotTypeStreet +
              ' ' +
              item.titleStreet +
              ' ' +
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
    <el-form-item label="Номер" prop="number">
      <el-input v-model="controls.number" />
    </el-form-item>
    <el-form-item label="Блок" prop="build">
      <el-input v-model="controls.build" />
    </el-form-item>
    <el-form-item label="Литера" prop="letter">
      <el-input v-model="controls.letter" />
    </el-form-item>
    <el-button
      :loading="loading"
      type="primary"
      icon="el-icon-check"
      native-type="submit"
    >
      {{ flat ? 'Изменить' : 'Добавить' }}
    </el-button>
  </el-form>
</template>

<script>
import consola from 'consola'

export default {
  props: {
    flat: {
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
        idHouse: this.flat ? this.flat.idHouse : '',
        number: this.flat ? this.flat.number : '',
        build: this.flat ? this.flat.build : '',
        letter: this.flat ? this.flat.letter : ''
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
        idHouse: [{ required: true, message: 'Дом', trigger: 'blur' }],
        number: [{ required: true, message: 'Номер', trigger: 'blur' }],
        build: [{ required: false, message: 'Корпус', trigger: 'blur' }],
        letter: [{ required: false, message: 'Литера', trigger: 'blur' }]
      },
      optionHouse: null
    }
  },
  mounted() {
    this.$axios
      .$get('/api/house/v')
      .then((response) => (this.optionHouse = response))
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (!this.flat) {
            try {
              this.loading = true
              await this.$axios.$post('/api/flat', {
                idHouse: this.controls.idHouse,
                number: this.controls.number,
                build: this.controls.build,
                letter: this.controls.letter
              })
              this.loading = false
              await this.$router.push('/admin/flat')
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
              await this.$axios.$put(`/api/flat/${this.flat.id}`, {
                idHouse: this.controls.idHouse,
                number: this.controls.number,
                build: this.controls.build,
                letter: this.controls.letter
              })
              this.loading = false
              await this.$router.push('/admin/flat')
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
