import axios from 'axios'
import qs from 'qs'
import jsonp from 'jsonp'
import { Message, Loading } from 'element-ui'
import { encodeURIParams, throttle } from '@/utils'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true

let loading = {
    close () {}
}

// 判断数据是否需要序列化
const isSerialize = (config) => {
    const { file, method } = config
    const fmtMethod = method.toLocaleLowerCase()

    return !file && (fmtMethod === 'post' || fmtMethod === 'put' || fmtMethod === 'delete')
}

// 开发环境url做处理
const isFmtUrl = (config) => {

    return process.env.NODE_ENV === 'development' && config.url.indexOf('http') < 0
}

const message = throttle((res) => {
    Message.error({ message: res.msg || res.message })
}, 800)

// http request 拦截器
axios.interceptors.request.use(
    (config) => {

        // 如果是开发环境，所有请求前加api。走一层代理
        if (isFmtUrl(config)) {
            config.url = `/apiproxy${config.url}`
        }

        // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
        if (isSerialize(config)) {
            config.data = qs.stringify(config.data)
        }

        // post loading
        if (config.method.toLocaleLowerCase() === 'post') {
            loading = Loading.service({
                fullscreen: true,
                text: `${config.text || '数据提交中，请稍等'}`,
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.6)'
            })
        }

        return config
    },
    (err) => {
        Message.error({ message: '请求超时，请稍后重试！' })

        return Promise.resolve(err)
    }
)

// 响应统一处理
axios.interceptors.response.use((response) => {
    const res = response.data

    // close loading
    loading.close()

    if (res.EngName) {
        return res
    }

    if (res.errno === 0 || res.code === 100000) {
        return res
    }

    message(res)

    return Promise.reject(res)
}, (error) => {

    Promise.resolve(error.response)
})

// 让axios支持 jsonp
axios.jsonp = (url, options = {}) => {

    // aadasf
    url += (url.indexOf('?') < 0 ? '?' : '&') + encodeURIParams(options)

    return new Promise((resolve, reject) => {
        jsonp(url, {
            name: 'callback',
            param: 'jsonp'
        }, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

export const api = axios
