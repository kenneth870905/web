<template>
    <div>
        <div class="title1">文章管理</div>
        <div class="title2">
            <el-input placeholder="请输入内容" v-model="query.title" size="small">
                <el-button @click="搜索()" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="" size="small" @click="$router.push('/index/articleDetails')">添加文章</el-button>
        </div>
        <div class="table">
            <el-table :data="list" border size="mini">
                <el-table-column prop="id" label="id" width="50px"></el-table-column>
                <el-table-column label="分类" width="100px">
                    <template slot-scope="s">
                        {{分类名称(s.row)}}
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="brief" label="简介"></el-table-column>
                <el-table-column label="操作" width="100px">
                    <template slot-scope="scope">
                        <el-button @click="$router.push(`/index/articleDetails?id=${scope.row.id}`)" type="primary" size="mini" icon="el-icon-edit" circle></el-button>
                        <el-button @click="删除(scope.row)" type="danger" size="mini" icon="el-icon-delete" circle></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="分页">
            <el-pagination background @current-change="changePage" :page-size="query.size" layout="prev, pager, next" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            select:"",
            query:{
                title:"",
                page:1,
                size:10
            },
            list:[],
            total:0,
            分类:[]
        }
    },
    methods: {
        分类名称(item){
            if(this.分类.find(x=>x.id == item.categoryId)){
                return this.分类.find(x=>x.id == item.categoryId).name
            }else{
                return ''
            }
        },
        changePage(i){
            this.query.page = i
            this.getList()
        },
        搜索(){
            this.query.page = 1
            this.getList()
        },
        getList(){
            this.$axios.get('/api/article',{params:this.query}).then(res => {
                console.log(res)
                if(res.code===0){
                    this.list = res.data
                    this.total = res.total
                }
            }).catch(err => {
            })
        },
        删除(item){
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$loading(1)
                this.$axios.delete(`/api/article/${item.id}`,'')
                .then(res => {
                    if(res.code===0){
                        this.getList()
                        this.正确('删除成功')
                    }else{
                        this.错误(res.message)
                    }
                    this.$loading(0)
                })
                .catch(err => {
                    this.$loading(0)
                    this.错误('删除失败，请联系管理员')
                })
            })
        },
        获取文章类型(){
            this.$axios.get('/api/articleCategory',{ params:  {page:1,size:1000} })
            .then(res => {
                console.log(res)
                this.分类 = res.data
            })
            .catch(err => {
                console.error(err); 
            })
        }
    },
    mounted() {
        this.getList()

        this.获取文章类型()

    },
}
</script>

<style lang="scss" scoped>
.title1 {
    border-bottom: 1px solid #eee;
    padding: 0px 0px 10px;
    margin: 0px 0px 10px;
}
.title2{
    display: flex;
    justify-content: space-between;
    .el-input{
        width: 300px;
    }
}
.table{
    min-height: 400px;
    margin: 5px 0px 0px;
}

.分页 {
    text-align: right;
    margin: 10px 0px;
}

</style>
