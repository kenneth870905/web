<template>
    <div class="专家详情页">
   
        <div class="top">
            <div class="title" @click="返回()">
                <van-icon name="arrow-left" />
            </div>
            <div class="title_c">
                <div class="img_box">
                    <img :src="configData.api_url+userobj.head" alt="">
                </div>

                <div class="r_t">
                    <div class="b_b">
                        <div class=" name">{{userobj.name}}</div>
                        <div class="text_r" @click="是否关注的函数(userobj)"> 
                            <span v-if="userobj.isCollect==0">+</span>
                            {{userobj.isCollect==0 ? '关注' : '已关注'}}
                            </div>
                    </div>
                    <div class="b_b">
                        <div class="text_n">{{userobj.type}}<span>&nbsp;| &nbsp;</span><span>{{userobj.fansNumber}}</span>粉丝</div>
                    </div>
                </div>
            </div>
            <p class="text">{{userobj.description}}</p>
        </div>
        <!-- <echartsData :Objdata="userobj.MingZhongLv" />  -->
        <div class="ect">
            <div class="Charts_top" id="echarts" style="width:100%; height:100%;"></div>
        </div>
        <div class="详情">
            <div class="标题">
                <div></div> <span>方案战绩</span>
            </div>
            <ul class="qi_ul">
                <li  :class="item.show=='1/2' ? '分' : item.show" v-for="(item,index) in userobj.FangAnZhanJi"  @click="查看方案详情(item)" >{{item.show}}</li>
            </ul>
            <!-- ===========================和 最新方案 start=========================   -->
            <div v-if="最新方案.length>0">
                <div class="空"></div>
                <div class="标题">
                    <div></div> <span>最新方案</span>
                </div>
                <ul>
                    <li v-for="(keey,index) in 最新方案" :key="index" @click="查看方案详情(keey)">
                        <p class="p_title"> <span v-if="keey.identify">[{{keey.identify}}]</span> {{keey.title}} </p>

                        <div class="dui_box">
                            <div class="dui">
                                <div class="div">竞{{keey.typeid==1 ?'足' : '篮'}}</div>
                                <span>{{keey.start_time}}</span>
                                <span class="bei">{{keey.league}}</span>
                                <span class="biaog">|</span>
                                <span>{{keey.homeTeam_teamName}}{{keey.homeScore}}</span>
                                <span>&nbsp;VS&nbsp;</span>
                                <span>{{keey.guestScore}}{{keey.guestTeam_teamName}}</span>
                            </div>
                            <div class="icon_box">
                                <van-icon name="arrow" />
                            </div>
                        </div>
                        <div class="bottom">
                            <div class="b_le">
                                <div class="left_b"><span>{{keey.publishTime}}</span>发布</div>
                                <div class="查看"> 查看</div>
                            </div>
                            <div :class="keey.show=='1/2' ? '分' :  keey.show"> {{keey.show}} </div>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- ==========================历史方案  ================================================   -->
            <!-- v-if="objdata.list.length>0" -->
            <div  v-if="objdata.list.total!==0">
                <div class="空"></div>
                <div class="标题">
                    <div></div> <span>历史方案</span>
                </div>
                <van-list class="ul外容器" v-model="loading" :offset="20" :finished="finished" :finished-text="objdata.total==0 ? '暂无数据' : '没有更多了'" @load="onLoad">
                    <ul >
                        <li v-for="(keey,index) in objdata.list" @click="查看方案详情(keey)">
                            <p class="p_title"> <span v-if="keey.identify">[{{keey.identify}}]</span> {{keey.title}} </p>

                            <div class="dui_box">
                                <div class="dui">
                                    <div class="div">竞{{keey.typeid==1 ?'足' : '篮'}}</div>
                                    <span>{{keey.start_time}}</span>
                                    <span class="bei">{{keey.league}}</span>
                                    <span class="biaog">|</span>
                                    <span class="主队">{{keey.homeTeam_teamName}} {{keey.homeScore}}</span>
                                    <span>  :  </span>
                                    <span>{{keey.guestScore}} {{keey.guestTeam_teamName}}</span>
                                </div>
                                <div class="icon_box">
                                    <van-icon name="arrow" />
                                </div>
                            </div>
                            <div class="bottom">
                                <div class="b_le">
                                    <div class="left_b"><span>{{keey.publishTime}}</span>发布</div>
                                    <div class="查看"> 查看</div>
                                </div>

                                <div :class="keey.show=='1/2' ? '分' :  keey.show"> {{keey.show}} </div>
                            </div>
                        </li>
                    </ul>
                </van-list>
            </div>
        </div>

    </div>
</template>
<script>
import echarts from "echarts"
import { setTimeout } from 'timers'
import { 专家详情, 添加关注, 取消关注 } from "@/api/专家.js"
import { Toast } from 'vant';
import { 专家历史方案, 专家最新方案 } from "@/api/方案.js"
  import {  mapState } from 'vuex' 


export default {
    data() {
        return {
            configData: config,
            Xdata: [],
            Ydata: [],
            最新方案: [],
            iddata: "",
            currentPagerm: 0,
            rowrm: 5,
            loading: false,
            objdata: {
                list: [],
                total: -1
            },
            userobj: {},

        }
    },
    computed: {
           ...mapState({
                    是否登录:"是否登录"
           }),
        finished() {
            if (this.objdata.total == -1) {//默认的时候是-1   return false
                return false
            } else {
                if (this.objdata.total <= this.objdata.list.length) {  //这里的list.length 数据是持续 ++  如果是等于或者大于就代表加载完成了 return true
                    return true
                } else {
                    return false
                }
            }
        }
    },
    created(){
    },
    mounted() {
         console.log(this.$route.query.id)
        this.iddata = this.$route.query.id;
          console.log(this.$route.query.id)

        
        var obj = { id: this.iddata }
        专家详情(obj).then(x => {
            this.userobj = x.data.data
            var numlist = []
            var keylist = []
            for (let key in this.userobj.MingZhongLv) {
                var daranum = parseInt(this.userobj.MingZhongLv[key])
                
                numlist.push(daranum)
                var list = '近' + key
                keylist.push(list)
            }
            this.Xdata = numlist.reverse()
            this.Ydata = keylist.reverse()
            this.echarts()

        }).catch(err => {
            console.log(err)
        })

        var zxobj = { userid: this.iddata }

        专家最新方案(zxobj).then(x => {
            console.log(x.data.data)
            this.最新方案 = x.data.data.list
        }).catch(err => {
            console.log(err)
        })

    },
    methods: {
          查看方案详情(item){
               if(this.是否登录==true){
                this.$router.push("/PlanDetails?id=" + item.id ); 
                }else{
                    Toast('请先登陆再查看方案详情!')
                    this.$router.push('/login')
                }
        },


        onLoad() { //滚动条与底部距离小于 offset 时触发  offset:默认一个距离
            console.log("发l")
            this.currentPagerm++//当前页数 
            this.历史方案() //再调取请求数据的函数
        },

        历史方案() {
            var obj = {
                userid: this.iddata,// "" 为请求所有数据  "西假" 或 "德假"
                page: this.currentPagerm,//当前页数
                row: this.rowrm,//每页返回多少行数据
            }
            专家历史方案(obj).then(x => {

                if (x.data.code == 1) {
                    console.log(x)
                    this.objdata.list = [...this.objdata.list, ...x.data.data.list];// x.data.data.list持续加加 
                    this.objdata.total = x.data.data.total
                } else {
                    this.objdata.total = 0
                }
                this.loading = false
                // this.list = x.data.data
            }).catch(err => {
                this.objdata.total = 0
                this.loading = false
                console.log(err)
            })
        },


        是否关注的函数(item) {
            if(this.是否登录){
                var obj = { id: item.id }
                if (item.isCollect == 0) {
                    添加关注(obj).then(x => {
                        console.log(x.data.data)
                        if (x.data.code == 1) {
                            Toast(x.data.msg);
                            item.isCollect = 1
                            //   console.log(x.data.data)
                        } else {
                            console.log("添加关注失败")
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    取消关注(obj).then(x => {
                        if (x.data.code == 1) {
                            Toast(x.data.msg);
                            item.isCollect = 0
                            //   console.log(x.data.data)
                        } else {
                            console.log("取消关注失败")
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }else{
                this.$router.push('/login')
            }
        },


        返回() {
            history.go(-1)
        },
        echarts() {
            var this_1 = this;
               let list=[]
            //初始化容器，拿到echarts实例
            var myChart = echarts.init(document.getElementById('echarts'));
                      
                var option = {
                       grid:{
                        left:15,
                        top:10,
                        bottom:30,
                        right:15
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data:this.Ydata
                    },
                    yAxis: {
                        min:function(value){
                            return value.min-20
                        },
                        max:function(value){
                            return value.max+20
                        },
                        show:false,
                        type: 'value',
                        axisLine: {       //y轴
                            show: false
                        },
                        axisTick: {       //y轴刻度线
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                    },
                    series: [{
                        
                        data: this.Xdata,
                        type: 'line',
                        label:{
                            show:true,
                             formatter:function(value){
                           
                                var max = Math.max(...this_1.Xdata)
                                if(max == value.value ){
                                   list.push(value.value)
                                   if(list.length>=2){
                                       return value.value +'%'
                                   }//如果最大值有2个以上 就显示第一个
                                       var mrst=0
                                        if( value.dataIndex==0){mrst=7 } 
                                       else if(value.dataIndex==1){mrst=5 }
                                       else if(value.dataIndex==2){mrst=3 }
                                       else if(value.dataIndex==3){mrst=2 }
                                       else{console.log("出错了")}
                                           var qi=mrst * (value.value / 100)
                                            var zhon=Math.round(qi)

                                    return  value.name +'中'+ zhon +" " + value.value +'%'


                     
                                  }else{
                                    return  value.value  +'%'

                                }
                            }
                        },
                      
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    { offset: 0, color: "red" },
                                    { offset: 0.5, color: "pink" },
                                    { offset: 1, color: "pink" }
                                ])
                            }
                        },
                    }]
                };


            // var option = {
            //     xAxis: {
            //         type: 'category',
            //         boundaryGap: false,
            //         //   data: ['近7', '近5', '近3', '近2'],
            //         data: this.Ydata
            //     },
            //     yAxis: {
            //         type: 'value'
            //     },
            //     series: [{
            //         // data: [30, 50, 70, 50],   
            //         data: this.Xdata,
            //         type: 'line',
            //         areaStyle: {},
            //           label:{
            //                 show:true,
            //                 // formatter:function(value){
            //                 //     var max = Math.max(...this_1.x轴数据)
            //                 //     if(max == value.value ){
            //                 //         return value.value  + "%"
            //                 //     }else{
            //                 //         return ''
            //                 //     }
            //                 // }
            //             },

            //     }]
            // };
            myChart.setOption(option);

        },

    },

}


</script>

<style lang="scss" scoped>
//===================球===========
.红 {
    background: red;
}
.分 {
    background: #ff6700;
}
.黑 {
    background: #acacac;
}
//===================球===========
.专家详情页 {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background: #f3f5f7;
    overflow-y: auto;
    box-sizing: border-box;
    .top {
        padding: _vw(0) _vw(20) _vw(1) _vw(20);
        background: linear-gradient(to top right, #ff7348, #e7273c);
        box-sizing: border-box;
        .title {
            height: _vw(44);
            color: #ffffff;
            line-height: _vw(44);
            font-size: _vw(20);
        }

        .title_c {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .img_box {
                width: _vw(65);
                height: _vw(65);
                margin-right: _vw(20);
                border-radius: 50%;
                background-color: #ffffff;
                text-align: center;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .r_t {
                flex: 1;
                .b_b {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    color: #ffffff;
                    .name {
                        font-size: _vw(18);
                    }
                    .text_n {
                        font-size: _vw(13);
                        line-height: _vw(30);
                    }
                    .text_r {  
                        width: _vw(65);
                        height: _vw(27);
                        line-height: _vw(27);
                        text-align: center;
                        color: #ffffff;
                        border: 1px solid #ffffff;
                        font-size: _vw(14);
                    }
                }
            }
        }
        .text {
            font-size: _vw(14);
            color: #ffffff;
            a {
                color: #ffffff;
            }
        }
    }
    .ect {
        margin-top: _vw(20);
        width: 90%;
        margin: 0 auto;
        height: _vw(200);
        // border:1px solid #ccc;
        // margin-top: _vw(10);
        //    background: #ff6700;
        .Charts_top {
            height: _vw(200);
            width: 100%;
            canvas{
             width: 100%;
              height: _vw(200);
                  
            }

 


            //    width: 100%;
            //    height: 100%;
            //    background:gold;
        }
    }
    .详情 {
        margin-top: _vw(10);

        padding-top: _vw(10);
        background: #ffffff;
        .空 {
            height: _vw(10);
            background: #f3f5f7;
        }
        .标题 {
            display: flex;
            font-size: _vw(14);
            font-weight: 600;
            border-bottom: 1px solid #dbd3d3;
            padding: _vw(4);
            padding-bottom: _vw(10);
            div {
                width: _vw(4);
                background-color: #ff6700;
                margin-right: _vw(10);
            }
        }
        .qi_ul {
            display: flex;
            padding: _vw(10);
            box-sizing: border-box;
            overflow-x: auto;
            width: 100%;

            //   .红{
            //       background: red;
            //   }
            //   .分{
            //       background: #ff6700;
            //   }
            //   .黑{
            //       background: #acacac;
            //   }
            li {
                flex-shrink: 0;
                margin-right: _vw(10);
                width: _vw(30);
                height: _vw(30);
                border-radius: 50%;
                line-height: _vw(30);
                text-align: center;
                color: #ffffff;
                font-size: _vw(12);
            }
        }
        .ul外容器{
            ul{
                li{

                 border-bottom: _vw(1) solid rgb(238, 235, 235);
                   width: 94%;
               margin: _vw(10) auto;

                }
            }
        }

        .p_title {
            span {
                color: #ff6700;
            }
        }
        .dui_box {
           
            display: flex;
            justify-content: space-between;
            background: #f3f5f7;
            align-items: center;
            padding: _vw(6) _vw(8);
            .dui {
                display: flex;
                font-size: _vw(12);
                color: #666666;
                align-items: center;
                span {
                    font-size: _vw(9);
                }
                .主队 {
                    text-align: right;
                }

                .div {
                    color: #65afff;
                    border: 1px solid #65afff;
                    border-radius: _vw(4);
                    padding: _vw(0) _vw(1);
                    margin-right: _vw(2);
                    font-size: _vw(9);
                }
                .bei {
                    margin: _vw(0) _vw(2);
                }
                .biaog {
                    margin: _vw(0) _vw(2);
                }
            }
            .icon_box {
                color: #666666;
            }
        }
      }
    .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: _vw(12);
        color: #666666;
        line-height: _vw(34);
        // padding: _vw(0) _vw(10);
        .b_le {
            display: flex;
            justify-content: space-between;
            width: 35%;
        }
        .分 {
            background: #ff6700;
            width: _vw(20);
            height: _vw(20);
            border-radius: 50%;
            text-align: center;
            color: #ffffff;
            font-size: _vw(12);
            line-height: _vw(20);
        }
        .一半 {
            color: #ff6700;
        }
        .红,
        .黑 {
            color: #ffffff;
            width: _vw(20);
            height: _vw(20);
            border-radius: 50%;
            line-height: _vw(20);
            text-align: center;
            font-size: _vw(11);
            flex-shrink: 0;
        }
    }
}
</style>