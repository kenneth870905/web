<template>
    <div class="商品列表">

        <div class="title1">
            <span>秒杀商品</span>
            <el-button @click="$router.push('/index/miaoshaXQ')" type="primary" size="mini">添加商品</el-button>
        </div>

        <!-- <div class="header1">
            <div class="left1">
                <el-select v-model="query.categoryId" placeholder="请选择类型" size="mini" @change="changeCategory">
                    <el-option label="全部类型" value=""></el-option>
                    <el-option v-for="item in 分类" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <el-button type="success" size="mini" @click="筛选('isHomePage')" :plain="!query.isHomePage">查看放置首页</el-button>
                <el-button type="success" size="mini" @click="筛选('isRecommend')" :plain="!query.isRecommend">查看推荐</el-button>
            </div>
            <el-button @click="$router.push('/index/product')" type="primary" size="mini">添加商品</el-button>
        </div> -->

        <div class="table">
            <el-table :data="list" border size="small">
                <el-table-column label="id" prop="id" width="50px"></el-table-column>
                <!-- <el-table-column label="分类" width="100px">
                    <template slot-scope="s">
                        {{分类名称(s.row)}}
                    </template>
                </el-table-column> -->
                <!-- <el-table-column label="放置首页" width="80px">
                    <template slot-scope="s">
                        <i v-if="s.row.isHomePage" class="red-text el-icon-check"></i>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column label="推荐" width="80px">
                    <template slot-scope="s">
                        <i v-if="s.row.isRecommend" class="red-text el-icon-check"></i>
                    </template>
                </el-table-column> -->
                <el-table-column label="商品名称" prop="name"></el-table-column>
                <!-- <el-table-column label="一级价格" prop="levelOnePrice"></el-table-column> -->
                <!-- <el-table-column label="二级价格" prop="levelTwoPrice"></el-table-column> -->
                <!-- <el-table-column label="积分价格" prop="creditPrice"></el-table-column> -->
                <el-table-column label="秒杀价格" prop="seckillPrice"></el-table-column>
                <!-- <el-table-column label="购买级别">
                    <template slot-scope="scope">
                        <span v-if="scope.row.level==0">所有用户</span>
                        <span v-if="scope.row.level==1">一级和二级用户</span>
                        <span v-if="scope.row.level==2">二级用户</span>
                    </template>
                </el-table-column> -->
                <el-table-column label="返利">
                    <template slot-scope="scope">
                        <span v-if="!scope.row.isKickback">无</span>
                        <span v-else>{{scope.row.kickbackRate}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="销量" prop="soldCount"></el-table-column>
                <!-- <el-table-column label="创建时间" prop="createdAt"></el-table-column> -->
                <el-table-column label="操作" width="100px">
                    <template slot-scope="scope">
                        <el-button @click="$router.push(`/index/miaoshaXQ?id=${scope.row.id}`)" type="primary" size="mini" icon="el-icon-edit" circle></el-button>
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
            list: [],
            total: 0,
            query: {
                page: 1,
                size: 8,
                // categoryId:"",
                // isHomePage:'',      //是否放置首页 true false ''
                // isRecommend:'',     //是否推荐
                isSeckill:true      //秒杀
            },
            分类:[]
        }
    },
    methods: {
        筛选(key){
            this.query[key] = this.query[key] ? '' : true
            this.query.page = 1
            this.getList()
        },
        分类名称(item){
            if(this.分类.find(x=>x.id == item.categoryId)){
                return this.分类.find(x=>x.id == item.categoryId).name
            }else{
                return ''
            }
        },
        changeCategory(){
            console.log(this.query.categoryId)
            this.query.page = 1
            this.getList()
        },
        getList() {
            this.$axios.get('/api/product', { params: this.query }).then(res => {
                if (res.code != 0) return
                this.list = res.data;
                this.total = res.total
            })
        },
        changePage(i) {
            this.query.page = i;
            this.getList()
        },
        删除(item) {
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$loading(1)
                this.$axios.delete(`/api/product/${item.id}`).then(res => {
                    if (res.code == 0) {
                        this.$message({ showClose: true, message: '删除成功', type: 'success' });
                    } else {
                        this.$message({ showClose: true, message: '删除失败', type: 'error' });
                    }
                    this.getList()
                    this.$loading(0)
                }).catch(err => {
                    this.$loading(0)
                    this.$message({ showClose: true, message: '删除失败', type: 'error' });
                })
            })
        },
        获取分类(){
            this.$axios.get('/api/category',{params:{page:1,size:1000}})
            .then(res => {
                if(res.code===0)
                this.分类 = res.data
            })
        }
    },
    mounted() {
        this.获取分类()
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
}

.red-text{
    color:red;
    font-weight: bold;
}
.商品列表 {
    // height: 100%;
}
.header1 {
    margin: 0px 0px 10px;
    display: flex;
    justify-content: space-between;
    .el-select{
        margin-right: 10px;
    }
    .el-button--success.is-plain{
        background-color: #f0f9eb;
        color: #67C23A;
    }
}
.table {
    margin-top: 10px;
    min-height: 400px;
}
.分页 {
    text-align: right;
    margin: 10px 0px;
}
</style>