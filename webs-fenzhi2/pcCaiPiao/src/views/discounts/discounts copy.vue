<template>
    <div class="discounts">
        <div class="container">
            <div class="container_title">
                <div class="title_box"><img src="../../assets/images/css_1.png" alt=""></div>
                <div class='text_title'><span>活动介绍</span></div>
            </div>
            <ul ref="ul_list">
                <li v-for="(item,index) in imgdata">
                    <div class="stop" v-if="item.Stop"><div class="stop_img_box"><img src="../../assets/images/Stop.png" alt=""></div></div>
                    <div class="li_top" @click="获取详情(item)">
                        <div class="img_div"><img :src="item.Img" alt=""></div>
                        <div class="right_box">
                            <div><i class="el-icon-success"></i><span class="fblue">{{item.Name}}</span></div>
                            <p class="fred">活动时间:&nbsp;<span class="fred" v-if="item.StartTime && item.EndTime">{{item.StartTime}}至{{item.EndTime}}</span><span class="fred" v-if="!item.StartTime || !item.EndTime">长期有效</span></p>
                            <p class="fred">活动简介:&nbsp; <span class="fred">{{item.Summary}}</span></p>
                        </div>
                    </div>
                    <transition name="el-zoom-in-top">
                        <div v-show="item.show" class="transition-box-1 li_bottom" v-html="item.html"></div>
                    </transition>
                </li>
            </ul>

        </div>

    </div>
</template>

<script>
import { api_首页轮播点击详情 } from "@/api/首页轮播.js";
import { api_首页轮播 } from "@/api/首页轮播.js";
export default {
    data() {
        return {
            show2: true,
            app滚动条位置: '',
            imgdata: [],//轮播 的图片
            Stop:false,
            timeActivity:true,
        }
    },
    created() {
        this.All轮播图()
    },
    methods: {
        All轮播图() {
            var obj = { home: false } //穿参数获取首页图片
            api_首页轮播(obj).then(x => {
                var data = x.data;
                console.log(data)
                data.map(x=>{
                    if(x.Stop==true){//活动已经结束
                        this.Stop=true         
                    }
                })
                var index='-1';
                if (this.$route.query.Id) { //如果点击首页图片带有Id
                    var obj=data.find(x=>x.Id==this.$route.query.Id); //就让图片的id等于  数据里的id
                    if(obj){ //如果obj存在  对应成功
                        obj.show=true//就把详情div显示出来 设为true
                    }
                }
                this.imgdata = data //是数组 数组里是对象 把拿到的数据挂在this上去渲染

                // 控制首页图片点击跳转过来对应到指定的位置
                if(this.$route.query.Id){ //如果点击首页图片带有Id
                    var index=data.findIndex(x=>x.Id==this.$route.query.Id); //就让图片的id等于  数据里的id
                    this.$nextTick(()=>{
                        var li= this.$refs.ul_list.querySelector('li:nth-child('+(index+1)+')');
                        setTimeout(() => {
                            li.scrollIntoView({behavior: "smooth",block:'center'})                            
                        }, 500);
                        // document.querySelector
                    })
                }

            }).catch(err => {
                console.log(err);
            })
        },
        获取详情(item) {
            if(item.Url){
                if(item.Url.startsWith('#')){
                    var url = item.Url.substring(2);
                    window.open(url)
                }else{
                    window.open(item.Url)
                }
            }else if (item.html) {
                item.show = !item.show
                return
            }
            api_首页轮播点击详情({ Id: item.Id }).then(x => {
                this.$set(item, 'html', x.data);
                this.$set(item, 'show', !item.show);
            }).catch(err => {})
        }
    },

    //   mounted: function () {
    //     var this_1=this
    //     // 实现返回顶部得功能
    //     $(document).scroll(function(e){
    //         this_1.app滚动条位置=$(this).scrollTop();
    //     })

    // },
    // mounted(){

    // }

}
</script>
  <style lang="scss" scoped>
.discounts {
    // height: 1000px;
    .container_title {
        display: flex;
        .title_box {
            width: 40px;
            height: 50px;
            margin-right: 10px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .text_title {
            span {
                color: red;
                font-size: 26px;
                line-height: 50px;
            }
        }
    }
    ul {
        li {
            margin-bottom: 20px;
            width: 100%;
            position: relative;
            .stop{
             position: absolute;
             top:0px;
             left:0px;
             width: 1000px;
             height: 257px;
             background:rgba(0,0,0,0.2);
             box-sizing: border-box;
             padding:30px 0px 0px 720px;

             .stop_img_box{
            //   background: red;
              width: 200px;
              height: 200px;
              img{
                  width: 100%;
                  height: 100%;
              }
             }
            }
            .li_top {
                box-sizing: border-box;
                // height: 200px;
                width: 100%;
                padding: 10px 0px 10px 10px;
                background: #f9f9f9;
                display: flex;
                border: 1px solid #ccc;
                .img_div {
                    // height: 235px;
                    flex-shrink: 0;
                    width: 660px;
                    img {
                        width: 100%;
                        // height: 100%;
                    }
                }
                .right_box {
                    padding: 14px 0px 0px 18px;
                    div{
                        span{
                            line-height: 30px;
                            font-size: 18px;
                        }
                    }
                    .el-icon-success {
                        color: rgb(91, 106, 238);
                        font-size: 22px;
                    }
                    p {
                        margin: 5px 0px 5px 0px;
                        font-size: 14px;
                        font-weight: 600;
                    }
                }
            }
            .li_bottom {
                min-height: 30px;
                border: 1px solid #ccc;
                background: #f9f9f9;
                padding:30px 20px 20px 20px;
            }
        }
    }
}
</style>
  