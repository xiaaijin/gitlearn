export const encodeURIParams = (data) => {
    let url = ''
    const keys = Object.keys(data)
    keys.forEach((key) => {
        url += `&${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
    })

    return url ? url.substring(1) : ''
}

export const throttle = (fn, time = 500) => {
    let timer = null

    return function (...args) {
        if (timer == null) {
            fn.apply(this, args)
            timer = setTimeout(() => {
                timer = null
            }, time)
        }
    }
}

export const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}

export const deepcopy = (obj, cache = []) => {
    const find = (list, f) => {
        return list.filter(f)[0]
    }
    if (obj === null || typeof obj !== 'object') {
        return obj
    }
    const hit = find(cache, c => c.original === obj)

    if (hit) {
        return hit.copy
    }

    const copy = Array.isArray(obj) ? [] : {}
    cache.push({
        original: obj,
        copy
    })

    Object.keys(obj).forEach(key => {
        copy[key] = deepcopy(obj[key], cache)
    })

    return copy
}

/**
 * 将对象用 “&” 拼接成url 格式
 * @param {*} json
 */
export const encodeURIJson = (json) => {
    const s = []
    const jsonKeys = Object.keys(json)
    jsonKeys.forEach(key => {

        const jsonVal = json[key]

        if (jsonVal === '' || jsonVal === undefined || jsonVal === null) {
            return
        }
        if (Array.isArray(jsonVal)) {
            for (let i = 0; i < jsonVal.length; i++) {
                s.push(encodeURIComponent(key) + '[]=' + encodeURIComponent(jsonVal[i]))
            }
        } else {
            s.push(encodeURIComponent(key) + '=' + encodeURIComponent(jsonVal))
        }
    })

    return s.join('&')
}

/**
 * 将url后的参数转为对象
 * @param {*} url
 */
export const urlToJson = (url = window.location.href) => {
    const urlObject = {}
    let urlString = url
    if (/\?/.test(url)) {
        urlString = url.substring(url.indexOf('?') + 1)
    }
    const urlArray = urlString.split('&')
    for (let i = 0, len = urlArray.length; i < len; i++) {
        const urlItem = urlArray[i]
        const item = urlItem.split('=')
        if (item[0]) {
            urlObject[item[0]] = item[1]
        }
    }

    return urlObject
}

/**
 * 设置url中参数的值
 * 对象属性设置为空，认为是删除该参数
 * @param {*} url
 * @param {*} params
 */
export const setUrlParams = (url = window.location.href, params = {}) => {
    const paramsKeys = Object.keys(params)

    /**
     * 如果参数为空，返回正常url
     */
    if (paramsKeys.length === 0) {
        return url
    }

    /**
     * 判断url中是否有 “ ？ ”
     * 如果没有，先增加一个
     */
    if (url.indexOf('?') < 0) {
        url += '?'
    }

    const urlJson = urlToJson(url) || {}
    paramsKeys.forEach(key => {

        /**
         * 设置参数为空，即删除此参数
         */
        if (params[key] === '') {
            delete urlJson[key]
        } else {
            urlJson[key] = params[key]
        }
    })

    /**
     * 如果没有参数，返回问号之前的内容
     */
    if (Object.keys(urlJson).length === 0) {
        return url.substring(0, url.indexOf('?'))
    }

    return `${url.substring(0, url.indexOf('?') + 1)}${encodeURIJson(urlJson)}`
}

export const escapeChar = (str) => {
    return str.replace(/&quot;/g, '"').replace(/u&#39;/g, '"').replace(/&#39;/g, '"').replace(/u&quot;/g, '"')
}

/**
 * 移除字符串中两端的空格
 * @param str
 */
export const removeStrSpaces = (str) => {
    return str.trim()
}

export const linkRemoveStrSpaces = (str) => {
    return str.replace(/\s+/g, '')
}

export const isArray = (arr) => {
    return Array.isArray(arr)
}

export const isObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

export const isLink = (str) => {
    const httpReg = new RegExp('(http[s]{0,1}|ftp)://', 'gi')

    return httpReg.test(str)
}

/**
 * 递归移除对象属性中两端的空格
 * @param {Object}
 */
export const removeObjectSpaces = (data) => {

    /**
     * 如果不是对象或者数组，直接返回
     */
    if (!isArray(data) && !isObject(data)) {
        return data
    }
    const keys = Object.keys(data)
    keys.forEach(key => {

        /**
         * 如果是字符串，直接去空格
         * 如果是对象或者数组，递归
         */
        if (typeof data[key] === 'string') {

            // 判断是否为链接
            if (isLink(data[key])) {
                data[key] = linkRemoveStrSpaces(data[key])
            } else {
                data[key] = removeStrSpaces(data[key])
            }
        } else if (isArray(data[key]) || isObject(data[key])) {
            data[key] = removeObjectSpaces(data[key])
        }
    })

    return data
}

/**
 * @param {*} m
 */
const addZero = (m) => {
    return m < 10 ? '0' + m : m
}

/**
 * 时间戳转时间
 * @param {*} timestamp
 */
export const transformTime = (timestamp = '') => {
    if (timestamp === '') {
        return timestamp
    }
    const time = new Date(timestamp)
    const y = time.getFullYear()
    const M = addZero(time.getMonth() + 1)
    const d = addZero(time.getDate())
    const h = addZero(time.getHours())
    const m = addZero(time.getMinutes())
    const s = addZero(time.getSeconds())

    return `${y}-${M}-${d} ${h}:${m}:${s}`
}

export const getTime = (timestr) => {
    return parseInt(new Date(timestr).getTime() / 1000)
}

/**
 * url里的 http:// 转换成 https://
 * @param {*} url
 */
export const httpToHttps = (url = '') => {
    if (isArray(url)) {
        return url.map((item) => {
            return item.replace('http://', 'https://')
        })
    }

    return url.replace('http://', 'https://')
}
