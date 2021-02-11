<template>
    <div class="w1280">
        <el-row>
            <el-col :span="19" class="left">
                <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>所有分类</el-breadcrumb-item>
                    <el-breadcrumb-item></el-breadcrumb-item>
                </el-breadcrumb>

                <ul class="box-1">
                    <li v-for="item in newType">
                        <div class="head">
                            <span :class="{active:typeId==item.id}" @click="$router.push({query:{tid:item.id}})">
                            {{item.title}}
                            </span>
                        </div>
                        <div class="body">
                            <span :class="{active:typeId==item2.id}" v-for="item2 in item.children"  @click="$router.push({query:{tid:item2.id}})">{{item2.title}}</span>
                        </div>
                    </li>
                </ul>

                <ul class="box-2" v-loading="loading">
                    <li v-for="item in sp" @click="$router.push('/detail?id='+item.id)">
                        <div class="img">
                            <img :src="$img_url+item.cover" alt="" srcset="">
                        </div>
                        <div class="title-1">
                            <span class="qian">₱</span>
                            <strong class="qian">{{item.price | setMoney}}</strong>
                            <span class="fukuan">99+人付款</span>
                        </div>
                        <div class="title-2">{{item.title}}</div>
                    </li>
                </ul>

                <el-pagination class="分页" background layout="prev, pager, next" :current-page="query.page" @current-change="fenye" :total="total" :page-size="query.size"></el-pagination>

            </el-col>
            <el-col :span="5">
                <div class="left-header">
                    店铺新品
                </div>
                <ul class="box-3">
                    <li v-for="item in 新品" @click="$router.push('/detail?id='+item.id)">
                        <div class="img">
                            <img :src="$img_url+item.cover" alt="" srcset="">
                            <div class="title-1">{{item.title}}</div>
                        </div>
                        <div class="title-2">
                            <span class="qian">₱</span>
                            <strong class="qian">{{item.price | setMoney}}</strong>
                            <span class="fukuan">99+人付款</span>
                        </div>
                    </li>
                </ul>
            </el-col>
        </el-row>
        
    </div>
</template>

<script>
import { toTreeData , setMoney } from "@/assets/自定义函数.js";
import { mapState } from 'vuex'
export default {
    data() {
        return {
            新品:[],
            sp:[],
            query:{
                page:1,
                size:20,
                goodsType:"",
                title:""
            },
            total:0,
            loading:false
        }
    },
    computed:{
        ...mapState({
            goodsType:"goodsType" 
        }),
        newType(){
            let list = JSON.parse(JSON.stringify(this.goodsType))
            return toTreeData(list , 0) 
        },
        typeId(){
            return this.$route.query.tid ? this.$route.query.tid : ''
        }
    },
    filters:{
        setMoney
    },
    methods: {
        查询店铺新品(){
            this.$axios.post('/Goods/getGoods',{page:1,size:5}).then(res => {
                if(res.code==1){
                    this.新品= res.data.data
                }
            }).catch(err => {
            })
        },
        fenye(i){
            this.query.page=i
            this.查询商品()
        },
        查询商品(){
            this.loading=true
            this.query.goodsType = this.typeId
            this.query.title = this.$route.query.title ? this.$route.query.title : ''
            this.$axios.post('/Goods/getGoods',this.query).then(res => {
                if(res.code==1){
                    this.sp= res.data.data
                    this.total= res.data.total
                }
                this.loading=false
            }).catch(err => {
                this.loading=false
            })
        }
    },
    mounted() {
        this.查询店铺新品()
        this.查询商品()
    },
    watch:{
        $route(){
            this.query.page=1
            this.查询商品()
        }
    }
}
</script>

<style lang="scss" scoped>
.left{
    padding-right: 15px;
}
.box-1{
    font-size: 12px;
    border: 1px solid #e8e8e8;
    padding: 0px 5px;
    li{
        border-top: 1px dashed #dedede;
        &:nth-child(1){
            border-top: none;
        }
        display: flex;
        .active{
            color: blue;
        }
        span{
            cursor: pointer;
            &:hover{
                color: blue;
            }
        }
        .head{
            flex-shrink: 0;
            width: 120px;
            padding: 9px 0px 9px 15px;
            color:#989898;
        }
        .body{
            span{
                margin: 9px 40px 9px 0;
                display: inline-block;
            }
        }
    }
}

.box-2{
    min-height: 350px;
    margin: 20px 0px;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    margin-left: -20px;
    li{
        width: 235px;
        // margin-left: calc((100% - 235px*4) / 3) ;
        margin-left: 19px;
        margin-bottom: 20px;
        border: 1px solid #ededed;
        cursor: pointer;
        &:hover{
            border: 1px solid #ff4400;
        }
    }
    .img{
        height: 233px;
        img{
            height: 100%;
            width: 100%;
        }
    }
    .title-1{
        padding: 5px 10px 0px;
        display: flex;
        align-items: center;
        .qian{
            color: #F40;
            font-size: 18px;
        }
        .fukuan{
            flex: 1;
            text-align: right;
            font-size: 12px;
            color: #888;
        }
    }
    .title-2{
        padding: 5px 10px 10px;
        font-size: 12px;
        color: #3d3d3d;
    }
}

.分页{
    text-align: center;
    margin-bottom:50px;
    /deep/ li.active{
        background-color: #ff4400 !important;
    }
}

// 右侧
.left-header{
    padding: 20px 0px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    height: 54px;
}
.box-3{
    li{
        margin: 10px 0px 10px;
        border: 1px solid #ededed;
        cursor: pointer;
        overflow: hidden;
        &:hover{
            border: 1px solid #ff4400;
            .title-1{
                display: block;
            }
        }
    }
    .img{
        width: 266px;
        position: relative;
        img{
            width: 100%;
            height: 100%0;
            object-fit: cover;
        }
        .title-1{
            display: none;
            position: absolute;
            width: 100%;
            height: 75px;
            padding: 5px;
            background: rgba($color: #fff, $alpha: 0.9);
            left: 0px;
            bottom: 0px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 12px;
        }
    }
    .title-2{
        padding: 5px 10px 5px;
        display: flex;
        align-items: center;
        .qian{
            font-size: 18px;
            color: #f40;
        }
        .fukuan{
            font-size: 12px;
            color:#999;
            flex: 1;
            align-items: center;
            text-align: right;
        }
    }
}


</style>