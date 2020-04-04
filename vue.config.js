const debug = process.env.NODE_ENV !== 'production'

module.exports = {
    devServer: {
        proxy: {
            '/apiproxy/adminwebdev': {
                target: 'http://admin.iwan.webdev.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/apiproxy/adminwebdev': ''
                },
                headers: {
                    cookie: 'PAS_COOKIE_UID=6198984; PAS2_COOKIE_PROJECT_GROUP=%7C%3A%3A%7C; PAS2_COOKIE_PROJECT_ID=0; PAS_COOKIE_SITENAME=gamezone; PAS_COOKIE_PROJECT_AUTO=%u5185%u5BB9%u7BA1%u7406%u7CFB%u7EDF-%u6E38%u620F%u9891%u9053%7Chttp%3A//wizard2.webdev.com/tcms/%7Cgamezone; PAS_COOKIE_PROJECT_GROUP=|TCMS:gamezone:æ¸¸æé¢é|; x-host-key-ngn=16b4448329b-e6efa3f5683c8d529f204dc3390d63540305ae33; x-host-key-oaback=16b444c3b5f-13f4be85973db59f618b5e7d1bf7c172c0bf030f; x-host-key-front=16b444c3b4a-f7c61121c610ad89bce98dccb8472bfcf3a48c9a; PAS_COOKIE_USER=janbinwang; RIO_TCOA_TICKET=tof:F6C09678199C3F61A2D0CCE63FB1D75001B9BA1681DE98926B36E03525465928B477F0E54EA45156A938608ED36ED8FCE1176AB26EFA7618D41621DD19F9F1F071A4D77C599ED5139467A7CB4D19570737CB4ED0CB32C45489A3D3F281E76A742C554CC130E3BA551555389693CFBA684DD279A838CDA0D12B525E884E521DC405DA742E859AA8A54E114D30F70E196877BFE9AE863E755E71BA08CB578B169498E8EAA7DE79C0E1ABF373080E2187898DC5BF1EBFCA0647EA817656580741FDD1D62DA223ECF4F506924CF5FEF05E3F; PAS_COOKIE_TICKET=caf3a89cabd93c4f; PAS2_COOKIE_PROJECTS_GROUPS=%7C%3A%3A%7C%3A%3A%7C; x-host-key-idcback=16b4a804455-60644dcc4ae87e0c0e77e356d6a72a0fa21292eb'
                }
            },
            '/apiproxy': {
                target: 'http://iwanapi.pcg.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/apiproxy': ''
                },
                headers: {
                    cookie: 'EngName=janbinwang; x-host-key-ngn=16b91ef0fb1-b5d62aedb699e856b3e68bca04337d3c0e97a56e; x-host-key-front=16b91ef1606-d7871082cd264479111deed9359e57cab5e7b2ea; RIO_TCOA_TICKET=tof:701A9A3F1EB5045DEC7490D3DBE26EB1387F04224C96EB58FD7F83F08F7F251BCB7F888BB55DC8F9C0581666FFCC8E748FA161E4FDD275ACB4466658341EEAF8E02C54DF8D8224619DF4CA3C59945D0DCF16D4E0235E8EF6BFB271C73572DB36C390BC56CE67C6E95731B237C691A2044C52A762DE256E41383D014580124D266434BED7481509B4137ED5F509B0865B0186C3DCD30161BE40EBC1E83BAF3DD44672787A40E0189DD2E777509ACEA296D9826875C8E5C46363252996BDADD21A'
                }
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    @import '@/assets/css/commons/var.scss';
                `
            }
        }
    },
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ],
    configureWebpack: (config) => {
        if (debug) {
            config.devtool = 'cheap-module-eval-source-map'
        }
    }
}
