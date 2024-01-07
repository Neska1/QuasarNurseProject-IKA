// src/boot/axios.js
import { boot } from 'quasar/wrappers'
import axios, { AxiosInstance } from 'axios'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const api = axios.create({
  baseURL: 'http://localhost:8082/'
})

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  // permet d'utiliser this.$axios

  app.config.globalProperties.$api = api
  // permet d'utiliser this.$api
})

export { api }
