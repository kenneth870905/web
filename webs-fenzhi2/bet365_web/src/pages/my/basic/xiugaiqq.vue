<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">修改QQ</h1>
            <button @click="提交()" class="mui-btn mui-btn-blue mui-btn-link mui-pull-right">保存</button>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                <div class="输入框">
                    <input type="text" v-model="qq" placeholder="请输入QQ号码">
                    <i v-if="qq" @click="qq=''" class="van-icon van-icon-cross"></i>
                </div>
               
            </div>
             <div class="提示">
                    请输入常用QQ号码
            </div>
        </div>
    </div>
</template>

<script>

import { api_修改qq } from "@/api/个人资料.js";
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
    name:"",
    data() {
        return {
            qq:''
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
            this.加载中(true)
            var obj={qq:this.qq}
            api_修改qq(obj).then(x=>{
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
        初始化(){
            this.getPersonInfo().then(x=>{
                // this.qq=this.Person.QQ
            }).catch(err=>{})
        }
    },
    mounted() {
        this.初始化();
    },
}
</script>

<style lang="scss" scoped>
.mui-content{
    background: #ffffff;
}
.box_1{
     padding: 13px 26px;
}
.box_1 > div{
    padding-bottom: 0;
}
.提示{
    font-size: 12px;
    color: #ec5e5e;
    margin: 10px 27px;
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
