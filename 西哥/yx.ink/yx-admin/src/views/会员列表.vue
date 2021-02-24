<template>
    <div class="app-container">
        <div class="header-1">
            <el-input placeholder="输入id/昵称/账号查询" v-model="query.filter" style="width: 250px;margin-right:10px" size="small">
                <el-button slot="append" icon="el-icon-search" @click="搜索()"></el-button>
            </el-input>
            <el-button type @click="重置密码()" size="small">重置选中会员密码</el-button>
        </div>
        <el-table :data="list" size="mini" border @selection-change="handleSelectionChange" v-loading="loading">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="id" prop="id" align="center" width="50px"></el-table-column>
            <el-table-column label="账号" prop="userName"></el-table-column>
            <el-table-column label="昵称" prop="nickName"></el-table-column>
            <el-table-column label="密码（MD5加密后）" prop="password"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="注册时间" width="150px" align="center" prop="creationTime"></el-table-column>
        </el-table>
        <el-pagination class="分页" :total="total" :page-size="query.size" :current-page="query.page" @current-change="fenye" background layout="prev, pager, next"></el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            total: 0,
            loading: false,
            query: {
                page: 1,
                size: 10,
                filter: '',
                type: 0
            },
            选中: []
        }
    },
    methods: {
        重置密码() {
            if (this.选中.length == 0) {
                this.错误('请选择会员！')
            } else {
                let div = `<div>
                                <div>确定要重置选中会员密码吗？</div>
                                <div>重置后新密码为：<span style="color:red;">123456</span></div>
                            </div>`
                this.$msgbox({
                    title: '提示',
                    message:div,
                    dangerouslyUseHTMLString:true,
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(action => {
                    this.$axios.post('/User/setPassword',{userList:this.选中}).then(res => {
                        if(res.code==1){
                            this.正确('设置成功')
                            this.getList()
                        }else{
                            this.错误('设置失败')
                        }
                    }).catch(err => {
                        this.错误('系统错误，稍后再试')
                    })
                });
            }
        },
        handleSelectionChange(value) {
            this.选中 = value
        },
        getList() {
            this.loading = true
            this.$axios.post('/user/userList', this.query)
                .then(res => {
                    console.log(res)
                    this.list = res.data
                    this.total = res.total
                    this.loading = false
                })
                .catch(err => {
                    console.log(err)
                    this.loading = false
                })
        },
        fenye(i) {
            this.query.page = i
            this.getList()
        },
        搜索() {
            this.query.page = 1
            this.getList()
        }
    },
    mounted() {
        this.getList()
    },
}
</script>

<style lang="scss" scoped>
.header-1 {
    margin: 0px 0px 10px;
}
</style>
