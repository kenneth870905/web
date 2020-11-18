<template>
    <div v-if="src" class="iframe_box">
        <a class="返回 mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
        <div class="菜单" @click="显示菜单=true">
            菜单
        </div>
        <div class="菜单详情" v-show="显示菜单">
            <div class="遮罩" @click="显示菜单=false"></div>
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
                <li @click="$router.push('/rule')" class="mui-table-view-cell">
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
                <!-- <li @click="$router.replace(`/buyLottery?i=${id}&t=${type}`)" class="mui-table-view-cell">
                    <a class="mui-navigate-right item2">
                        <i class="icon iconfont icon-xin"></i>
                        <span>
                            体验新版
                        </span>
                    </a>
                </li> -->
                <li class="mui-table-view-cell item">
                    <div>
                        <i class="icon iconfont icon-wenhao-"></i>
                        <span>购彩助手</span>
                    </div>
                    <van-switch v-model="$store.state.user.偏好设置.购彩助手" size="20px" active-color="#07c160" inactive-color="#afafaf" />
                </li>
            </ul>
        </div>
        

        <iframe ref="iframe" @load="load_1()" v-if="src" :src="config.iframe_url + src +LineSwitch" frameborder="0"></iframe>
        <xfal v-if="购彩助手"/>
    </div>
</template>

<script>
import xfal from '@/components/悬浮按钮.vue'
import { mapActions, mapMutations, mapState } from 'vuex';
export default {
    name: "",
    components:{
        xfal
    },
    data() {
        return {
            src: "",
            显示菜单:false,
            id:"",
            type:'',
            显示:true,
        }
    },
    computed: {
        ...mapState({
            config:"config",
            userinfo:x=>x.user.userinfo,
            购彩助手:x=>x.user.偏好设置.购彩助手
        }),
        LineSwitch(){
            try {
                return LineSwitch ? '&lineSwitch=1' : ''                
            } catch (error) {
                return ''
            }
        },
        固定玩法(){
            if(!this.id){
                return false
            }
            var list=['70','50','30']
            var type=this.id.substring(0,2)
            if(list.find(x=>x==type)){
                return true
            }else{
                return false;
            }
        }
    },
    methods: {
        ...mapMutations({
            '加载中': "加载中",
            设置state:'投注/设置state'
        }),
        load_1() {
            this.加载中(false);
            // this.$refs.iframe.contentWindow.document.querySelector('.layout-body').style.position='absolute'
            this.$refs.iframe.contentWindow.document.querySelector('.mui-bar-tab').style.position='absolute'
        },
        官信切换(){
            this.src="";
            this.$nextTick(()=>{
                this.显示菜单=false;
                var url='/cpiframe'
                if(this.type==1){
                    this.$router.replace(url+'?i='+this.id+'&t=2');
                }else{
                    this.$router.replace(url+'?i='+this.id);
                }
            })            
        },
        初始化(){
            this.type=this.$route.query.t ? this.$route.query.t : 1 ;
            this.id=this.$route.query.i;
            var 游戏类型 = this.id.substring(0,2);
            console.log(游戏类型);
            if(游戏类型=='70' || 游戏类型=='50' ){
                this.src = '/M/Lottery/Bet/1/' + this.id + '?new=1'
            }else if(游戏类型=='30'){
                this.src = '/M/Lottery/Bet/2/' + this.id + '?new=1'
            }else{
                this.src = '/M/Lottery/Bet/'+this.type+'/' + this.id + '?new=1'
            }
            this.设置state(['彩票id',this.id])
            
        },
    },
    mounted() {
        // this.加载中(true);
        this.初始化()
        var this_1=this
        window.go_1=function(url){
            this_1.$router.push(url)
        }
    },
    destroyed() {
        
    },
    watch: {
        $route(){
            this.初始化()
        }
    },
}
</script>

<style lang="scss" scoped>
.新旧切换{
    position: absolute;
    top: 50px;
    right: 0px;
}
/deep/ .mui-bar.mui-bar-tab{
    position: absolute;
}

.红色字体{
    color: red;
}

.iframe_box{
    height: 100%;
    width: 100%;
    position: fixed;
}

iframe {
    width: 100%;
    height: 100%;
    // padding: 1px 0px;
    overflow: auto;
    // height: 200px;
    // overflow: auto;
}

.返回{
    width: 44px;
    line-height: 44px;
    color: #ffffff;
    text-align: center;
    position: absolute;
    top: 0px;
    left: 0px;
}

.菜单 {
    position: fixed;
    top: 0px;
    right: 0px;
    line-height: 44px;
    right: 12px;
    color: #ffffff;
}

.菜单详情 {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 1;
    
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
        .三角{
            width: 15px;
            height: 15px;
            background: #ffffff;
            transform: rotate(45deg);
            position: absolute;
            top: -6px;
            right: 15px;
        }
        .item2{
            display: flex;
            align-items: center;
            i{
                font-size: 16px;
                margin: 0px 10px 0px 0px;
            }
        }
        .item{
            i{
                margin: 0px 10px 0px 0px;
            }
            display: flex;
            justify-content: space-between;
        }
    }
}

.mui-navigate-right:after, .mui-push-right:after{
    // font-size: _vw(20);
    // right: 10px;
}
</style>


