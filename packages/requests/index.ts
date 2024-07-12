import axios from 'axios'

interface IConfig {
  config: any
  reqResolveCb: (req: any) => any
  reqRejectCb: (err: any) => any
  resResolveCb: (res: any) => any
  resRejectCb: (err: any) => any
}

/**
 * 創建請求實例
 *
 * @param {*} { config, reqResolveCb, reqRejectCb, resResolveCb, resRejectCb }
 */
const requestCreate = ({
  config,
  reqResolveCb,
  reqRejectCb,
  resResolveCb,
  resRejectCb
}: IConfig): void => {
  // axios實例
  const requestInstance = axios.create({
    baseURL: config.mock ? config.mockApi : config.baseApi,
    timeout: 8000
  })

  // 請求攔截
  requestInstance.interceptors.request.use(reqResolveCb, reqRejectCb)

  // 響應攔截
  requestInstance.interceptors.response.use(resResolveCb, resRejectCb)

  /**
   * 建立請求方法1(配置物件請求方式)
   * @param {Object} option - 配置 axios 的 config 物件
   * @returns axios 的實例
   */
  const request: any = (option: any) => {
    // 預設請求設定為 get 請求
    option.method = option.method || 'get'

    // 傳入的參數都統一使用 data，再由程式自行判定是 get 或 post 請求，來去改變是要使用 data 或 params
    if (option.method.toLowerCase() === 'get') option.params = option.data || {}

    if (!option.data) option.data = {}

    let isMock = config.mock
    if (typeof option.mock !== 'undefined') isMock = option.mock

    // 以防萬一 baseURL 被設成 mock api 的網址
    if (config.env === 'production') {
      requestInstance.defaults.baseURL = config.baseApi
    } else {
      requestInstance.defaults.baseURL = isMock
        ? config.mockApi
        : config.baseApi
    }

    return requestInstance(option)
  }

  /**
   * 建立請求方法2(直接以方法做請求)
   */
  ;['get', 'post', 'put', 'delete'].forEach(method => {
    request[method] = (url: string, data: any, option: any) => {
      return request({
        url,
        method,
        data,
        ...option
      })
    }
  })
  return request
}

export default requestCreate
