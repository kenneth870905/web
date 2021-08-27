<template>
        <el-dialog title="会员详情" center :visible.sync="聊天室state.显示会员详情" width="400px">
           <div class="会员详情">
                <div class="内容">
                    <div class="关闭" @click="设置key(['显示会员详情',false])">
                        <!-- <van-icon name="clear" /> -->
                    </div>
                    <div class="header_1">
                        <div class="img_box">
                            <img v-if="选中会员.ImgId && 选中会员.ImgId!='null'" :src="config.img_url+'static/image/touxiang/'+选中会员.ImgId" alt="">
                            <img v-if="!选中会员.ImgId || 选中会员.ImgId=='null'" :src="config.img_url+'static/image/touxiang/wutu.jpg'" alt="">
                        </div>
                        <div class="text_1">
                            <div><span class="title_1">账号：</span>{{选中会员.MemberId}}<span class="mini">({{选中会员.OnlineId}})</span></div>
                            <div><span class="title_1">昵称：</span>{{选中会员.Nickname}}</div>
                            <div><span class="title_1">等级：</span>{{选中会员.Vip}}</div>
                        </div>
                    </div>

                    <ul class="财产">
                        <li>
                            <div>存款</div>
                            <div>{{聊天室state.会员详情.存取.DepositAmount}}</div>
                        </li>
                        <li>
                            <div>存款次数</div>
                            <div>{{聊天室state.会员详情.存取.DepositCount}}</div>
                        </li>
                        <li>
                            <div>取款</div>
                            <div>{{聊天室state.会员详情.存取.WithdrawAmount}}</div>
                        </li>
                        <li>
                            <div>取款次数</div>
                            <div>{{聊天室state.会员详情.存取.WithdrawCount}}</div>
                        </li>
                    </ul>

                    <div class="发言记录">
                        <div class="title_1">发言记录 <span class="more">more</span></div>
                        <ul class="list_1">
                            <li class="无记录" v-if="聊天室state.会员详情.msglist.length==0">暂无发言记录</li>
                            <li v-for="(item, index) in 聊天室state.会员详情.msglist" :key="index">
                                <div class="时间">{{item.Createtime}}</div>
                                <div class="内容1">{{item.Content}}</div>
                            </li>
                        </ul>
                    </div>
                    <div class="编辑">
                        <div class="title_1">管理</div>
                        <ul class="list_1">
                            <li><div class="禁言" @click="禁言()">{{聊天室state.会员详情.是否禁言 ? '解除解言':"禁言"}}</div></li>
                            <li><div class="私聊" @click="私聊()">私聊</div></li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </el-dialog>
</template>

<script>
import { api_禁言 } from "@/api/聊天室接口.js";
import { mapState, mapMutations , mapActions} from 'vuex';
export default {
    name: "",
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            config: 'config',
            选中会员: x => x.聊天室.选中会员,
            聊天室state:x=>x.聊天室
        })
    },
    created() {
        if (!this.选中会员.MemberId) {
            // history.back();
        }
    },
    methods: {
        ...mapActions({
            加载中: "加载中",
            成功提示:"成功提示",
            失败提示:"失败提示" ,
            // 用户是否禁言:'聊天室/用户是否禁言',
            会员详情:'聊天室/会员详情'
        }),
        私聊(){
            this.聊天室state.显示会员详情=false;
            this.$router.push('/privateChat?id='+this.选中会员.OnlineId)
        },
        禁言(type) {
            this.加载中(true)
            var type= !this.聊天室state.会员详情.是否禁言
            var obj = {
                // targetMemberId:"",
                // guid:this.选中会员.Guid,
                onlineId: this.选中会员.OnlineId,
                isMute: type
            }
            // var obj=Object.assign({},this.选中会员);
            //     obj.isMute=false
            api_禁言(obj).then(x => {
                // this.用户是否禁言();
                this.会员详情();
                if (x.data.code == 0) {
                    this.成功提示('设置成功')
                } else {
                    this.失败提示(x.data.msg)
                }
                this.加载中(false);
            }).catch(err => {
                this.失败提示('系统错误，稍后再试')
            })
        }
    },
}
</script>

<style lang="scss" scoped>
@function _vw($x){
    @return $x + px 
}

/deep/ .el-dialog__header{
    border-bottom: 1px solid #cccccc;
}
/deep/ .el-dialog__body{
    padding: 0px 10px 10px;
}

.header_1{
    display: flex;
    padding: _vw(10);
    font-size: _vw(14);
    background: #ffffff;
    .img_box{
        width: _vw(70);
        height: _vw(70);
        border-radius: 100%;
        background: #cccccc;
        flex-shrink: 0;
        margin: 0px _vw(10) 0px 0px;
        img{
            width: 100%;
            height: 100%;
            border-radius: 100%;
            object-fit: cover;
        }
    }
    .text_1{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .title_1{
        color: #5a5a5a;
    }
    .mini{
        font-size: 12px;
    }
}

.会员详情{
    // position: absolute;
    // top: 0px;
    // width: 100%;
    // height: 100%;
    // background: rgba(0,0,0,0.3);
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
}

.内容{
    background: #ffffff;
    width: 100%;
    border-radius: _vw(10);
    overflow: hidden;
    position: relative;
}

.关闭{
    position: absolute;
    top: _vw(5);
    right: _vw(5);
    font-size: _vw(25);
    color: #6d6d6d;
}
.财产{
    background: #ffffff;
    // margin: _vw(5) 0px 0px 0px;
    border-top: 1px solid #cccccc;
    padding: _vw(10);
    display: flex;
    >li{
        width: calc(100% / 4);
        text-align: center;
        &:not(:nth-child(1)){
            border-left: 1px solid #cccccc;
        }
        >div:nth-child(1){
            font-size: _vw(14);
        }
        >div:nth-child(2){
            font-size: _vw(13);
            margin-top: _vw(5);
            font-weight: bold;
            color: red;
        }
    }
}

.发言记录{
    margin: _vw(5) 0px 0px 0px;
    padding:0px _vw(10);
    background: #ffffff;
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
    overflow: auto;
    height: 300px;
    .title_1{
        font-size: _vw(14);
        padding: _vw(5);
        border-bottom: 1px solid #eeeeee;
        .more{
            float: right;
            color: red;          
        }
    }
    .list_1{
        min-height: _vw(150);
        .无记录{
            text-align: center;
            font-size: _vw(12);
            padding: _vw(30) 0px 0px;
            text-align: center;
        }
        li{
            padding: 5px 0px;
        }
        li:not(:last-child){
            border-bottom: 1px solid #cccccc;
        }
        .时间{
            color: #929292;
            font-size: 12px;
        }
        .内容1{
            font-size: 13px;
        }
    }

    &::-webkit-scrollbar {
        width:6px;
    }
    /* 滚动槽 */
    &::-webkit-scrollbar-track {
        // -webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
        background: #e8e8e8;
    }
    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
        // background:#2e394d;
        background:var(--color);
        border-radius: 6px;
    }
}

.编辑{
    position: relative;
    background: #ffffff;
    margin: _vw(5) 0px 0px;
    padding: 0px _vw(10);
    .title_1{
        font-size: _vw(14);
        padding: _vw(5);
        border-bottom: 1px solid #eeeeee;
    }
    .list_1{
        display: flex;
        font-size: _vw(14);
        >li{
            width: calc(100% / 2);
            padding: _vw(10);
            box-sizing: border-box;
            >div{
                // box-shadow: 2px 2px 4px 1px #888888;
                // height: _vw(70);
                cursor: pointer;
                border-radius: _vw(30);
                line-height: _vw(30);
                text-align: center;
                transition: all 0.3s;
                &.禁言{
                    border:1px solid red;
                    color: red;
                    &:hover{
                        background: red;
                        color: #ffffff;
                    }
                }
                &.私聊{
                    border: 1px solid #009628;
                    color: #009628;
                    &:hover{
                        background: #009628;
                        color: #ffffff; 
                    }
                }
            }
        }
    }
}


</style>