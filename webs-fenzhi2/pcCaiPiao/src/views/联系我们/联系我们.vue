<template>
    <div class="container">
        <div class="面包屑">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>联系我们</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row>
            <el-col :span="6">
                <ul class="左侧">
                    <li class="active">联系我们</li>
                    <li @click="$router.push('/helpCenter')">帮助中心</li>
                    <li @click="$router.push('/discounts')">优惠活动</li>
                    <li v-if="站点配置.appUrl" @click="$router.push('/phone')">APP下载</li>
                </ul>
            </el-col>
            <el-col :span="18">
                <div class="右侧">
                    <div class="联系我们">
                        <div class="标题">联系我们</div>
                        <div class="提示1">我们的客服人员一周7天无休，全天24小时为您服务！</div>
                        <ul class="list">
                            <li>
                                <i class="icon iconfont icon-kefu"></i>
                                <div>在线客服</div>
                                <span>：</span>
                                <a class="btn_1" target="_blank" :href="在线客服">点击咨询</a>
                            </li>
                            <li v-if="qq">
                                <i class="icon iconfont iconfont icon-QQ"></i>
                                <div>QQ客服</div>
                                <span>：</span>
                                <a class="a" target="_blank" :href="'https://wpa.qq.com/msgrd?v=3&uin='+qq+'&site=qq&menu=yes'">{{qq}}</a>
                            </li>
                            <li v-if="config.kefu_phone">
                                <i class="icon iconfont icon-dianhua"></i>
                                <div>电话客服</div>
                                <span>：</span>
                                <!-- <span v-popover:popover4 @click="微信客服()" class="btn_1">点击获取二维码</span> -->
                                <span  class="btn_1">{{config.kefu_phone}}</span>
                            </li>
                            <li v-if="config.wx_kefu">
                                <i class="icon iconfont icon-big-WeChat"></i>
                                <div>微信客服</div>
                                <span>：</span>
                                <span v-popover:popover4 @click="微信客服()" class="btn_1">点击获取二维码</span>
                            </li>
                            <li v-if="service_email">
                                <i class="icon iconfont icon-youxiang"></i>
                                <div>客服专员邮箱</div>
                                <span>：</span>
                                <a class="a" :href="'mailto:'+service_email">{{service_email}}</a>
                            </li>
                            <li v-if="toushu_email">
                                <i class="icon iconfont icon-youxiang"></i>
                                <div>投诉建议邮箱</div>
                                <span>：</span>
                                <a class="a" :href="'mailto:'+toushu_email">{{toushu_email}}</a>
                            </li>
                        </ul>
                    </div>
                    <div class="联系我们 技术支持" v-if="技术支持">
                        <div class="标题">技术支持【商务洽谈】</div>
                        <div class="提示1">{{config.title}}平台由【博乐技术团队】独家支持，平台业务洽谈请联系技术负责人。</div>
                        <div class="纸飞机">
                            <i class="icon iconfont icon-bianjiekuaisu"></i>
                            <span>负责人Telegram：</span>
                            <a class="a" target="_blank" :href="(config.telegram && config.telegram.a) ? config.telegram.a : 'javascript:;'">
                                {{config.telegram && config.telegram.number ? config.telegram.number : ''}}
                            </a>
                        </div>
                        <div class="提示2">
                            如果您需要咨询平台方相关事宜，或者事想提供宝贵意见，请联系我们公关部门。
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>

        <el-popover
            popper-class="二维码弹框"
            ref="popover4"
            :disabled="disabled"
            placement="top"
            width="150"  >
            <div class="img_box">
                <img :src="config.api_url+'/App_Upload/wechatkf.jpg'" alt="">
            </div>
        </el-popover>
    
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
    name:"",
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            userInfo:'userInfo',
            config:'config',
            技术支持:'技术支持',
        }),
        ...mapGetters({
            站点配置:'站点配置',
            试玩:"试玩",
        }),
        在线客服(){
            if(this.站点配置.online_chat){
                return this.站点配置.online_chat
            }else{
                return this.config.zaixianUrl          
            }
        },
        qq(){
            if(this.站点配置.qq){
                return this.站点配置.qq
            }else{
                return this.config.QQ          
            }
        },
        service_email(){
            if(this.站点配置.service_email){
                return this.站点配置.service_email
            }else{
                return this.config.service_email          
            }
        },
        toushu_email(){
            if(this.站点配置.toushu_email){
                return this.站点配置.toushu_email
            }else{
                return this.config.toushu_email          
            }
        },
        //禁用二维码
        disabled(){
            if(!this.userInfo.UserId){
                return true
            }else if(this.试玩){
                return true
            }else{
                if(this.userInfo.Ck>=config.ck){
                    return false
                }else{
                    return true
                }
            }
        }
    },
    methods: {
      
        微信客服(){
            if(!this.userInfo.UserId){
                this.$confirm('登录后可查看微信二维码，请先登录?', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                }).catch(() => {});
            }else if(this.试玩){
                this.$message('请使用非试玩账号查看！');
            }else if(this.userInfo.Ck<config.ck){
                this.$confirm('充值少于'+config.ck+'次无法显示，是否现在去充值?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    window.open(config.api_url+'/Members/Money/Recharge')
                }).catch(() => {});
            }
        }
    },
    mounted() {
        
    },
}
</script>

<style lang="scss" scoped>
.二维码弹框{
    height: 150px;
    .img_box{
        margin: -15px;
    }
    img{
        width: 100%;
        height:100%;
    }
}
.内容{
    display: flex;
}
.面包屑{
    height: 42px;
    background: #f6f6f6;
    display: flex;
    padding: 0px 10px;
    align-items: center;
    margin: 0px 0px 20px 0px;
}

.左侧{
    li{
        line-height: 60px;
        text-align: center;
        background: #f6f6f6;
        margin: 0px 0px 10px 0px;
        border-left: 10px solid #f6f6f6;
        cursor: pointer;
        &.active{
            border-left: 10px solid #e94335;
        }
        &:hover{
            background: #cccccc;
            border-left: 10px solid #e94335;
        }
    }
}

.右侧{
    margin: 0px 0px 0px 10px;
    background: #f6f6f6;
}

.技术支持{

}
.联系我们{
    .标题{
        line-height: 60px;
        padding: 0px 0px 0px 20px;
        border-bottom: 1px solid #e4e4e4;
        color: #333;
        font-weight: bold;
    }
    .提示1{
        color: #e94335;
        font-size: 14px;
        padding: 10px 20px;
        letter-spacing: 3px;
    }
    .list{
        border-bottom: 5px solid #ffffff;
        padding: 0px 20px 0px 30px;
        min-height: 200px;
        li{
            padding: 12px 0px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #dedede;
            i{
                font-size: 18px;
                margin: 0px 10px 0px;
                &.icon-kefu{
                    color: red;
                }
                &.icon-QQ{
                    color: #222
                }
                &.icon-big-WeChat{
                    color: #3cb034
                }
                &.icon-youxiang{
                    color: #9c9c9c;
                }
            }
        }
        div{
            
            // width: 100px;
            // text-align: justify;
            height: 22px;
            overflow: hidden;
            // &:after {
            //     content: "";
            //     display: inline-block;
            //     width: 100%;
            // }
        }
        .a{
            font-size: 14px;
            color: #6b6b6b;
            &:hover{
                color: #e94335;
            }
        }
        .btn_1{
            font-size: 14px;
            color: #2258bd;
            cursor: pointer;
            &:hover{
                color: #0059ff;
            }
        }
    }
    .纸飞机{
        padding: 20px 30px;
        i{
            font-size: 18px;
            margin: 0px 10px 0px;
            &.icon-bianjiekuaisu{
                color: #1296db;
            }
        }
        a{
            font-size: 16px;
            color: #e94335;
            font-weight: bold;
        }
    }
    .提示2{
        padding: 10px 10px 20px 20px;
        color: #484848;
    }
}
</style>
