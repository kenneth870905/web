<template>
    <div class="频道">
        <van-nav-bar title="全部频道" @click-right="$back">
            <van-icon name="cross" slot="right"/>
        </van-nav-bar>
        <div class="main">

            <div class="title">
                <span class="s1">我的频道</span>
                <span v-show="编辑" @click="编辑=false" class="s2">点击移除频道</span>
                <button v-show="编辑" @click="默认()" class="b1 b2">恢复默认设置</button>
                <button v-show="编辑" @click="编辑=false" class="b1 b3">完成</button>
                <button v-show="!编辑" @click="编辑=true" class="b1 b4">编辑</button>
            </div>
            <ul class="list">
                <li v-for="(item, index) in list1" :key="index" @click="c1(item)">
                    <van-icon name="clear" v-show="编辑"/>
                    <span>{{item.name}}</span>
                </li>
            </ul>
            <div class="title">
                <span class="s1">推荐频道</span>
                <span class="s2">地方频道</span>
                <span class="s3">{{编辑 ? '点击添加频道':"点击进入频道"}}</span>
            </div>
            <ul class="list">
                <li v-for="(item, index) in list2" :key="index" @click="c2(item)">
                    {{item.name}}
                </li>
            </ul>
            

        </div>
    </div>
</template>

<script>
import { mapState, mapActions , mapMutations } from "vuex";
export default {
    name:"",
    data() {
        return {
            编辑:false,
            type:[],
        }
    },
    computed: {
        ...mapState({
            偏好频道:x=>x.user.偏好频道 
        }),
        list1(){
            return this.偏好频道
        },
        list2(){
            let l = []
            this.type.forEach(e => {
                if(!this.偏好频道.find(x=>x.name == e.name)) 
                l.push(e)
            });
            return l
        }
    },
    methods: {
        ...mapMutations({
            添加频道:"user/添加频道",
            删除频道:"user/删除频道",
            设置默认频道:"user/设置默认频道"
        }),
        默认(){
            this.设置默认频道(this.type.slice(0,20))
        },
        获取新闻类型(){
            this.$toast.loading({mask: true,duration:0})
            this.$axios.post('/newtype/findall', '').then(x => {
                this.type = x.data;
                this.$toast.clear();
                if(this.偏好频道.length==0)
                this.设置默认频道(this.type.slice(0,20))
            }).catch(err => {})
        },
        c1(item){
            if(this.编辑){
                if(this.偏好频道.length<=1){
                    this.$toast('不能在删除了')
                }else{
                    this.删除频道(item);
                }
            }else{
                this.$router.push(`/newType?t1=${item.id}`)
            }
        },
        c2(item){
            if(this.编辑){
                if(this.偏好频道.length>=20){
                    this.$toast('最多添加20个')
                }else{
                    this.添加频道(item)
                }
            }else{
                this.$router.push(`/newType?t1=${item.id}`)
            }
        }
    },
    mounted() {
        this.获取新闻类型();
    },
}
</script>

<style lang="scss" scoped>
.main{
    padding: 0px _vw(15);
}
.title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: _vw(40);
    border-bottom: 1px solid #eeeeee;
    .s1{
        font-size: _vw(15);
        margin: 0px _vw(10) 0px 0px;
    }
    .s2{
        font-size: _vw(12);
        color: rgb(155, 158, 163);
        flex:1;
    }
    .s3{
        font-size: _vw(12);
        color: rgb(155, 158, 163);
    }
    .b1{
        height: _vw(20);
        font-size: _vw(12);
        border-radius: _vw(20);
        margin: 0px 0px 0px _vw(5);
    }
    .b2{
        color: #498bf8;
        border: 1px solid #498bf8;
        background: none;
    }
    .b3{
        color: #ffffff;
        background: #498bf8;
        border: 1px solid #498bf8;
    }
    .b4{
        background: #eeeff2;
        border: 1px solid #eeeff2;
        color: rgb(155, 158, 163);
    }
}

.list{
    display: grid;
    grid-template-columns: repeat(4,auto);
    text-align: center;
    // grid-gap :10px 10px;
    grid-gap :_vw(10);
    font-size: _vw(16);
    li{
        color: rgb(63, 65, 70);
        background-color: rgb(238, 239, 242);
        text-align: center;
        line-height: _vw(34);
        border-radius: 3px;
        position: relative;
    }
    .van-icon-clear{
        position: absolute;
        top: _vw(-4);
        right: _vw(-4);
        font-size: _vw(16);
        color: #848484;
    }
}
</style>
