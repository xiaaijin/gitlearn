const LS = {

    // 过期时间，默认1个月
    age: 1 * 30 * 24 * 60 * 60 * 1000,

    /**
     * 设置过期时间
     * @param age
     * @returns {exports}
     */
    setAge: function (age) {
        this.age = age

        return this
    },

    /**
     * 设置 localStorage
     * @param key
     * @param value
     */
    set: function (key, value) {
        localStorage.removeItem(key)
        const isObject = value instanceof Object
        const _time = new Date().getTime()
        const _age = this.age

        // 如果不是对象，新建一个对象把 value 存起来
        if (!isObject) {
            const b = value
            value = {}
            value._value = b
        }

        // 加入时间
        value._time = _time

        // 过期时间
        value._age = _time + _age

        // 是否一个对象
        value._isObject = isObject
        localStorage.setItem(key, JSON.stringify(value))

        return this
    },

    /**
     * 判断一个 localStorage 是否过期
     * @param key
     * @returns {boolean}
     */
    isExpire: function (key) {
        let isExpire = true
        let value = localStorage.getItem(key)
        const now = new Date().getTime()

        if (value) {
            value = JSON.parse(value)

            // 当前时间是否大于过期时间
            isExpire = now > value._age
        } else {

            // 没有值也是过期
        }

        return isExpire
    },

    /**
     * 获取某个 localStorage 值
     * @param key
     * @returns {*}
     */
    get: function (key) {
        const isExpire = this.isExpire(key)
        let value = null

        if (!isExpire) {
            value = localStorage.getItem(key)
            value = JSON.parse(value)
            if (!value._isObject) {
                value = value._value
            }
        } else {
            localStorage.removeItem(key)
        }

        return value
    }
}

export default LS
