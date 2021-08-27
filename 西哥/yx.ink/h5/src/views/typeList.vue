<template>
    <div class="typeList">
        <van-nav-bar title="选择分类"  fixed />

        <van-tree-select class="box-1" height="100%" :items="typeList" :main-active-index.sync="active">
            <template #content>
                <ul class="list">
                    <li @click="$router.push('/productList?tid='+item.id)" v-for="item in rightList">
                        <div class="img-box">
                            <img :src="$img_url+item.cover" alt="" srcset="">
                        </div>
                        <div>{{item.text}}</div>
                    </li>
                </ul>
               
            </template>
        </van-tree-select>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
            active:0,
        }
    },
    computed:{
        ...mapState({
            goodsType:'goodsType'
        }),
        typeList(){
            let list = JSON.parse(JSON.stringify(this.goodsType)) 
                list.forEach(item=>{
                    item.text = item.title
                })
            list = this.toTreeData(list,0)
            return list
        },
        rightList(){
            return this.typeList[this.active] ? this.typeList[this.active].children : []
        },
    },
    methods: {
        ...mapActions({
            获取商品类型:"获取商品类型"
        }),
        toTreeData(data, pid) {
            function tree(id) {
                let arr = []
                data.filter(item => {
                    return item.parentId === id;
                }).forEach(item => {
                    item.children = tree(item.id)
                    arr.push(item)
                })
                return arr
            }
            return tree(pid)  // 第一级节点的父id，是null或者0，视情况传入
        }
    },
    mounted() {
        this.获取商品类型()
    },
}
</script>

<style lang="scss" scoped>
.typeList {
    padding: 46px 0px 0px;
    height: 100%;
}
.box-1{
    /deep/ .van-sidebar{
        flex: auto;
        width: 80px;
        flex-grow: 0;
        text-align: center;
    }
    .list{
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        font-size: 12px;
        color: #333;
        li{
            width: calc(100% / 3);
            margin: 10px 0px 0px;
        }
        .img-box{
            width: 70px;
            height: 70px;
            margin: 0px auto;
            img{
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
    }
}

</style>