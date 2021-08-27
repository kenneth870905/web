<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a> -->
            <a @click="返回()" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">合买详情</h1>
            <span @click="分享()">分享</span>
        </header>
        <div class="mui-content">

            <div class="分享弹框" v-if="显示分享">
                <div class="分享">
                    <div class="关闭" @click="显示分享=false">
                        <i class="icon iconfont icon-guanbi1"></i>
                    </div>
                    <div class="提示1 红色字体 mui-text-center">
                        复制链接或扫描二维码
                        <br>
                        分享给好友参与合买
                    </div>
                    <textarea ref="textarea" @focus="focusUrl" @input="initUrl" class="分享地址">{{分享地址}}</textarea>
                    <div class="二维码" >
                        <img :src="二维码">
                    </div>
                    <div class="mui-text-center 提示2">扫描或长按保存</div>
                </div>
            </div>
            

            <div class="二维码容器" ref="二维码容器">
                <div ref="qrcode"></div>
                <div>
                    <img v-if="obj.Result" :src="config.img_url+'static/image/home/caipiao/'+obj.Result.LotteryCode+'.png'" />
                </div>
            </div>

            <div class="彩票">
                <div class="img_1">
                    <img v-if="obj.Result" :src="config.img_url+'static/image/home/caipiao/'+obj.Result.LotteryCode+'.png'" />
                </div>
                <div class="title_1">{{obj.Result ? obj.Result.LotteryName : ''}}</div>
                <div class="期数">第 {{obj.Result ? obj.Result.IssueCode : ''}} 期</div>
                <div class="待开奖" v-if="!obj.Result || !obj.Result.Content">待开奖</div>
                <ul class="开奖号码" v-else>
                    <li v-for="(item, index) in 开奖号码" :key="index">
                        <div class="号码" :class="marSixNums.nums[item].color">{{item}}</div>
                        <div class="生肖">{{marSixNums.nums[item].sx}}</div>
                    </li>
                </ul>
            </div>

            <div class="btn_1" v-if="!userinfo.UserId" @click="$router.push('/login')">
                <button class="mui-btn mui-btn-block mui-btn-primary">登录参与</button>
            </div>

            <div v-if="userinfo.UserId && !obj.IsMy && !this.obj.IsEnd && !obj.IsBuy">
            <!-- <div v-if="userinfo.UserId && !obj.IsMy"> -->
                <ul class="mui-table-view list">
                    <li class="mui-table-view-cell">
                        <label>账号余额</label>
                        <div class="row-content">{{userinfo.Money}}</div>
                    </li>
                    <li class="mui-table-view-cell">
                        <label>参与金额</label>
                        <div class="row-content">
                            <input type="text" v-model="amount" :placeholder="'参与金额最小'+obj.MinMoney">
                        </div>
                    </li>
                </ul>
                <div class="btn_2">
                    <button @click="参与合买()" class="mui-btn mui-btn-primary">参与合买</button>
                    <button @click="$router.push('/my/chongzhi')" class="mui-btn mui-btn-danger">存款充值</button>
                </div>
            </div>
            
            <ul class="mui-table-view list">
				<li class="mui-table-view-cell">
                    <label>合买单号</label>
                    <div class="row-content">{{obj.Code}}</div>
				</li>
				<li class="mui-table-view-cell">
                    <label>合买内容</label>
                    <div class="row-content">
                        {{obj.Content}}
                        <span v-if="obj.IsMy">（{{obj.Hide ? '隐藏':"公开"}}）</span>
                        <span class="红色字体" @click="切换公开()" v-if="obj.IsMy">切换</span>
                        <span class="红色字体" v-if="!obj.IsMy && obj.Hide">参与后可查看</span>
                    </div>
                </li>
				<li class="mui-table-view-cell">
                    <label>截至时间</label>
                    <div class="row-content">{{obj.ResultDatetime}} <span class="红色字体" v-if="obj.IsEnd">(已截至)</span></div>
                </li>
				<li class="mui-table-view-cell">
                    <label>赔率信息</label>
                    <div class="row-content">{{obj.UpdateOdds}}</div>
				</li>
            </ul>

            <ul class="参与信息 mui-text-right">
                <!-- <li class="红色字体">已参加人数：{{obj.OrderCount}} 人</li> -->
                <li>
                    共{{ obj.IsBuy ? obj.OrderCount : '***'}}人,
                    金额：{{obj.OrderAmount ? obj.OrderAmount : '****'}},
                    中奖：{{obj.OrderResult ? obj.OrderResult : '****'}}
                </li>
            </ul>
            <ul class="mui-table-view 下单信息" v-if="obj.IsBuy && obj.Orders">
				<li class="mui-table-view-cell" v-for="(item, index) in obj.Orders" :key="index">
                    <div>
                        <div class="user">{{item.MemberId}}</div>
                        <div class="time">{{item.Createtime}}</div>
                    </div>
                    <div class="mui-text-right">
                        <div class="未结算" v-if="item.ResultMoney=='未结算'">
                            <i class="icon iconfont icon-dengdai"></i>
                            未结算
                        </div>
                        <div class="未中奖" v-else-if="item.ResultMoney=='未中奖'">
                            <i class="icon iconfont icon-guanbi1"></i>
                            未中奖
                        </div>
                        <div v-else-if="!item.ResultMoney">
                            <i class="icon iconfont icon-libao"></i>
                            ****
                        </div>
                        <div class="中奖" v-else>
                            <i class="icon iconfont icon-libao"></i>
                            {{item.ResultMoney}}
                        </div>
                    </div>
				</li>
            </ul>

             <ul class="mui-table-view" v-if="!obj.IsBuy">
				<li class="mui-table-view-cell mui-text-center">
                    参与后可查看人数
				</li>
            </ul>

        </div>
    </div>
</template>

<script>
import { api_获取合买详情 , api_修改合买是否公开 , api_参与合买} from "@/api/游戏彩票接口.js";

import html2canvas from "html2canvas";
import QRCode from 'qrcodejs2'

import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    name:"",
    data() {
        return {
            显示分享:false,
            二维码:"",
            code:"",
            obj:{},
            分享地址:"",
            amount:""
        }
    },
    computed: {
        ...mapState({
            config:"config",
            userinfo:x=>x.user.userinfo,
            marSixNums:'marSixNums',
        }),
        开奖号码(){
            var list=[]
            if(this.obj.Result){
                list= this.obj.Result.Content.split('|');
            }
            return list
        }
    },
    methods: {
        ...mapMutations({
            '加载中':"加载中"
        }),
        ...mapActions({
            getUserInfo:'user/getUserInfo'
        }),
        参与合买(){
            if(!this.amount){
                this.$toast('请输入金额')
                return
            }else if(this.obj.MinMoney && this.obj.MinMoney>0 && this.amount < this.obj.MinMoney){
                this.$toast('最小参与金额为'+this.obj.MinMoney);
                return
            }else if(parseFloat(this.amount) > parseFloat(this.userinfo.Money)){
                this.$toast('账号余额不足');
                return
            }
            mui.confirm('确认要参与当前合买吗', '合买', ['取消', '参与'],(e)=>{
                if(e.index==0){
                    return
                }
                this.加载中(true)
                var obj={teamBuyId:this.obj.Id,amount:this.amount}
                api_参与合买(obj).then(x=>{
                    if(x.data.code==0){
                        this.$toast('参与成功!');
                        this.获取合买详情();
                        this.getUserInfo()
                    }else{
                        this.$toast(x.data.msg);
                    }
                    this.加载中(false)
                }).catch(err=>{
                    this.加载中(false)
                    this.$toast('系统错误，稍后再试!');
                })    
            })
        },
        切换公开(){
            var str="";
            if(this.obj.Hide){
                str='确认公开合买内容吗？<br>所有人可查看下注内容'
            }else{
                str='确认隐藏合买内容吗？<br>未参与者将无法查看下注内容'
            }
            mui.confirm(str, '提示', ['取消', '确定'], (e)=>{
                if (e.index == 1){
                    this.加载中(true)
                    api_修改合买是否公开({teamBuyId:this.obj.Id}).then(x=>{
                        this.获取合买详情();
                        this.getUserInfo();
                        this.加载中(false)
                    }).catch(err=>{
                        console.log(err);
                        this.$toast('系统错误，稍后再试')
                        this.加载中(false)
                    })
                }
            })
        },
        返回(){
            if(this.$route.query.s){
                if(this.userinfo.UserId){
                    this.$router.push('/my')
                }else{
                    this.$router.push('/home/home');
                }
            }else{
                history.back();
            }
        },
        分享(){
            this.显示分享=true;
            // $(this.$refs.textarea).val('http://10.10.27.150:8080/#/my/hmxq/22B0A80EDCDC443').focus();
            $(this.$refs.textarea).focus();
            this.focusUrl();
            if(this.二维码){
                return
            }
            this.加载中(true)
            this.$nextTick(()=>{
                var el = this.$refs.qrcode;
                    el.innerHTML = "";
                    let qrcode1 = new QRCode(el, {
                        width: 200,
                        height: 200, // 高度  [图片上传失败...(image-9ad77b-1525851843730)]
                        text: this.分享地址 , // 二维码内容
                        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                        background: "#fff",
                        foreground: "#fff"
                    });
                    const el1 = this.$refs.二维码容器;
                    const options = {
                        useCORS: true,
                        logging: false,
                        scale:2
                    };
                    setTimeout(() => {
                        html2canvas(el1, options).then(canvas => {
                            this.二维码 = canvas.toDataURL();
                        },{ useCORS: true });
                        this.加载中(false);
                    }, 200);
            })
        },
        focusUrl() {
            var self = this;
            setTimeout(() => {
                var nativeEl = this.$refs.textarea;
                if (nativeEl) {
                    if (nativeEl.setSelectionRange) {
                        try {
                            nativeEl.setSelectionRange(0, nativeEl.value.length);
                        } catch (e) {
                            nativeEl.select();
                        }
                    }
                    nativeEl.select();
                }
                this.$refs.textarea.setSelectionRange(0, 9999);
            }, 10);
        },
        initUrl () {
            var $url = $(this.$refs.textarea);
            $url.val(this.分享地址).focus();
        },
        获取合买详情(){
            api_获取合买详情(this.code).then(x=>{
                this.obj=x.data
                this.加载中(false)
            }).catch(err=>{
                this.加载中(false)
                this.$toast('系统错误，稍后再试！')
            })
        }
    },
    mounted() {
        this.加载中(true)
        this.code=this.$route.params.id;
        this.分享地址=location.origin+location.pathname+'#/my/hmxq/'+this.code+'?s=1'
        // console.log(this.$route.params.id)
        this.获取合买详情()
        
    },
}
</script>

<style lang="scss" scoped>
.btn_2{
    padding: _vw(10);
    display: flex;
    justify-content: space-between;
}
.二维码容器{
    position: fixed;
    top: -100%;
    width: _vw(160);
    height: _vw(160);
    background: #ffffff;
    >div:nth-child(1){
        width: 100%;
        height: 100%;
        padding: 2px;
        /deep/ img{
            width: 100%;
        }
    }
    >div:nth-child(2){
        position: absolute;
        width: _vw(20);
        height: _vw(20);
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        margin: auto;
        img{
            width: 100%;
        }
    }
}


.mui-bar-nav{
    span{
        padding: 0px 10px;
        color: #ffffff;
        line-height: 44px;
        position: absolute;
        top: 0px;
        right: 0px;
    }
}

.分享弹框{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background: rgba(0,0,0,0.3);
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
}

.分享{
    width: 80%;
    padding: _vw(20) 0px;
    background: #ffffff;
    // padding: _vw(15) 0px 0px;
    position: relative;
    .关闭{
        position: absolute;
        top: _vw(-40);
        right: 0px;
        width: _vw(25);
        height: _vw(25);
        font-size: _vw(25);
        color: #ffffff;
        i{
            display: block;
        }
        &:after{
            position: absolute;
            width: 1px;
            height: _vw(25);
            background: #ffffff;
            content: "";
            top: _vw(25);
            left: 0px;
            right: 0px;
            margin: auto;
        }
    }
    .img_1{
        position: absolute;
        width: _vw(30);
        height: _vw(30);
        img{
            width: 100%;
            height: 100%;
        }
    }
    .二维码{
        width: 160px;
        height: 160px;
        margin: 30px auto;
        /deep/ img{
            width: 100%;
        }
    }
    .提示1{
        font-size: _vw(14);
    }
    .分享地址{
        display: block;
        width: 90%;
        padding: _vw(10);
        background: #ffffff;
        margin: _vw(10) auto;
        font-size: _vw(12);
        word-break: break-all;
    }
    .提示2{
        color: #8f8f94;
        font-size: _vw(14);
    }
}


.彩票{
    padding: _vw(20);
    text-align: center;
    font-size: _vw(14);
    .img_1{
        width: _vw(70);
        height: _vw(70);
        margin: 0px auto;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .期数{
        color: #8f8f94;
    }
    .待开奖{
        color: $color;
        font-weight: bold;
    }
    .开奖号码{
        display: flex;
        justify-content: center;
        li{
            margin: 0px _vw(2);
        }
        .号码{
            width: _vw(20);
            height: _vw(20);
            line-height: _vw(20);
            // background: red;
            border-radius: 100%;
            color: #ffffff;
            font-size: _vw(12);
            &.红{
                background: red;
            }
            &.蓝{
                background: #007fff
            }
            &.绿{
                background: #34c604
            }
        }

    }
}

.btn_1{
    padding: 0px _vw(10);
    button{
        padding: _vw(10);
        font-size: _vw(14);
    }
}

.list{
    font-size: _vw(14);
    .mui-table-view-cell{
        display: flex;
        align-items: center;
    }
    label{
        width:_vw(100);
    }
    input{
        margin: 0px;
        padding: 0px;
        height: auto;
        border: none;
    }
}

.红色字体{
    color: $color;
}

.参与信息{
    padding: _vw(10);
    font-size: 14px;
}

.下单信息{
    .mui-table-view-cell{
        display: flex;
        align-items: center;
        font-size: _vw(14);
        >div{
            width: 50%;     
            flex-grow: 1;
            white-space: nowrap;
            flex-grow: 1;
        }
        .user{
            font-weight: bold;
        }
        .time{
            color: #8f8f94;
            font-size: _vw(12);
        }
        .未结算{
            color: #28a745;    
        }
        .中奖{
            color: $color;
        }
    }
}


</style>
