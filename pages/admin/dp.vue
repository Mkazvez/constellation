<template>
  <div>
    <p v-for="item in options" :key="item.value" :value="item.value">
      {{ item.label }} : {{ item.value }}
    </p>

    aaa {{ optionTypeStreet }} bbb {{ optionsT }}

    <p v-for="item in optionT" :key="item.id">
      {{ item.id }} : {{ item.value }}
    </p>

    <el-select v-model="type">
      <el-option
        v-for="item in optionsT"
        :key="item.value"
        :label="item.shottitle"
        :value="item.id"
      ></el-option>
    </el-select>
    {{ currentPage }} / {{ pageCount }}
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const optionsT = await $axios.$get('/api/typestreet')
    return { optionsT }
  },
  data() {
    return {
      currentPage: 0,
      pageCount: 0,
      options: [
        { label: 'type1', value: '1' },
        { label: 'type2', value: '2' }
      ],
      optionTypeStreet: this.optionsT
    }
  }
}
</script>
