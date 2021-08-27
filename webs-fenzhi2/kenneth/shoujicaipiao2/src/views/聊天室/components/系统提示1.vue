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
                <i class="icon iconfont icon-kefu"></i>
            </div>
            <div class="cont">
                <!-- <p class="time" v-if="type=='left'">
                    <span>{{obj.MemberId}}-尊导师</span>
                    <span>{{obj.Createtime}}</span>
                </p>
                <p class="time mui-text-right" v-if="type=='right'">
                    <span>{{obj.Createtime}}</span>
                    <span>尊导师-{{obj.MemberId}}</span>
                </p> -->
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
            
        }
    },
    computed: {
        ...mapState({
            config:'config',
            user:x=>x.聊天室.user
        }),
        type(){
            return this.obj.OnlineId==this.user.OnlineId ? 'right' :'left'
        }
    },
}
</script>

<style lang="scss" scoped>
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
        margin: 0px _vw(10) 0px _vw(10);
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
        padding: _vw(5) _vw(10);
        font-size: _vw(14);
        line-height: _vw(26);
        background: #a0e759;
        // max-width: _vw(250);
        width: _vw(250);
        border-radius: _vw(10);
        position: relative;
        &:after {
            content: "";
            position: absolute;
            top: _vw(10);
            left: _vw(-8);
            width: 0;
            height: 0;
            border-color: transparent #a0e759 transparent transparent;
            border-style: solid;
            border-width:_vw(8) _vw(8) _vw(8) 0;
        }
    }
}
</style>


