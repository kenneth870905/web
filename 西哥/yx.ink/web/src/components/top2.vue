<template>
    <div class="top3" :class="{fixd:!显示导航}">
        <div class="w1280">
            <!-- <div class="侧导航" :class="{showMenu:showLfetMenu}"> -->
            <div class="侧导航" :class="{showMenu:显示导航}">
                <div class="header-1">
                    商品分类
                    <i class="el-icon-arrow-down"></i>
                </div>
                <ul class="menu-root" @mouseleave="移出()">
                    <li v-if="index<9" v-for="(item,index) in newType" @mouseenter="移入(item)" @click="$router.push('/productList?tid='+item.id)">
                        {{item.title}}
                        <i class="el-icon-arrow-right" v-show="item.children"></i>
                    </li>
                    <li @click="$router.push('/all')" @mouseenter="移入()">
                        所有类型
                    </li>
                    <ul class="menu-list" v-show="leftMenu2.length>0">
                        <li v-for="item in leftMenu2" @click="$router.push('/productList?tid='+item.id)">{{item.title}}</li>
                    </ul>
                    <div class="锚点" ref="锚点"></div>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {  toTreeData } from "@/assets/自定义函数.js";
import { mapActions, mapState } from "vuex";
export default {
    data() {
        return {
            showLfetMenu: true,
            input2: "",
            leftMenu2: [],   //第二级
        }
    },
    computed:{
        ...mapState({
            goodsType:'goodsType'
        }),
        显示导航(){
            return this.showLfetMenu && this.$route.path=='/'
        },
        newType(){
            let list = JSON.parse(JSON.stringify(this.goodsType))
            return toTreeData(list,0) 
        }
    },
    methods: {
        ...mapActions({
            获取商品类型:"获取商品类型"
        }),
        移入(item) {
            if(item){
                this.leftMenu2 = item.children ? item.children : [] 
            }else{
                this.leftMenu2 = []
            }
        },
        移出() {
            this.leftMenu2 = []
        }
    },
    mounted() {
        this.获取商品类型()

        var io = new IntersectionObserver(
            entries => {
                // console.log(entries);
                if(!entries[0].isIntersecting){
                    this.showLfetMenu =false
                }
            },{
                // root: document.querySelector('#scrollArea'),
                // rootMargin: '0px',
                threshold: 0
            }
        );
        io.observe(this.$refs.锚点);
        
    },
}
</script>

<style lang="scss" scoped>
.top3 {
    background: #fff;
    box-shadow: 0px 0px 4px 0px #a5a5a5;
    &.fixd{
        position: sticky;
        top: 70px;
        z-index: 5;
    }
}
.侧导航 {
    position: relative;
    width: 200px;
    &.showMenu {
        .menu-root {
            display: block;
        }
        .header-1 {
            display: none;
        }
    }
    &:hover {
        .menu-root {
            display: block;
        }
    }
    .锚点{
        position: absolute;
        bottom: 0px;
    }

    .header-1 {
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        color: #0f136d;
        font-size: 14px;
        cursor: pointer;
        i {
            margin: 0px 0px 0px 10px;
            font-weight: bold;
        }
    }
    .menu-root {
        display: none;
    }
    .menu-root {
        width: 200px;
        height: 344px;
        background: #fff;
        position: absolute;
        box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25);
        font-size: 14px;
        color: #757575;
        li {
            height: 34px;
            // height: 10%;
            padding: 0px 20px 0px 30px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            &:hover {
                color: #f57224;
                background: #eceff1;
            }
        }
        .menu-list {
            width: 200px;
            min-height: 344px;
            background: #fff;
            position: absolute;
            z-index: 5;
            top: 0px;
            left: 200px;
            box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
        }
    }
}
</style>