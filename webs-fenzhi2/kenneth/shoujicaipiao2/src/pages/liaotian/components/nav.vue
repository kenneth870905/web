<template>
    <div class="Footer">
        <div class="点击下载" v-show="显示下载">
            <img :src="config.img_url+'static/image/download.png'">
            <div class="">
                <i @click="显示下载=false" class="icon iconfont icon-guanbi"></i>
                <span>下载APP，体验更多购彩乐趣</span>
                <button @click="download1()">下载</button>
            </div>
        </div>
        <nav class="mui-bar mui-bar-tab 底部导航">
            <a class="mui-tab-item" :class="{'mui-active':(path=='/' || path=='/home/home' ||  path=='/home/home/')}" @tap="$router.push('/')">
                <span class="mui-icon mui-icon-home" :i="path"></span>
                <span class="mui-tab-label">首页</span>
            </a>
            <a class="mui-tab-item" :class="{'mui-active':path=='/chat/messageList'}" @tap="跳转('/chat/messageList')">
                <van-icon class="mui-icon" name="chat-o" :info="未读总条数>0 ? '·' :''" />
                <span class="mui-tab-label">消息</span>
            </a>
            <a class="mui-tab-item" :class="{'mui-active':path=='/discovery'}"  @tap="跳转('/discovery')">
                <span class="mui-icon icon iconfont icon-faxian"></span>
                <span class="mui-tab-label">发现</span>
            </a>
            <a class="mui-tab-item" :class="{'mui-active':path=='/chat/contactsList'}"  @tap="跳转('/chat/contactsList')">
                <!-- <span class="mui-icon icon iconfont icon-shujuku"></span> -->
                <van-icon class="mui-icon icon" name="friends-o" :info="聊天2.请求验证.length>0 ? 聊天2.请求验证.length : '' "/>
                <span class="mui-tab-label">通讯录</span>
            </a>
            <a class="mui-tab-item" :class="{'mui-active':path=='/my'}" @tap="跳转('/my')">
                <div class="mui-icon icon iconfont icon-wode">
                    <!-- <span class="mui-badge" v-show="未读总条数">{{未读总条数>99 ? '99+' : 未读总条数}}</span> -->
                </div>
                <span class="mui-tab-label">我的</span>
            </a>
        </nav>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
    name:"",
    data() {
        return {
            显示下载:true,
            active:0,
            urlList:['/home/home'],
            // className:""
        }
    },
    computed: {
        ...mapState({
            config:'config',
            聊天2:x=>x.聊天2
        }),
        ...mapGetters({
            未读总条数:'私聊/未读总条数'
        }),
        path(){
            return this.$route.path
        },
        route(){
            return this.$route
        },
        下载地址(){
            if(typeof website == "object"){
                var url = location.hostname.replace('www.','');
                // var url='1996997.com';   //
                var obj={}
                if (website.list.hasOwnProperty(url)) {
                    var key = website.list[url]
                    if (website.hasOwnProperty(key)) {
                        obj = website[key]
                    }
                }
                if(obj.app_download){
                    return obj.app_download
                }else{
                    return config.app_download;
                }
            }else{
                return config.app_download;
            }
        },
    },
    methods: {
        download1(){
            window.open(this.下载地址)
            console.log('下载App')
            // if(this.config.newTeYao && this.config.newTeYao.url_list){
            //     var hostname = location.hostname
            //     var o = this.config.newTeYao.url_list.find(x=>hostname.includes(x))
            //     if(o){
            //         console.log('自定义下载')
            //         var u = navigator.userAgent;
            //         var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            //         var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            //         if(isiOS){
            //              var ua = navigator.userAgent.toLowerCase();
            //             //判断是不是在iPhone的Safair浏览器打开的本页面
            //             if (ua.indexOf('applewebkit') > -1 && ua.indexOf('mobile') > -1 && ua.indexOf('safari') > -1 &&
            //                 ua.indexOf('linux') === -1 && ua.indexOf('android') === -1 && ua.indexOf('chrome') === -1 &&
            //                 ua.indexOf('ios') === -1 && ua.indexOf('browser') === -1) {
            //                 this.className = 'show'
            //             }else {
            //                 mui.alert('请使用苹果自带浏览器，Safari浏览器下载','提示','确定')
            //             }
            //         }else{
            //             window.open(this.下载地址)
            //         }
            //     }else{
            //         window.open(this.下载地址)
            //     }
            // }else{
            //     window.open(this.下载地址)
            // }
        },
        跳转(type){
            this.$router.push(type);
        },
        change(){
            console.log(this.active)
            switch (this.active) {
                case 0:
                    this.$router.push('/home/home')     
                    break;
                case 1:
                    this.$router.push('/dating')
                    break
                case 2:
                    this.$router.push('/kaijiang')
                    break
                case 3:
                    this.$router.push('/zhudan');
                    break
                case 4:
                    this.$router.push('/my')
                    break
                default:
                    break;
            }
        }
    },
    mounted() {
        if(window.plus){
            this.显示下载=false
        }else{
            document.addEventListener('plusready', ()=>{
                this.显示下载=false
            });
        }
        // 判断是不是ios 桌面快捷方式
        if(window.navigator.standalone){
            this.显示下载=false
        }
        
        // document.querySelector('link[rel="apple-touch-icon"]').href='static/image/logo.png';
        // document.querySelector('meta[name=apple-mobile-web-app-title]').content='标题'
        // $('head').append('<link rel="apple-touch-icon" href="static/image/logo.png"/>')
        // $('head').append('<meta name="apple-mobile-web-app-title" content="图片标题">')
    },
}
</script>

<style lang="scss" scoped>
.mui-bar-tab{
//     background: #ffffff;
    box-shadow: 0 0 5px 0px rgba(177, 177, 177, 0.85);
}

.mui-bar-tab .mui-tab-item{
    color: #3c3c3c;
}
.mui-bar-tab .mui-tab-item.mui-active{
    color: #007aff;
}
.van-icon{
    display: block;
    margin: 0px auto;
}
// .下载提示{
//     position: fixed;
//     bottom: 100%;
//     left: 0px;
//     z-index: 22;
//     width: 100%;
//     img{
//         width: 100%;
//     }
//     div{
//         width: _vw(50);
//         height: _vw(50);
//         position: absolute;
//         top: 0px;
//         right: 0px;
//     }
// }
// .下载提示.show{
//     bottom: 2%;
//     transition: all 0.3s;
// }

.红包{
    .bg{
        position: absolute;
        top: -18px;
        left: 0px;
        right: 0px;
        width: 54px;
        height: 54px;
        margin: auto;
        z-index: 21;        
    }
}


.点击下载 {
    position: fixed;
    // position: absolute;
    left: 0px;
    bottom: 50px;
    width: 100%;
    z-index: 1;
    overflow: hidden;
    height: 49px;
    z-index: 4;
    img {
        width: 100%;
    }
    div {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        color: #ffffff;
        font-size: 14px;
        padding: 10px 10px 0px;
        span {
            flex-grow: 1;
        }
        i {
            font-weight: bold;
            margin: 0px 10px 0px 0px;
        }
        button {
            width: 70px;
            height: 28px;
            padding: 0px;
            color: red;
        }
    }
}


@media only screen and (device-width : 375px) and (device-height : 812px) and (-webkit-device-pixel-ratio : 3) {
    .点击下载{
        bottom: 70px;
    }
    .底部导航{
        padding-bottom: 20px;
    }
}
/*iPhone XS max 适配*/
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio:3) {
    .点击下载{
        bottom: 70px;
    }
    .底部导航{
        padding-bottom: 20px;
    }
}
/*iPhone XR max 适配*/
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio:2) {
    .点击下载{
        bottom: 70px;
    }
    .底部导航{
        padding-bottom: 20px;
    }
}

</style>
