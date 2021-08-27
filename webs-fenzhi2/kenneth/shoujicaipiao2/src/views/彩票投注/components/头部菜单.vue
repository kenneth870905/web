<template>
    <div class="菜单详情">
        <div class="遮罩" @click="隐藏菜单()"></div>
        <ul class="mui-table-view list">
            <div class="三角"></div>
            <li></li>
            <li class="mui-table-view-cell item2">
                <i class="icon iconfont icon-fl-renminbi"></i>
                <span class="红色字体">{{userinfo.Money}}</span>
            </li>
            <li v-if="!固定玩法" class="mui-table-view-cell" @click="官信切换()">
                <a class="mui-navigate-right item2">
                    <i class="icon iconfont icon-shuaxin"></i>
                    <span>
                        {{type==1 ? '转到信用玩法' : '转到官方玩法'}}
                    </span>
                </a>
            </li>
            <li @click="$router.push('/my/chongzhi')" class="mui-table-view-cell">
                <a class="mui-navigate-right item2">
                    <i class="icon iconfont icon-card"></i>
                    <span>存款充值</span>
                </a>
            </li>
            <li class="mui-table-view-cell" @click="$router.push('/my/tixian')">
                <a class="mui-navigate-right item2">
                    <i class="icon iconfont icon-fl-renminbi"></i>
                    <span>在线提款</span>
                </a>
            </li>
            <li @click="$router.push('/orders?back=1')" class="mui-table-view-cell">
                <a class="mui-navigate-right item2">
                    <i class="icon iconfont icon-gengduo"></i>
                    <span>购彩记录</span>
                </a>
            </li>
            <li @click="$router.push('/kjzs?id='+id)" class="mui-table-view-cell">
                <a class="mui-navigate-right item2">
                    <i class="icon iconfont icon-libao"></i>
                    <span>开奖历史</span>
                </a>
            </li>
            <li @click="$router.push(`/rule?i=${id}`)" class="mui-table-view-cell">
                <a class="mui-navigate-right item2">
                    <i class="icon iconfont icon-guizexuanzhong"></i>
                    <span>玩法规则</span>
                </a>
            </li>
            <li v-if="config.my.heMai" class="mui-table-view-cell" @click="$router.push('/my/hm')">
                <a class="mui-navigate-right item2">
                    <i class="icon iconfont icon-renyuanxiaozu"></i>
                    <span>
                        合买记录
                    </span>
                </a>
            </li>
            <li @click="$router.push('/my/zxkf')" class="mui-table-view-cell">
                <a class="mui-navigate-right item2">
                    <i class="icon iconfont icon-kefu1"></i>
                    <span>
                        在线客服
                    </span>
                </a>
            </li>
            <li @click="$router.replace(`/cpiframe?i=${id}&t=${type}`)" class="mui-table-view-cell">
                <a class="mui-navigate-right item2">
                    <i class="icon iconfont icon-xin"></i>
                    <span>
                        返回旧版
                    </span>
                </a>
            </li>
            <li class="mui-table-view-cell item">
                <div>
                    <i class="icon iconfont icon-wenhao-"></i>
                    <span>购彩助手</span>
                </div>
                <van-switch v-model="$store.state.user.偏好设置.购彩助手" size="20px" active-color="#07c160" inactive-color="#afafaf" />
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    name: "",
    inject: ['隐藏菜单'],
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            config: "config",
            userinfo: x => x.user.userinfo,
            购彩助手: x => x.user.偏好设置.购彩助手
        }),
        type(){
            return this.$route.query.t ? this.$route.query.t : 1;
        },
        id(){
            return this.$route.query.i
        },
        LineSwitch() {
            try {
                return LineSwitch ? '&lineSwitch=1' : ''
            } catch (error) {
                return ''
            }
        },
        固定玩法() {
            if (!this.id) {
                return false
            }
            var list = ['70', '50', '30']
            var type = this.id.substring(0, 2)
            if (list.find(x => x == type)) {
                return true
            } else {
                return false;
            }
        }
    },
    methods: {
        ...mapMutations({
            user_设置state:'user/设置state'
        }),
        官信切换(){
            if(this.type==1){
                this.user_设置state(['彩票玩法',2])
                this.$router.replace(`buyLottery?i=${this.id}&t=2`);
            }else{
                this.user_设置state(['彩票玩法',1])
                this.$router.replace(`/buyLottery?i=${this.id}`);
            }
        },
    },
    mounted() {
    },
}
</script>

<style lang="scss" scoped>
.菜单详情 {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 10;

    .遮罩 {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
    }
    .list {
        width: 60%;
        position: absolute;
        top: 50px;
        right: 10px;
        border-radius: 10px;
        font-size: _vw(14);
        .三角 {
            width: 15px;
            height: 15px;
            background: #ffffff;
            transform: rotate(45deg);
            position: absolute;
            top: -6px;
            right: 15px;
        }
        .item2 {
            display: flex;
            align-items: center;
            i {
                font-size: 14px;
                margin: 0px 10px 0px 0px;
            }
        }
        .item {
            i {
                margin: 0px 10px 0px 0px;
            }
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>