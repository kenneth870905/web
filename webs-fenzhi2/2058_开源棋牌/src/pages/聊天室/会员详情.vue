<template>
    <div class="会员详情">
        <div class="内容">
            <div class="关闭" @click="设置key(['显示会员详情',false])">
                <!-- <van-icon name="clear" /> -->
                <i class="van-icon van-icon-clear" ></i>
            </div>
            <div class="header_1">
                <div class="img_box">
                    <img v-if="选中会员.ImgId && 选中会员.ImgId!='null'" :src="config.img_url+'image/touxiang/'+选中会员.ImgId" alt="">
                    <img v-if="!选中会员.ImgId || 选中会员.ImgId=='null'" :src="config.img_url+'image/touxiang/wutu.jpg'" alt="">
                </div>
                <div class="text_1">
                    <div><span class="title_1">账号：</span>{{选中会员.MemberId}}</div>
                    <div><span class="title_1">昵称：</span>{{选中会员.Nickname}}</div>
                    <div><span class="title_1">等级：</span>{{选中会员.Vip}}</div>
                </div>
            </div>

            <ul class="财产" @click="$toast('暂未开放')">
                <li>
                    <div>存款</div>
                    <div>{{会员详情.存取.DepositAmount}}</div>
                </li>
                <li>
                    <div>存款次数</div>
                    <div>{{会员详情.存取.DepositCount}}</div>
                </li>
                <li>
                    <div>取款</div>
                    <div>{{会员详情.存取.WithdrawAmount}}</div>
                </li>
                <li>
                    <div>取款次数</div>
                    <div>{{会员详情.存取.WithdrawCount}}</div>
                </li>
            </ul>

            <div class="发言记录">
                <div class="title_1">最近发言 <span class="more"></span></div>
                <ul class="list_1">
                    <li class="无记录" v-if="会员详情.msglist.length==0">暂无发言记录</li>
                    <li v-for="(item, index) in 会员详情.msglist" :key="index">
                        <div class="time_1">{{item.Createtime}}</div>
                        <div class="发言">{{item.Content}}</div>
                    </li>
                </ul>
            </div>
            <div class="编辑">
                <!-- <div class="title_1">管理</div> -->
                <ul class="list_1">
                    <li><div class="禁言" @click="禁言()">{{会员详情.是否禁言 ? '解除禁言' : '禁言'}}</div></li>
                    <!-- <li><div @click="$toast('暂未开放')">权限提升</div></li> -->
                    <li><div class="解除" @click="进入私聊()">私聊</div></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { api_禁言 } from "@/api/聊天室接口.js";
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    name:"",
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState({
            config:'config',
            选中会员:x=>x.聊天室.选中会员,
            会员详情:x=>x.聊天室.会员详情
        })
    },
    created(){
        if(!this.选中会员.MemberId){
            history.back();
        }
    },
    methods: {
        ...mapMutations({
            加载中:"加载中",
            设置key:'聊天室/设置key'
        }),
        ...mapActions({
            用户是否禁言:"聊天室/用户是否禁言"
        }),
         进入私聊(){
            // var a = this.MessageInfo.find(x=>x.SenderProfile.Code==this.选中会员.OnlineId);
            // if(!a){
            //     var obj = {
            //         "PrivateMessages":[],
            //         "SenderProfile":{
            //             "MemberId": this.选中会员.MemberId ,
            //             "ImgId":this.选中会员.ImgId ,
            //             "Nickname": this.选中会员.Nickname ,
            //             "Code": this.选中会员.OnlineId
            //         },
            //         "未读":0
            //     }
            //     this.MessageInfo.push(obj);
            // }
            this.设置key(['显示会员详情',false])
            this.$router.push('/privateChat?Code='+this.选中会员.OnlineId)            
        },
        禁言(){
            this.加载中(true)
            var obj={
                    // targetMemberId:"",
                    // guid:this.选中会员.Guid,
                    onlineId:this.选中会员.OnlineId,
                    isMute: !this.会员详情.是否禁言
                }
            // var obj=Object.assign({},this.选中会员);
            //     obj.isMute=false
            api_禁言(obj).then(x=>{
                this.用户是否禁言()
                if(x.data.code==0){
                    this.$toast('设置成功')
                }else{
                    this.$toast(x.data.msg)
                }
                this.加载中(false);
            }).catch(err=>{
                this.$toast('系统错误，稍后再试')
            })
        }
    },
}
</script>

<style lang="scss" scoped>
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
}

.会员详情{
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
}

.内容{
    background: #ffffff;
    width: _vw(300);
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
    flex-wrap: wrap;
    >li{
        width: 50%;
        text-align: center;
        padding: _vw(5) 0px;
        &:nth-child(2n){
            border-left: 1px solid #e4e4e4;
        }
        &:nth-child(1),
        &:nth-child(2){
            border-bottom: 1px solid #e4e4e4;
        }
        >div:nth-child(1){
            font-size: _vw(14);
        }
        >div:nth-child(2){
            font-size: _vw(13);
            margin-top: _vw(5);
            font-weight: bold;
            @include textcolor;
        }
    }
}

.发言记录{
    margin: _vw(5) 0px 0px 0px;
    padding:0px _vw(10);
    background: #ffffff;
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
    .title_1{
        font-size: _vw(14);
        padding: _vw(5);
        border-bottom: 1px solid #eeeeee;
        @include textcolor;
        .more{
            float: right;
            @include textcolor;            
        }
    }
    .list_1{
        // min-height: _vw(150);
        height: _vw(150);
        overflow: auto;
        
        .无记录{
            text-align: center;
            font-size: _vw(12);
            padding: _vw(30) 0px 0px;
            text-align: center;
            color: #929292;
        }
        li:not(.无记录){
            padding: _vw(5) 0px;
            border-bottom: 1px solid #eeeeee;
        }
        .time_1{
            color: #929292;
            font-size: _vw(12);
        }
        .发言{
            font-size: _vw(13);
        }
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
            width: 50%;
            padding: _vw(10);
            box-sizing: border-box;
            >div{
                // box-shadow: 2px 2px 4px 1px #888888;
                // height: _vw(70);
                border-radius: _vw(30);
                line-height: _vw(30);
                text-align: center;
                &.禁言{
                    border:1px solid red;
                    color: red;
                }
                &.解除{
                    border: 1px solid #009628;
                    color: #009628;
                }
            }
        }
    }
}

</style>