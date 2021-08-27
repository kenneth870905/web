<template>
    <li class="item left" :class="type">
        <div  class="img_box">
            <!-- <img v-if="obj.MemberId=='计划员'" :src="config.img_url+'static/image/touxiang/GLJL4.png'"> -->
            <template v-if="obj.MemberId=='计划员'">
                <img v-if="obj.ImgId" :src="config.img_url+'static/image/touxiang/'+obj.ImgId">                
                <img v-else  :src="config.img_url+'static/image/touxiang/GLJL1.png'">                
            </template>
            <i v-if="obj.MemberId!='计划员'" class="icon iconfont icon-kefu"></i>
        </div>
        <div class="cont">
            <p class="time">
                <!-- <img v-if="obj.MemberId == '计划员'" :src="config.api_url+'/App_Upload/ChatVip/计划员.png'" > -->
                <!-- <span>{{obj.MemberId == '计划员' ? '十拿九稳' : obj.MemberId}}</span> -->
                <span class="time_1">{{obj.Createtime}}</span>
            </p>
            <div class="msg">
                <div class="一键计划">
                    <div class="header_1">
                        <img :src="config.img_url+'static/image/liaotian/follow-bg.png'">
                    </div>
                    <div class="text1" v-if="!contentObj">{{obj.Content}}</div>
                    <div class="text2" v-if="contentObj">
                        <div class="title_1">【精准计划-{{contentObj.Title}}】</div>
                        <ul>
                            <li v-if="index+config.jihuaMax>=contentObj.Data.length || !config.jihuaMax" class="item_1" v-for="(item, index) in contentObj.Data" :key="index">
                                <div class="">
                                    <!-- <div>{{item.IssueCode.substring(item.IssueCode.length-3)}}期</div> -->
                                    <div>
                                        <template v-if="item.ShowIssueCode">
                                            {{item.ShowIssueCode}}
                                        </template>
                                        <template v-else>
                                            {{item.IssueCode.substring(item.IssueCode.length-3)}}
                                        </template>
                                        期
                                    </div>
                                    <div>{{contentObj.Method}}:</div>
                                    <div class="计划号">
                                        <span :class="{'中奖':item.Result==item1}" v-for="(item1, index1) in item.Plan.split('|')" :key="index1">{{item1}}</span>
                                        <span v-if="item.Content">
                                            {{item.IsWin ? '中':'挂'}}
                                        </span>
                                        <span v-else>等</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div class="开奖号码" v-if="最后一期">
                            {{最后一期}}
                        </div>
                        <!-- <div class="footer_1">{{contentObj.Method}}计划：依据历史走势为依据，选出一则号码进行预测。未中奖以1/3/9/27/81倍投注，中奖恢复1倍投注。</div> -->
                    </div>
                    <div class="btn1" @click="跟投()">
                        一键跟单
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
import { api_获取计划时间 } from "@/api/聊天室接口.js";
import { mapState , mapMutations } from "vuex";
export default {
    name: "",
    props:{
        obj:{
            default(){
                return {}
            }
        }
    },
    computed: {
        ...mapState({
            config:'config',
            跟单:x=>x.跟单

        }),
        最后一期(){
            if(!this.contentObj){
                return ''
            }
            if(this.contentObj.Data.length<2) return
            var o = this.contentObj.Data[this.contentObj.Data.length-2];
            var IssueCode = o.IssueCode.substring(o.IssueCode.length-3);
            var n = o.Content.replace(/\|/g,',');
            return `${IssueCode}期开奖号码：${n}` 
        },
        contentObj(){
            try {
                return JSON.parse(this.obj.Content)
            } catch (error) {
                return '';                
            }
        },
    },
    data() {
        return {
            type:'left'
        }
    },
    methods: {
        ...mapMutations({
            加载中:"加载中"
        }),
        async 跟投(){
            if(!this.contentObj){
                this.$toast('无跟单详情');
                return
            }
            
            var l =  this.contentObj.Data[0]
            var IssueCode = l.IssueCode.split(',');
                IssueCode = IssueCode[IssueCode.length-1];
            let q = {
                    lotteryCode:this.contentObj.Code,
                    issueCode:IssueCode
                }
            this.加载中(true)
            try {
                var r = await api_获取计划时间(q)   
            } catch (error) {
                this.失败提示('系统错误稍,后再试');
                this.加载中(false)
                return
            }
            this.加载中(false)

            var obj = {
                    Content: l.Plan.replace(/\|/g,','),        //投注内容
                    Id:"",
                    IssueCode: IssueCode,
                    LotteryCode: this.contentObj.Code,
                    LotteryName: this.contentObj.Title,
                    MethodName: this.contentObj.Method,
                    Nums: this.contentObj.Order.Codes.length ,
                    Price: 2,
                    Timer: r.data.Timer,
                    //================================
                    Codes: this.contentObj.Order.Codes,
                    MethodCode: this.contentObj.Order.MethodCode
                }
            console.log(obj);
            this.跟单.跟单彩票.show = true;
            this.跟单.跟单彩票.obj = obj;
            this.跟单.type = 1;

        }
    },
}
</script>

<style lang="scss" scoped>
.right{
    justify-content: flex-end;
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
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
        }
        color: #73a73f;
        font-size: _vw(30);

        // @include textcolor;
        i{
            line-height: _vw(30);
            display: block;
        }
    }
    .time{
        color: #4e4e4e;
        font-size: _vw(14);
        span{
            margin: 0px 3px;
        }
        .time_1{
            font-size: _vw(12);
            color: #969696;
        }
    }
}

@mixin style1{
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    font-size: _vw(14);
    background-clip: padding-box,border-box;
    background-origin: padding-box,border-box;
    background-image: linear-gradient(0deg,#fff,#fff),linear-gradient(90deg,#a32dd8,#3180fd);
    border: 2px solid transparent;
    color: #7d49e4;
}

.一键计划{
    // width: _vw(250);
    width: _vw(260);
    .header_1{
        font-size: 0px;
        img{
            width: 100%;
        }
    }
    .text1{
        white-space: pre-wrap;
        word-break: break-all;
        padding: _vw(10);
        @include style1;
    }
    .text2{
        @include style1;
        padding: _vw(10) _vw(5) _vw(15);
        .title_1{
            text-align: center;
            margin: 0px 0px _vw(10);
        }
        .item_1{
            >div{
                margin: _vw(3) 0px;
                display: flex;
                flex-wrap: wrap;
                div{
                    margin: 0px 3px;
                }
            }
            .计划号{
                display: flex;
                span{
                    width: 20px;
                    height: 20px;
                    text-align: center;
                    line-height: 20px;
                }
                .中奖{
                    // color: red;
                    border-radius: 100%;
                    border: 1px solid red;
                }
            }
            .开奖号码{
                font-size: _vw(13);
            }
        }
        .开奖号码{
            display: flex;
            font-size: _vw(13);
            margin: 15px 3px 0px;
        }
        .footer_1{
            margin: 15px 3px 0px;
        }
    }
    .btn1{
        background-image: linear-gradient(90deg,#a32dd8,#3180fd);
        // linear-gradient(90deg,#a32dd8,#3180fd);
        line-height: _vw(30);
        height: _vw(30);
        text-align: center;
        color: #fff;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
}


</style>


