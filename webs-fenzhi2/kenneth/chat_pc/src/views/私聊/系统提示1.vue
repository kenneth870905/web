<template>
    <li class=" left">
        <!-- <div class="time_1">
            <span>
                14:33:05
            </span>
        </div> -->
        <div class="item">
            <!-- 头像 -->
            <div class="img_box">
                <!-- <i class="icon iconfont icon-kefu"></i> -->
                <img src="static/image/kefu.png" alt="" srcset="">
            </div>
            <div class="cont">
                <p class="time" v-if="type=='left'">
                    <span>系统管理员</span>
                    <!-- <span>{{obj.Createtime}}</span> -->
                </p>
                <p class="time mui-text-right" v-if="type=='right'">
                    <!-- <span>{{obj.Createtime}}</span> -->
                    <!-- <span>尊导师-{{obj.MemberId}}</span> -->
                </p>
                <div class="msg">
                    {{config.welcome_chat}}
                </div>
            </div>
            <!-- <div class="img_box" v-if="type=='right'">
                <i class="icon iconfont icon-touxiang"></i>
            </div> -->
        </div>
    </li>
</template>

<script>
import { mapState } from "vuex";
export default {
    name:"",
    props:{
        obj:{
            default(){
                return {}
            }
        },
    },
    data() {
        return {
            time:"",
            type:'left'
        }
    },
    computed: {
        ...mapState({
            config:'config',
        }),
    },
    methods: {
        
    },
    mounted() {
        
    },
}
</script>

<style lang="scss" scoped>
@function _vw($str){
    @return $str+px
}
.right{
    justify-content: flex-end;
}
.time_1{
    text-align: center;
    display: flex;
    justify-content: center;
    margin: _vw(20) 0px 0px;
    span{
        background: #d4d4d4;
        font-size: _vw(12);
        color: #ffffff;
        padding: _vw(2) _vw(6);
        border-radius: 3px;
        margin: 0px 0px _vw(5)
    }
}
.item{
    margin: 0px 0px _vw(20) 0px;
    padding:0px _vw(10) 0px _vw(10);
    display: flex;
    .img_box{
        flex-shrink: 0;
        width: _vw(30);
        height: _vw(30);
        margin: 20px _vw(10) 0px _vw(10);
        font-size: _vw(30);
        color: #73a73f;
        // @include textcolor;
        i{
            line-height: _vw(30);
            display: block;
        }
        img{
            width: 100%;
            height: 100%;
        }
    }
    .time{
        color: #656565;
        font-size: _vw(12);
        span{
            margin: 0px _vw(4);
        }
    }
    .msg{
        min-height: _vw(40);
        padding: 10px _vw(10);
        font-size: _vw(14);
        // line-height: _vw(26);
        max-width: 80%;
        // background: #a0e759;
        background: linear-gradient(to right, #ab47bc, #5169de);
        // max-width: _vw(250);
        // width: _vw(250);
        // border-radius: _vw(10);
        color: #ffffff;
        border-top-left-radius: 0px;
        position: relative;
        &:after {
            transform: rotate(-90deg);

            content: "";
            position: absolute;
            top: -4px;
            left: -4px;
            width: 0;
            height: 0;
            border-color: transparent #ab47bc transparent transparent;
            border-style: solid;
            border-width:_vw(8) _vw(8) _vw(8) 0;
        }
    }
}
</style>


