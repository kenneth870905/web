<template>
    <div class="查寻助手">
          <!-- 返回投注按钮 -->
          <div class="投注" @click="$router.history.push('/buyLottery')"><img src="@/assets/img/bxtj/betting.6320e08.png" alt=""></div>
        <div class="返回" @click="返回()">
            <van-icon name="arrow-left" class="arrow_left" />
        </div>

       <!-- title头部 -->
        <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
           <div class="left"><span class="iconfont iconzuobian" @click="返回()"></span></div> 
            <div class="text">查寻助手</div>
            <div class="right_box">
                <div class="sqzj" @click="show=true">{{time}}<span class="iconfont iconxiala "></span></div>
                <div class="sqzj" @click="ifelseshow=true">条件<span class="iconfont iconxiala "></span></div>
            </div>
        </div>
          <!-- 时间选择弹出框 -->
        <van-popup v-model="show" :overlay="true" position="bottom" class="弹出框" :close-on-click-overlay="false">
            <van-picker show-toolbar title="年份" :columns="columnsdata" @cancel="onCancel" @confirm="onConfirm" />
        </van-popup>
        <!-- 条件弹出框 -->
        <van-popup v-model="ifelseshow" :overlay="true" position="bottom" class="弹出框"  :close-on-click-overlay="false"  closeable>
            <van-tree-select :items="items" :active-id.sync="activeIds" :max="3" :main-active-index.sync="activeIndex" @click-nav="clickNav" />
        </van-popup>
        <!-- 帮助弹出框 -->
        <!-- <div v-if="banz">
            <div class="">hahhahahhahahhahahhahahhahahha </div> -->
            <van-popup v-model="banz" :overlay="true" class="帮助弹出框"  :close-on-click-overlay="false" >
            <div class="top_title">
                <div class="l_b"><span class="iconfont iconbangzhu"></span>&nbsp;&nbsp;<span class="text_t">帮助说明</span></div>
                <div class="r_b">
                    <van-icon name="cross" class="cross" @click="banz=false" />
                </div>
            </div>
            <div class="C_zh">
                <h3>查询助手：</h3>
                <p class="p">查询条件可查询号码等历史条件得历史出现位置 </p>
                <p class="p">目前提供的条件有：号码、生肖、五行、波色、家野、尾数。</p>
                <p class="p">号码连线功能：进行号码条件查询时，自动将所查询的数字所出现的期数和位置用红线连起，当选择多个号码或生肖时，只显示选择结果不显示连线。</p>
                 <h3>查询助手：</h3>
                <p class="p">点击查询助手右上方的选择条件按钮，进行条件选择，选择条件后点击"确认"后系统会自动帮您筛选条件内容</p>
            </div>
        </van-popup>
        <!-- </div> -->









        <div class="content">
             <div class="bangz" @click="banz=true"><span class="iconfont iconbangzhu"></span></div>
              <ul class="max_ul">
                <li> 
                        <p>年份/期数</p>
                        <p>一</p>
                        <p>二</p>
                        <p>三</p>
                        <p>四</p>
                        <p>五</p>
                        <p>六</p>
                        <p>特码</p>
                </li>
                  <li v-for="(item,index) in 30"> 
                        <p>2019-106</p>
                        <p>28</p>
                        <p>07</p>
                        <p>05</p>
                        <p>04</p>
                        <p>02</p>
                        <p>21</p>
                        <p>14</p>
                </li>
            </ul>

        </div>
           
        
    </div>
</template>
<script>

import { mapState } from 'vuex'
export default {
    data() {
        return {
            show: false,
            ifelseshow: false,
            banz:false,
            time: 2019,
            columnsdata: ['2018', '2017', '2016', '2015', '2014'],
            bai: {
                color: "#ffffff",
                topbj: "#5dadff",
            },
            hei: {
                color: "#eacd91",
                topbj: "#1d1e23",
            },
            activeIds: [1,2],
            activeIndex: 0,
            items: [
                {
                    text: '号码',
                    duoxuan: 3,
                    children: [
                        {
                            // 名称
                            text: '01',
                            id: 0,
                        },
                        {
                            text: '02',
                            id: 1,
                        },
                        {
                            text: '03',
                            id: 2,
                        },
                        {
                            text: '04',
                            id: 3,
                        }
                    ]
                },
                {
                    text: '生肖',
                    duoxuan: 1,
                    children: [
                        {
                            // 名称
                            text: '龙',
                            id: 4,
                        },
                        {
                            text: '虎',
                            id: 5,
                        },
                        {
                            text: '鸡',
                            id: 6,
                        },
                        {
                            text: '鸭',
                            id: 7,
                        }
                    ]
                }
            ]

        }
    },
    components: { // 注册组件

    },
    created() {
        //    this.items.map(x=>{
        //                    console.log(x)
        //                    if(x.duoxuan==3){
        //                     this.activeIds=[1,2]
        //                     }else if(x.duoxuan==1){
        //                     this.activeIds=1
        //                     return
        //                     }
        //             })
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
    methods: {
        返回() {//头部
            history.back()
        },
        onConfirm(value, index) {
            this.time = value
            console.log(`当前值：${value}, 当前索引：${index}`);
            this.show = false
        },
        onCancel() {
            console.log('取消');
            this.show = false
        },
        // ===========================条件触发的函数开始======================================
        clickNav(index) {//点击左边边的每一项触发的函数 index默认参数
            // console.log(this.items[index])
            this.activeIds =this.items[index].duoxuan==1 ? 0 :  [] //这里判断是否是多选或者单选
           
        },
        clickTime(item) { //点击右边的每一项触发的函数  item默认参数
            console.log(item)
        }
        // ===========================条件触发的函数结束=====================================

    },


}


</script>
<style lang="scss" scoped>
a {
    color: red !important;
}
.查寻助手 {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
  .帮助弹出框 {
        width: 90%;
        border-radius: _vw(6);
        .top_title {
            border-top-left-radius: _vw(10);
            border-top-right-radius: _vw(10);
            display: flex;
            justify-content: space-between;
            height: _vw(35);
            background: #eacd91;
            padding: _vw(0) _vw(10);
            .l_b,
            .r_b {
                line-height: _vw(35);
                .text_t {
                    font-size: _vw(14);
                }
                .cross,
                .iconbangzhu {
                    color: #ffffff;
                }
            }
        }
        .C_zh {
            font-size: _vw(12);
            background: #ffffff;
            border-bottom-left-radius: _vw(10);
            border-bottom-right-radius: _vw(10);
            padding: _vw(10);

            h3 {
                margin: 0px;
                padding: _vw(12) _vw(10) _vw(10) _vw(0);
            }
            .p {
                margin: 0px;
            }
            // .bottom_b {
            //     display: flex;
            //     margin-top: _vw(10);
            //     margin-bottom: _vw(10);
            //     .l_top {
            //         width: _vw(90);
            //         font-size: _vw(14);
            //         font-weight: 800;
            //     }
            //     .r_p{
            //      flex:1;
            //      font-weight: 400;
            //      font-size:_vw(11)
            //     }
            // }
        }
    }

      .投注 {
        width: _vw(47);
        height: _vw(47);
        border-radius: 50%;
        position: fixed;
        top: _vw(100);
        right: _vw(20);
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
        z-index: 40;
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
        .left{
           .iconzuobian {
            font-size: _vw(17);
          }
        }
       
        .left,.text.right_box{
            width: 33.33%;
        }
        .text {
            font-size: _vw(18);
        }
        .right_box{
             display: flex;
             box-sizing: border-box;
           .sqzj {
            width: _vw(54);
            height: _vw(26);
            text-align: center;
            line-height: _vw(26);
            color: #ffffff;
            border: 1px solid #ffffff;
            border-radius: _vw(4);
            margin-left: _vw(5)
        }
        }
       
    }
    .content {
        padding-top:_vw(116);
        .bangz{
            line-height:_vw(40);
            width: 100%;
            padding:_vw(0) _vw(10);
            box-sizing: border-box;
            background:#f0f0f0;
            text-align: right;
            position: fixed;
            top:_vw(35);
            left:0px;
            .iconbangzhu{
                font-size: _vw(20)
            }
        }
        .max_ul{
         width: 100%;
            li:nth-child(2n+1){
             background:#ffffff
            } 
            li:nth-child(2n){
                background:#f8f7f2
            } 
            li:nth-child(1){
                  position: fixed;
            top:_vw(75);
            left:0px;
            width: 100%;
                background:#faebd7;
                p{
                    border-left: none !important;
                }
            }
         li{
            display:flex;
            justify-content: space-between;
            height: _vw(41);
            border-bottom: 1px solid #f0f0f0;
            P{
             margin:0px;
            }
            p:nth-child(1){
                flex:1;
                // background:yellowgreen;
                width: _vw(41);
                line-height: _vw(41);
                font-size: _vw(14);
                height:_vw(41);
                color:#777777;
                text-align: center;
            }
            p:not(:first-child){
                border-left:1px solid #faebd7;
                width: _vw(41);
                line-height: _vw(41);
                text-align: center;
                font-size: _vw(14);
                // background:gold;
                height:_vw(41);
                color:#777777;
            }
         }
        }
    }
}
</style>