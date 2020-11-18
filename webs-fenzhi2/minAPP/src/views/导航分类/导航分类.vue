
<template>
  <div class="有声小说">
    <div class="title_nav">
        <div class="left" @click="返回()"><van-icon name="arrow-left" class="arrow" /></div>
        <div class="title_c">分类</div>
        <div class="right"  @click="编辑完成()">{{iconshow ? "完成" : "编辑"}}</div>
    </div> 
    <div class="content">
       <div class="我的分类">
           <div class="title_i"><span class="left_">我的兴趣</span><span  class="righ_">长按可以拖动</span></div>
           <ul class="title_ul">
                
               <li v-for="(item,index) in XQlist" @click="进入分类首页(item)" @touchstart="touchstartHander()" @mouseup="touchmoveHander($event)"  @touchendHander="touchendHander($event)" >
                   {{item.title}}
                   <span  @click="清除(item,index)" v-if="清除小图标" class="iconfont  iconshanchu "></span>
                </li>
           </ul>
       </div>
       <div class="所有分类">
            <div class="title_i"><span class="left_">所有分类</span></div>
            <ul  class="max_ul">
                <li>
                    <ul  class="title_ul">
                        <li  @click="进入分类首页(item)"  v-for="(item,index) in FLlist"  @touchstart="touchstartHander()" @mouseup="touchmoveHander($event)"  @touchendHander="touchendHander($event)" >
                            {{item.title}}
                        <span @click="添加(item,index)"  class="iconfont iconadd-fill" v-if="添加图标"></span>
                        </li>
                    </ul>
                </li>

            </ul>
       </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "",
    data() {
        return {
             timer:null, //长按不放事件的定时器
             清除小图标:false, 
             我的分类显示:true, 
             添加图标:false,
             添加我的分类显示:true,
             iconshow:false,//头部文字显示切换
               XQlist:[ {title:"精品漫画" }, {title:"全能小说"},  {title:"低俗内容"}],
              FLlist:[
                {title:"有声小说"},
                {title:'电影种子'},
                {title:"精彩视频"},

            ]
        };
    },
    computed:{
    },
    mounted() {
      
    },
    methods:{
        进入分类首页(item){
            if(!this.清除小图标 || !this.添加图标 ){
                  var url;
                switch (item.title) {
                case "精品漫画":
                    url = "/manhua";
                    break;
                case "精彩视频":
                    url = "/ship";
                    break;
                case "全能小说":
                    url = "/xiaoshuo";
                    break;
                case "有声小说":
                    url = "/youshenXS";
                    break;
                case "电影种子":
                    url = "/dyzz";
                    break;
                case "低俗内容":
                    url = "/dslr";
                    break;
                default: ""
                }
              this.$router.push(url)
            }
        },
           返回() {
            history.back()
        },
        编辑完成(){
          this.iconshow=!this.iconshow;//编辑完成 字体切换
          if(this.iconshow){
              this.清除小图标=true
              this.添加图标=true
          }else{
               this.清除小图标=false
              this.添加图标=false
          }
        },
        清除(item,index){
            //删除
            this.XQlist.splice(index,1);
            this.FLlist.push(item)
        },
            添加(item,index){
             this.FLlist.splice(index,1);
             this.XQlist.push(item)
         },

        touchstartHander(){
            console.log('touchstartHander')
            // this.长按=true
            this.timer=setTimeout(this.LongPress,3000);
        },
        touchmoveHander(event){
            console.log('touchmoveHander')
            event.preventDefault();
            clearTimeout(this.timer);
            this.timer=null;
        },
        touchendHander(event){
            console.log('touchendHander')
            event.preventDefault();
            clearTimeout(this.timer);
            return false;
        },
        LongPress(){
            this.清除小图标=true
             this.添加图标=true
            console.log('长按被触发被触发')
        },
    }
};
</script> 

<style lang="scss" scoped>
   .title_ul{
            display:flex;
            flex-wrap: wrap;
            box-sizing: border-box;
             li{
               width: 23%;
               height: _vw(40);
               background: #fff;
               margin:1%;
               line-height: _vw(40);
               text-align: center;
               position: relative;
               border:1px solid #ebe7e7;
               font-size: _vw(14);
               .iconadd-fill,.iconshanchu {
                 position: absolute;
                 top:_vw(-16);
                 right:_vw(-4);
                 z-index:2;
                 font-size: _vw(14);
               }
               .iconshanchu{
                 color:#acacac;
               }
               .iconadd-fill{
                   color:red;
               }
             }
         }
.有声小说{
    position: absolute;
    left: 0px;
    top:0px;
    height: 100%;
    width: 100%;
    // z-index: ;
      .title_nav{
     display:flex;
     position: fixed;
     width: 100%;
     top:0;
     left:0;
     z-index: 60;
     justify-content: space-between;
     align-items: center;
     height: _vw(44);
     color:#fff;
     background: linear-gradient(135deg,#ec304c 0%, #cb1c36 100%) !important;
     line-height: _vw(44);
     font-size: _vw(18);
     padding:_vw(0) _vw(10);
     box-sizing: border-box;
     .right{
         font-size: _vw(15);
     }
    }
    .content{
        padding:_vw(44) _vw(10) _vw(10) _vw(10);
        .我的分类{
            min-height: _vw(88)
        }
      .所有分类,.我的分类{
         .title_i{
             display: flex;
             align-items: center;
             line-height: _vw(40);
             .left_{
                 font-weight: 600;
                 font-size: _vw(15);
                 margin-right: _vw(10);
                      margin:1%;

             }
             .righ_{
                 font-size: _vw(12);
                 color:#acacac;
             }
         }
         .max_ul{
             >li{
                .xs_title {
                    font-size: _vw(14);
                    font-weight: 500;
                    line-height: _vw(30);
                    margin-left: _vw(4);
                }
             }
         }
      

      }
    }
}

</style>



