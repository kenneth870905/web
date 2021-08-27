<template>
    <div>
        <div class="title-1">个人信息</div>
        <div class="cont">
            <el-table :data="list" size="mini">
                <el-table-column label="收件人" prop="name"></el-table-column>
                <el-table-column label="详细地址">
                    <template slot-scope="s">
                        <span>{{s.row.province}}</span>
                        / {{s.row.address}}
                    </template>
                </el-table-column>
                <el-table-column label="联系方式" prop="contact"></el-table-column>
                <el-table-column label="操作" width="200px" align="center">
                    <template slot-scope="s">
                        <el-button type="warning" @click="删除(s.row)" size="mini">删除</el-button>
                        <el-button type="warning" size="mini" @click="$router.push('/my/addressDetails?id='+s.row.id)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="footer">
                <el-button class="btn" type="primary" @click="$router.push('/my/addressDetails')">添加收货地址</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: []
        }
    },
    methods: {
        查询地址() {
            this.$axios.post('/Address/getAddress', '')
                .then(res => {
                    if (res.code == 1) {
                        this.list = res.data
                    }
                })
                .catch(err => {
                    console.error(err);
                })
        },
        删除(item) {
            this.$confirm('确实删除此地址？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post('/Address/delete',{id:item.id}).then(res => {
                    console.log(res)
                    if(res.code==1){
                        this.正确('删除成功')
                        this.查询地址()
                    }else{
                        this.错误('删除失败')
                    }
                }).catch(err => {
                    this.错误('系统错误，稍后再试')
                })
            }).catch(() => {});
        }
    },
    mounted() {
        this.查询地址()
    },
}
</script>

<style lang="scss" scoped>
.title-1 {
    line-height: 60px;
    font-size: 22px;
}
.cont {
    background: #fff;
    padding: 40px;
}

.footer {
    margin: 20px 0px 0px;
    text-align: right;
}
</style>