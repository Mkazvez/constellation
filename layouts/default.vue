<template>
  <el-container direction="column">
    <app-header />
    <el-main>
      <el-row type="flex" justify="center">
        <el-col :xl="16" :lg="20">
          <nuxt />
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      Footer
    </el-footer>
  </el-container>
</template>

<script>
import AppHeader from '@/components/Header'

export default {
  components: { AppHeader }
}
</script>

<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  height: 100%;
  color: #333;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

body,
#__nuxt,
#__layout {
  height: 100%;
}

h1,
h2,
h3,
h4 {
  font-weight: 300;
  color: #333;
}

.el-container {
  height: 100%;
}

.ql-toolbar {
  &.ql-snow {
    border: 1px solid #dcdfe6;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
}

.ql-container {
  &.ql-snow {
    border: 1px solid #dcdfe6;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    .ql-editor {
      min-height: 300px;
    }
  }
}

.ql-editor {
  p {
    font-size: 14px;
  }
}

textarea {
  font-family: inherit;
}

.primary-link {
  color: #409eff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: #74b7ff;
  }
}
</style>
