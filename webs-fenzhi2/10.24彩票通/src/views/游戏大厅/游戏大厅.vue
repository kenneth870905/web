<template>
    <div class="大厅">
        <header class="mui-bar mui-bar-nav" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a> -->

            
            <button @click="切换玩法()" v-show="查看类型1==0" class="btn_1 mui-btn mui-btn-blue mui-btn-link mui-pull-left">
                {{彩票玩法==2 ? '官方' : "信用"}}
            </button>
              <div v-show="查看类型1==1"></div>
            <h1 class="mui-title">
                <ul class="type">
                    <li :class="{'active':查看类型1==0}" @click="设置state(['查看类型1',0])">彩票</li>
                    <li :class="{'active':查看类型1==1}" @click="设置state(['查看类型1',1])">游戏</li>
                </ul>
            </h1>
              <div v-show="查看类型1==1"></div>

            <button @click="$router.push('/qbcz')" v-show="查看类型1==0" class="btn_1 mui-btn mui-btn-blue mui-btn-link mui-pull-right">
                全部彩种
            </button>
            <!-- <button @click="额度转换()" v-show="查看类型1==1" class="btn_1 mui-btn mui-btn-blue mui-btn-link mui-pull-right">
                额度转换
            </button> -->
        </header>
        <div class="mui-content">
            <!-- 彩票 -->
            <cp v-if="查看类型1==0"/>
            <!-- 游戏 -->
            <yx v-if="查看类型1==1"/>
        </div>
    </div>
</template>

<script>

const yx =()=>import('@/views/游戏大厅/components/大厅/游戏.vue');
const cp =()=>import('@/views/游戏大厅/components/大厅/彩票.vue');
// import yx from '@/views/游戏大厅/components/大厅/游戏.vue'
// import cp from '@/views/游戏大厅/components/大厅/彩票.vue'
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    name: "",
    components:{
        yx,
        cp
    },
    data() {
        return {
            bai: {
                color: "#ffffff",
                topbj: "#5dadff",
            },
            hei: {
                color: "#eacd91",
                topbj: "#1d1e23",
            }
        }
    },
    computed: {
        ...mapState({
            查看类型1:x=>x.游戏大厅.查看类型1,
            彩票玩法:x=>x.user.彩票玩法,
             皮肤切换: '皮肤切换',
        }),
        皮肤区分() {
            if (this.皮肤切换 == true) {
                return this.bai
            } else {
                return this.hei
            }
        },
    },
    methods: {
        ...mapMutations({
            '设置state':'游戏大厅/设置state',
            user设置state:'user/设置state',
        }),
        ...mapActions({
            '初始化':"游戏大厅/初始化"
        }),
        额度转换(){
            // mui.toast('功能开发中',{ duration:'long', type:'div' }) 
            this.$router.push('/edzh')
        },
        切换玩法(){
            this.user设置state(['彩票玩法',this.彩票玩法==2 ? 1 : 2])
        }
    },
    mounted() {
        this.初始化()
    },
}
</script>

<style lang="scss" scoped>
.mui-bar-nav{
    box-shadow: none;
    justify-content: space-between;
    display: flex;
    height: _vw(44);
    align-items: center;
    position: fixed;
    left:0px;
    top:0px;
    width: 100%;
    .mui-title{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
    .btn_1{
        font-size: 14px;
        background: none;
        // color:#ffffff;
        border:none;
        font-size: _vw(14)
    }
    .type{
        width: 140px;
        display: flex;
        height: _vw(26);
        border: 2px solid #ffffff;
        border-radius: 5px;
        margin: 0px auto;
        li{
            width: 50%;
            // color: #ffffff;
            line-height: 28px;
            text-align: center;
            font-size: _vw(15);
            line-height: _vw(26);
        }
        .active{
            background: #ffffff;
            @include textcolor;
        }
    }
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.mui-content{ 
    padding-bottom: 50px;
    padding-top:_vw(44);
    .mui-fullscreen{
       padding-top:0px;
    }
}


// $stars: (
//     (color:red,name:"红色"),
//     (color:#1cc542,name:"绿色")
// );

// @for $i from 1 through length($stars) {
//     $item: nth($stars, $i);
//     .item_#{map-get($item, name)}{
//         color: map-get($item, color);
//         border:1px solid map-get($item, color);
//     }
// }

</style>
