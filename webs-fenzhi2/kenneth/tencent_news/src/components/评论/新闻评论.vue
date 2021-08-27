<template>
    <div class="评论">
        <div class="img_1">
            <img :src="obj.photo" v-if="obj.photo" />
            <van-icon name="manager" v-else />
        </div>
        <div class="content">
            <div class="title_1">
                <div class="name">{{obj.nickname ? obj.nickname : obj.userName}}</div>
                <div class="zan" :class="{'active':obj.isDianZan}" @click="点赞()">
                    <span>{{obj.dianzhanCount}}</span>
                    <van-icon name="good-job" />
                </div>
            </div>
            <div @click="$router.push(`/pl?rid=${obj.id}&newId=${$route.query.id}`)" class="回复内容">{{obj.text}}</div>
            <div @click="$router.push(`/pl?rid=${obj.id}&newId=${$route.query.id}`)" class="time">
                <span>{{obj.creationTime | ft}}</span>
                <span>{{obj.huiFuCount}}回复</span>
                <!-- <span @click="显示回复框(obj.id,'')">{{obj.huiFuCount}}回复</span> -->
            </div>
            <ul @click="$router.push(`/pl?rid=${obj.id}&newId=${$route.query.id}`)" class="回复" v-if="obj.huiFuList && obj.huiFuList.total>0">
                <li v-for="(item, index) in obj.huiFuList.data" :key="index">
                    <span class="name_1">{{item.nickname ? item.nickname : item.userName }}</span>
                    <span class="type1" v-if="item.revertObj">回复</span>
                    <span class="name_1" v-if="item.revertObj">{{item.revertObj.nickname ? item.revertObj.nickname : item.revertObj.userName }}</span>:
                    {{item.text}}
                </li>
                <li class="提示">
                    <span>查看全部{{obj.huiFuList.total}}条回复</span>
                    <van-icon name="arrow" />
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import moment from 'moment'
import qs from 'qs'
export default {
    name:"",
    // inject:['显示回复框'],
    props:{
        obj:{
            default:()=>{}
        }
    },
    data() {
        return {
            
        }
    },
    filters:{
        ft(t){
            if(!t) return t;
            return moment(t).format('hh:mm')
        }
    },
    methods: {
        点赞(){
            this.$toast.loading({mask: true,duration:0})
            this.$axios.post('/DianZan/save?a=123', {reviewId:this.obj.id} ).then(x=>{
                this.$toast.clear();                
                if(x.data.code==1){
                    if(this.obj.isDianZan){
                        this.obj.dianzhanCount--
                    }else{
                        this.obj.dianzhanCount++
                    }
                    this.obj.isDianZan = !this.obj.isDianZan
                }else{
                    this.$toast(x.data.message)
                }
            }).catch(err=>{
                this.$toast('系统错误')
            })
        }
    },
    mounted() {
        // console.log(moment("2019-10-23 12:45:31").format('HH:mm'))
    },
}
</script>

<style lang="scss" scoped>
.评论{
    display: flex;
    padding: _vw(12) _vw(15);
    .img_1{
        width: _vw(32);
        height: _vw(32);
        margin: 0px _vw(10) 0px 0px;
        flex-shrink: 0;
        background: #ececec;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #888888;
        font-size: _vw(20);
        img{
            width: 100%;
            height: 100%;
        }
    }
    .content{
        flex:1;
        border-bottom:1px solid #eeeeee;
    }
    .title_1{
        margin: 0px 0px _vw(10) 0px;
        display: flex;
        .name{
            font-weight: bold;
            flex:1;
            font-size: _vw(14);
        }
        .zan{
            font-size: _vw(12);
            color: rgb(130, 140, 155);
            margin:0px 0px 0px _vw(5);
            display: flex;
            align-items: center;
            &.active{
                color:rgb(68, 138, 255);
            }
            i{
                font-size: _vw(18);
                margin: 0px 0px 0px _vw(3);
            }
        }
    }
    
    .time{
        display: flex;
        font-size: _vw(12);
        align-items: center;
        margin: _vw(10) 0px;
        span:nth-child(1){
            color: #adadad;
        }
        span:nth-child(2){
            padding: 0px _vw(5);
            background: #ececec;
            border-radius: _vw(16);
            margin: 0px 0px 0px _vw(5);
        }
    }
}

.回复内容{
    font-size: _vw(15);
    color: #4e4e4e;
    line-height: _vw(24);
    word-break: break-word;
    white-space:pre-line;
}
.回复{
    background: #f8f8f8;
    padding: _vw(5) _vw(10);
    li{
        color: #6f6f6f;
        margin: _vw(5) 0px;
        font-size: _vw(15);
        .name_1{
            font-weight: bold;
            color: #000000;
        }
        .type1{
            margin: 0px _vw(3);

        }
    }
    .title_2{
        font-size: _vw(14);
        font-weight: 700;
        span:nth-child(2){
            color: #9e9e9e;
            margin: 0px _vw(5);
        }
    }
    .提示{
        color: #60a1f1;
        display: flex;
        align-items: center;
        margin-bottom: 0px;
        font-size: _vw(12);
    }
}
</style>
