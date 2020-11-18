<template>
    <div class="生肖特码">
        <van-popup v-model="showT" class="弹出框">
                <div class="top_title">
                    <div class="l_b"><span class="iconfont iconbangzhu"></span>&nbsp;&nbsp;<span class="text_t">帮助说明</span></div>
                    <div class="r_b">
                        <van-icon name="cross" class="cross" @click="showT=false" />
                    </div>
                </div>

                <div class="C_zh">
                         <div class="input">
                             <div class="name">期数:</div>
                            <input type="number"   name="points" min="1" max="100"   v-model="oldNum"/>
                         </div>
                         <div class="btn_box">
                             <div class="left"  @click="showT=false" >取消</div>
                             <div class="right" @click="确定()" >确定</div>
                         </div>
                </div>
        </van-popup>

        <div class="投注" @click="$router.push('/buyLottery')">
            <img src="@/assets/img/bxtj/betting.6320e08.png" alt="">
        </div>
        <div class="返回" @click="返回()">
            <van-icon name="arrow-left" class="arrow_left" />
         </div>



        <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <span class="iconfont iconzuobian" @click="返回()"></span>
            <span class="text">生肖特码</span>
            <div class="right" @click="showT=true">{{oldNum}}</div>
        </div>
        <div class="content">
            <div class="title">
                <span>当前统计的期数:<span>{{oldNum}}</span></span>
                <div class="btn_box">
                    <div class="btn_rt"  @click="clicktite(0)" :class="{'titleActive':tableType==0}">热图</div>
                    <div class="btn_lt"  @click="clicktite(1)"  :class="{'titleActive':tableType==1}">冷图</div>
                </div>
            </div>
            <div  v-show="tableType==0">
              <div id="main" style="width:100%;height:500px;"></div>
            </div>
            <div  v-show="tableType==1">
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    data() {  
        return {
            tableType:0,
            showT:false,
            oldNum:100,
            bai: {
                color: "#ffffff",
                topbj: "#5dadff",
             
            },
            hei: {
                color: "#eacd91",
                topbj: "#1d1e23",
             
            }
        }
    },
    components: { // 注册组件
        
    },
    created(){
    },
    mounted() {
      this.drawChart()   
    },
    
    computed: {
        ...mapState({
            皮肤切换: '皮肤切换',
        }),
        皮肤区分() {
            if (this.皮肤切换 == true) {
                return this.bai
            } else {
                return this.hei
            }
        },
    },
    methods:{
        确定(){
            console.log(this.oldNum)
            this.showT=false;
        },
        返回() {//头部
            history.back()
        },
           clicktite(index) {
            this.tableType = index
        },
        drawChart(){
          let myChart =this.$echarts.init(document.getElementById('main')); 
            var  weatherIcons = {
            'Sunny': '@/assets/img/home/bai/1.24baa94.gif',
            'Cloudy': '@/assets/img/home/bai/1.24baa94.gif',
            'Showers':'@/assets/img/home/bai/1.24baa94.gif',
        };
      var   option = {
    title : {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        left: 'center',
        bottom: 10,
          data: ['猪','羊','狗','兔','蛇','马','虎','鼠','龙','牛','候','鸡',]
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                 {value:535, name: '猪'},
                {value:510, name: '羊'},
                {value:634, name: '狗'},
                {value:211, name: '兔'},
                {value:137, name: '蛇'},
                {value:112, name: '马'},
                {value:323, name: '虎'},
                {value:496, name: '鼠'},
                {value:789, name: '龙'},
                {value:789, name: '牛'},
                {value:256, name: '候'},
                {value:666, name: '鸡'},

              
            ],
            itemStyle: {
   
            }
        },
        
    ]
};




//       var  option = {
//     tooltip : {
//         trigger: 'item',
//            formatter: "{a} <br/>{b}: {c} ({d}%)"
//     },
//     legend: {
//         bottom: 10,
//         left: 'center',
//         data: ['猪','羊','狗','兔','蛇','马','虎','鼠','龙','牛','候','鸡']
//     },
//     series : [
//         {
//             name: '访问来源',
//             type: 'pie',
//             // radius : '55%',
//             center: ['50%', '60%'],
//               label: {
//                 normal: {
//                     show: true,
//                     position: 'inside',
//                     formatter: '{d}%',//模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比

//                    textStyle : {                   
//                     align : 'center',
//                     baseline : 'middle',
//                     fontFamily : '微软雅黑',
//                     fontSize : 15,
//                     fontWeight : 'bolder'
//                  }
//                 },
//             },
//             itemStyle:{
//               color: {
//                     type: 'radial',
//                     x: 0.5,
//                     y: 0.5,
//                     r: 0.5,
//                     colorStops: [{
//                         offset: 0, color: 'red' // 0% 处的颜色
//                     }, {
//                         offset: 1, color: 'blue' // 100% 处的颜色
//                     }],
//                     global: false // 缺省为 false
//                 }
//             },
//             data:[
//                  {value:535, name: '猪'},
//                 {value:510, name: '羊'},
//                 {value:634, name: '狗'},
//                 {value:211, name: '兔'},
//                 {value:137, name: '蛇'},
//                 {value:112, name: '马'},
//                 {value:323, name: '虎'},
//                 {value:496, name: '鼠'},
//                 {value:789, name: '龙'},
//                 {value:789, name: '牛'},
//                 {value:256, name: '候'},
//                 {value:666, name: '鸡'},
//             ],
//             itemStyle: {
//                 emphasis: {
//                     shadowBlur: 10,
//                     shadowOffsetX: 0,
//                     shadowColor: 'rgba(0, 0, 0, 0.5)'
//                 }
//             }
//         }
//     ]
// };


            myChart.setOption(option)
        }
      
    }
    
}


</script>
<style lang="scss" scoped>
.生肖特码{
         .弹出框 {
         width: 90%;
         border-radius: _vw(6);
         margin:0 auto;
        // background: red;
        .top_title {
            width: 90%;
            margin:0 auto;
            border-top-left-radius: _vw(10);
            border-top-right-radius: _vw(10);
            display: flex;
            justify-content: space-between;
            height: _vw(35);
            background: #eacd91;
            padding: _vw(0) _vw(10);
            box-sizing: border-box;
            .l_b,
            .r_b {
                line-height: _vw(35);
                .text_t {
                    font-size: _vw(12);
                }
                .cross,
                .iconbangzhu {
                    color: #ffffff;
                }
            }
        }
        .C_zh{
            width: 90%;
            margin:0px auto;
            background:#ffffff;
            height: _vw(200);
            position: relative;
            border-bottom-left-radius: _vw(10);
            border-bottom-right-radius: _vw(10);
            padding-top:_vw(50);
            box-sizing: border-box;
          
            .input{
                width: 70%;
               margin:0px auto;
            //    background:red;
               display: flex;
            //    justify-content:space-between;
            .name{
                width: 20%;
                text-align: center;
            }
               input{
                 margin-left:_vw(10);
                width: 80%;                 
               }
            }
                .btn_box{
                display:flex;
                position: absolute;
                left:0px;
                bottom:0px;
                width: 100%;
                border-top:_vw(1) solid #f0f0f0;
                .left{
                    border-right:1px solid #f0f0f0;
                }
            .left,.right{
                width: 50%;
                text-align: center;
                line-height: _vw(40)
            }
            }
        }
       
      
    }

    .投注 {
        width: _vw(47);
        height: _vw(47);
        border-radius: 50%;
        position: fixed;
        top: _vw(108);
        right: _vw(-2);
        z-index: 40;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .返回 {
        width: _vw(40);
        height: _vw(40);
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.4);
        text-align: center;
        position: fixed;
        top: 50%;
        left: 0px;
        z-index: 30;
        .arrow_left {
            line-height: _vw(40);
            color: rgb(236, 230, 230);
        }
    }


       .div_top {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        z-index: 20;
        box-sizing: border-box;
        height: _vw(35);
        line-height: _vw(35);
        display: flex;
        justify-content: space-between;
        padding: _vw(0) _vw(4);
        align-items: center;
        .iconzuobian {
            font-size: _vw(17);
        }
 
        .text {
            font-size: _vw(18);
        }
        .right{
          width: _vw(41);
          height: _vw(26);
          text-align: center;
          line-height: _vw(26);
          font-size: _vw(16);
          font-size: _vw(12);
          background-color: #ffffff;
          color:black;
          border-radius: _vw(4);
        }
    }
    .content{
        padding-top:_vw(35);
        .title{
        padding:_vw(10) _vw(10);
        display: flex;
        justify-content: space-between;
        align-items: center;
        .btn_box{
          display: flex;
            font-size: _vw(12);
            width: _vw(170);
          height: _vw(30);
          border: 1px solid #c9a96c;
          .titleActive{
              background:#c9a96c;
              color:#ffffff !important;
          }
          .btn_rt,.btn_lt{
          width: 50%;
          color: #c9a96c;
          text-align: center ;
          line-height: _vw(30)
          }
        }
           
        }
     
    }
    
   
}
</style>