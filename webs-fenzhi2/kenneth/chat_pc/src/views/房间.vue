<template>
    <div>
        <div class="chat-room">
            <div class="room-name-wp">
                <div class="已选房间" @click="聊天室state.显示选房=!聊天室state.显示选房">
                    <span >{{聊天室state.当前房间.Name ? 聊天室state.当前房间.Name :"请选择房间"}}</span>
                    <i class="el-icon-arrow-down"></i>
                </div>
                <div class="禁言按钮" v-if="聊天室state.user.ChatRole==1">
                    <el-button v-if="!聊天室state.房间已禁言" type="warning" @click="房间禁言(true)" size="mini">房间禁言</el-button>
                    <el-button v-if="聊天室state.房间已禁言" type="primary" @click="房间禁言(false)" size="mini">解除房间禁言</el-button>
                </div>
            </div>
            <div class="room-list-wp" :class="{active:聊天室state.显示选房}">
                <ul class="room-list">
                    <li @click="选择房间(item)" :class="{active:item.Id==聊天室state.当前房间.Id}" v-for="(item, index) in 聊天室state.房间列表" :key="index">
                        <div class="inner">
                            <i class="icon iconfont icon-VIP"></i>
                            <span>{{item.Name}}</span>
                            <span class="人数" v-show="设置房间人数(item) > 0">{{设置房间人数(item)}}人</span>
                        </div>
                    </li>
                    <li v-for="(item, index1) in 4"></li>
                </ul>
            </div>
            <div @click="聊天室state.显示选房=false" class="遮罩" v-show="聊天室state.显示选房"></div>
        </div>
        <div class="滚动通知">
            <div class="img_box">
                <img src="static/image/gundong.png" alt="" srcset="">
            </div>
            <marquee scrolldelay="100" scrollamount="6">
                {{config.roll_text}}
            </marquee>
            <div class="弹幕开关">
                <!-- <span class="提示">中奖弹幕</span> -->
                <el-switch active-text="中奖弹幕" :active-color="user.颜色" v-model="聊天室state.中奖弹幕" :width="40"></el-switch>
            </div>
        </div>
    </div>
</template>

<script>   
import { api_房间禁言 } from "@/api/聊天室接口.js";
import { mapState, mapActions } from 'vuex';
export default {
    name: "",
    data() {
        return {
            value:true
        }
    },
    computed: {
        ...mapState({
            config: "config",
            聊天室state: x => x.聊天室,
            user:'user'
        })
    },
    methods: {
        ...mapActions({
            成功提示: "成功提示",
            失败提示: "失败提示",
            选择房间: '聊天室/选择房间',
            获取房间是否禁言:'聊天室/获取房间是否禁言'
        }),
        async 房间禁言(type) {
            var obj = {
                chatId: this.聊天室state.当前房间.Id,
                isMute: type
                //  chatId (房间Id), isMute (true/false)
            }
            var t = '';
            if(type){
                t = '此操作将会导致房间内所有人无法发言，是否继续？'
            }else {
                t = '确定解除房间解言？'
            }
            var r = await this.$confirm(t, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    return true
                }).catch(() => {
                    return false
                });
            if(!r){
                return
            }
            console.log(r)
            api_房间禁言(obj).then(x => {
                console.log(x)
                this.获取房间是否禁言();
                if (x.data.code == 0) {
                    this.成功提示('设置成功')
                } else {
                    this.失败提示(x.data.msg)
                }
            }).catch(err => {
                this.失败提示('系统错误，稍后再试')
            })
        },
        设置房间人数(item){
            var obj=this.聊天室state.会员人数.find(x=>x.Id==item.Id);
            if(obj){
                return obj.UserCount;
            }else{
                return 0
            }
        }
    },
    mounted() {

    },
}
</script>

<style lang="scss" scoped>

.滚动通知{
    height: 46px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #cccccc;
    .img_box{
        padding: 0px 10px;
        flex-shrink: 0;
    }
    marquee{
        font-size: 14px;
    }
    .弹幕开关{
        flex-shrink: 0;
        margin: 0px 10px 0px 10px;
        position: relative;
        /deep/ .el-switch__label.is-active{
            color: var(--color);
        }
        // .提示{
        //     position: absolute;
        //     left: 0px;
        //     top: 0px;
        // }
    }
}

.遮罩 {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 1;
    background: rgba(0, 0, 0, 0.2);
    // pointer-events: none;
}
.chat-room {
    height: 44px;
    position: relative;
    border-bottom: 1px solid #cccccc;
    box-sizing: border-box;
    .room-name-wp {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 2;
        background: #ffffff;
        .已选房间{
            cursor: pointer;
        }
        i {
            margin: 0px 0px 0px 10px;
        }
        .禁言按钮 {
            position: absolute;
            top: 0px;
            right: 10px;
            height: 100%;
            display: flex;
            align-items: center;
        }
    }
}
.room-list-wp {
    position: absolute;
    top: 44px;
    left: 0px;
    width: 100%;
    box-sizing: border-box;
    // transition: all 0.3s;
    height: 0px;
    padding: 0px 0px;
    background: #ffffff;
    z-index: 2;
    &.active {
        height: 320px;
        padding: 10px 0px;
        box-shadow: 0px 4px 4px 1px #949494;
    }
}

$colorList: (
    #ec0909,
    #df4f1a,
    #14bd58,
    #4169e1,
    #d09700,
    #8a2be2,
    #ff4500,
    #ec0000,
    #213862
);

.room-list {
    display: flex;
    flex-wrap: wrap;
    color: #ffffff;
    justify-content: space-between;
    align-content: baseline;
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
        width: 6px;
    }
    /* 滚动槽 */
    &::-webkit-scrollbar-track {
        // -webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
        background: #e8e8e8;
    }
    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
        background: #2e394d;
        border-radius: 6px;
    }
    li {

        // width: 25%;
        padding: 0px 20px;
        margin: 8px 0px;
        box-sizing: border-box;
        min-width: 200px;
        width: 270px;
        div {
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #cccccc;
            border-radius: 5px;
            box-shadow: 0px 0px 5px 0px #929292;
            transition: all 0.3s;
            cursor: pointer;
            position: relative;
            &:hover {
                opacity: 0.7;
            }
        }
        &.active {
            div {
                background: #9c9c9c;
            }
        }
        @for $i from 1 through length($colorList) {
            $item: nth($colorList, $i);
            &:not(.active):nth-child(#{length($colorList)}n - #{$i}) {
                div {
                    background: linear-gradient(90deg, $item, rgba($item, 0.5));
                }
            }
        }
        .人数{
            position: absolute;
            // top: 0px;
            bottom: 0px;
            right: 0px;
            background: rgba(0, 0, 0, 0.4);
            color: #ffffff;
            font-size: 12px;
            padding: 0px 3px;
            min-width: 16px;
            text-align: center;
            border-bottom-right-radius: 5px;
        }
    }
    i {
        margin: 0px 5px 0px 0px;
    }
}
</style>