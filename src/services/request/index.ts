import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { XRequestInterceptors, XRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import 'element-plus/es/components/loading/style/css'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

const DEFAULT_LOADING = true

class XXRequest {
  instance: AxiosInstance
  interceptors?: XRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: XRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? DEFAULT_LOADING //默认所有请求有loading装填
    this.interceptors = config.interceptors
    //对应实例的 设置请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    //对应实例设置响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    //全局请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('全局请求拦截器')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0,0,0,0.5)'
          })
        }

        return config
      },
      (err) => {
        return err
      }
    )

    //全局响应拦截
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        return res
      },
      (err) => {
        this.loading?.close()
        return err
      }
    )
  }

  //请求拦截
  request<T>(config: XRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
          this.showLoading = DEFAULT_LOADING
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING

          reject(err)
        })
    })
  }

  get<T>(config: XRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: XRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: XRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: XRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default XXRequest
