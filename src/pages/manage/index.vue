<template>
    <div class="main flex flex-column">
        <div style="flex: 1; overflow: scroll;">
            <div class="manage-table">
                <manage-table :tableData="tableData">
                </manage-table>
            </div>
            <el-pagination
                v-show="total"
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="pagesize"
                :current-page="page"
                @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ManageTable from '@/components/Table'

export default {
    components: {
        ManageTable
    },
    data () {
        return {
            keyword: '',
            pagesize: 10,
            page: 1
        }
    },
    computed: {
        ...mapState({
            tableData: state => state.manage.tableData,
            total: state => state.manage.total
        })
    },
    methods: {
        ...mapActions([
            'getList'
        ]),
        handleCurrentChange (page) {
            this.getListData(page)
            this.page = page
        },
        getListData (page = 1) {
            this.getList({
                page: page - 1,
                pagesize: this.pagesize
            })
        }
    },

    /**
     * created的时候发起请求，请求列表数据
     */
    created () {
        this.getListData()
        console.log('添加路悠悠')
        console.log('第二次添加')
        console.log('3.1')
        console.log('3.2')
        console.log('测试从暂存区撤回')
    }
}
</script>
<style scoped lang="scss">
.main {
    flex: 1;
    width:100%;
    min-width: 1400px;
    overflow-y: scroll;
}
.search-content {
    margin: 18px 0 2px 0;
    justify-content: center;
}
.manage-table {
    padding: 30px;
}
</style>
