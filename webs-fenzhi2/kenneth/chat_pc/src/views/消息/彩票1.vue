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
            </p>
            
            <p class="time mui-text-right" v-if="type=='right'">
                <span class="命中率">投注命中率<b>{{Content.WinRate}}%</b></span>
                <span v-if="obj.Nickname">{{obj.Nickname}}</span>
                <span v-if="!obj.Nickname">{{userinfo.UserId}}</span>

                <template v-if="user.ChatRole">
                    <img v-if="user.ChatRole==1" :src="config.api_url+'/App_Upload/ChatVip/管理员.png'" alt="">                    
                    <img v-if="user.ChatRole==2" :src="config.api_url+'/App_Upload/ChatVip/计划员.png'" alt="">                    
                </template>
                <template v-else>
                    <span v-if="!user.VipImg">{{obj.Vip}}</span>
                    <img v-if="user.VipImg" :src="config.api_url+'/App_Upload/ChatVip/'+obj.Vip+'.png'" alt="">
                </template>
            </p>
            <div class="msg">
                <div class="跟单" @contextmenu="contextmenu_1">
                    <div class="header1">
                        <div><img :src="'static/image/home/caipiao/'+Content.LotteryCode+'.png'"></div>
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
            userinfo:'userinfo',
            聊天室state:x=>x.聊天室,
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
            点击会员详情:"聊天室/点击会员详情"
        }),     
        跟单(){ 
            this.获取跟单信息(this.obj)
        },       
        会员详情(){
            this.点击会员详情(this.obj)
        },
        contextmenu_1(e){
            if(this.user.ChatRole!=1){
                return
            }
            // console.log('点击',e);
            this.操作.obj=this.obj
            this.操作.top=e.y;
            this.操作.left=e.x
            this.操作.show=true;
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        }
    },
}
</script>

<style lang="scss" scoped>

.命中率{
    background: linear-gradient(90deg,#ff2a65,#ff2228);
    line-height: 20px;
    border-radius: 20px;
    color: #ffffff;
    padding: 0px 10px;
    b{
        color: #fffc00;
    }
}

.right{
    justify-content: flex-end;
    .time{
        justify-content: flex-end;
    }
}

.item {
     margin: 20px 0px;
    padding:0px 10px 0px 10px;
    display: flex;
    .img_box{
        flex-shrink: 0;
        width: 30px;
        height: 30px;
        margin: 25px 10px 0px 10px;
        font-size: 30px;
        color: red;
        cursor: pointer;
        i{
            line-height: 30px;
            display: block;
            font-size: 30px;
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
        display: flex;
        align-items: center;
        // img{
        //     height: _vw(13);
        // }
        span{
            margin: 0px 3px;
        }
    }
    .msg{
        padding: 5px 10px;
    }
}

.跟单{
    width: 400px;
    box-shadow: 0px 0px 6px 0px #cccccc;
    border-radius: 10px;
    .header1{
        display:flex;
        padding: 10px;
        align-items: center;
        >div:nth-child(1){
            width: 40px;
            height: 40px;
            flex-shrink: 0;
            margin: 0px 5px 0px 0px;
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
        padding: 20px 0px;
        li{
            width: 50%;
            div:nth-child(1){
                color: #fc7a11;
                padding:0px 5px;
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
            height: 35px;
            cursor: pointer;
            border-top-left-radius: 0px;
            border-top-right-radius: 0px;
            background: none;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            outline: none;
            transition: all 0.3s;
            background: #ffffff;
            &.active{
                border: 1px solid #cccccc;
                color: #656565;
                background: #cccccc;
            }
            &:not(.active):hover{
                background: #fc7a11;
                color: #ffffff;
            }
        }
    }
}
</style>


