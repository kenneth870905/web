<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">修改昵称</h1>
            <button @click="提交()" class="mui-btn mui-btn-blue mui-btn-link mui-pull-right">保存</button>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                <div class="输入框">
                    <input type="text" :v-bind="Person.Nickname" v-model="昵称" placeholder="请输入昵称">
                    <i v-if="昵称" @click="昵称=''" class="van-icon van-icon-cross"></i>
                </div>
               
            </div>
             <div class="提示">
                    最多输入8个汉字或者16个字母, 数字
                </div>
        </div>
    </div>
</template>

<script>

import { api_修改昵称 } from "@/api/个人资料.js";
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
    name:"",
    data() {
        return {
            昵称:''
        }
    },
    computed: {
        ...mapState({
            Person:x=>x.个人资料.Person 
        })
    },
    methods: {
        ...mapMutations({
            加载中:"加载中"            
        }),
        ...mapActions({
            getPersonInfo:'个人资料/getPersonInfo'
        }),
        提交(){
             console.log('a你好'.replace(/[^\u0000-\u00ff]/g,"aa").length)
            if(this.昵称.replace(/[^\u0000-\u00ff]/g,"aa").length>16){
                this.$toast('名字长度太长')
                return
            }
            this.加载中(true)
            api_修改昵称(this.昵称).then(x=>{
                if(x.data.code==0){
                    this.初始化()
                    this.$toast('设置成功')
                    history.back();
                }else{
                    this.$toast(x.data.msg)
                }
                this.加载中(false)
            }).catch(err=>{
                this.加载中(false)
                this.$toast('系统错误稍后再试')
            })
        },
        async 初始化(){
            this.加载中(true)
            await this.getPersonInfo()
            this.昵称=this.Person.Nickname
            this.加载中(false)
        }
    },
    mounted() {
        this.初始化();
       
    },
}
</script>

<style lang="scss" scoped>
.box_1 > div{
    padding-bottom: 0;
}
.mui-content{
    background: #ffffff;
}
.box_1{
    padding: 13px 20px;
}
.提示{
    font-size: 12px;
    color: #ec5e5e;
   margin: 17px 19px;
}

.输入框{
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    i{
        color: #d3d3d3;
    }
    input{
        font-size: 14px;
        background: none;
        border: none;
        margin: 0px;
    }
}
</style>
