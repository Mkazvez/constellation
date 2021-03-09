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
    <el-form-item label="Улица" prop="idStreet">
      <el-select v-model="controls.idStreet" placeholder="Выберите улицу">
        <el-option
          v-for="item in optionStreet"
          :key="item.value"
          :label="item.shotTypeStreet + ' ' + item.title"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Номер" prop="number">
      <el-input v-model="controls.number" />
    </el-form-item>
    <el-form-item label="Корпус" prop="build">
      <el-input v-model="controls.build" />
    </el-form-item>
    <el-form-item label="Литера" prop="litera">
      <el-input v-model="controls.litera" />
    </el-form-item>
    <el-button
      :loading="loading"
      type="primary"
      icon="el-icon-check"
      native-type="submit"
    >
      {{ house ? 'Изменить' : 'Добавить' }}
    </el-button>
  </el-form>
</template>

<script>
import consola from 'consola'

export default {
  props: {
    house: {
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
        title: this.house ? this.house.title : '',
        idStreet: this.house ? this.house.idStreet : '',
        number: this.house ? this.house.number : '',
        build: this.house ? this.house.build : '',
        litera: this.house ? this.house.litera : ''
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
        title: [{ required: false, message: 'Наименование', trigger: 'blur' }],
        idStreet: [{ required: true, message: 'Улица', trigger: 'blur' }],
        number: [{ required: true, message: 'Номер', trigger: 'blur' }],
        build: [{ required: false, message: 'Корпус', trigger: 'blur' }],
        litera: [{ required: false, message: 'Литера', trigger: 'blur' }]
      },
      optionStreet: null
    }
  },
  mounted() {
    this.$axios
      .$get('/api/street/v')
      .then((response) => (this.optionStreet = response))
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (!this.house) {
            try {
              this.loading = true
              await this.$axios.$post('/api/house', {
                title: this.controls.title,
                idStreet: this.controls.idStreet,
                number: this.controls.number,
                build: this.controls.build,
                litera: this.controls.litera
              })
              this.loading = false
              await this.$router.push('/admin/house')
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
              await this.$axios.$put(`/api/house/${this.house.id}`, {
                title: this.controls.title,
                idStreet: this.controls.idStreet,
                number: this.controls.number,
                build: this.controls.build,
                litera: this.controls.litera
              })
              this.loading = false
              await this.$router.push('/admin/house')
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
