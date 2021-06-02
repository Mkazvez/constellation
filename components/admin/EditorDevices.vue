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
    <el-form-item label="Номер" prop="number">
      <el-input v-model="controls.number" />
    </el-form-item>
    <el-form-item label="Номер в ГИС" prop="idGis">
      <el-input v-model="controls.idGis" />
    </el-form-item>
    <el-form-item label="Описание" prop="description">
      <el-input v-model="controls.description" />
    </el-form-item>
    <el-form-item label="Ресурс" prop="idResurs">
      <el-select
        v-model="controls.idResurs"
        filterable
        placeholder="Выберите ресурс"
      >
        <el-option
          v-for="item in optionResurs"
          :key="item.value"
          :label="item.shottitle"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Тип приборы" prop="idTypeDevice">
      <el-select
        v-model="controls.idTypeDevice"
        filterable
        placeholder="Выберите тип прибора"
      >
        <el-option
          v-for="item in optionTypeDevice"
          :key="item.value"
          :label="item.shottitle"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Марка прибора" prop="idMark">
      <el-select
        v-model="controls.idMark"
        filterable
        placeholder="Выберите марку прибора"
      >
        <el-option
          v-for="item in optionMark"
          :key="item.value"
          :label="item.shottitle"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Модель прибора" prop="idDeviceModel">
      <el-select
        v-model="controls.idDeviceModel"
        filterable
        placeholder="Выберите модель прибора"
      >
        <el-option
          v-for="item in optionDeviceModel"
          :key="item.value"
          :label="item.shottitle"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
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
    <el-button
      :loading="loading"
      type="primary"
      icon="el-icon-check"
      native-type="submit"
    >
      {{ device ? 'Изменить' : 'Добавить' }}
    </el-button>
  </el-form>
</template>

<script>
import consola from 'consola'

export default {
  props: {
    device: {
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
        title: this.device ? this.device.title : '',
        description: this.device ? this.device.description : '',
        number: this.device ? this.device.number : '',
        idResurs: this.device ? this.device.idResurs : '',
        idDeviceModel: this.device ? this.device.idDeviceModel : '',
        idMark: this.device ? this.device.idMark : '',
        idGis: this.device ? this.device.idGis : '',
        idTypeDevice: this.device ? this.device.idTypeDevice : '',
        idFlat: this.device ? this.device.idFlat : ''
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
        description: [
          { required: false, message: 'Комментарий', trigger: 'blur' }
        ],
        number: [{ required: false, message: 'Номер', trigger: 'blur' }],
        idResurs: [{ required: false, message: 'Ресурс', trigger: 'blur' }],
        idDeviceModel: [
          { required: false, message: 'Модель', trigger: 'blur' }
        ],
        idMark: [{ required: false, message: 'Марка', trigger: 'blur' }],
        idGis: [{ required: false, message: 'Номер ГИС', trigger: 'blur' }],
        idTypeDevice: [
          { required: false, message: 'Наименование', trigger: 'blur' }
        ],
        idFlat: [{ required: false, message: 'Квартира', trigger: 'blur' }]
      },
      optionResurs: null,
      optionDeviceModel: null,
      optionMark: null,
      optionTypeDevice: null,
      optionFlat: null
    }
  },
  mounted() {
    this.$axios
      .$get('/api/typeResurs')
      .then((response) => (this.optionResurs = response))
    this.$axios
      .$get('/api/deviceMark')
      .then((response) => (this.optionMark = response))
    this.$axios
      .$get('/api/deviceModel')
      .then((response) => (this.optionDeviceModel = response))
    this.$axios
      .$get('/api/flat/v')
      .then((response) => (this.optionFlat = response))
    this.$axios
      .$get('/api/typeDevice')
      .then((response) => (this.optionTypeDevice = response))
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (!this.device) {
            try {
              this.loading = true
              await this.$axios.$post('/api/device', {
                title: this.controls.title,
                description: this.controls.description,
                number: this.controls.number,
                idResurs: this.controls.idResurs,
                idDeviceModel: this.controls.idDeviceModel,
                idMark: this.controls.idMark,
                idGis: this.controls.idGis,
                idTypeDevice: this.controls.idTypeDevice,
                idFlat: this.controls.idFlat
              })
              this.loading = false
              await this.$router.push('/admin/device')
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
              await this.$axios.$put(`/api/device/${this.device.id}`, {
                title: this.controls.title,
                description: this.controls.description,
                number: this.controls.number,
                idResurs: this.controls.idResurs,
                idDeviceModel: this.controls.idDeviceModel,
                idMark: this.controls.idMark,
                idGis: this.controls.idGis,
                idTypeDevice: this.controls.idTypeDevice,
                idFlat: this.controls.idFlat
              })
              this.loading = false
              await this.$router.push('/admin/device')
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

<style lang="sass">
.el-select
  width: 500px
</style>
