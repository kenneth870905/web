<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">通讯录</h1>
            <!-- <button @click="添加()" class="mui-btn mui-btn-blue mui-btn-link mui-pull-right">添加</button> -->
        </header>
        <div class="mui-content mui-fullscreen">

            <div class="查找">
                <input type="search" v-model="serarchName" @focus="焦点=true" @blur="焦点=false">
                <i :class="焦点 ? 'active' : ''" class="mui-icon mui-icon-search"></i>
            </div>
            <div class="内容">
                <ul class="mui-table-view list_1">
                    <li class="mui-table-view-cell item" @click="$router.push('/privateChat?Code='+item.SenderProfile.Code)" v-for="(item, index) in newlist" :key="index">
                  <div class="img_box">
                            <img v-if="item.SenderProfile.ImgId" :src="config.img_url+'image/touxiang/'+item.SenderProfile.ImgId" alt="" srcset="">
                            <img v-if="!item.SenderProfile.ImgId" :src="config.img_url+'image/touxiang/wutu.jpg'" alt="" srcset="">
                            <span class="未读" v-if="item.MessageCount>0">
                                {{item.MessageCount > 99 ? '99+' : item.MessageCount}}
                            </span>
                        </div>
                        <div class="content_1">
                            <div class="title_1">
                                <span class="name_1">{{item.SenderProfile.Nickname ? item.SenderProfile.Nickname : item.SenderProfile.MemberId }}</span>
                                <span class="time" v-if="item.Message">{{item.Message.CreateTime | filter_time}}</span>
                            </div>
                            <div class="text_1">
                                <span v-if="item.Message.MessageType==1">{{item.Message.Message}}</span>
                                <span v-if="item.Message.MessageType==4">图片</span>
                            </div>
                        </div>
                    </li>
                </ul>
                <nodata v-if="私聊state.消息列表.length==0" str="暂无消息~"/>
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
            焦点:false,
            serarchName:''
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
        获取数据(){
            this.loading=true
            api_获取消息列表(this.query).then(x=>{
                this.total=x.data.total;
                this.list=[...this.list,...x.data.rows];
                this.loading=false
            }).catch(err=>{
                this.loading=false
            })
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
    display: flex;
    flex-direction: column;
    background: #fff;
    .内容{
        flex:1;
        overflow: auto;
    }
}
.查找{
    border-bottom: 1px solid #eeeeee;
    position: relative;
    padding: _vw(5);
    input{
        margin: 0px;
        padding: 0px;
        height: _vw(30);
        font-size: _vw(14);
        text-align: center;
    }
    i{
        pointer-events:none;
        position: absolute;
        top: 0px;
        left: calc(50% - #{_vw(12)});
        bottom: 0px;
        margin: auto 0px;
        width: _vw(24);
        transition: all 0.3s;
        height: _vw(24);
        &.active{
            left: _vw(12);
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
    // background: url('~@/assets/bg/22.png') no-repeat;
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