
<template>
  <div class="小说">
     
    <div class="c_c">
        <div>
          <van-search
            v-model="value"
            placeholder="请输入搜索关键词"
            show-action
            shape="round"
            @search="onSearch"
          >
            <div slot="action" @click="onSearch">搜索</div>
          </van-search>
        </div>
      </div>



        <div class="热门推荐">
            
            <ul class="img_shu"  > 
                <li v-for="(item,index) in list"  @click="查看有声小说详情页(item)">
                <div class="left"><img  :src="configData.api_url+item.fengmian" alt=""></div>
                <div class="right">
                    <div class="book_t">{{item.name}}</div>
                    <div class="book_c">{{item.description}}
                    </div>
                    <div class="bottom_b">
                        <span></span>
                        <span class="ck"><span class="iconfont iconerji"></span> 点击收听</span>
                    </div>
                </div>
                </li>
            </ul>
        </div>
         
  </div>
</template>

<script>
import { 有声小说大分类,有声小说内容页面 } from "@/api/有声小说.js"
import { Toast } from 'vant';
import { Dialog } from 'vant';
import { mapGetters } from "vuex";
export default {
    name: "",
    data() {
        return {
            configData: config,//configData.api_url
            list:[],
            value:"",
        };
    },
    computed:{
     
    },
     created() {
      this.请求所有数据的函数()
    },
     methods:{
   

         onSearch(){
          console.log(1)
         },
               查看有声小说详情页(item) { 
                var obj = {
                    id: item.id,
                     check_status:1,
                }
                有声小说内容页面(obj).then(x => {
                    if (x.data.code == 1) {
                            if(x.data.data.usePoints!==0){       
                              Toast(x.data.data.usePoints)
                              }
                      this.$router.history.push("/videoFictionDetails?mhid="+ item.id); //点击跳转的对应地址
                    } else {
                       if(x.data.code == -9){ //== -9 代表未登录
                            Dialog.confirm({
                            title: x.data.msg,
                            message:"是否跳转到登录页",
                            className: "tanchukuang",
                            }).then(() => {
                              this.$router.push('/login?router='+ '/youshenXS');
                            }).catch(() => {

                            });
                        }else{
                            Toast(x.data.msg)
                        }

                        console.log("请求数据失败")
                    }
                }).catch(err => {
                    console.log(err)
                })
               },

               
                请求所有数据的函数(){
                    有声小说大分类().then(x=>{
                        if(x.data.code==1){
                            this.list=x.data.data.list
                            console.log(this.list)
                        }else{
                            console.log("请求数据失败")  
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                },
       
    }
};
</script> 

<style lang="scss" scoped>

  .fac{
      font-size: _vw(12)
  }
.小说{
   background: #f0f0f0;
     .c_c {
   background:green;
   background: #ffffff;  
   padding:_vw(10) ;

 
    //   display: flex;
    //   justify-content: space-between;
    //   align-items: center;
      .title_t {
        margin-right: _vw(5);
        font-size: _vw(12);
        font-weight: 700;
      }
      /deep/ .van-icon {
        font-size: _vw(20);
      }
      .van-search__content--round {
        height: _vw(30);
      }
      .van-cell {
        line-height: _vw(20);
        font-size: _vw(12);
      }
      .van-search__action {
        font-size: _vw(14);
      }
      /deep/.van-search {
        padding: 0px;
        background: none !important;
      }
    }
    // .热门推荐{
            //   background: #ffffff;
            //   margin-top:_vw(10);
            //   .title_div{
            //       display:flex;
            //       justify-content:space-between;
            //       padding:_vw(0) _vw(10) _vw(0) _vw(10);
            //       line-height: _vw(40);
            //       font-size: _vw(15);
            //       align-items: center;
            //       .rm{
            //       align-items: center;   
            //       }
            //   }
              .img_shu{
              background: #ffffff;

                  li{
                      padding:_vw(0) _vw(10);
                      display:flex;
                      justify-content: space-between;
                      margin-bottom:_vw(10);
                    .left{
                      margin-right:_vw(10);
                      width: _vw(100);
                      height: _vw(120);
                      img{
                          width: 100%;
                          height: 100%;
                       }
                    }
                    .right{
                       border-bottom:1px solid #f0f0f0;
                       flex:1;
                       .book_t{
                         font-weight: 600;
                         height: _vw(30);
                         line-height:_vw(30);
                         font-size: _vw(14);
                        }
                       .book_c{
                         height:_vw(60);
                         overflow:hidden;
                        text-overflow:ellipsis;
                        display:-webkit-box;
                        -webkit-line-clamp:3;
                        -webkit-box-orient:vertical;
                        font-size: _vw(12)
                        }
                        
                       .bottom_b{
                           display: flex;
                           justify-content: space-between;
                           font-size: _vw(12);
                            height: _vw(30);
                            line-height: _vw(30);
                            .ck{
                               color:#acacac;
                               font-size: _vw(14);
                            }
                           .span_i{
                             display: flex;
                            justify-content: space-between; 
                            align-content: center;
                            color:#acacac;
                            .iconshoucang{
                             color:red;
                             font-size: _vw(16);
                            }  
                           }
                       } 
                    }
                  }
              }
//    }
}
</style>



