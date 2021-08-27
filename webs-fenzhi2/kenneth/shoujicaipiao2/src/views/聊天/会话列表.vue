<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a> -->
            <h1 class="mui-title">消息</h1>
            <!-- <button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right"></button> -->
            <a id="menu" class="mui-action-menu mui-icon mui-icon-bars mui-pull-right" :href="`#${id}`"></a>
        </header>
        <div class="mui-content mui-fullscreen">
            
            <ul class="box_1">
                <van-swipe-cell v-for="(item, index) in 私聊state.消息列表" :key="index">
                    <div class="item" @click="$router.push('/privateChat?Code='+item.SenderProfile.Code)">
                        <div class="img-1">
                            <img v-if="item.SenderProfile.ImgId" :src="config.img_url+'static/image/touxiang/'+item.SenderProfile.ImgId" alt="" srcset="">
                            <img v-if="!item.SenderProfile.ImgId" :src="config.img_url+'static/image/touxiang/wutu.jpg'" alt="" srcset="">
                        </div>
                        <div class="text-1">
                            <div class="title">
                                <span class="name_1">{{item.SenderProfile.Nickname ? item.SenderProfile.Nickname : item.SenderProfile.MemberId }}</span>
                            </div>
                            <div class="msg">
                                <span v-if="item.Message.MessageType==1">{{item.Message.Message}}</span>
                                <span v-if="item.Message.MessageType==4">图片</span>
                            </div>
                        </div>
                        <div class="right-1">
                            <div class="time">{{item.Message.CreateTime | filter_time}}</div>
                            <van-tag round type="danger" v-if="item.MessageCount>0">
                                {{item.MessageCount > 99 ? '99+' : item.MessageCount}}
                            </van-tag>
                            <!-- <van-tag round>99</van-tag> -->
                        </div>
                    </div>
                    <template slot="right">
                        <van-button class="btn_1" square type="danger" text="删除" />
                    </template>
                </van-swipe-cell>
            </ul>
            <nodata v-if="私聊state.消息列表.length==0" str="暂无消息~"/>

            <!--右上角弹出菜单-->
            <div :id="id" class="mui-popover">
                <div class="mui-popover-arrow"></div>
                <div class="mui-scroll-wrapper">
                    <ul class="mui-table-view list1">
                        <li class="mui-table-view-cell" @click="$toast('暂未开放')">
                            <van-icon name="chat-o" />
                            发起群聊
                        </li>
                        <li class="mui-table-view-cell" @click="go('/chat/addFriends')">
                            <van-icon name="add-o" />
                            添加好友
                        </li>
                        <li class="mui-table-view-cell" @click="$toast('暂未开放')">
                            <van-icon name="scan" />
                            扫一扫
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
const nodata=()=>import('@/components/nodata.vue')
import { mapState , mapActions, mapMutations} from "vuex";
import { 时间格式化 } from "@/assets/js/通用.js";
export default {
    name:"",
    data() {
        return {
            // 焦点:false,
            serarchName:'',
            id:new Date().getTime()
        }
    },
    filters:{
        filter_time(t){
            try {
                // return 时间格式化('yyyy.MM.dd hh:mm',t)
                return 时间格式化('MM-dd hh:mm',t)
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
            私聊state:x=>x.私聊
        }),
        newlist(){
            // return this.私聊state.消息列表.filter(x=>x.SenderProfile.MemberId.includes(this.serarchName) || x.SenderProfile.Nickname.includes(this.serarchName) )
            return this.私聊state.消息列表.filter(x=>{
                var a=false;
                    if(x.SenderProfile.MemberId.includes(this.serarchName)){
                        a=true
                    }
                    if(x.SenderProfile.Nickname){
                        a = x.SenderProfile.Nickname.includes(this.serarchName)
                    }
                return a
            })
            
        }
    },
    methods: {
        ...mapMutations({
            加载中:"加载中"
        }),
        ...mapActions({
            获取消息列表:'私聊/获取消息列表'
        }),
        go(path){
            mui(`#${this.id}`).popover('toggle');//show hide toggle
            this.$router.push(path)
        },
        添加(){
            this.$toast('暂未开放')
        }
    },
    mounted() {
        this.获取消息列表()
        // this.私聊初始化();
        // this.初始化();
    },
    beforeDestroy() {
    },
}
</script>

<style lang="scss" scoped>
.mui-content{
    background: #fff;
}
.box_1{
    .item{
        display: flex;
        padding:_vw(7) _vw(15);
        border-bottom: 1px solid #f3f3f3;
        align-items: center;
    }
    .img-1{
        width: _vw(50);
        height: _vw(50);
        flex-shrink: 0;
        margin: 0px _vw(7) 0px 0px;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
        }
    }
    .text-1{
        flex:1;
        width: 0;
        .title{
            font-size: _vw(16);
            margin: 0px 0px 3px 0px;
        }
        .msg{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: _vw(12);
            color: #87888a;
        }
    }
    .right-1{
        white-space: nowrap;
        margin: 0px 0px 0px _vw(10);
        flex-shrink: 0;
        text-align: right;
        .time{
            font-size: _vw(12);
            color: #696969;
        }
    }
    .van-tag{
        padding: 0px 5px;
    }
    .btn_1{
        height: 100%;
    }
}

// 右上角弹出菜单
.mui-popover{
    width: 150px;
    height: 150px;
}
.list1{
    font-size: 14px;
    .mui-table-view-cell:last-child:after{
        height: 1px;
    }
    li{
        display: flex;
        align-items: center;
        .van-icon{
            font-size: 22px;
            margin: 0px 10px 0px 0px;
            @include textcolor;
        }
    }
}
</style>
