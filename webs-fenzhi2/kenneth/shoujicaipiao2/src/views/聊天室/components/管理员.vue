<template>
    <div class="管理员">
        <div class="内容">
            <div class="title_1">
                房间管理员
                <!-- <span :class="{active:type==0}" @click="type=0">昨日充值排行榜</span> -->
                <i @click="隐藏管理员()" class="icon iconfont icon-guanbi 关闭"></i>
            </div>
            <ul class="mui-table-view list">
				<li class="mui-table-view-cell" @click="$router.push('/privateChat?Code='+item.Code)" v-for="(item, index) in 管理员" :key="index">
					<div class="头像">
                        <i class="icon iconfont icon-gerenzhongxinwoderenwubiaozhuntoumianxing"></i>
                    </div>
                    <div>
                        <div class="name">{{item.Name}}</div>
                        <div class="online">online</div>
                    </div>
				</li>
                <nodata v-if="管理员.length==0" str="暂无在线管理员"/>
            </ul>
        </div>
    </div>
</template>

<script>
import nodata from '@/components/nodata.vue'
import { mapState } from "vuex";
export default {
    name:"",
    components:{
        nodata
    },
    data() {
        return {
            
        }
    },
    inject:['隐藏管理员'],
    computed: {
        ...mapState({
            人员列表:x=>x.聊天室.人员列表
        }),
        管理员(){
            return this.人员列表.filter(x=>x.ChatRole==1)
        }
    },
}
</script>

<style lang="scss" scoped>
.list{
    height: _vw(410);
    overflow: auto;
    background: #ffffff;
    >li{
        display: flex;
        align-items: center;
    }
    .头像{
        width: _vw(40);
        height: _vw(40);
        flex-shrink: 0;
        border-radius: 100%;
        @include textcolor;
        @include border-full(2px);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: _vw(28);
        margin: 0px _vw(10) 0px 0px;
    }
    .name{
        font-size: _vw(14);
    }
    .online{
        color: #698ad9;
        font-size: _vw(12);
    }
    &::after{
        display: none;
    }
}
.管理员{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    z-index: 21;
    display: flex;
    justify-content: center;
    align-items: center;
    .内容{
        width: _vw(320);
        border-radius: _vw(6);
        overflow: hidden;
    }
    .title_1{
        position: relative;
        @include bgcolor;
        height: _vw(44);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        .关闭{
            line-height: _vw(44);
            padding: 0px 10px;
            top: 0px;
            right: 0px;
            color: #ffffff;
            position: absolute;
        }
        span{
            font-size: _vw(12);
            height: _vw(26);
            line-height: _vw(26);
            padding: 0px _vw(10);
            box-shadow: 0px 0px 1px 1px #ffffff;
            &:nth-child(1){
                border-top-left-radius: _vw(26);
                border-bottom-left-radius: _vw(26);
            }
            &:nth-child(2){
                border-top-right-radius: _vw(26);
                border-bottom-right-radius: _vw(26);
            }
            &.active{
                background: #ffffff;
                color: #000000;
            }
        }
    }
}

</style>