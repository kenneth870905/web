<template>
    <div class="top">
        <div class="title_nav">
            <div class="left" @click="返回()">
                <van-icon name="arrow-left" class="arrow" />
            </div>
            <div class="title_c">有声小说</div>
            <div class="right"></div>
        </div>
        <div class="head">
            <div class="head-info" @click="$router.push('/videoFictionXQ')">
                <div class="head-img">
                    <img v-if="obj.fengmian" :src="configData.api_url+obj.fengmian">
                </div>
                <div class="head-txt">
                    <ul>
                        <li style="font-size:20px;">{{obj.name}}</li>
                        <li>
                            <label>作者：</label>
                            <span>{{obj.types}}</span>
                        </li>
                        <li>
                            <label>名字：</label>
                            <span>{{obj.name}}</span>
                        </li>
                        <li>
                            <label>状态：</label>
                            <span>{{obj.status}}</span>
                        </li>
                        <li>
                            <label>最后新章节：</label>
                            <span style="color:yellow;">{{obj.last_update_chapter_name}}</span>
                        </li>

                        <!-- <li class="收藏">
                            <span v-if="!shouchang" @click="收藏(obj.id)"> <span class="sc">收藏：</span><span class="iconfont iconshoucang huhu"></span> </span>
                            <span v-if="shouchang" @click="收藏(obj.id)"> <span class="sc">收藏：</span><span class="iconfont iconshoucang"></span> </span>
                        </li> -->
                    </ul>
                </div>
            </div>
        </div>
        <div class="排行分类">
            <div @click="切换(1)" :class="{active:active == 1 }">详情</div>
            <div @click="切换(2)" :class="{active:active == 2 }">目录</div>
        </div>
        <div class="detail">
            <div class="ul_l" v-show="选择详情 == 1">
                <div class="detail-summary">
                    <p>{{obj.description}}</p>
                </div>
                <div class="mod-recommend3">
                    <span>骚年们都在看：</span>
                    <div class="推荐书单">
                        <div class="书单" v-for="(item,index) in 推荐" :key="index" @click="查看推荐漫画(item)">
                            <img :src="configData.api_url+obj.fengmian" alt="">
                            <p>{{item.name}}</p>
                        </div>

                    </div>
                </div>
            </div>

            <div class="ul_l" v-show="选择详情 == 2" style="width:100%">
                <div class="time">
                    <span>&nbsp;&nbsp;{{obj.add_time}}</span> &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{{obj.last_update_chapter_name}}</span>
                </div>
                <div class="chapter">
                    <ul>
                        <li v-show="obj.size<10 || 展开 " v-for="(item,index) in obj.size" @click="查看详情(index)" >
                            第{{index+1}}章
                        </li>

                    </ul>
                    <div v-if="obj.size && obj.size>10" class="加载更多" @click="展开=!展开">查看更多目录</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'vant';
import { 有声小说内容页面 } from "@/api/有声小说.js"
import { 热门推荐三部} from "@/api/首页.js"
export default {
    data() {
        return {
            展开: false,
            configData: config,
            // mhid:"",
            obj: {},
            active: 2,
            选择详情: 2,
            mhidid: "",
            shouchang: true,//收藏图标切换
            推荐: [],
        }
    },
    components: {

    },
    created() {
        this.mhidid = this.$route.query.mhid;
        this.mhidid = parseInt(this.mhidid)
        console.log(typeof this.mhidid)
        this.获取所有数据函数()
        this.热门推荐随机三部()
    },
    computed: {
        目录展示() {

        }
    },
    methods: {
        // 查看推荐漫画(item) {
        //     this.mhidid = item.id //小说唯一id
        //     var obj = {
        //         id: this.mhidid
        //     }
        //     有声小说内容页面(obj).then(x => {
        //         console.log(x)
        //         if (x.data.code == 1) {
        //             this.obj = x.data.data
        //         } else {
        //             console.log("请求数据失败")
        //         }
        //     }).catch(err => {
        //         console.log(err)
        //     })
        //     this.热门推荐随机三部()
        // },
        热门推荐随机三部() {
            var obj = {
                cid: this.mhidid,
                class: "xiaoshuoyousheng"
            }
            热门推荐三部(obj).then(x => {
                if (x.data.code == 1) {
                    console.log(x.data.data)
                    this.推荐 = x.data.data
                } else {
                    console.log("请求数据失败")
                }
            }).catch(err => {
                console.log(err)
            })
        },
      
        获取所有数据函数() {
            var obj = {
                id: this.mhidid
            }
            有声小说内容页面(obj).then(x => {
                console.log(x)
                if (x.data.code == 1) {
                    this.obj = x.data.data
                    
                    // this.保存当前数据(x.data.data)
                } else {
                    console.log("请求数据失败")
                }
            }).catch(err => {
                console.log(err)
            })
        },
        切换(index) {
            this.选择详情 = index;
            this.active = index;
            // if(index==2){
            //     console.log("1")
            //   this.$router.push('/videoFictionXQ')
            // }else{
            //           this.选择详情 = index;
            //             this.active = index;
            // }

        },
        // 加载更多() {
        //   alert("加载更多")
        // },
        返回() {
            history.back()
        },
        查看详情(num) {
            this.$router.history.push("/videoFictionXQ?xqmhid=" + this.obj.id + '&index=' + num); //点击跳转的对应地址
        },
 
    }
}
</script>

<style lang="scss" scoped>
* {
    background: none;
}

.active {
    border-bottom: 2px solid #ff9a6a;
    width: 20%;
}

.top {
    position: absolute;
    left: 0px;
    top: 0px;    
    width: 100%;
    height: 100%;
    background: white;
    .title_nav {
        position: fixed;
        top: 0;
        left: 0px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: _vw(44);
        color: #fff;
        background: linear-gradient(
            135deg,
            #ec304c 0%,
            #cb1c36 100%
        ) !important;
        line-height: _vw(44);
        font-size: _vw(20);
        z-index: 2;
        .arrow {
            color: #ffffff !important;
        }
    }
}

.head {
    // margin-top:_vw(44);
    display: flex;
    justify-content: center;
    // background:green;
    background-image: url("~@/assets/img/manhua/minBanner.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: fixed;
    top: _vw(44);
    left: 0px;
    z-index: 2;
    width: 100%;
}

.head-info {
    display: flex;
    align-items: center;
    padding: _vw(20) 0px;
}

.head-img {
    width: _vw(130);
    height: _vw(160);
    img {
        width: 100%;
        height: 100%;
    }
}

.head-txt ul li {
    color: white;
    font-size: _vw(12);
    margin: _vw(10);
}
.head-txt {
    margin-left: _vw(20);
    ul {
        
    }
}

.排行分类 {
    display: flex;
    width: 100%;
    justify-content: center;
    height: _vw(44);
    border-bottom: 1px solid #d6d5d5;

    line-height: _vw(44);
    position: fixed;
    left: 0px;
    top: _vw(246);
    z-index: 2;
    width: 100%;
}

.排行分类 div {
    width: 50%;
    text-align: center;
    background: white;
    font-size: _vw(14);
    color: #969696;
}

.detail {
    padding-top: _vw(300);
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
}
.detail-icon {
    text-align: center;
    margin: 10px;
}

.detail-summary {
    width: 90%;
    margin: 0 auto;
}

.detail-summary p {
    font-size: _vw(13);
    color: #535252;
    line-height: _vw(24);
}

.推荐书单 {
    width: 100%;
    display: flex;
    padding: _vw(0) _vw(10) _vw(0) _vw(10);
    box-sizing: border-box;
    flex-wrap: wrap;
}

.书单 {
    width: 33.33%;
    height: 100%;
    margin-bottom: 10px;
    padding: _vw(0) _vw(10) _vw(0) _vw(10);
    box-sizing: border-box;
}

.书单 p {
    font-size: _vw(12);
    text-align: center;
    background: white;
    margin-top: -5px;
}

.书单 img {
    width: 100%;
    height: 85%;
    border-radius: 5px 5px 0 0;
}
.mod-recommend3 {
    padding-bottom: _vw(0);
    span {
        font-size: _vw(14);
        color: #969696;
        margin: 15px;
        display: inline-block;
    }
}

.time span {
    font-size: _vw(14);
    line-height: _vw(30);
    color: #969696;
}

.chapter {
    width: 100%;
    ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: _vw(0) _vw(10) _vw(0) _vw(10);
        box-sizing: border-box;
        // li{
        //     width: 100%;
        //     // height: 200px;
        //     // background: #ebe7e7;
        //     overflow: hidden;
        //     display: flex;
        //     justify-content: space-between;
        //     border-bottom: 1px solid #d6d5d5;

        //     align-items: center;
        //     padding:_vw(10) _vw(0) _vw(10) _vw(0);
        //     margin-bottom: _vw(10);
        //     .haha{
        //      font-size: _vw(14)

        //     }
        //     video{
        //         height: _vw(30);
        //         width: 60%;

        //     }
        // }
        li {
            width: 30.9%;
            height: 47px;
            border: 1px solid #c5c5c5;
            margin: _vw(3);
            text-align: center;
            line-height: 47px;
            color: #535252;
            font-size: _vw(14);
        }
    }
}
.加载更多 {
    width: 95%;
    height: _vw(50);
    border: 1px solid #c5c5c5;
    margin: 0 auto;
    text-align: center;
    color: #535252;
    font-size: _vw(18);
    line-height: _vw(50);
}
</style>
