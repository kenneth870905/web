<template>
  <div class="收藏方案">
        <div class="title">
            <span class="返回" @click="返回()">
                <van-icon name="arrow-left" /></span>
            <span>收藏方案</span>
            <div></div>
        </div>

      <van-list class="ul外容器" v-model="loading" :offset="20" :finished="finished" :finished-text="objdata.total==0 ? '暂无数据' : '没有更多了'" @load="onLoad">
        <ul class="专家列表" v-if="objdata.total!==0" >
         <li v-for="(item,index)  in objdata.list" @click="查看方案详情(item)"> 
                 <div class="版心">
                     <div class="固定右">
                         <div class="up">
                              <span class="num"> {{item.MingZhongLv_avg*100}}</span>
                              <div class="j_g"><span class="b_f">%</span></div>
                         </div>
                         <div class="dow">命中率</div>
                     </div>
                     <div class="个人信息框">
                         <div class="tx_l"  @click.stop="查看专家详情的函数(item)"> <img :src="configData.api_url+item.head" alt=""></div>
                         <div class="tx_r">
                             <div class="name">{{item.name}}</div>
                             <div class="name_n">
                                 <span>{{item.type}}</span> 
                                 <div class="jing_l" v-if="item.ZuiJinZhanJi!=='' && item.lianhong!==null">{{item.ZuiJinZhanJi}}</div>
                                 <div class="l_h" v-if="item.lianhong!==0 && item.lianhong!==null ">{{item.lianhong}}连红</div>
                             </div>
                         </div>
                     </div>
                      <div class="精彩点评">
                    <span class="lcfa" v-if="item.identify!=='' && item.identify!==null">[{{item.identify}}]</span>
                    {{item.title}}</div>
                     <div class="对绝详情">
                         <div class="j_l"> 
                             <div class="j_B">[竞{{item.typeid==0 ? '足' : "篮"}}]</div>
                            <span class="type_d">{{item.start_time}}</span>
                            <span>{{item.league}}</span>
                            <span class="z_w">|</span>
                            <span>{{item.guestTeam_teamName}}</span>
                            <span>&nbsp;VS&nbsp;</span>
                            <span>{{item.homeTeam_teamName}}</span>
                         </div>
                         <div><van-icon name="arrow"/></div>
                     </div>
                     <div class="状态说明">
                         <span class="time_t">{{item.publishTime}}</span>
                     </div>
                 </div>
              </li>
             </ul>
        </van-list>
         
  </div>
</template>
<script>
import { 收藏方案 } from "@/api/方案.js"
import { Toast  } from 'vant';
  import {  mapState } from 'vuex' 

export default {
    data() {
        return {
             configData: config,
               objdata: {
                 list:[],
                 total:-1
              },
              currentPagerm: 0,//当前页数
               rowrm: 1,//每页返回多少行数据
               loading: false,
            // 是否登录:false,
        }
    },
    components: { // 注册组件

    },
    computed: {
           ...mapState({
                    是否登录:"是否登录"
           }),
         finished(){
            if(this.objdata.total==-1){//默认的时候是-1   return false
                return false
            }else{
                if(this.objdata.total<=this.objdata.list.length){  //这里的list.length 数据是持续 ++  如果是等于或者大于就代表加载完成了 return true
                    return true
                }else{
                    return false
                }
            }
        }
    },
    created() {
       

    },
 
    methods: {
         查看专家详情的函数(item){
             this.$router.push("/ExpertsDetails?id=" + item.expertID);
        },
        查看方案详情(item) {
        if(this.是否登录==true){
           this.$router.push("/PlanDetails?id=" + item.id ); 
        }else{
            Toast('请先登陆再查看方案详情!')
            this.$router.push('/login')
        }

        },
          返回() {
            history.back()
        },
          onLoad() { //滚动条与底部距离小于 offset 时触发  offset:默认一个距离
            console.log("发l")
            this.currentPagerm++//当前页数 
            this.初始化()
          },
           初始化(){
            var obj={
             page: this.currentPagerm,//当前页数
             row: this.rowrm,//每页返回多少行数据
            }
            收藏方案(obj).then(x=>{
             if(x.data.code==1){
                 if( this.objdata.total == 0){
                   console.log("没有数据的走这里")
                 }
                  console.log(x)
                    this.objdata.list = [...this.objdata.list , ...x.data.data.list];// x.data.data.list持续加加 
                    this.objdata.total = x.data.data.total 
                }else{
                    this.objdata.total = 0
                }
                this.loading=false 
            }).catch(err=>{
                 this.objdata.total = 0
                   this.loading=false
                console.log(err)
            })
        }
     
     
    },
   
}


</script>

<style lang="scss" scoped>

.收藏方案{
    position: absolute;
    left: 0px;
    top:0px;
    width: 100%;
    height: 100%;
    background:#ffffff;
    overflow-y:auto;
    padding-bottom:_vw(44);
    box-sizing: border-box;
    .title {
        padding: _vw(0) _vw(10);
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        line-height: _vw(44);
        color: #ffffff;
        font-size: _vw(18);
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        background: #f22222;
        z-index: 10;
        .icon{
            color:#ffffff;
        }
    }

            
    .专家列表 {
        width: 100%;
        padding: _vw(50) 0px _vw(0) _vw(0);
        overflow-y: auto;
        background: #f7f8fb;
        li {
            background: #ffffff;
            width: 100%;
            margin-bottom: _vw(4);
            padding-top: _vw(10);
            .版心 {
                width:94%;
                margin: 0 auto;
                position: relative;
                .固定右 {
                    position: absolute;
                    right: 0px;
                    top: 0px;
                    color: #e86b5c;
                    width: _vw(47);
                    height: _vw(47);
                    .up {
                        display: flex;
                        .num {
                            font-size: _vw(25);
                            font-weight: 1000;
                            font-family: alternategothicno2bt;
                        }
                        .j_g {
                            padding-top: _vw(2);
                            .b_f {
                                font-size: _vw(12);
                            }
                        }
                    }
                    .dow {
                        font-size: _vw(12);
                    }
                }
                .个人信息框 {
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    .tx_l {
                        width: _vw(40);
                        height: _vw(40);
                        margin-right: _vw(10);
                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                    }
                    .tx_r {
                        .name {
                            font-size: _vw(14);
                        }
                        .name_n {
                            font-size: _vw(12);
                            display: flex;
                            span {
                                // font-size: _vw(13);
                            }
                            .jing_l,
                            .l_h {
                                border-radius: 0 _vw(6) _vw(6) _vw(10);
                                text-align: center;
                                padding: _vw(0) _vw(8) _vw(0) _vw(8);
                            }
                            .jing_l {
                                border: 1px solid #65afff;
                                color: #65afff;
                                margin: _vw(0) _vw(5);
                            }
                            .l_h {
                                background: rgba(255, 34, 34, 0.05);
                                border: 1px solid #f83900;
                                color: #f83900;
                            }
                        }
                    }
                }
                .精彩点评 {
                    margin: _vw(14) 0px;
                    font-size: _vw(14);
                    .lcfa{
                     color:#ff6700;
                    }
                }
                .对绝详情 {
                    display: flex;
                    justify-content: space-between;
                    font-size: _vw(12);
                    background: #f7f8fb;
                    line-height: _vw(24);
                    color: #666666;
                    box-sizing: border-box;
                    // padding: _vw(0) _vw(4) _vw(0) _vw(8);


                    .j_l {
                        display: flex;
                        font-size: _vw(12);
                        margin-left: _vw(4);
                        .j_B {
                            color: #65afff;
                        }
                        .type_d {
                            margin: 0 _vw(3) _vw(0) _vw(3);
                        }
                        .z_w {
                            margin: 0 _vw(6) _vw(0) _vw(6);
                        }
                    }
                }
                .状态说明 {
                    font-size: _vw(12);
                    line-height: _vw(40);
                    display: flex;
                    align-items: center;
                    .time_t {
                        color: #b4b4b4;
                    }
                    .dd {
                        color: #a07967;
                    }
                    .f_G {
                        margin: _vw(0) _vw(10);
                        color: #b4b4b4;
                    }
                    .红豆 {
                        width: _vw(12);
                        height: _vw(12);
                        background: url("~@/assets/img/hd.svg");
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        background-position: center;
                        margin-right: _vw(7);
                    }
                }
            }
        }
    }

    
 
}
</style>