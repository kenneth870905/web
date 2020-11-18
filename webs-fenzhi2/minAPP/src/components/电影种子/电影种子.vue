<template>
    <div class="video_box">

        <div class="c_c">
            <div v-if="热词显示隐藏" class="icon"  @click="搜索热门切换()"  ><span class="iconfont iconremen1"></span>热门</div>
            <div v-if="!热词显示隐藏" class="icon" @click="搜索热门切换()">返回热门</div>
            <div class="ss_box">
                <van-search class="shurk" v-model="valueSQ" placeholder="请输入搜索关键词" show-action shape="round">
                    <div slot="action" @click="搜索()">搜索</div>
                </van-search>
            </div>
        </div>

           <van-list class="ul_ss" v-if="!热词显示隐藏"  v-model="loading" :offset="20" :finished="finished" :finished-text="objdata.total==0 ? '暂无数据' : '没有更多了'" @load="onLoad">

                <div class="li" v-for="(item,index) in objdata.list" @click="点击查看种子详情(item)">
                    <div class="地址">{{item.name}}</div>
                    <div class="neirong">
                        <span class="text_sm">文件大小：</span> <span class="fd_zd">{{item.num_files}}</span>
                        <span class="text_sm">文件数量：</span> <span class="fd_zd">{{item.size}}</span>
                    </div>
                </div>
              </van-list>

        <div class="video_content">
            <div class="btn_group" v-if="热词显示隐藏">
                <div class="max_box" v-for="(item,index) in listTitle" @click="查找(item)" :key="index">{{item}}</div>
            </div>
          
        </div>
    </div>
</template>  

<script>
import { Toast } from 'vant'
import { Dialog } from 'vant';
import { 电影种子分类数据, 电影种子,电影种子详情 } from "@/api/电影种子.js"
export default {
    data() {
        return {
            listTitle: [],//标题数组
            热词显示隐藏: true,
            valueSQ: "",//搜索内容
            queryName:"",   //点击的名字
           currentPagerm: 1,//当前页数
            rowrm: 6,//每页返回多少行数据
            objdata: {
                list:[],
                total:-1
            },
            loading: false,
        }
    },

    created() {
        this.请求所有数据的函数()//随机的热门分类标题
    },
    computed: {
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
    methods: {
            onLoad() { //滚动条与底部距离小于 offset 时触发  offset:默认一个距离
            console.log("发l")
            this.currentPagerm++//当前页数 
            this.获取数据() //再调取请求所有数据的函数
        },
      


      搜索热门切换(){
        this.热词显示隐藏=!this.热词显示隐藏
        this.valueSQ=""
      },
        点击查看种子详情(item) {
               var obj={
                 id:item.id,
                 check_status:1,
            }
               电影种子详情(obj).then(x=>{
                  if(x.data.code==1){
                      if(x.data.data.usePoints!==0){
                             Toast(x.data.data.usePoints)
                        }
                       this.$router.history.push("/filmSeed?id=" + item.id ); //点击跳转的对应地址
                  }else{
                      if(x.data.code == -9){ //== -9 代表未登录
                            Dialog.confirm({
                            title: x.data.msg,
                            message:"是否跳转到登录页",
                            className: "tanchukuang",
                            }).then(() => {
                                 this.$router.push('/login?router='+ '/dyzz');
                            }).catch(() => {

                            });
                        }else{
                            Toast(x.data.msg)
                        }
                      console.log("请求数据失败")
                  }
              }).catch(err=>{
                  console.log(err)
              })
        },
        
        返回热门() {
               this.valueSQ = "",
                this.默认热门 = true
        },
        请求所有数据的函数() {//随机的热门分类标题
            电影种子分类数据().then(x => {
                if (x.data.code == 1) {
                    this.listTitle = x.data.data
                } else {
                    console.log('请求失败')
                }
            }).catch(err => {
                console.log(err)
            })
        },
        搜索() {
            if (this.valueSQ) {
                this.currentPagerm = 1//当前页数
                this.queryName = this.valueSQ;
                this.获取数据();
            }else{
                       Toast('请输入搜索关键词');
            }
        },
          查找(item) {
              this.valueSQ=item
            this.queryName = item
            this.获取数据();
        },
        获取数据(){ //公用函数
            var obj = {
                page: this.currentPagerm,//当前页数
                row: this.rowrm,//每页返回多少行数据
                class: this.queryName
            }
            电影种子(obj).then(x => {
                if(x.data.code==1){
                    console.log(x)
                    if(x.data.data.total==0){
                         this.objdata.total = 0
                        Toast('未找到相关数据');
                    }else{
                     this.objdata.list = [...this.objdata.list , ...x.data.data.list];// x.data.data.list持续加加 
                     this.objdata.total = x.data.data.total 
                     this.热词显示隐藏 = false
                    }
                 
                }else{
                    this.objdata.total = 0
                       Toast('未找到相关数据');
                }
                this.loading=false
            }).catch(err => {
                this.objdata.total = 0
                this.loading=false
                 Toast('网络异常稍后再试');
            })
        },
      
    },
}

</script>
<style lang="scss" scoped>
//======加载中和暂无数据 的轻提示===============
/deep/.van-list__finished-text{
    font-size: _vw(14);
}
//=====================
// =======================公用样式开始============================

.ul_ss {
    padding-left: _vw(16);
    padding-right: _vw(16);
    padding-top: _vw(110);
    box-sizing: border-box;

    .li {
        border-bottom: 1px solid #dad7d7;
        font-size: _vw(14);
        .地址 {
            font-size: _vw(15);
            line-height: _vw(30);
            width: 100%;
            word-wrap: break-word;
            word-break: break-all;
            height: auto;
        }
        .neirong {
            display: flex;
            justify-content: flex-end;
            margin-bottom: _vw(5);
            .text_sm {
                color: #797676;

                font-size: _vw(12);
                margin-left: _vw(10);
            }
            .fd_zd {
                font-size: _vw(12);
                color: red;
                font-weight: 600;
            }
        }
    }
}
.video_box {
    position: fixed;
   left: 0;
    top: 0;
      height: 100%;
       overflow: auto;
    width: 100%;

    .c_c {
        display: flex;
        position: fixed;
        top: _vw(44);
        height: _vw(50);
        width: 100%;
        z-index: 2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #ffffff;
        .icon {
            width: 25%;
            line-height: _vw(50);
            padding-left: _vw(10);
            box-sizing: border-box;
            font-size: _vw(14);
            color: red;
            .iconremen1 {
                font-size: _vw(18);
            }
        }
        .ss_box {
             width: 75%;
              /deep/.van-search{
                padding-left: none;
            }
            /deep/.van-search__content--round {
                border: 1px solid #acacac;
                height: _vw(30);
               .van-cell{
                    line-height:_vw(26);
                    font-size: _vw(14);
                }
                /deep/.van-icon,.van-icon-search{
                    font-size: _vw(14); 
                }
            }
             /deep/ .van-search__action{
                font-size: _vw(14)
            }
            .shurk {
                width: 100%;
                margin: 0px auto;
            }
        }
    }
    .video_content {
        box-sizing: border-box;
        height: 100%;
        overflow-x:auto;
        .btn_group {
            overflow-x:auto;
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            padding-top: _vw(100);
            width: 100%;
            background: #ffffff;
            padding-bottom:_vw(50);
            z-index: 2;
            .max_box {
                border-radius: _vw(35);
                padding-left: _vw(10);
                padding-right: _vw(10);
                box-sizing: border-box;
                margin: _vw(5);
                line-height: _vw(30);
                font-size: _vw(14);
                background: #df2843;
                color:#ffffff;
                white-space: nowrap;  
                text-overflow:ellipsis; 
                overflow:hidden;
            }
        }
    }
}
</style>