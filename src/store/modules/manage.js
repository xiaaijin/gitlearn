import * as manage from '@/service/manage'
import * as types from '../types'

// initial state
const state = {
    tableData: [],
    total: 0
}

// getters
const getters = {}

// actions
const actions = {

    /**
     * 获取我创建的活动列表
     */
    async getList ({ commit }, params) {
        const data = await manage.getList(params)
        commit(types.UPDATE_MANAGE_MODULE, data)
    }
}

// mutations
const mutations = {
    [types.UPDATE_MANAGE_MODULE] (state, data) {
        const { total, list } = data
        state.tableData = list
        state.total = total
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
