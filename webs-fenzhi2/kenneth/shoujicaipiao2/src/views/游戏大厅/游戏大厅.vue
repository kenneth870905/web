<template>
    <div class="大厅">
        <header class="mui-bar mui-bar-nav">
            <!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a> -->

            
            <button @tap="切换玩法()" v-show="查看类型1==0" class="btn_1 mui-btn mui-btn-blue mui-btn-link mui-pull-left">
                {{彩票玩法==2 ? '官方' : "信用"}}
            </button>

            <h1 class="mui-title">
                <ul class="type">
                    <li :class="{'active':查看类型1==0}" @click="设置state(['查看类型1',0])">彩票</li>
                    <li :class="{'active':查看类型1==1}" @click="设置state(['查看类型1',1])">游戏</li>
                </ul>
            </h1>
            
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
        }
    },
    computed: {
        ...mapState({
            查看类型1:x=>x.游戏大厅.查看类型1,
            彩票玩法:x=>x.user.彩票玩法
        })
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
    .mui-title{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
    .btn_1{
        font-size: 14px;
    }
    .type{
        width: 140px;
        display: flex;
        height: 30px;
        border: 2px solid #ffffff;
        border-radius: 5px;
        margin: 0px auto;
        li{
            width: 50%;
            color: #ffffff;
            line-height: 28px;
            text-align: center;
        }
        .active{
            background: #ffffff;
            @include textcolor;
        }
    }
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.mui-content{
    // background: #ffffff;
    padding-bottom: 50px;
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
