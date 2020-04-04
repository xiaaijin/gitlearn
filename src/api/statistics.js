/**
 * get传参数需要以 params 为key
 * post 直接发送数据即可
 */
import { api } from './base'

export default {

    /**
     * 获取活动列表
     */
    getList (params = {}) {
        return api.get('/api/getList', { params })
    },

    /**
     * 获取当前登陆用户的登录信息
     */
    getUserInfo (data = {}) {
        if (process.env.NODE_ENV === 'development') {
            return {
                EngName: 'janbinwang'
            }
        }

        return api.post('/ts:auth/tauth/info.ashx', data, {
            text: '获取用户登录信息，请稍等'
        })
    }
}
