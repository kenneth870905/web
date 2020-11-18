<template>
    <div>
        <div class="每日首冲" style="background-image: url('static/image/shouchong/img_01.png')">
            <span class="返回" @click="返回()">返回</span>
            <img class="bg2" src="static/image/shouchong/img_02.png" alt="" srcset="">
            <img src="static/image/shouchong/img_03.png" alt="" srcset="">
            <img @click="领取()" src="static/image/shouchong/img_04.png" alt="" srcset="">
        </div>
    </div>
</template>

<script>
import { api_领取首充赠送 } from "@/api/资金接口.js";
import { mapState } from 'vuex';
export default {
    name:"",
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState({
            config:"config"
        })
    },
    methods: {
        返回(){
            history.back();
        },
        领取(){
            api_领取首充赠送().then(x=>{
                if(x.data.code==0){
                    this.$toast('恭喜你领取成功')
                }else{
                    mui.alert(x.data.msg,'提示','确定',()=>{

                    },'div')
                }
            }).catch(err=>{
                this.$toast('系统错误稍后再试')
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.每日首冲{
    background-size: cover;
    position: relative;
    .返回{
        position: absolute;
        top: _vw(20);
        left: _vw(10);
        color: #ffffff;
        z-index: 1;
        font-size: _vw(17);
    }
    .bg2{
        margin: _vw(15) 0px 0px;
    }
    img{
        width: 100%;
        position: relative;
        // z-index: 1;
    }
}
</style>
