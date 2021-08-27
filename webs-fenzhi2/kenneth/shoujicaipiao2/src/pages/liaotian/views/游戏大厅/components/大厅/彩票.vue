<template>
    <div class="彩票">
        <div class="类型选择 定位" >
            <div class="item 全部" @click="点击类型('',0)" :class="{'active':选中彩票类型==''}">
                <span>热门彩票</span>    
            </div>
            <div class="swiper-container swiper_1" ref="swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide item" v-if="item.title!='所有彩种'" @click="点击类型(item,index)" :class="{'active':选中彩票类型==item}" v-for="(item, index) in 彩种类型" :key="index">
                        <span>{{item.title}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="类型选择"></div>

        <ul class="list">
            <li @click="进入游戏(item)" v-for="(item, key , index) in 新开奖列表" :key="index">
                <div class="img_box" :class="动画">
                    <!-- <img :src="config.img_url+'static/image/home/caipiao/'+key.replace('D','')+所有彩票.ext" /> -->
                    <img v-lazy="config.img_url+'static/image/home/caipiao/'+key.replace('D','')+所有彩票.ext" :key="config.img_url+'static/image/home/caipiao/'+key.replace('D','')+所有彩票.ext">

                </div>
                <div class="内容">
                    <div class="标题">{{item.Name}}</div>
                    <div class="开奖间隔">每{{item.desc}}开奖</div>
                    <div class="倒计时">
                        <span>{{item.showTimer ? item.showTimer.h : "--"}}</span>
                        <span>:</span>
                        <span>{{item.showTimer ? item.showTimer.m : '--'}}</span>
                        <span>:</span>
                        <span>{{item.showTimer ? item.showTimer.s : '--'}}</span>
                    </div>
                    <span style="display:none">{{item.Timer}}</span>
                    <!-- <span>{{item.倒计时}}</span> -->
                </div>
            </li>
        </ul>


        <!-- <button @click="$router.push('/buyLottery?i=10001')">彩票</button> -->
        
        <!-- <button @click="$router.push('/buyLottery?t=k3&t1=js')">快三投注</button>
        <button @click="$router.push('/buyLottery?t=pk10&t1=bj')">Pk10</button>
        <button @click="$router.push('/buyLottery?t=lhc&t1=xg')">六合彩</button>
        <button @click="$router.push('/buyLottery?t=28&t1=bj')">28</button>
        <button @click="$router.push('/buyLottery?t=115&t1=gb')">11选5</button>
        <button @click="$router.push('/buyLottery?t=klsf&t1=gd')">快乐十分</button>
        <button @click="$router.push('/buyLottery?t=3d&t1=fc')">3d</button>
        <button @click="$router.push('/buyLottery?t=pl3&t1=pl3')">排列三</button>
        <button @click="$router.push('/buyLottery?t=pl5&t1=pl5')">排列五</button>
        <button @click="$router.push('/buyLottery?t=qxc&t1=qxc')">七星彩</button>
        <button @click="$router.push('/buyLottery?t=ssl&t1=sh')">时时乐</button> -->

    </div>
</template>

<script>
import Swiper from 'swiper'
import { mapState , mapMutations, mapActions } from 'vuex';
export default {
    name:"",
    data() {
        return {
            当前选中:'123',
            swiper2:"",
            动画:""
        }
    },
    filters:{
        过滤开奖时间(key){
            if(this.所有彩票 || this.所有彩票.children){
                var obj=this.所有彩票.children.find(x=>'D'+x.id==key);
                return obj ? obj.desc : ''
            }else{
                return key
            }
        },
    },
    computed: {
        ...mapState({
            config:'config',
            游戏彩票类型:"游戏彩票类型", 
            选中彩票类型:x=>x.游戏大厅.选中彩票类型,
            开奖列表:x=>x.游戏大厅.开奖列表,
            彩票玩法:x=>x.user.彩票玩法
        }),
        新开奖列表(){
            var this_1=this
            var list=this.开奖列表;
                for (const key in list) {
                    var obj = this_1.所有彩票.children.find(x=>'D'+x.id==key);
                    if(obj){
                        list[key].desc = obj.desc
                        list[key].id=key.substring(1)
                    }
                }
            return list;
        },
        彩种类型(){
            var obj=this.游戏彩票类型.find(x=>x.title=='彩票');
            if(obj){
                let list = obj.children;
                let index = list.findIndex(x=>x.title == '时时彩')
                // shishicai
                let obj1={"title":"三分彩","img":"caipiao","ext":".png","menuCode":"sanfencai","type":"cp","children":[
                ]}
                let list1 = [ ...list.slice(0,index) , obj1 , ...list.slice(index) ]
                return list1;
            }else{
                return []
            }
        },
        所有彩票(){
            var obj=this.游戏彩票类型.find(x=>x.title=='彩票');
            if(obj){
                var obj_1 = obj.children.find(y=>y.title=='所有彩种');
                return obj_1;
            }else{
                return {}
            }
        }
    },
    methods: {
        ...mapMutations({
            设置state:"游戏大厅/设置state",
        }),
        ...mapActions({
            // 获取彩票开奖列表:"游戏大厅/获取彩票开奖列表",
            切换彩种:"游戏大厅/切换彩种",
            初始化:"游戏大厅/初始化",
            取消定时获取:"游戏大厅/取消定时获取"
        }),
        点击类型(item,index){
            if(index<2){
                this.swiper2.slideTo(0, 300, false);        //切换到第一个slide，速度为1秒
            }else{
                this.swiper2.slideTo(index-2, 300, false);  //切换到第一个slide，速度为1秒
            }
            this.切换彩种(item)
        },
        进入游戏(item){
            if(this.config.newbet){
                this.$router.push(`/buyLottery?i=${item.id}&t=${this.彩票玩法}`)
            }else{
                this.$router.push('/cpiframe?i='+item.id+'&t='+this.彩票玩法);
            }
        }
    },
    mounted() {
        this.swiper2 = new Swiper(this.$refs.swiper, {
            slidesPerView : 3.5,
            observer:true,
            // loop :true, //循环
        });
        // this.获取彩票开奖列表();
        this.初始化()
    },
    beforeDestroy() {
        console.log('停止定时器')
        this.取消定时获取();
    },
    watch: {
        彩票玩法(){
            this.动画= this.动画 == '动画1' ? '' :'动画1' ;
        }
    },

}
</script>

<style lang="scss" scoped>
.彩票{
    height: 100%;
    background: #ffffff;
    overflow: auto;
}

.类型选择{
    width: 100%;
    &.定位{
        position: fixed;
        top: 44px;
    }
    
    // position: sticky;
    // top: -1px;
    height: _vw(40);
    display: flex;;
    @include bgcolor;
    font-size: _vw(15);
    color: hsla(0,0%,100%,.85);
    >div:nth-child(1){
        width: _vw(95);
        flex-shrink: 0;
    }
    >div:nth-child(2){
        height: 100%;
        width: 0;
        flex-grow: 1;
    }
    .全部{
        box-shadow: 1px 0 3px rgba(0,0,0,.16);
    }
    .item{
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        span{
            position: relative;
        }
    }
    .active{
        color: #ffffff;
        font-weight: bold;
        &::after{
            content: "";
            position: absolute;
            left: 0px;
            right: 0px;
            bottom: 5px;
            height: 2px;
            background-color: #fff;
            width: 30%;
            margin: auto;
        }
    }
}

.list{
    display: flex;
    flex-wrap: wrap;
    background: #fff;
    >li{
        width: 50%;
        border-bottom: 1px solid #f2f2f2;
        display: flex;
        align-items: center;
        padding: _vw(15) 0px _vw(15) _vw(20); 
        .img_box{
            width: _vw(52);
            height: _vw(52);
            flex-shrink: 0;
            margin: 0px _vw(6) 0px 0px;
            &.动画1{
                img{
                    transform: rotateY(360deg);
                }
            }
            img{
                transition: all 0.5s;
                width: 100%;
                height: 100%;
            }
        }
        .内容{
            width: 0;
            flex-grow: 1
        }
        .标题{
            color: #333;
            font-size: _vw(14);
        }
        .开奖间隔{
            color: #999;
            margin: _vw(3) 0px;
            font-size: _vw(12);
        }
        .倒计时{
            font-size: _vw(12);
            line-height: _vw(18);
            @include textcolor;
            span{
                display: inline-block;
            }
            >span:nth-child(2n-1){
                width: _vw(18);
                height: _vw(18);
                border-radius: 4px;
                text-align: center;
                @include bgcolor;
                color: #fff;
            }
            >span:nth-child(2){
                margin: 0px _vw(2);
            }
        }
    }
    >li:nth-child(2n-1){
        border-right: 1px solid #f2f2f2;
    }
}

</style>
