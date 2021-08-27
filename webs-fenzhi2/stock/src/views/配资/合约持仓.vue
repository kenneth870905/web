<template>
    <div class="position">
      <van-nav-bar title="持仓查询111" left-arrow :fixed="true" @click-left="onClickLeft"/> 
        <div class="position_content">
          <ul class="position_content_ul">
              <li class="tow">
                  <div class="left" >合约名称</div>
                  <div class="right"> 按月配资10倍[0625]</div>
              </li>

                <li  class="tow">
                  <div class="left" >ID号</div>
                  <div class="right"> 3265646546546545545656445654</div>
                </li>

                <li>
                    <div class="li_box">
                        <p>超盘资金</p>
                        <p>6600.00</p>
                    </div>
                    <div class="li_box">
                        <p>配资金额</p>
                        <p>6000.00</p>
                    </div>
                        <div class="li_box">
                        <p>触发警戒</p>
                        <p>6000.00</p>
                    </div>
                        <div class="li_box">
                        <p>触发止损</p>
                        <p>6000.00</p>
                    </div>
                </li>
                
                <li>
                    <div class="li_box">
                        <p>可用余额</p>
                        <p>6600.00</p>
                    </div>
                    <div class="li_box">
                        <p>冻结资金</p>
                        <p>6000.00</p>
                    </div>
                        <div class="li_box">
                        <p>证卷市值</p>
                        <p>6000.00</p>
                    </div>
                        <div class="li_box">
                        <p>合约市值</p>
                        <p>6000.00</p>
                    </div>
                </li>

                <li>
                    <div class="li_box">
                        <p>扩大配资</p>
                        <p>6600.00</p>
                    </div>
                    <div class="li_box">
                        <p>追加保证金</p>
                        <p>6000.00</p>
                    </div>
                        <div class="li_box">
                        <p>提取盈利</p>
                        <p>6000.00</p>
                    </div>
                        <div class="li_box">
                        <p>合约盈亏</p>
                        <p>6000.00</p>
                    </div>
                </li>
          </ul>

           <div class="immortal_box">
             <ul class="ul_title">
                 <li @click="clicktite(0)" :class="{'titleActive':tableType ==0}">合约持仓</li>
                 <li @click="clicktite(1)"  :class="{'':tableType ==1}">委托可撤</li>
                 <li @click="clicktite(2)"  :class="{'titleActive':tableType ==2}">当日成交</li>
             </ul>
             <ul  class="ul_content">
                 <li v-if="tableType==0" class="合约持仓" >
                    <ul class="">
                        <li>合约持股</li>
                        <li>现价/涨幅</li>
                        <li>成本/亏盈</li>
                        <li>持仓/可用</li>
                    </ul>
                    <ul  class="li_ul">
                        <li>
                            <p>长元集团</p>
                            <p>600525</p>
                        </li>
                          <li>
                            <p>5.66</p>
                            <p>-1.22%</p>
                          </li>
                            <li>
                            <p>5.66</p>
                            <p>-1.22%</p>
                          </li>
                          <li>
                            <p>5.66</p>
                            <p>-1.22%</p>
                          </li>
                    </ul>

                        <ul  class="li_ul">
                        <li>
                            <p>长元集团</p>
                            <p>600525</p>
                        </li>
                          <li>
                            <p>5.66</p>
                            <p>-1.22%</p>
                          </li>
                            <li>
                            <p>5.66</p>
                            <p>-1.22%</p>
                          </li>
                          <li>
                            <p>5.66</p>
                            <p>-1.22%</p>
                          </li>
                    </ul>
                 </li>
                   <li v-if="tableType==1" class="合约持仓" >
                    <ul class="">
                        <li>委托标的</li>
                        <li>委托价格</li>
                        <li>委托数量</li>
                        <li>委托类型</li>
                    </ul>
                    <ul  class="li_ul">
                        <li>
                            <p>长元集团</p>
                            <p>600525</p>
                        </li>
                          <li>
                            <p>5.66</p>
                            <p>-1.22%</p>
                          </li>
                            <li>
                            <p>5.66</p>
                            <p>-1.22%</p>
                          </li>
                          <li>
                            <p>5.66</p>
                            <p>-1.22%</p>
                          </li>
                    </ul>

                        <ul  class="li_ul">
                        <li>
                            <p>长元集团</p>
                            <p>600525</p>
                        </li>
                          <li>
                            <p>5.66</p>
                            <p>-1.22%</p>
                          </li>
                            <li>
                            <p>5.66</p>
                            <p>-1.22%</p>
                          </li>
                          <li>
                            <p>5.66</p>
                            <p>-1.22%</p>
                          </li>
                    </ul>
                 </li>
                    <li v-if="tableType==2" class="合约持仓" >
                    <ul class="">
                        <li>成交标的</li>
                        <li>数量/单价</li>
                        <li>成交总价</li>
                        <li>成交类型</li>
                    </ul>
                    <ul  class="li_ul">
                        <li>
                            <p>长元集团</p>
                            <p>600525</p>
                        </li>
                          <li>
                            <p>5.66</p>
                            <p>-1.22%</p>
                          </li>
                            <li>
                            <p>5.66</p>
                            <p>-1.22%</p>
                          </li>
                          <li>
                            <p>5.66</p>
                            <p>-1.22%</p>
                          </li>
                    </ul>

                        <ul  class="li_ul">
                        <li>
                            <p>长元集团</p>
                            <p>600525</p>
                        </li>
                          <li>
                            <p>5.66</p>
                            <p>-1.22%</p>
                          </li>
                            <li>
                            <p>5.66</p>
                            <p>-1.22%</p>
                          </li>
                          <li>
                            <p>5.66</p>
                            <p>-1.22%</p>
                          </li>
                    </ul>
                 </li>
             
             </ul>
          </div>


        </div>
    </div>
</template>

<script>
export default {
    name:"",
    data() {
        return {
            tableType:0,
        }
    },
    methods:{
         clicktite(num) {
            this.tableType = num
        },
         onClickLeft() {//头部
            history.back()
        },
    }
}
</script>
<style lang="scss" scoped>
.titleActive{
    background: #2d93ca;
    color:#ffffff !important;
}
.position{

    .position_content{
      padding-top:_vw(60);
      .position_content_ul{
          background: #fff;
          padding: _vw(0) _vw(10) _vw(0) _vw(10);
          .tow{
              height: _vw(42);
              line-height: _vw(42);
          }
          li:nth-last-child(1), li:nth-last-child(2), li:nth-last-child(3){
             padding: _vw(6)  _vw(0)  _vw(6)  _vw(0);
             line-height: _vw(26)
             
          }
        li{
            
            font-size: _vw(14);
            display:flex;
            justify-content:space-between;
             border-bottom: 1px solid #ccc;
             div{
                 text-align: center;
             }
            .li_box{
                p:nth-child(2){
                    color:red;
                }
                p{
                    margin: 0px;
                }
            }
        }
      }

      
        .immortal_box{
              background: #ffffff;
                width: 100%;
                min-height: 600px;
                padding-top:10px;
                .ul_title{
                    height:40px;
                    display: flex;
                    width: _vw(200);
                    border:1px solid #2d93ca;
                    margin:0px auto;
                    margin-bottom:_vw(10);
                        li:nth-child(2){
                            border-left:1px solid #2d93ca;
                            border-right:1px solid #2d93ca;
                        }
                    li{
                        color:#2d93ca;
                        width:100px;
                        text-align:center;
                        line-height: 40px;
                        text-align: center;
                    
                    }
                }
                .ul_content{
                        width: 100%;  
                        .合约持仓{
                            background: #ffffff;
                                padding:_vw(0) _vw(10) _vw(0) _vw(10);
                            ul:nth-child(1){
                                color:#2d93ca;
                                border-bottom:1px solid  #2d93ca;
                                font-size: _vw(15);
                                display:flex;
                                justify-content:space-around;
                                line-height: _vw(40)
                            }
                            ul:nth-last-child(1){
                              border-bottom: none;
                            }
                            .li_ul{
                                display:flex;
                                justify-content:space-around;
                                border-bottom:1px solid #ccc;
                                li:nth-child(1){
                                color:#2d93ca;
                                }
                                 li:nth-last-child(1){
                                color:#2d93ca;
                                }
                              li{
                                  padding:_vw(6) _vw(0) _vw(6) _vw(0);
                                  p{
                                      text-align: center;
                                     margin:0px;   
                                                           
                                  }
                              }
                            }
                        }
                }
            }

        
            }
        }

</style>
