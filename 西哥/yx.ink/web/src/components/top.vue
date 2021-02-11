<template>
    <div class="top">
        <div class="top1">
            <div class="w1280">
                <span @click="$router.push('/')">首页</span>
                <span v-if="!userInfo.id" class="red-text" @click="$router.push('/login')">亲，请登录</span>
                <span v-if="!userInfo.id" @click="$router.push('/register')">免费注册</span>

                <span @click="$router.push('/cart')">购物车</span>
                <span v-if="userInfo.id" @click="$router.push('/my')">{{userInfo.nickName ? userInfo.nickName : userInfo.userName}}</span>
                <span v-if="userInfo.id" class="red-text" @click="tuichu()">退出</span>
            </div>
        </div>
        <div class="bgfff top2">
            <div class="w1280">
                <div class="box-1">
                    <div class="img-box">
                        <img @click="$router.push('/')" src="static/img/logo.png" alt srcset />
                    </div>
                    <div class="sousuo">
                        <el-input placeholder="请输入您要搜索的商品" v-model="input2"></el-input>
                        <i @click="$router.push('/all?title='+input2)" class="icon el-icon-search"></i>
                    </div>
                    <div class="gouwuche" @click="$router.push('/cart')">
                        <i class="el-icon-shopping-cart-full"></i>
                        <div>购物车</div>
                        <span v-show="购物车.length>0">{{购物车.length}}</span>
                    </div>
                </div>
            </div>
        </div>
     
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    data() {
        return {
            showLfetMenu:true,
            input2: "",
            leftMenu1: [],   //第级别
            leftMenu2:[],   //第二界别
            list: [
                { name: "女装", id: 1, parent: null },
                { name: "女装-上衣", id: 101, parent: 1 },
                { name: "女装-裙子", id: 102, parent: 1 },
                { name: "女装-裤子", id: 103, parent: 1 },
                { name: "女装-牛仔", id: 104, parent: 1 },
                { name: "女装-连衣裙", id: 105, parent: 1 },

                { name: "男装", id: 2, parent: null },
                { name: "男装-1", id: 201, parent: 2 },
                { name: "男装-2", id: 202, parent: 2 },
                { name: "男装-3", id: 203, parent: 2 },
                { name: "男装-4", id: 204, parent: 2 },
                { name: "男装-5", id: 205, parent: 2 },

                { name: "鞋子", id: 3, parent: null },
                { name: "鞋子-1", id: 301, parent: 3 },
                { name: "鞋子-2", id: 301, parent: 3 },
                { name: "鞋子-3", id: 301, parent: 3 },
                { name: "鞋子-4", id: 301, parent: 3 },
                { name: "鞋子-5", id: 301, parent: 3 },

                { name: "首饰", id: 4, parent: null },
                { name: "首饰-1", id: 401, parent: 4 },
                { name: "首饰-2", id: 401, parent: 4 },
                { name: "首饰-3", id: 401, parent: 4 },
                { name: "首饰-4", id: 401, parent: 4 },
                { name: "首饰-5", id: 401, parent: 4 },

                { name: "内衣", id: 5, parent: null },
                { name: "内衣-1", id: 501, parent: 5 },
                { name: "内衣-2", id: 501, parent: 5 },
                { name: "内衣-3", id: 501, parent: 5 },
                { name: "内衣-4", id: 501, parent: 5 },
                { name: "内衣-5", id: 501, parent: 5 },
                { name: "内衣-6", id: 501, parent: 5 },
                { name: "内衣-7", id: 501, parent: 5 },
                { name: "内衣-8", id: 501, parent: 5 },

                { name: "其他", id: 6, parent: null },
                { name: "其他-1", id: 601, parent: 6 },
                { name: "其他-2", id: 601, parent: 6 },
                { name: "其他-3", id: 601, parent: 6 },
                { name: "其他-4", id: 601, parent: 6 },
                { name: "其他-5", id: 601, parent: 6 },
                { name: "其他-6", id: 601, parent: 6 },
                { name: "其他-7", id: 601, parent: 6 },
                { name: "其他-8", id: 601, parent: 6 },

            ]
        }
    },
    computed:{
        ...mapState({
            userInfo:"userInfo",
            购物车:"购物车"
        })
    },
    methods: {
        ...mapMutations({
            setValue:"setValue"
        }),
        filterArray(data,pid) {
            function tree(id) {
                let arr = []
                data.filter(item => {
                    return item.parent === id;
                }).forEach(item => {
                    arr.push({
                        id:item.id,
                        name: item.name,
                        children: tree(item.id)
                    })
                })
                return arr
            }
            return tree(pid)  // 第一级节点的父id，是null或者0，视情况传入
        },
        移入(item){
            this.leftMenu2 = this.list.filter(x=>x.parent == item.id)
        },
        移出(){
            this.leftMenu2 = []
        },
        tuichu(){
            this.setValue(['token',''])
            this.setValue(['userInfo',{}])
            if(this.$route.path!='/'){
                this.$router.push('/')
            }
        }
    },
    mounted() {
        this.leftMenu1 = this.list.filter(x=>x.parent==null)
    },
}
</script>


<style lang="scss" scoped>
.top {
    border-bottom: 1px solid #eee;
    position: sticky;
    // // top: -140px;
    top: -35px;
    z-index: 10;
}

.top1 {
    background: #f7f7f7;
    .w1280 {
        line-height: 35px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 12px;
        span {
            margin-left: 20px;
            cursor: pointer;
            &:hover {
                color: #ff5000;
            }
        }
        .red-text {
            color: #ff5000;
        }
    }
}


.bgfff{
    background: #fff;
}

.box-1 {
    height: 70px;
    display: flex;
    align-items: center;
    // justify-content: space-between;
    position: relative;
    .img-box {
        height: 40px;
        margin: 0px 0px;
        flex: 1;
        img {
            height: 100%;
        }
    }
    .sousuo {
        width: 600px;
        height: 40px;
        // position: absolute;
        position: relative;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        margin: 0px 50px;
        .icon {
            position: absolute;
            right: 8px;
            top: 0px;
            line-height: 40px;
            color: rgba($color: #ff5000, $alpha: 0.6);
            font-size: 28px;
            cursor: pointer;
            &:hover {
                color: rgba($color: #ff5000, $alpha: 1);
            }
        }
    }
}

.daohang {
    display: flex;
    height: 70px;
    justify-content: space-between;
    align-items: center;
}
.gouwuche {
    text-align: center;
    cursor: pointer;
    position: relative;
    span {
        background: red;
        color: #fff;
        font-size: 12px;
        position: absolute;
        top: 0px;
        right: -10px;
        border-radius: 18px;
        padding: 0px 5px;
    }
    div {
        font-size: 12px;
    }
    i {
        font-size: 35px;
    }
}

</style>