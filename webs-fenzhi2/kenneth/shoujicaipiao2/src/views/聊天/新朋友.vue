<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">好友请求</h1>
            <!-- <button @click="添加()" class="mui-btn mui-btn-blue mui-btn-link mui-pull-right">添加</button> -->
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="mui-table-view box_1" v-show="聊天2.请求验证.length>0">
				<li class="mui-table-view-cell item" v-for="(item, index) in 聊天2.请求验证" :key="index">
                    <div class="img_box">
                        <!-- <i class="icon iconfont icon-touxiang"></i> -->
                        <img v-if="!item.ImgId" :src="`${config.img_url}static/image/touxiang/wutu.jpg`" alt="" srcset="">
                        <img v-else :src="`${config.img_url}static/image/touxiang/${item.ImgId}`" alt="" srcset="">
                    </div>
                    <div class="text_1">
                        <div>
                            {{item.NickName ? item.NickName : item.FriendId}}
                        </div>
                        <div>
                            请求添加好友
                        </div>
                    </div>
                    <div class="btn_list">
                        <van-button @click="set(item,2)" size="small" plain type="info">拒绝</van-button>
                        <van-button @click="set(item,1)" size="small" plain type="danger">同意</van-button>
                    </div>
				</li>
            </ul>
            <nodata v-show="聊天2.请求验证.length==0" str="暂无好友请求"/>
        </div>
    </div>
</template>

<script>
import { api_更新好友状态 } from "@/api/聊天接口.js";
import nodata from "@/components/nodata.vue";
import { mapState, mapMutations , mapActions } from "vuex";
export default {
    name:"",
    components:{
        nodata
    },
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState({
            config:"config",
            聊天2:x=>x.聊天2 
        })
    },
    methods: {
        ...mapMutations({
            加载中:'加载中'
        }),
        ...mapActions({
            获取验证请求:"聊天2/获取验证请求"
        }),
        async set(item,type){
            var a = await this.$dialog.confirm({
                title: '标题',
                message: `确定${type==1 ? '同意':'拒绝'}来自 ${item.NickName ? item.NickName : item.FriendId} 的好友请求？`
            }).then(() => true).catch(() => false)
            if(!a) return
            var obj ={
                    requesterId:item.FriendId,
                    status:type
                }
            this.加载中(true)
            api_更新好友状态(obj).then(x=>{
                // console.log(x)
                if(x.data.code==0){
                    this.$toast('设置成功');
                    history.back()
                    this.获取验证请求()
                }else{
                    this.$toast(x.data.msg)
                }
                this.加载中(false)
            }).catch(err=>{
                this.$toast('系统错误，稍后再试')
                this.加载中(false)
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.box_1{
    .item{
        display: flex;
        align-items: center;
    }
    .img_box{
        margin: 0px 10px 0px 0px;
        font-size: 36px;
        width: 50px;
        height: 50px;
        @include textcolor;
        i{
            display: block;
        }
        img{
            border-radius: 100%;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .text_1{
        flex:1;
        div:nth-child(1){
            font-size: 14px;
            font-weight: bold;
        }
        div:nth-child(2){
            font-size: 12px;
            color: #525252;
        }
    }
    .btn_list{
        button{
            margin: 0px 0px 0px 5px;
        }
    }
}
</style>
