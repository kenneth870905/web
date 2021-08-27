<template>
    <div class="app-container">
        <div class="header-1">
            <div>
                <el-cascader @change="changeType" v-model="value" size="small" style="width: 200px;margin-right:10px;" :props="{ checkStrictly: true,expandTrigger: 'hover',value:'id',label:'title' }" :options="goodsType" ></el-cascader>
                <el-input style="width: 300px;" placeholder="请输入标题或者编码查询" v-model="query.title" class="input-with-select" size="small">
                    <el-button slot="append" icon="el-icon-search" @click="查询()"></el-button>
                </el-input>
                <el-button type size="small" @click="全部展开()" style="margin-left:10px;">{{展开规格 ? '收起规格':"展开规格"}}</el-button>
            </div>
            <el-button type size="small" @click="$router.push('/goodsDetails')">添加商品</el-button>
        </div>

        <el-table :data="list" size="mini" border>
            <el-table-column label="id" prop="id" align="center" width="50px"></el-table-column>
            <el-table-column label="编码" prop="coding" align="center" width="80px"></el-table-column>
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column label="封面" width="80px" align="center">
                <template slot-scope="s">
                    <el-image style="width: 50px; height: 50px" v-if="s.row.cover" :src="$img_url+s.row.cover" :preview-src-list="[$img_url+s.row.cover]"></el-image>
                </template>
            </el-table-column>
            <el-table-column label="基础价格" prop="price"></el-table-column>
            <el-table-column label="库存" prop="amount"></el-table-column>
            <!-- <el-table-column label="销量"></el-table-column> -->
            <el-table-column label="规格" width="400px">
                <template slot-scope="s">
                    <el-table :data="s.row.priceList" size="mini" border v-if="s.row.展开">
                        <el-table-column label="颜色" prop="color"></el-table-column>
                        <el-table-column label="规格" prop="size"></el-table-column>
                        <el-table-column label="价格" prop="price">
                            <template slot-scope="s2">
                                <el-input @focus="获取焦点(s.row.priceList)" @blur="失去焦点(s.row)" v-model="s2.row.price" placeholder="" size="mini"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="数量" prop="stock_num">
                            <template slot-scope="s2">
                                <el-input @focus="获取焦点(s.row.priceList)" @blur="失去焦点(s.row)" v-model="s2.row.stock_num" placeholder="" size="mini"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button style="margin-top:3px;" type="" size="mini" @click="s.row.展开=!s.row.展开">{{s.row.展开 ? '收起':"展开"}}</el-button>
                </template>
            </el-table-column>
            <el-table-column label width="150px" align="center" prop="creationTime"></el-table-column>
            <el-table-column label="操作" width="150px" align="center" prop>
                <template slot-scope="s">
                    <el-button size="mini" @click="$router.push('/goodsDetails?id='+s.row.id)">修改</el-button>
                    <el-button type="warning" @click="删除(s.row)" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination class="分页" :total="total" :page-size="query.size" :current-page="query.page" @current-change="fenye" background layout="prev, pager, next"></el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value:[''],
            goodsType: [
                {id:"",title:'显示全部'},
            ],
            list: [],
            total: 0,
            query: {
                page: 1,
                size: 10,
                title: '',
                goodsType: ""
            },
            展开规格:false,
            原始数据:{},
            改变数据:{}
        }
    },
    methods: {
        获取焦点(item){
            this.原始数据 = JSON.parse(JSON.stringify(item))
        },
        失去焦点(item){
            if(JSON.stringify(item.priceList) != JSON.stringify(this.原始数据) ){
                console.log('有修改')
                let sp = Object.assign({},item)
                    delete sp.展开
                let o = {
                        color:[],
                        cover:{},
                        image:[],
                        sp:sp
                    }
                this.$Loadading(1)
                this.$axios.post('/Goods/setGoods',o).then(res => {
                    this.$Loadading()
                }).catch(err => {
                    this.$Loadading()
                })
            }
        },
        全部展开(){
            this.展开规格=!this.展开规格
            this.list.forEach(item=>{
                item.展开 = this.展开规格
            })
        },
        changeType(value){
            this.query.page=1
            this.查询商品()
        },
        删除(item) {
            this.$confirm('确定删除此商品?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post('/Goods/deleteGoods', { id: item.id }).then(res => {
                    if (res.code == 1) {
                        this.正确('删除成功')
                        this.查询商品()
                    } else {
                        this.错误('删除失败')
                    }
                })
                    .catch(err => {
                        this.错误('删除失败')
                    })
            }).catch(() => {

            })
        },
        查询类型() {
            this.$axios.post('/Goods/getGoodsType', '').then(res => {
                let treeData = this.toTreeData(res.data,0)
                this.goodsType = [...this.goodsType,...treeData];
            }).catch(err => {
                console.error(err);
            })
        },
        查询() {
            this.query.page = 1
            this.查询商品()
        },
        fenye(i) {
            this.query.page = i
            this.查询商品()
        },
        查询商品() {
            this.$Loadading(1)
            this.query.goodsType = this.value[this.value.length-1]
            this.$axios.post('/Goods/getGoods', this.query).then(res => {
                let data = res.data.data;
                    data.forEach(item=>{
                        item.展开 = this.展开规格
                    })
                this.list = data
                this.total = res.data.total
                this.$Loadading()
            }).catch(err => {
                this.$Loadading()
            })
        },
        toTreeData(data, pid) {
            function tree(id) {
                let arr = []
                data.filter(item => {
                    return item.parentId === id;
                }).forEach(item => {
                    if(tree(item.id).length>0){
                        item.children = tree(item.id)
                    }
                    arr.push(item)
                })
                return arr
            }
            return tree(pid)  // 第一级节点的父id，是null或者0，视情况传入
        }
    },
    mounted() {
        this.查询类型();
        this.查询商品()
    },
}
</script>

<style lang="scss" scoped>
.header-1 {
    display: flex;
    justify-content: space-between;
    margin: 0px 0px 10px;
}
</style>
