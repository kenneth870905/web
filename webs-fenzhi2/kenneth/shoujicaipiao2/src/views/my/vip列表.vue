<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">VIP列表</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <van-steps direction="vertical" :active="当前index">
                <van-step v-for="(item, index) in 等级列表.VipList" :key="index">
                    <div class="item">
                        <div>
                            <div v-if="item.HasImg">
                                <img :src="config.api_url+'/App_Upload/Vip/'+item.Name+'.png'" alt="" srcset="">
                            </div>
                            <div v-if="!item.HasImg">
                                {{item.Name}}
                            </div>
                            <div>存款大于：{{item.Number}}</div>
                        </div>
                        <div>
                            <!-- <i v-if="当前index==index" class="选中 icon iconfont icon-xianshi_xuanzetianchong"></i> -->
                        </div>
                    </div>
                </van-step>
            </van-steps>
            
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    name:"",
    data() {
        return {
            等级列表:[]
        }
    },
    computed: {
        ...mapState({
            等级:x=>x.user.等级,
            config:'config'
        }),
        当前index(){
            if(!this.等级.MemberVipName){
                return 0
            }else if(this.等级列表.VipList){
                var index = this.等级列表.VipList.findIndex(x=>x.Name == this.等级.MemberVipName)
                return index;
            }else{
                return 0
            }
        }
    },
    methods: {
        ...mapActions({
            获取个人等级:'user/获取个人等级'
        })
    },
    mounted() {
        if(!this.等级.MemberVipName){
            this.获取个人等级()
        }
        this.$axios.post(config.api_url+'/MAPI/member/GetLevelList').then(x=>{
            this.等级列表=x.data;
        })
    },
}
</script>

<style lang="scss" scoped>
.item{
    // border: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
    padding: _vw(10);
    display: flex;
    align-items: center;
    img{
        height: _vw(24);
    }
    .选中{
        font-size: _vw(24);
        margin: 0px 0px 0px _vw(10);
    }
}
/deep/ .van-step--vertical .van-step__circle-container{
    top: 36%;
}
/deep/ .van-step__line{
    top: 36%;
}
/deep/ .van-step--vertical.van-step--process .van-icon{
    top: 36%;
}
/deep/ .van-step__circle{
    top: 36%;
}

/deep/ .van-step--vertical.van-step--process .van-icon{
    font-size: 16px;
}
</style>