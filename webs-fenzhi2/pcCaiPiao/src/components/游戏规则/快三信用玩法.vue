<template>
    <div>
        <div class="header_1">
          <div class="box_img"><img :src="dataconfig.api_urlData+img" alt=""></div> <div>{{name}}{{type ? '[信用玩法]' : "[官方玩法]"}}</div>  
        </div>

        <div class="wanfa_content">

            <h4>一、总则</h4>
            <p>1、根据《彩票管理条例》等有关规定，制定本规则。</p>
            <p> 2、快3采用计算机网络系统发行销售，定期开奖。</p>
            <p> 3、快3实行自愿购买，凡购买该彩票均被视为同意并遵守本规则。</p>
            <p>4、不得向未成年人出售彩票或兑付奖金。</p>
            <h4>二、类型及承销</h4>
            <div class="type">
                <p>1、{{name}}（骰宝）由中国福利彩票发行管理中心组织销售、吉林省福利彩票发行中心承销，如开奖时间异动以中国福利彩票管理中心公告为准。</p>
            </div>

            <h4>三、购彩方式</h4>
            <p>1、用户可通过本站投注，对选定的号码进行投注，或返点投注，返点越高投注赔率则越低。</p>
            <p>2、用户可选择机选号码投注和自选号码投注。机选号码投注：指对投注随机产生号码进行投注；
                自选号码投注：指对用户所选的号码进行投注。</p>
            <p>3、追号：指将一注或一组号码进行两期或两期以上的投注，分为连续追号和间隔追号。
                连续追号：追号的期数是连续的；间隔追号：指追号的期数不连续。</p>

            <h4>四、开奖及返奖</h4>

            <p>1、开奖：</p>
            <table class="kaijiang">
                <thead>
                    <tr>
                        <td>彩种名称</td>
                        <td>开奖时间</td>
                        <td>开奖期数</td>
                        <td>开奖频率</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in 开奖配置.起始时间" :key="index">
                        <td :rowspan="开奖配置.起始时间.length" v-if="index==0">{{name}}</td>
                        <td>{{item}}</td>
                        <td>{{开奖配置.期数[index]}}</td>
                        <td>{{开奖配置.间隔}}</td>
                    </tr>
                </tbody>
            </table>
            <p>2、返奖：无论大小奖均返还至用户在本站的账户中，一旦用户中奖，奖金自动返还至用户在本站账户中，可继续投注或提款，永无弃奖。</p>

            <h4>五、玩法说明</h4>
            <p>大小：三颗骰子开出之点数总和值4-10为小，点数总和值11-17为大。请注意：若【第一颗、第二颗、第三颗】点数相同，通吃【大】、【小】各注。</p>
            <p>三军：1-6个点数任选1点数进行投注，当开奖结果【第一颗、第二颗、第三颗】任一颗与所选的点数相同时，视为中奖。</p>
            <p>围骰：中奖点数的【第一颗、第二颗、第三颗】点数都相同，与所选点数都相同。</p>
            <p>例如中奖点数为111、333、666等，中奖点数的【第一颗、第二颗、第三颗】点数都相同，与所选点数都相同视为中奖，其它视为不中奖。</p>
            <p></p>
            <p>全骰：中奖点数的【第一颗、第二颗、第三颗】点数都相同。</p>
            <p>例如中奖点数为111~666等，中奖点数的【第一颗、第二颗、第三颗】点数都相同，视为中奖，其它视为不中奖。</p>
            <p></p>
            <p>点数：三颗骰子开出之点数总和值4-17，任选1点数进行投注，当开奖结果【第一颗、第二颗、第三颗】之点数总和值与所选定额点数相同时，视为中奖。</p>
            <p>例如中奖点位为123、312、411等，中奖点数的【第一颗、第二颗、第三颗】之点数总和值与所选的点数"6"相同时，视为中奖，其它视为不中奖。</p>
            <p></p>
            <p>长牌：中奖点数的【第一颗、第二颗、第三颗】任两颗点数与所选点数相同时，视为中奖。</p>
            <p>例如中奖点数为123，中奖点数的【第一颗、第二颗、第三颗】指定两颗之点数与所选的点数"12","23","13"相同时，视为中奖，其它视为不中奖。</p>
            <p></p>
            <p>短牌：中奖点数的【第一颗、第二颗、第三颗】任两颗点数相同时，视为中奖。</p>
            <p>例如中奖点数为112、121、211等。中奖点数的【第一颗、第二颗、第三颗】任两颗之点数相同与所选的点数"11"相同时，视为中奖，其它视为不中奖。</p>
        </div>

    </div>
</template>


<script>
import 规则 from './规则.js'
export default {
    name: "",
    props: {
        name: {
            default: ""
        },
        type: {
            default: ""
        },
         img: {
            default: ""
        }
    },
    data() {
        return {
               dataconfig: {
                api_urlData:config.api_url//api_url
            },
            activeNames: ''
        }
    },
    computed: {
        id(){
            return this.$route.query.id
        },
        开奖配置(){
            if(规则[this.id]){
                return 规则[this.id];            
            }else{
                return {}
            }
        }
    },
    methods: {
        handleChange(val) {
            console.log(val);
        }
    },
    mounted() {

    },
}
</script>

<style lang="scss" scoped>
.header_1 {
    line-height: 60px;
    margin-left: 30px;
    font-size: 24px;
    font-weight: 200;
    color: #e21;
    display:flex;
    margin-top:20px;
    .box_img{
           width: 60px;
         height: 60px;
         margin-right:10px;
        img{
         width: 100%;
         height: 100%;
        }
    }
}

.黄色背景 {
    background: #fc9;
}
.wanfa_first {
    width: 70px;
    text-align: center;
}

.wanfa_content {
    padding: 30px 30px 50px 30px;
    p {
        line-height: 32px;
        font-size: 14px;
        color: #666;
    }
    thead {
        background: #f2f2f2;
    }
    .kaijiang thead {
        background: #fc9;
    }
    img {
        width: 26px;
    }
    table {
        // border: 1px solid #cccccc;
        // display: none;
        border-spacing: 0;
    }
    tr:nth-child(1) {
        td {
            border-top: 1px solid #cccccc;
        }
    }
    tr {
        td:nth-child(1) {
            border-left: 1px solid #cccccc;
        }
        td {
            border-right: 1px solid #cccccc;
            padding: 3px 20px;
            // border-left: 1px solid #cccccc;
            border-bottom: 1px solid #cccccc;
        }
    }

    /deep/ .el-collapse-item__header {
        background: none;
        font-weight: bold;
        font-size: 22px;
    }
}
</style>