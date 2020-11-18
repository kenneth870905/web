<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <div class="logo">
                {{config.title}}
            </div>
            <div class="切换路线">
                <div class="当前路线">
                    <span @click="展开路线()">
                        {{api路线 ? api路线.title : ''}}
                    </span>
                    <i  @click="展开路线()" class="箭头 icon iconfont icon-icon-arrow-bottom2"></i>
                </div>
                <div class="路线选择" v-if="显示路线">
                    <div class="遮罩" @click="显示路线=false"></div>
                    <ul class="list mui-table-view" v-if="api路线">
                        <li @click="选择路线(item)" :class="{active:api路线.title==item.title}" class="mui-table-view-cell item" v-for="(item, index) in config.Line" :key="index">
                            <div class="icon_box"><i class="icon iconfont icon-xianshi_xuanzetianchong"></i></div>
                            <div class="标题">
                                <span>{{item.title}}</span>
                                <img v-if="index==0" :src="config.img_url+'static/image/huo.png'" alt="" srcset="">
                                <span v-if="最快.title==item.title" class="红色">最优</span>
                            </div>
                            <div class="时间">
                                <i v-if="item.测速" class="加载 icon iconfont icon-jiazai"></i>
                                <!-- <span v-if="item.time" class="time">{{item.time}}ms</span> -->
                                <xh :time="item.time" v-if="item.time" />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="登录注册">
                <div v-if="!userinfo.UserId" class="btn_1" @tap="$router.push('/login')">登录</div>
                <div v-if="!userinfo.UserId" class="btn_1" @tap="$router.push('/register')">注册</div>
                <div v-if="userinfo.UserId" @click="$router.push('/my')">{{userinfo.UserId}}</div>
            </div>
        </header>

    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
const xh = ()=>import('@/components/信号.vue')
export default {
    name:"",
    components:{
        xh
    },
    data() {
        return {
            最快:{},
            显示路线:false,
        }
    },
    computed: {
        ...mapState({
            config:"config",
            userinfo:x=>x.user.userinfo,
            api路线:x=>x.user.api路线
        })
    },
    methods: {
        ...mapMutations({
            user设置state:'user/设置state'
        }),
        ...mapActions({
            修改config:"修改config",
            读取配置:'读取配置',
            getUserInfo:'user/getUserInfo'
        }),
        测试时间(src){
            return new Promise((resolve, reject) => {
                var t1=new Date().getTime();
                var img=new Image();
                    img.src=src+'/'+t1+'.png';
                    img.onload=()=>{
                        let t2=new Date().getTime();
                        setTimeout(() => {
                            resolve(t2-t1);                     
                        }, 300);
                    }
                    img.onerror=()=>{
                        let t2=new Date().getTime();
                        setTimeout(() => {
                            resolve(t2-t1);               
                        }, 300);
                    }
            });
        },
        async 测速(){
            this.config.Line.forEach(item => {
                this.$set(item,'time','')
                this.$set(item,'测速',false)
            });
            for (let i = 0; i < this.config.Line.length; i++) {
                this.config.Line[i].测速 = true
                var r = await this.测试时间(this.config.Line[i].url)
                this.$set(this.config.Line[i],'测速',false)
                this.$set(this.config.Line[i],'time',r)
            }
            var list=JSON.parse(JSON.stringify(this.config.Line))
                list=list.sort((x,y)=>{
                    return x.time-y.time
                })
            this.最快=list[0]
        },
        展开路线(){
            this.显示路线=!this.显示路线;
            if(this.显示路线){
                this.测速()
            }
        },
        选择路线(item){
            mui.confirm('切换路线可能会导致重新登录，是否继续？','提示',['取消','确定'],(value)=>{
                if(value.index==1){
                    this.user设置state(['api路线',item])
                    this.config.api_url=item.url;
                    this.显示路线=false;
                    this.getUserInfo()
                    // this.修改config();
                    this.读取配置()
                }
            },'div')
        }
    },
    mounted() {
        // 加密
        // var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(Line), '123456');
        // // ciphertext.toString() //加密后字符串
        // // 解密
        // var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), '123456');
        // var plaintext = bytes.toString(CryptoJS.enc.Utf8);
        // console.log(ciphertext.toString());
    },
}
</script>

<style lang="scss" scoped>
.mui-bar-nav{
    position: relative;
    // position: absolute;
    position: sticky;
    top: -1px;
    z-index: 21;
    // span{
    //     line-height: 44px;
    //     color: #ffffff;
    //     font-size: 14px;
    // }
    .logo{
        float: left;
        height: 100%;
        display: flex;
        align-items: center;
        color: #ffffff;
        font-size: 14px;
        img{
            height: 30px;
        }
    }
}
.当前路线{
    color: #ffffff;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 14px;
    line-height: 44px;
    .箭头{
        font-size: 12px;
        margin: 0px 3px;
    }
}
.切换路线{
    position: relative;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
}
.路线选择{
    position: absolute;
    width: 100%;
    top: 44px;
    color: #000000;
    .遮罩{
        background: rgba(0,0,0,0.3);
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0px;
        top: 44px;
    }
    .list{
        position: relative;
        z-index: 1;
        background: #ffffff;
        .item{
            display: flex;
            align-items: center;
        }
        .item.active{
            .icon_box{
                i{
                    display: block;
                }
            }
        }
        .icon_box{
            width: 20px;
            flex-shrink: 0;
            margin: 0px 3px 0px 0px;
            color: #019a00;
            i{
                font-size: 20px;
                display: none;
            }
        }
        .标题{
            width: 100%;
            text-align: left;
            font-size: 14px;
            display: flex;
            align-items: center;
            .红色{
                color: red;
                margin: 0px 0px 0px 3px;
            }
        }
        .时间{
            flex-shrink: 0;
            white-space: nowrap;
            .加载{
                display: inline-block;
                animation: xuanzhuan 1s linear infinite;
            }
            .time{
                font-size: 12px;
                color: #444444;
            }

        }
    }
    img{
        height: 20px;
        margin: 0px 0px 0px 5px;
    }
}

@keyframes xuanzhuan {
    0%{
        transform: rotate(0deg)
    }100%{
        transform: rotate(360deg)
    }
}


.登录注册{
    position: absolute;
    top: 0px;
    right: 5px;
    color: #ffffff;
    font-size: 12px;
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 2;
    .btn_1{
        padding: 3px 5px;
        border: 1px solid #ffffff;
        margin: 0px 3px;
    }
}
</style>