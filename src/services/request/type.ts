import type { AxiosRequestConfig, AxiosResponse } from 'axios'
//自定义类接口类型
interface XRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (error: any) => any
}
// 继承原来config 类型,拓展自定义类型
interface XRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: XRequestInterceptors<T>
  showLoading?: boolean
}

export { XRequestInterceptors, XRequestConfig }
