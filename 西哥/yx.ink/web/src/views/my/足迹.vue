<template>
    <div>
        <div class="title-1">我的足迹</div>
        
        
        <ul class="box-1">
            <template v-for="(item, index) in list">
                <div class="日期" v-if="!list[index-1] || list[index-1].newTime!=item.newTime">{{item.newTime}}</div>
                <li>
                    <div class="img" @click="$router.push(`/detail?id=${item.goodsId}`)">
                        <img :src="$img_url+item.cover" alt srcset />
                    </div>
                    <div class="title-2" @click="$router.push(`/detail?id=${item.goodsId}`)">
                        <span class="qian">₱</span>
                        <strong class="qian">{{item.price | setMoney}}</strong>
                    </div>
                    <div class="title-3" @click="$router.push(`/detail?id=${item.goodsId}`)">{{item.title ? item.title : '商品信息异常'}}</div>
                    <div class="删除" @click="删除(item,index)">删除</div>
                </li>
            </template>
        </ul>

        <div class="btn-1" v-if="total>0" @click="加载更多()">
            {{total>list.length ? '加载更多' : '没有更多了'}}
        </div>

        <nodata v-if="total==0"/>
        
    </div>
</template>
<script>

import nodata from '@/components/nodata.vue'
import moment from 'moment'
import { setMoney } from "@/assets/自定义函数.js";
export default {
    components:{
        nodata
    },
    data() {
        return {
            query:{
                page:1,
                size:10
            },
            list:[],
            total:-1,
        }
    },
    filters:{
        setMoney
    },
    methods: {
        删除(item,index){
            this.$confirm('确定删除这条访问记录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$Loading(1)
                this.$axios.post('/Footprint/delete',{goodsId:item.goodsId}).then(res => {
                    this.$Loading()
                    if(res.code==1){
                        this.total--
                        this.list.splice(index,1)
                        this.正确('删除成功')
                    }else{
                        this.错误('删除失败')
                    }
                }).catch(err => {
                    this.$Loading()
                    this.错误('系统错误，请稍后再试')
                })
            }).catch(() => {})
        },
        加载更多(){
            if(this.total>this.list.length){
                this.query.page++
                this.查询足迹()
            }
        },
        查询足迹(){
            this.$Loading(1)
            this.$axios.post('/Footprint/getList',this.query).then(res => {
                this.$Loading()
                if(res.code==1){
                    let data = res.data.data
                    data.forEach(x => {
                        //判断是不是今天
                        if (moment(x.creationTime).isSame(new Date(), 'd')) {
                            x.newTime = "今天"
                        } else if (moment(x.creationTime).isSame(new Date(), 'y')) {
                            //判断是不是今年
                            x.newTime = moment().format('MM月DD日')
                        } else {
                            x.newTime = moment().format('YYYY年MM月DD日')
                        }
                    });
                    this.list = [...this.list , ...data]
                    this.total = res.data.total
                }else{
                    this.total = 0
                }
            }).catch(err => {
                console.log(err)
                this.$Loading()
                this.total = 0
            })
        }
    },
    mounted() {
        this.查询足迹()
    },
}
</script>
<style lang="scss" scoped>
.title-1 {
    line-height: 60px;
    font-size: 22px;
}
.日期{
    width: 100%;
    margin: 0px 0px 10px;
    display: flex;
    font-size: 20px;
    align-items: center;
    &::after{
        content: '';
        height: 1px;
        flex: 1;
        background: #c3c3c3;
        margin: 0px 0px 0px 10px;
    }
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
.btn-1{
    background: #fff;
    text-align: center;
    padding: 5px;
    cursor: pointer;
}
</style>