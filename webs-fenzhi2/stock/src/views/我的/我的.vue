<template>
    <div>
        <div class="account-top" style="background-image:url('static/image/my/bg_1.png')">
            <p class="title_1">您好{{user.DisplayName}}</p>
            <div class="account-money">
                账户余额
                <br>
                <b class="txt-s2">{{账号余额}}</b>元
            </div>
            <p class="btn_1">
                <span @click="$router.push('/my/recharge')">充值</span>
                <span @click="$router.push('/my/withdrawals')">提现</span> 
            </p>
        </div>

        <ul class="account-list">
            <li @click="$router.push('/my/zhzc')">
                <p class="img_1">
                    <img src="static/image/my/bg_2.png">
                </p>
                <div class="title_1">账户资产</div>
                <span class="red_1">{{账号余额}}</span>
                <span class="text_1">元</span>
                <van-icon name="arrow" />
            </li>
            <li @click="$router.push('/pzjl')">
                <p class="img_1">
                    <img src="static/image/my/bg_3.png">
                </p>
                <div class="title_1">配资订单</div>
                <span class="red_1">0</span>
                <span class="text_1">单</span>
                <van-icon name="arrow" />
            </li>
              <!-- <li @click="$router.push('/generalize')">
                <p class="img_1">
                    <img src="static/image/my/bg_3.png">
                </p>
                <div class="title_1">业务推广</div>
                <van-icon name="arrow" />
            </li> -->
            <li @click="$router.push('/my/zjls')">
                <p class="img_1">
                    <img src="static/image/my/bg_4.png">
                </p>
                <div class="title_1">资金流水</div>
                <van-icon name="arrow" />
            </li>
            <li @click="$router.push('/czjl')">
                <p class="img_1">
                    <img src="static/image/my/bg_5.png">
                </p>
                <div class="title_1">充值记录</div>
                <van-icon name="arrow" />
            </li>
            <li @click="$router.push('/txjl')" class="noborder">
                <p class="img_1">
                    <img src="static/image/my/bg_6.png">
                </p>
                <div class="title_1">提现记录</div>
                <van-icon name="arrow" />
            </li>
            <li>
                <p class="img_1">
                    <img src="static/image/my/bg_7.png">
                </p>
                <div class="title_1"  @click="$router.push('/my/rechargeAutonym')">实名认证</div>
                <span class="text_1">未知</span>
                <van-icon name="arrow" />
            </li>
            <li @click="$router.push('/my/yhk')">
                <p class="img_1">
                    <img src="static/image/my/bg_8.png">
                </p>
                <div class="title_1">银行卡管理</div>
                <span class="text_1">已绑定</span>
                <van-icon name="arrow" />
            </li>
            <li @click="$router.push('/my/dlpassword')">
                <p class="img_1">
                    <img src="static/image/my/bg_9.png">
                </p>
                <div class="title_1">修改密码</div>
                <van-icon name="arrow" />
            </li>
            <li class="noborder" @click="$router.push('/my/zfpassword')">
                <p class="img_1">
                    <img src="static/image/my/bg_9.png">
                </p>
                <div class="title_1">提现密码</div>
                <van-icon name="arrow" />
            </li>
            <li @click="$router.push('/znxx')">
                <p class="img_1">
                    <img src="static/image/my/bg_10.png">
                </p>
                <div class="title_1">站内消息</div>
                 <!-- " v-if="xinxiaoxi" -->
                <div class="number" v-if="xinxiaoxi" @click="查看消息()">未读新消息</div>
                <van-icon name="arrow" />
            </li>
            <li @click="$router.push('/service')">
                <p class="img_1">
                    <img src="static/image/my/bg_11.png">
                </p>
                <div class="title_1">在线客服</div>
                <van-icon name="arrow" />
            </li>
            <li @click="$router.push('/About')">
                <p class="img_1">
                    <img src="static/image/my/bg_14.png">
                </p>
                <div class="title_1">关于我们</div>
                <van-icon name="arrow" />
            </li>
        </ul>
        <div class="退出登录" @click="退出登录()">退出登录</div>
    </div>

</template>

<script> 
import { api_退出 , api_用户余额 } from "@/api/用户.js";
import {  api_更改消息状态为已读 } from "@/api/站内消息.js";
import { mapState,mapGetters} from "vuex";
export default {
    data() {
        return {
            账号余额:"",
            xinxiaoxi:{},
            // showweidu:false,
        }
    },
    components: { // 注册组件

    },
    computed: {
          ...mapGetters({
              user:"user"
        }),
        ...mapState({
            token:"token",
            
        })
    },
    created(){
      this.实时更新消息()
    },
    methods: {
        查看消息(){
            var dataxin=this.xinxiaoxi.msgCode
        //   console.log( dataxin)
          api_更改消息状态为已读(dataxin).then(x=>{
            //   console.log(x.data)
              if(x.data.code==200){
                 this.xinxiaoxi=false
              }else{
                console.log(x.data.msg)
              }
            //   console.log(x.data)
          }).catch(err=>{
              console.login(err)
          })
        },
          实时更新消息(){
                    var _this=this
                    let connection = new signalR.HubConnectionBuilder().withUrl("http://10.10.27.17:8888/PushHub", {
                        accessTokenFactory: () => this.token.access_token
                    }).build();
                       connection.on("PushStock", function (messageData) {
                        // this.zhixuan = messageData
                    })
                    connection.on("sendMessage", function (messageData) {
                   
                          _this.xinxiaoxi=messageData
                          console.log( messageData)
                    })
                 
              
                    //监听连接开始逻辑控制，catch捕获异常回调
                    connection.start().then((res) => {
                        console.log("集线器：连接成功。", res);
                    }).catch((err) => {
                        console.log("集线器：连接失败。", err);
                        //  return console.error(err.toString());
                    });
        },


        退出登录() {
            // window.localStorage.clear()//清除所有token
            api_退出(this.token.refresh_token).then(x=>{
                if(x.data.code==200){
                    this.$toast('退出成功')
                    this.$router.history.push('/');                
                }else{
                    this.$toast(x.data.msg)
                }
            }).catch(err=>{
                this.$toast('网络错误，稍后再试。')
            })
        }
    },
    mounted() {
        api_用户余额().then(x=>{
            // console.log(x)
            if(x.data.code==200){
                this.账号余额=x.data.data.money;
            }
        }).catch(err=>{
            console.log(err);
        })
    },
}


</script>
<style lang="scss" scoped>
.account-top {
    position: fixed;
    z-index: 1;
    top: 0px;
    left: 0px;
    width: 100%;
    padding: 1px 0px;
    font-size: _vw(13);
    background-size: cover;
    .title_1 {
        margin: _vw(20) _vw(10);
    }
    .account-money {
        text-align: center;
        b {
            font-size: _vw(20);
        }
    }
    .btn_1 {
        display: flex;
        margin: _vw(15) 0px 0px;
        background: rgba(255, 255, 255, 0.2);
        span {
            line-height: _vw(40);
            width: 50%;
            text-align: center;
            &:nth-child(1) {
                border-right: 1px solid #acacac;
            }
        }
    }
}

.account-list {
    padding: _vw(166) 0px _vw(20);
    font-size: _vw(13);
    white-space: nowrap;
    li {
        background: #ffffff;
        padding: _vw(10) _vw(20);
        display: flex;
        align-items: center;
        position: relative;
        &:last-child {
            &::after {
                display: none;
            }
        }
        &.noborder {
            margin-bottom: _vw(10);
            &::after {
                display: none;
            }
        }
        &:after {
            position: absolute;
            left: _vw(20);
            right: _vw(20);
            height: 1px;
            content: "";
            background: #dedede;
            bottom: 0px;
        }
        .img_1 {
            flex-shrink: 0;
            margin: 0px;
            width: _vw(28);
            height: _vw(28);
            margin: 0px _vw(10) 0px 0px;
            img {
                width: 100%;
            }
        }
        .title_1 {
            width: 100%;
        }
        .red_1 {
            color: #f00;
            margin: 0px _vw(2) 0px 0px;
        }
        .text_1 {
            color: #999;
        }
        .van-icon-arrow {
            flex-shrink: 0;
            margin: 0px 0px 0px _vw(5);
            font-size: _vw(16);
        }
        .number {
            color:red;
            font-size: _vw(12);
            // height: _vw(14);
            // line-height: _vw(14);
            // background: #f00;
            // color: #ffffff;
            // padding: _vw(0) _vw(5);
            // border-radius: _vw(14);
        }
    }
}

.退出登录 {
    height: _vw(50);
    text-align: center;
    font-size: _vw(20);
    background: #ffffff;
    line-height: _vw(50);
    width: 100%;
    color: red;
}
</style>