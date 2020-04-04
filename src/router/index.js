import Vue from 'vue'
import Router from 'vue-router'
import manage from '@/pages/manage'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/manage'
        },
        {
            path: '/manage',
            component: manage,
            name: 'manage',
            meta: {
                verification: true
            }
        }
    ],
    linkActiveClass: 'is-active'
})

export default router
