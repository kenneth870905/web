<template>
    <div>
        <div class="title-1">我的收藏</div>
        <ul class="box-1">
            <li v-for="(item, index) in list" :key="index">
                <div class="img" @click="$router.push(`/detail?id=${item.goodsId}`)">
                    <img :src="$img_url+item.cover" alt srcset />
                </div>
                <div class="title-2" @click="$router.push(`/detail?id=${item.goodsId}`)">
                    <span class="qian">₱</span>
                    <strong class="qian">{{item.price | setMoney}}</strong>
                </div>
                <div class="title-3" @click="$router.push(`/detail?id=${item.goodsId}`)">{{item.title ? item.title : '商品信息异常'}}</div>
                <div class="删除" @click="取消收藏(item)">取消收藏</div>
            </li>
        </ul>
        <el-pagination class="pagination" v-if="total>0" @current-change="fenye" :total="total" :page-size="query.size" :current-page="query.page" layout="prev, pager, next" background></el-pagination>

        <nodata v-if="total==0" />
    </div>
</template>
<script>
import nodata from '@/components/nodata.vue'
import { setMoney } from "@/assets/自定义函数.js";
export default {
    components: {
        nodata
    },
    data() {
        return {
            query: {
                page: 1,
                size: 10
            },
            list: [],
            total: -1
        }
    },
    filters: {
        setMoney
    },
    methods: {
        取消收藏(item) {
            this.$confirm('点击确定取消收藏, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$Loading(1)
                this.$axios.post('/Favorite/save',{goodsId:item.goodsId}).then(res => {
                    this.$Loading()
                    if(res.code==1){
                        this.正确('取消成功')
                        this.查询收藏()
                    }else{
                        this.错误('取消失败')
                    }
                }).catch(err => {
                    this.$Loading()
                    this.错误('系统错误，请稍后再试')
                })
            }).catch(() => {})
        },
        fenye(i) {
            this.query.page = i
            this.查询收藏()
        },
        查询收藏() {
            this.$Loading(1)
            this.$axios.post('/Favorite/getList', this.query)
                .then(res => {
                    this.$Loading()
                    if (res.code == 1) {
                        this.total = res.data.total
                        this.list = res.data.data
                    } else {
                        this.total = 0
                    }
                })
                .catch(err => {
                    this.$Loading()
                    this.total = 0
                })
        }
    },
    mounted() {
        this.查询收藏()
    },
}
</script>
<style lang="scss" scoped>
.title-1 {
    line-height: 60px;
    font-size: 22px;
}
.box-1 {
    margin: 20px 0px;
    display: flex;
    flex-wrap: wrap;
    li {
        background: #fff;
        width: 235px;
        border: 1px solid #ededed;
        margin-bottom: 20px;
        margin-right: 19px;
        position: relative;
        cursor: pointer;
        &:hover {
            border: 1px solid #ff4400;
            .删除 {
                display: block;
            }
        }
    }
    .img {
        height: 235px;
        font-size: 0px;
        img {
            height: 100%;
            width: 100%;
            object-fit: contain;
        }
    }
    .title-2 {
        padding: 5px 10px 0px;
        display: flex;
        align-items: center;
        .qian {
            color: #f40;
            font-size: 18px;
        }
        .fukuan {
            flex: 1;
            text-align: right;
            font-size: 12px;
            color: #888;
        }
    }
    .title-3 {
        padding: 5px 10px 10px;
        font-size: 12px;
        color: #3d3d3d;
    }
    .删除 {
        position: absolute;
        top: 0px;
        right: 0px;
        background: rgba($color: #000000, $alpha: 0.8);
        padding: 5px;
        color: #fff;
        display: none;
        font-size: 12px;
    }
}
</style>