<template>
    <div>
        <div class="title1">
            <span>意见反馈</span>
            <span @click="展开=!展开">{{展开 ? '收起内容' : '展开内容'}}</span>
        </div>

        <div class="table">
            <el-table :data="list" border size="mini" stripe>
                <el-table-column prop="title" label="标题" width="130px"></el-table-column>
                <el-table-column prop="content" label="内容">
                    <template slot-scope="s">
                        <div class="content" :class="{展开:展开}">
                            {{s.row.content}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="回复">
                    <template slot-scope="s">
                        <div class="reply" :class="{展开:展开}">
                            {{s.row.reply}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="createdAt" label="时间" width="150px"></el-table-column>
                <el-table-column label="操作" width="100px">
                    <template slot-scope="s">
                        <!-- <el-button type @click="回复(s.row)" size="mini" >回复</el-button> -->
                        <el-button type @click="回复(s.row)" size="mini" v-if="!s.row.reply">回复</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="分页">
            <el-pagination background @current-change="changePage" :page-size="query.size" layout="prev, pager, next" :total="total"></el-pagination>
        </div>

        <el-dialog title="反馈回复" class="回复" :visible.sync="显示回复" width="500px" :close-on-click-modal="false">
            <span>
                <div class="title">
                    {{详情.title}}
                </div>
                <div class="内容">{{详情.content}}</div>
                <div>
                    <div class="title">回复：</div>
                    <el-input type="textarea" v-model="详情.reply" placeholder="请输入回复内容"></el-input>
                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button class="btn-1" size="mini" type="primary" @click="确定回复()">确定回复</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            list: [],
            total: 0,
            query: {
                page: 1,
                size: 10
            },
            显示回复:false,
            详情:{},
            展开:false
        }
    },
    methods: {
        getClass(e){
            console.log(e)
        },
        getList() {
            this.$axios.get('/api/advice', { params: this.query }).then(res => {
                if (res.code === 0) {
                    this.total = res.total
                    this.list = res.data
                }
            })
        },
        changePage(i) {
            this.query.page = i
            this.getList()
        },
        回复(item) {
            this.详情 = Object.assign({},item)
            this.显示回复 = true
        },
        确定回复(){
            console.log(this.详情.reply)
            if(this.详情.reply.match(/^\s*$/)){
                this.错误('请输入内容')
                return
            }
            delete this.详情.createdAt
            delete this.详情.deletedAt
            delete this.详情.updatedAt
            this.$axios.put(`/api/advice/${this.详情.id}`,this.详情)
            .then(res => {
                if(res.code===0){
                    this.正确('回复成功')
                    this.getList()
                    this.显示回复 = false
                }else{
                    this.错误(res.message)
                }
            })
            .catch(err => {
                this.错误('回复失败，请联系管理员')
            })
        }
    },
    mounted() {
        this.getList()


        
    },
}
</script>

<style lang="scss" scoped>
.title1 {
    border-bottom: 1px solid #eee;
    padding: 0px 0px 10px;
    display: flex;
    justify-content: space-between;
    span:nth-child(2){
        color: red;
        cursor: pointer;
    }
}
.分页 {
    text-align: right;
    margin: 10px 0px;
}
.table{
    margin: 10px 0px 0px;
    .content,
    .reply{
        overflow:hidden; 
        text-overflow:ellipsis;
        display:-webkit-box; 
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        position: relative;
        &.展开{
            -webkit-line-clamp:initial;
        }
    }
}

.回复{
    /deep/ .el-dialog__header{
        padding:10px 10px 10px ;
    }
    /deep/ .el-dialog__body{
        padding:10px 10px 10px ;
    }
    /deep/ .el-dialog__footer{
        padding:10px 10px 10px ;
    }
    .title{
        line-height: 28px;
        border-bottom: 1px solid #ccc;
    }
    .内容{
        padding: 10px 0px;
    }
    /deep/ .el-textarea__inner{
        height: 100px;
    }
    .btn-1{
        width: 100%;
    }
}

</style>