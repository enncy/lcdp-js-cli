import axios from 'axios'
import type { controllers } from '../../../server/src/api'
import { WebApis, createWebApis } from '@lcdp-js/web'

const request = axios.create({ baseURL: 'http://localhost:3077', withCredentials: true })

/**
 * 路由以及API数据
 */
export const schema_data = await request('/schema-data')
  .then((res) => res.data)
  .catch(console.error)

/**
 *
 * 前端请求接口
 *
 * 不能直接传递 controllers 参数，会将后端源码暴露在前端中，所以这里使用后端生成反射数据后，再进行传递解析
 */
export const apis: WebApis<typeof controllers> = schema_data?.apis
  ? createWebApis<any>(schema_data.apis, request, {
      onrequest(config) {},
      onresponse(config, result) {},
      onerror(config, error) {
        if (String(error).includes('Network Error')) {
          console.error('网络错误')
        } else {
          console.error('未知错误：' + String(error))
        }
      }
    })
  : undefined
