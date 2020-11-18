<template>
    <!-- self -->
    <div class="操作" @tap="操作.show=false">
        <!-- <div class="遮罩" @touchstart="touchstart">
        </div> -->
        <ul :style="styles">
            <li @tap="撤销消息()">撤回</li>
        </ul>
    </div>
</template>

<script>
import { api_撤销消息 } from "@/api/私聊接口.js";
import { mapState, mapActions } from "vuex";
export default {
    name:"",
    data() {
        return {
            
        }
    },
    computed: {
        styles(){
            var top=0;
            if(this.操作.top-70 -44>0){
                top=this.操作.top - 70 -44
            }else{
                top=this.操作.top-44
            }
            return {left:this.操作.left - 35 +'px',top: top +'px'}
        },
        ...mapState({
            操作:x=>x.聊天室.操作 
        })
    },
    methods: {
        ...mapActions({
            撤销消息:'聊天室/撤销消息'
        }),
        touchstart(e){
            this.$toast('1')
            e.preventDefault()
        }
    },
}
</script>

<style lang="scss" scoped>
.操作{
    position: absolute;
    top: 44px;
    bottom: 0px;
    width: 100%;
    z-index: 1;
}
ul{
    background: #ffffff;
    position: absolute;
    height: 60px;
    width: 70px;
    box-sizing: border-box;
    // top: 100px;
    // left: 100px;
    box-shadow: 0px 0px 5px 0px #949494;
    font-size: 14px;
    line-height: 30px;
    li{
        padding: 0px _vw(10);
        border-bottom: 1px solid #eeeeee;
    }
    &::after{
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 5px 5px 0 5px;
        border-color: #ffffff transparent transparent transparent;
        position: absolute;
        left: calc(50% - 5px);
        right: 0px;
        bottom: -5px;
        content: "";
    }
}
</style>