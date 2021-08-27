<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">通讯录</h1>
            <!-- <button @click="添加()" class="mui-btn mui-btn-blue mui-btn-link mui-pull-right">添加</button> -->
        </header>
        <div class="mui-content mui-fullscreen">
            <!-- <div class="查找">
                <input type="search" v-model="serarchName" @focus="焦点=true" @blur="焦点=false">
                <i :class="焦点 ? 'active' : ''" class="mui-icon mui-icon-search"></i>
            </div> -->

            <van-search class="查找" placeholder="搜索本地好友" v-model="serarchName" />
            
            <ul class="list1">
				<li @click="$router.push('/chat/addFriends')">
                    <div class="img_1">
                        <img :src="config.img_url+'static/image/liaotian/添加.png'" alt="">
                    </div>
                    <div>添加</div>
                </li>
				<li>
                    <div class="img_1" @click="$toast('暂未开放')">
                        <img :src="config.img_url+'static/image/liaotian/建群.png'" alt="">
                    </div>
                    <div>建群</div>
                </li>
				<li>
                    <div class="img_1" @click="$toast('暂未开放')">
                        <img :src="config.img_url+'static/image/liaotian/扫一扫.png'" alt="">
                    </div>
                    <div>扫一扫</div>
                </li>
				<li @click="$router.push('/chat/newFriend')">
                    <div class="img_1">
                        <img :src="config.img_url+'static/image/liaotian/新朋友.png'" alt="">
                        <span v-show="聊天2.请求验证.length>0">{{聊天2.请求验证.length}}</span>
                    </div>
                    <div>新朋友</div>
                </li>
				<li>
                    <div class="img_1" @click="$toast('暂未开放')">
                        <img :src="config.img_url+'static/image/liaotian/建群.png'" alt="">
                    </div>
                    <div>群聊</div>
                </li>
            </ul>

            <div class="list2">
                <van-index-bar :sticky="false">
                    <van-index-anchor index="B" />
                        <!-- <ul class="mui-table-view">
                            <li class="mui-table-view-cell item" v-for="(item, index) in newlist" :key="index">
                                <div class="img_1">
                                    <img v-if="item.SenderProfile.ImgId" :src="config.img_url+'static/image/touxiang/'+item.SenderProfile.ImgId" alt="" srcset="">
                                    <img v-if="!item.SenderProfile.ImgId" :src="config.img_url+'static/image/touxiang/wutu.jpg'" alt="" srcset="">
                                </div>
                                <span class="name_1">{{item.SenderProfile.Nickname ? item.SenderProfile.Nickname : item.SenderProfile.MemberId }}</span>
                            </li>
                        </ul> -->
                        <!-- <van-swipe-cell v-for="(item, index) in 私聊state.消息列表" :key="index"> -->
                            <ul class="mui-table-view">
                                <li class="mui-table-view-cell item" v-for="(item, index) in newlist" :key="index" @click="$router.push('/privateChat?Code='+item.Code)">
                                    <div class="img_1">
                                        <img v-if="item.ImgId" :src="config.img_url+'static/image/touxiang/'+item.ImgId" alt="" srcset="">
                                        <img v-if="!item.ImgId" :src="config.img_url+'static/image/touxiang/wutu.jpg'" alt="" srcset="">
                                    </div>
                                    <span  class="name_1">{{item.Nickname ? item.Nickname : item.FriendId }}</span>
                                </li>
                            </ul>
                        <!-- </van-swipe-cell> -->
                    <van-index-anchor index="C" />
                    <van-index-anchor index="D" />
                    <van-index-anchor index="E" />
                </van-index-bar>
            </div>
            <nodata v-if="userList.length==0" str="暂无好友~"/>
            
        </div>
    </div>
</template>

<script>
const nodata=()=>import('@/components/nodata.vue')
import { mapState , mapActions, mapMutations} from "vuex";
import { 时间格式化 } from "@/assets/js/通用.js";
import { api_获取好友列表 , api_待验证请求} from "@/api/聊天接口.js";
import store from '@/store'

export default {
    name:"",
    data() {
        return {
            // 焦点:false,
            serarchName:'',
            userList:[],
            str:'123'
        }
    },
    filters:{
        filter_time(t){
            try {
                return 时间格式化('yyyy.MM.dd hh:mm',t)
            } catch (error) {
                return t
            }
        }
    },
    components:{
        nodata
    },
    computed: {
        ...mapState({
            config:"config",
            私聊state:x=>x.私聊,
            聊天2:x=>x.聊天2
        }),
        newlist(){
            if(!this.serarchName){
                return this.userList
            }
            return this.userList.filter(x=>{
                if(x.NickName && x.NickName.includes(this.serarchName)){
                    return true
                }else if(x.FriendId.includes(this.serarchName)){
                    return true
                }else{
                    return false
                }
                // x.NickName.includes(this.serarchName) || x.MemberId.includes(this.serarchName)
            })
        }
    },
    methods: {
        ...mapMutations({
            加载中:"加载中",
            修改state:"聊天2/修改state"
        }),
        ...mapActions({
            获取消息列表:'私聊/获取消息列表',
            初始化:"聊天2/初始化"
        }),
        添加(){
            this.$toast('暂未开放')
        }
    },
    created() {
        console.log(this.聊天2)
        if(!this.聊天2){
            console.log('注册')
            // store.registerModule('聊天2', 聊天2)
        }
    },
    mounted() {
        this.获取消息列表();

        api_获取好友列表().then(x=>{
            console.log('获取好友列表',x)
            this.userList = x.data.msg;
        }).catch(err=>{
            console.log('获取好友列表错误');
        })


    },
    beforeDestroy() {

    }
}
</script>

<style lang="scss" scoped>
.查找{
    margin: 5px 0px 5px;
    /deep/ input{
        margin: 0px;
        padding: 0px;
        height: 24px;
        background: none;
        text-align: left;
        font-size: 14px;
    }
}

.list1{
    margin: 10px 0px 5px;
    padding: 5px 0px ;
    background: #fff;
    display: flex;
    text-align: center;
    font-size: 12px;
    justify-content: space-around;
    .img_1{
        width: 40px;
        height: 40px;
        position: relative;
        span{
            position: absolute;
            top: -5px;
            right: -5px;
            background: #ec0909;
            color: #fff;
            border-radius: 16px;
            min-width: 16px;
            text-align: center;
            padding: 0px 3px;
        }
        img{
            width: 100%;
            height: 100%;
        }
    }
}

.list2{
    .item{
        display: flex;
        align-items: center;
    }
    .img_1{
        width: 40px;
        height: 40px;
        margin: 0px 10px 0px 0px;
        font-size: 14px;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
        }
    }
}

.标题{
    display: flex;
    padding: _vw(10) _vw(15);
    line-height: _vw(32);
    text-align: center;
    background: #fff;
    font-size: _vw(14);
    li{
        width: 50%;
        border-radius: _vw(32);
    }
    .active{
        background: #d5f3ff;
    }
}

.list_1{
    .item{
        display: flex;
    }
    .img_box{
        width: _vw(50);
        height: _vw(50);
        flex-shrink: 0;
        margin: 0px _vw(10) 0px 0px;
        position: relative;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
        }
        i{
            font-size: _vw(50);
            display: block;
            @include textcolor;
        }
        .未读{
            position: absolute;
            top: 0px;
            right: 0px;
            flex-shrink: 0;
            line-height: _vw(16);
            min-width: _vw(16);
            text-align: center;
            font-size: _vw(12);
            padding: 0px _vw(2);
            color: #fff;
            @include bgcolor;
            border-radius: _vw(16);
            display: inline-block;
            padding: 0px _vw(2);

        }
    }
    .content_1{
        width: calc(100% - #{_vw(60)});
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .title_1{
        display: flex;
        >span:nth-child(1){
            flex-grow: 1;
        }
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .name_1{
        font-size: _vw(14);
    }
    .time{
        font-size: _vw(12);
        color: #a5a5a5;
    }
    .text_1{
        font-size: _vw(13);
        display: flex;
        color: #737373;
    }
    

}

.kaijiang3{
    background: url('~@/assets/bg/22.png') no-repeat;
    position: absolute;
    width: 65px;
    height: 125px;
    top: 194px;
    left: 54px;
    animation: up1 2s linear,up3 2s linear 3;
    animation-delay:5s;
    // animation-iteration-count:3;
}
@keyframes up3{
    0%{
        background-position: -63px 0px;
    }100%{
        background-position: -867px 0px;
    }
}

@keyframes up1 {
    0%{
        background-position: 0px 0px;
    }100%{
        background-position: -63px 0px;
    }
}

</style>