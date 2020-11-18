<template>
    <div class="开奖走势">
        <div ref="offCanvasWrapper" class="mui-off-canvas-wrap">

            <!--主界面部分-->
            <div class="mui-inner-wrap">
                <!--侧滑菜单部分-->
                <aside id="offCanvasSide" class="mui-off-canvas-left">
                        <ul class="切换彩种">
                            <li v-for="(item, index) in 分类彩票" :key="index">
                                <div class="标题">
                                    {{item.title}}
                                  
                                </div>
                                <ul class="list">
                                    <li v-for="(item1, index1) in item.children" :key="index1">
                                        <div @tap="选择彩种(item1)">{{item1.title}}</div>
                                    </li>
                                </ul>                   
                            </li>
                        </ul>
                </aside>

                <!-- 头部 -->
                <header class="mui-bar mui-bar-nav"  @click="$router.back()">
                    <a class=" mui-icon mui-icon-left-nav mui-pull-left"></a>
                    <h1 class="mui-title" @tap="展开()">
                        <div class="title_1">
                            <div>
                                {{当前彩票.title}}
                            <i class="fa fa-sort-desc"></i>
                            </div>
                        </div>
                    </h1>
                    <a @tap="选择时间()" v-if="当前彩票.id!='30000' && 当前彩票.id!='30001'" class="选择时间 mui-btn mui-btn-link mui-pull-right">
                        <span v-if="时间">{{时间 | 时间格式}}</span>
                        <span v-else>选择日期</span>
                        <i class="van-icon van-icon-arrow-down"></i>
                    </a>
                </header>
                <!-- <div class="mui-content mui-fullscreen"> -->
                <div class="mui-content mui-scroll-wrapper">
                    <!-- <div class="mui-scroll"> -->
                        <router-view :is="kszs"></router-view>
                    <!-- </div> -->
                </div>
                <!-- off-canvas backdrop -->
                <div class="mui-off-canvas-backdrop"></div>
            </div>
        </div>

        
        <van-popup v-model="显示时间" position="bottom" :overlay="true" :close-on-click-overlay="false">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                :max-date="maxDate"
                @confirm="changeTime"
                @cancel="quxiao"    
            />
        </van-popup>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import { 时间格式化 } from "@/assets/js/通用.js";
export default {
    name: "",
    data() {
        return {
            显示时间:false,
            // minDate: new Date(),
            maxDate: new Date(),
            currentDate: new Date(),
            kszs:"",
        }
    },
    filters:{
        时间格式(time){
            return 时间格式化('yyyy.MM.dd',time)
        }
    },
    computed: {
        ...mapState({
            彩种: state => state['投注']['彩种'],
            当前彩票:x=>x.开奖走势.当前彩票,
            时间:x=>x.开奖走势.时间
        }),
        ...mapGetters({
            分类彩票:'分类彩票',
        })
    },
    methods: {
        ...mapActions({
            获取游戏彩票:'获取游戏彩票',
            初始化:"开奖走势/初始化",
            获取开奖记录:'开奖走势/获取开奖记录'
        }),
        ...mapMutations({
            设置state:'开奖走势/设置state'
        }), 
        展开() {
            mui(this.$refs.offCanvasWrapper).offCanvas('show');
        },
        选择彩种(item){
            console.log(1)
            // mui(this.$refs.offCanvasWrapper).offCanvas('close');
            mui(this.$refs.offCanvasWrapper).offCanvas().close()
            if(this.$route.query.zs){
                this.$router.replace('?id='+item.id+'&zs=1');
            }else{
                this.$router.replace('?id='+item.id);
            }
        },
        选择时间(){
            this.显示时间=true;
        },
        changeTime(value){
            console.log(value)
            this.设置state(['时间',value]);
            this.显示时间=false;
            this.获取开奖记录();
        },
        quxiao(){
            this.显示时间=false;
        },
        加载组件(){
            var type=this.当前彩票.id.substring(0,2);
            console.log(type)
            if(type=='40'){
                this.kszs=()=>import('./快三/快三.vue');
            }else if(type=='20'){
                this.kszs=()=>import('./pk10/pk10.vue');
            }else if(type=='10'){
                this.kszs=()=>import('./时时彩/时时彩.vue');
            }else if(type=='70'){
                this.kszs=()=>import('./六合彩/六合彩.vue');
            }else if(type=='50'){
                this.kszs=()=>import('./28/28.vue');
            }else if(type=='60'){
                this.kszs=()=>import('./11选5/11选5.vue');
            }else if(type=='30'){
                this.kszs=()=>import('./3d/3d.vue');
            }else if(this.type=='klsf'){
                this.kszs=()=>import('./快乐十分/快乐十分.vue');
            }else if(this.type=='pl5' || this.type=='qxc'){
                this.kszs=()=>import('./排列五/排列五.vue');
            }else if(this.type=='ssl'){
                this.kszs=()=>import('./时时乐/时时乐.vue');
            }else{
                this.kszs=''
            }
        }
    },
    mounted() {
        this.初始化(this.$route.query.id).then(()=>{
            this.加载组件();
        })
    },
    watch: {
        $route(){
            this.初始化(this.$route.query.id).then(()=>{
                this.加载组件()
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.开奖走势{
    position: absolute;
    width: 100%;
    height: 100%;
}
.content ul {
    margin: 0px !important; 
}
.title_1{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    >div{
        // border: 1px solid #ff1414;
        padding: 0px 10px;
        margin: 0px auto;
        line-height: 24px;
    }
    i{
        font-size: 14px;
        margin: 0px 0px 0px 5px;
    }
}
.选择时间{
    i{
        font-size: 12px;
        margin: 0px 0px 0px 5px;
    }
}
.切换彩种{
    padding: 44px _vw(20) _vw(20);
    height: 100%;
    overflow: auto;
    color: #ffffff;
    .标题{
        font-size: -vw(17);
        padding: 0px 0px _vw(20);
    }
    .list{
        margin: 0px 0px _vw(40);
        display: flex;
        flex-wrap: wrap;
        font-size: _vw(14);
        color: #bbb;
        text-align: center;
        >li{

            width: 50%;
            padding: _vw(5);
            div{
                padding: _vw(5) 0px;
                border: 1px solid #bbbbbb;
            }
        }
    }
    
}
</style>
