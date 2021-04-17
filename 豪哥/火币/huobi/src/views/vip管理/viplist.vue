<template>
    <div class="考勤记录">
        <div class="header">
            <div>
                <el-input size="mini" placeholder="UID/昵称/名字/电话号码" v-model="query.search" class="input-with-select" style="width: 300px;">
                    <el-button @click="查询()" slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <div class="flex1"></div>
            <div>
                <el-button type size="mini" @click="$router.push('/VipDetails')">添加</el-button>
            </div>
        </div>
        <el-table class="table" border :data="list" size="mini">
            <el-table-column align="center" label="UID" prop="UID" width="120"></el-table-column>
            <el-table-column align="center" label="法币昵称" prop="fiatNickname"></el-table-column>
            <el-table-column align="center" label="姓名" prop="name"></el-table-column>
            <el-table-column align="center" label="电话号码" prop="phone" width="150px"></el-table-column>
            <el-table-column align="center" label="从事工作" prop="profession"></el-table-column>
            <el-table-column align="center" label="买币用途" prop="use"></el-table-column>
            <el-table-column align="center" label="身份证号" prop="IDCard"></el-table-column>
            <el-table-column align="center" label="身份证照片" prop>
                <template slot-scope="s">
                    <div v-for="(item,index) in s.row.IDPhoto">
                        <el-image style="width: 50px; height: 50px;background:#eee" :src="$api_url+'/huobi/public/storage/'+item" :preview-src-list="previewSrcList(s.row.IDPhoto)" fit="contain"></el-image>
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="人脸视频验证" prop="FaceAuthentication" width="120px">
                <template slot-scope="s">
                    <a :href="$api_url+'/huobi/public/storage/'+s.row.FaceAuthentication" target="target">点击查看</a>
                </template>
            </el-table-column>
            <el-table-column align="center" label="银行流水" prop="BankFlow">
                <template slot-scope="s">
                    <div v-for="(item,index) in s.row.BankFlow">
                        <el-image style="width: 50px; height: 50px;background:#eee" :src="$api_url+'/huobi/public/storage/'+item" :preview-src-list="previewSrcList(s.row.BankFlow)" fit="contain"></el-image>
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="补充信息" prop>
                <template slot-scope="s">
                    <div class="补充信息">{{s.row.AdditionalInformation}}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="订单号" prop="orderNumber"></el-table-column>
            <el-table-column align="center" label="创建人" prop="userNickname"></el-table-column>
            <el-table-column align="center" label="创建时间" prop="CreationTime" width="150px"></el-table-column>
            <el-table-column align="center" label="操作" width="150px">
                <template slot-scope="s">
                    <el-button type size="mini" @click="$router.push('/VipDetails?UID='+s.row.UID)">修改</el-button>
                    <el-button type="warning" size="mini" @click="删除(s.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="fenye">
            <el-pagination background layout="prev, pager, next" :total="total" :page-size="query.pageSize" @current-change="fenye"></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            query: {
                page: 1,
                pageSize: 10,
                search: ""
            },
            timeType: 0,   // 0按天 1 按月
            list: [],
            total: 0
        }
    },
    methods: {
        async 删除(item) {
            await this.$confirm(`确定将UID为：${item.UID}的信息删除吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => true)
            this.$axios.post('/huobi/public/index.php/Vip/delete',{UID:item.UID}).then(res => {
                if(res.data.code==1){
                    this.$message({ showClose: true, message: '删除成功', type: 'success' });
                    this.g1()
                }else{
                    this.$message({ showClose: true, message: '删除失败，请联系管理员', type: 'error' });
                }
            }).catch(err => {
                this.$message({ showClose: true, message: '连接错误，请稍后再试', type: 'error' });
            })
        },
        previewSrcList(list) {
            let l = []
            list.forEach(item => {
                l.push(this.$api_url + '/huobi/public/storage/' + item)
            });
            return l
        },
        查询() {
            this.query.page = 1;
            this.g1();
        },
        切换日期类型() {
            this.timeType = this.timeType == 0 ? 1 : 0;
            this.query.riqi = ''
        },
        fenye(index) {
            this.query.page = index;
            this.g1();
        },
        g1() {
            this.$axios.post('/huobi/public/index.php/Vip/getList', this.query).then(x => {
                this.list = x.data.data;
                this.total = x.data.total;
            }).catch(err => {
                this.$message({ showClose: true, message: '系统错误，稍后再试！', type: 'error' });
            })
        }
    },
    mounted() {
        this.g1()
    },
}
</script>

<style lang="scss" scoped>
.header {
    margin: 0px 0px 20px;
    display: flex;
    /* justify-content: flex-end; */
    > div {
        margin: 0px 15px 0px 0px;
    }
    .flex1 {
        flex: 1;
    }
}

.考勤记录 {
    padding: 20px;
}

.红色 {
    color: red;
}

.table {
    min-height: 300px;
}

.fenye {
    text-align: center;
    margin: 20px 0px 0px;
}
.补充信息 {
    white-space: pre;
}
</style>