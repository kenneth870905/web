<template>
    <div class="app-container">
        <div class="header-1">
            <el-button-group >
                <el-button :type="query.type==='' ? 'primary':'default'" @click="changeType('')" size="mini">全部</el-button>
                <el-button :type="query.type===0 ? 'primary':'default'" @click="changeType(0)" size="mini">待审核</el-button>
                <el-button :type="query.type===1 ? 'primary':'default'" @click="changeType(1)" size="mini">已通过</el-button>
                <el-button :type="query.type===2 ? 'primary':'default'" @click="changeType(2)" size="mini">未通过</el-button>
            </el-button-group>
        </div>

        <el-table :data="list" v-loading="loading" size="mini" border>
            <el-table-column label="id" prop="id" align="center" width="50px"></el-table-column>
            <el-table-column label="对应商品" prop="sp.title" width="250px">
                <template slot-scope="s">{{s.row.sp ? s.row.sp.title : '商品异常/已删除'}}</template>
            </el-table-column>
            <el-table-column label="用户账号" prop="userName" width="100px"></el-table-column>
            <el-table-column label="评分" width="200px">
                <el-rate slot-scope="s" v-model="s.row.number" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
            </el-table-column>
            <el-table-column label="内容">
                <template slot-scope="s">
                    <div>{{s.row.text}}</div>
                    <div class="img-list">
                        <img v-for="(item, index) in s.row.image" :key="index" :src="$img_url+item" alt srcset />
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="回复内容">
                <template slot-scope="s">
                    <span v-if="s.row.huifu.length>0">{{s.row.huifu[0].text}}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态" width="80" align="center">
                <template slot-scope="s">
                    <span v-if="s.row.type==0">待审核</span>
                    <span v-if="s.row.type==1">已通过</span>
                    <span v-if="s.row.type==2">未通过</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150px" align="center">
                <template slot-scope="s">
                    <el-dropdown @command="handleCommand">
                        <el-button type="primary" size="mini">
                            更多操作
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-if="s.row.type==0" :command="['通过',s.row]">通过</el-dropdown-item>
                            <el-dropdown-item v-if="s.row.type==0" :command="['不通过',s.row]">不通过</el-dropdown-item>
                            <el-dropdown-item :command="['修改评价',s.row]">修改评价内容</el-dropdown-item>
                            <el-dropdown-item v-if="s.row.huifu.length==0" :command="['回复',s.row]">回复</el-dropdown-item>
                            <el-dropdown-item v-if="s.row.huifu.length>0" :command="['修改回复',s.row]">修改回复内容</el-dropdown-item>
                            <el-dropdown-item :command="['删除',s.row]">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination class="分页" :total="total" :page-size="query.size" :current-page="query.page" @current-change="fenye" background layout="prev, pager, next"></el-pagination>

        <el-dialog title="回复/修改回复" :visible.sync="dialogVisible" width="400px" :close-on-click-modal="false">
            <el-form size="mini">
                <el-form-item label="评分" v-if="!评价.parentId">
                    <el-col :span="24">
                        <el-rate v-model="评价.number"></el-rate>
                    </el-col>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="评价.text"></el-input>
                </el-form-item>
                <el-form-item label="图片" v-if="!评价.parentId">
                    <el-col :span="24" class="img-list2">
                        <div v-for="(item, index) in 评价.image" :key="index">
                            <i class="el-icon-delete delete" @click="评价.image.splice(index,1)"></i>
                            <el-image fit="contain" style="width: 100%; height: 100%" :src="$img_url+item" :preview-src-list="srcList(评价.image)"></el-image>
                        </div>
                    </el-col>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="保存()" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            query: {
                page: 1,
                size: 10,
                type:0,    //0待审核1通过2没有通过
            },
            list: [],
            loading: false,
            total: -1,
            dialogVisible: false,
            评价: {
                id: "",
                goodsId: "",
                orderId: "",
                number: 0,
                parentId: 0,
                text: '',
                image: [],
                //修改就先不要这个了。。
                // fileList:[]
            }
        }
    },
    methods: {
        changeType(type){
            this.query.type=type
            this.query.page=1
            this.查询评论()
        },
        srcList(list) {
            if (list instanceof Array) {
                var l = []
                list.forEach(item => {
                    l.push(this.$img_url + item)
                });
                return l
            } else {
                return []
            }
        },
        handleCommand(val) {
            let name = val[0]
            let item = val[1]
            if (name == '通过') {
                this.评价 = Object.assign({}, item)
                this.评价.type = 1
                this.通过驳回()
            } else if (name == '不通过') {
                this.评价 = Object.assign({}, item)
                this.评价.type = 2
                this.通过驳回()
            } else if (name == '修改评价') {
                this.评价 = Object.assign({}, item)
                this.dialogVisible = true
            } else if (name == '回复') {
                this.评价 = {
                    id: "",
                    goodsId: "",
                    orderId: "",
                    number: 0,
                    parentId: item.id,
                    text: '',
                    image: [],
                }
                this.dialogVisible = true
            } else if (name == '修改回复') {
                this.评价 = Object.assign({}, item.huifu[0])
                this.dialogVisible = true
            } else if (name == '删除') {
                this.$confirm(`确定要删除这条评价吗？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('/Translation/del', { id: item.id }).then(res => {
                        if (res.code == 1) {
                            this.正确('删除成功');
                            this.查询评论()
                        } else {
                            this.错误('删除失败')
                        }
                    }).catch(err => {
                        this.错误('系统错误，稍后再试')
                    })
                }).catch(() => { });
            }
        },
        通过驳回() {
            this.$confirm(`确定要${this.评价.type == 1 ? '通过' : '驳回'}这条评价吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.修改()
            }).catch(() => { });
        },
        修改() {
            this.$Loadading(1)
            this.$axios.post('/Translation/add', this.评价).then(res => {
                if (res.code == 1) {
                    this.正确('设置成功')
                    this.查询评论()
                    this.获取评价数量()
                } else {
                    this.错误('设置失败')
                }
                this.$Loadading()
            }).catch(err => {
                this.$Loadading()
                this.错误('系统错误，稍后再试')
            })
        },
        保存() {
            var kong = /^\s*$/g;
            if (kong.test(this.评价.text)) {
                this.错误('请输入内容')
                return
            }
            this.修改()
            this.dialogVisible = false
        },
        fenye(i) {
            this.query.page = i
            this.查询评论()
        },
        查询评论() {
            if (this.loading) {
                return
            }
            this.loading = true
            this.$axios.post('/Translation/getByGoodsId', this.query)
                .then(res => {
                    if (res.code == 1) {
                        this.list = res.data.data
                        this.total = res.data.total
                    } else {
                        this.total = 0
                    }
                    this.loading = false
                })
                .catch(err => {
                    this.total = 0
                    this.loading = false
                })
        },
        获取评价数量() {
            this.$axios.post('/Translation/getCount', { type: 0 }).then(res => {
                let routers = this.$router.options.routes
                let 路由 = routers.find(x => x.path == '/comment')
                路由.children[0].meta.数量 = res.data
            })
                .catch(err => {
                    console.error(err);
                })
        }
    },
    mounted() {
        this.查询评论()
        this.获取评价数量()
    },
}
</script>

<style lang="scss" scoped>
.header-1 {
    display: flex;
    justify-content: space-between;
    margin: 0px 0px 10px;
}

.img-list {
    img {
        width: 50px;
        height: 50px;
        background: #eee;
        margin: 5px;
        object-fit: contain;
    }
}
.img-list2 {
    display: flex;
    flex-wrap: wrap;
    div {
        width: 80px;
        height: 80px;
        background: #eee;
        margin: 0px 5px 5px 0px;
        position: relative;
        .delete {
            position: absolute;
            top: 0px;
            right: 0px;
            color: red;
            background: rgba($color: #000000, $alpha: 0.6);
            padding: 5px;
            z-index: 1;
        }
    }
}
</style>
