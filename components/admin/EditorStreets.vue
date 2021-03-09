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
    <el-form-item label="Описание" prop="description">
      <el-input
        v-model="controls.description"
        type="textarea"
        resize="none"
        :rows="3"
      />
    </el-form-item>
    <el-form-item label="Регион" prop="idregion">
      <el-select v-model="controls.idregion" placeholder="Выберите регион">
        <el-option
          v-for="item in optionRegion"
          :key="item.value"
          :label="item.title"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Тип улицы" prop="idtypestreet">
      <el-select
        v-model="controls.idtypestreet"
        placeholder="Выберите тип улицы"
      >
        <el-option
          v-for="item in optionTypeStreet"
          :key="item.value"
          :label="item.shottitle"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-button
      :loading="loading"
      type="primary"
      icon="el-icon-check"
      native-type="submit"
    >
      {{ street ? 'Изменить' : 'Добавить' }}
    </el-button>
  </el-form>
</template>

<script>
import consola from 'consola'

export default {
  props: {
    street: {
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
        title: this.street ? this.street.title : '',
        description: this.street ? this.street.description : '',
        idregion: this.street ? this.street.idRegion : '',
        idtypestreet: this.street ? this.street.idTypeStreet : ''
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
        title: [{ required: true, message: 'Наименование', trigger: 'blur' }],
        description: [
          { required: true, message: 'Краткое описание', trigger: 'blur' }
        ],
        idregion: [{ required: false, message: 'Регион', trigger: 'blur' }],
        idtypestreet: [
          { required: true, message: 'Тип улицы', trigger: 'blur' }
        ]
      },
      optionTypeStreet: null,
      optionRegion: null
    }
  },
  mounted() {
    this.$axios
      .$get('/api/typestreet')
      .then((response) => (this.optionTypeStreet = response))
    this.$axios
      .$get('/api/region')
      .then((response) => (this.optionRegion = response))
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (!this.street) {
            try {
              this.loading = true
              await this.$axios.$post('/api/street', {
                title: this.controls.title,
                description: this.controls.description,
                idRegion: this.controls.idregion,
                idTypeStreet: this.controls.idtypestreet
              })
              this.loading = false
              await this.$router.push('/admin/street')
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
              await this.$axios.$put(`/api/street/${this.street.id}`, {
                title: this.controls.title,
                description: this.controls.description,
                idRegion: this.controls.idregion,
                idTypeStreet: this.controls.idtypestreet
              })
              this.loading = false
              await this.$router.push('/admin/street')
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
