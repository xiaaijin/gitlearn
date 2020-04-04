import statistics from '@/api/statistics'

export const getList = async (params) => {
    const res = await statistics.getList(params)

    return res.data
}

export const getUserInfo = async (params) => {
    const res = await statistics.getUserInfo(params)

    return res
}
