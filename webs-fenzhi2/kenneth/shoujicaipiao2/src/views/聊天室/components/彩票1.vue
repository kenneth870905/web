<template>
    <li class="item" :class="type">
        <div v-if="type=='left'" class="img_box" @click="会员详情()">
            <i v-if="!obj.ImgId || obj.ImgId=='null'" class="icon iconfont icon-touxiang"></i>
            <img v-if="obj.ImgId && obj.ImgId!='null'" :src="config.img_url+'static/image/touxiang/'+obj.ImgId" alt="">
        </div>
        <div class="cont">
            <p class="time" v-if="type=='left'">
                <template v-if="obj.ChatRole">
                    <img v-if="obj.ChatRole==1" :src="config.api_url+'/App_Upload/ChatVip/管理员.png'" alt="">                    
                    <img v-if="obj.ChatRole==2" :src="config.api_url+'/App_Upload/ChatVip/计划员.png'" alt="">
                </template>
                <template v-else>
                    <img v-if="user.VipImg" :src="config.api_url+'/App_Upload/ChatVip/'+obj.Vip+'.png'" alt="">
                    <span v-if="!user.VipImg">{{obj.Vip}}</span>
                </template>
                <span v-if="obj.Nickname">{{obj.Nickname}}</span>
                <span v-if="!obj.Nickname">{{obj.MemberId}}</span>
                <span class="命中率">投注命中率<b>{{Content.WinRate}}%</b></span>
                <!-- <span class="点赞">
                    50
                    <i class="icon iconfont icon-dianzan"></i>
                </span> -->
            </p>
            
            <p class="time mui-text-right" v-if="type=='right'">
                <!-- <span class="点赞">
                    <i class="icon iconfont icon-dianzan"></i>
                    50
                </span> -->
                <span class="命中率">投注命中率<b>{{Content.WinRate}}%</b></span>
                <span v-if="obj.Nickname">{{obj.Nickname}}</span>
                <span v-if="!obj.Nickname">{{userinfo.UserId}}</span>
                <template v-if="obj.ChatRole">
                    <img v-if="user.ChatRole==1" :src="config.api_url+'/App_Upload/ChatVip/管理员.png'" alt="">                    
                    <img v-if="user.ChatRole==2" :src="config.api_url+'/App_Upload/ChatVip/计划员.png'" alt="">
                </template>
                <template v-else>
                    <span v-if="!user.VipImg">{{obj.Vip}}</span>
                    <img v-if="user.VipImg" :src="config.api_url+'/App_Upload/ChatVip/'+obj.Vip+'.png'" alt="">
                </template>
            </p>
            <div class="msg" @touchstart="touchstart_1($event)" @touchend="touchend_1()">
                <div class="跟单">
                    <div class="header1">
                        <div><img :src="config.img_url+'static/image/home/caipiao/'+Content.LotteryCode+'.png'"></div>
                        <div>
                            <div>{{Content.LotteryName}}</div>
                            <div>期号: {{Content.IssueCode ? Content.IssueCode.substring(Content.IssueCode.length-3) : '--'}}期</div>
                        </div>
                        <div>玩法:<span> {{Content.MethodName}}</span></div>
                    </div>
                    <ul class="投注信息">
                        <li>
                            <div>{{Content.Content}}</div>
                            <div>投注内容</div>
                        </li>
                        <li>
                            <div>{{Content.Amount}}</div>
                            <div>投注金额</div>
                        </li>
                    </ul>
                    <div class="btn_1">
                        <button :class="{'active':type=='right'}" @click="跟单()">跟单</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div v-if="type=='right'" class="img_box">
            <i v-if="!obj.ImgId || obj.ImgId=='null'" class="icon iconfont icon-touxiang"></i>
            <img v-if="obj.ImgId && obj.ImgId!='null'" :src="config.img_url+'static/image/touxiang/'+obj.ImgId" alt="">
        </div>
    </li>
</template>

<script>
import { mapState , mapActions, mapMutations} from "vuex";
export default {
    name: "",
    props:{
        obj:{
            default(){
                return {}
            }
        }
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            config:'config',
            user:x=>x.聊天室.user,
            userinfo:x=>x.user.userinfo,
            操作:x=>x.聊天室.操作
        }),
        type(){
            return this.obj.OnlineId == this.user.OnlineId ? 'right' : 'left';
        },
        Content(){
            try {
                return JSON.parse(this.obj.Content)
            } catch (error) {
                return {}
            }
        }
    },
    methods: {
        ...mapMutations({
            设置key:'聊天室/设置key'
        }),
        ...mapActions({
            获取跟单信息:'聊天室/获取跟单信息',
            点击会员详情:'聊天室/点击会员详情'
        }),     
        跟单(){
            this.获取跟单信息(this.obj)
        },  
        会员详情(){
            this.点击会员详情(this.obj)
        },
        touchstart_1(e){
            if(this.user.ChatRole!=1){
                return
            }
            console.log('开始拖动',e,e.touches[0].clientX,e.touches[0].clientY);
            this.time=new Date();
            try {
                clearTimeout(this.定时器)
            } catch (error) {}
            this.定时器=setTimeout(() => {
                console.log('长按',this.obj)
                this.操作.obj=this.obj
                this.操作.show=true;
                this.操作.left=e.touches[0].clientX;
                this.操作.top=e.touches[0].clientY;
            }, 1000);
        },
        touchend_1(){
            if(this.user.ChatRole!=1){
                return
            }
            clearTimeout(this.定时器)
        },
    },
}
</script>

<style lang="scss" scoped>

.命中率{
    background: linear-gradient(90deg,#ff2a65,#ff2228);
    line-height: _vw(20);
    border-radius: _vw(20);
    color: #ffffff;
    padding: 0px _vw(10);
    b{
        color: #fffc00;
    }
}


.item.right{
    justify-content: flex-end;
    .time{
        justify-content: flex-end;
        .点赞{
            text-align: left;
        }
    }
}

.item {
     margin: _vw(20) 0px;
    padding:0px _vw(10) 0px _vw(10);
    display: flex;
    .img_box{
        flex-shrink: 0;
        width: _vw(30);
        height: _vw(30);
        margin: 0px _vw(10) 0px _vw(10);
        font-size: _vw(30);
        color: red;
        i{
            line-height: _vw(30);
            display: block;
        }
        img{
            width: 100%;
            height: 100%;
            border-radius: 100%;
            object-fit: cover;
        }
    }
    .time{
        color: #656565;
        font-size: _vw(12);
        display: flex;
        align-items: center;
        // img{
        //     height: _vw(13);
        // }
        span{
            margin: 0px _vw(3);
        }
        .点赞{
            flex: 1;
            text-align: right;
            margin: 0px 5px;
            color: #55b0ff
        }
    }
    .msg{
        font-size: _vw(14);
    }
}

.跟单{
    width: _vw(250);
    font-size: _vw(12);
    box-shadow: 0px 0px 1px 1px #cccccc;
    border-radius: _vw(5);
    .header1{
        display:flex;
        padding: _vw(5);
        align-items: center;
        >div:nth-child(1){
            width: _vw(28);
            height: _vw(28);
            flex-shrink: 0;
            margin: 0px _vw(5) 0px 0px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        >div:nth-child(2){
            flex-grow: 1;
            width: 100%;
        }
        >div:nth-child(3){
            white-space: nowrap;
            flex-shrink: 0;
            span{
                color: #fc7a11;
            }
        }
    }
    .投注信息{
        display: flex;
        text-align: center;
        border-top: 1px solid #eeeeee;
        padding: _vw(10) 0px;
        li{
            width: 50%;
            div:nth-child(1){
                color: #fc7a11;
                padding:0px _vw(5);
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        li:nth-child(2){
            border-left: 1px solid #eeeeee;
        }
    }
    .btn_1{
        button{
            border: 1px solid #fc7a11;
            color: #fc7a11;
            width: 100%;
            border-top-left-radius: 0px;
            border-top-right-radius: 0px;
            &.active{
                border: 1px solid #cccccc;
                color: #656565;
                background: #cccccc;
            }
        }
    }
}
</style>


