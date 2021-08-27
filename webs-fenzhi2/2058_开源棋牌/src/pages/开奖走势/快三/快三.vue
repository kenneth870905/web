
<template>
    <div class="content">
        <div class="头部">
            <header1 :list="['开奖号码','基本走势']" :active="查看类型"/>
        </div>
        <div class="内容">
            <div v-if="查看类型==0" class="开奖号码1">
                <van-list  v-model="loading" :finished="开奖记录.length<=当前显示条数" finished-text="暂无相关数据" @load="onLoad">
                    <ul class="开奖号" >
                        <li class="定位">
                            <div class="时间">时间</div>
                            <div class="期数">期数</div>
                            <div class="item item1">
                                <div class="号码1">号码</div>
                                <div class="和值">和值</div>
                                <div class="大小">大小</div>
                                <div class="单双">单双</div>
                            </div>
                        </li>
                        <li v-if="item.Content && index<当前显示条数" v-for="(item, index) in 开奖记录" :key="index">
                            <div class="时间">{{item.ResultDatetime | 时间格式}}</div>
                            <div class="期数">{{item.IssueCode.substring(4)}}</div>
                            <div class="item item1">
                                <div class="号码1">
                                    <span class="号码" :class="'号码_'+item1" v-for="(item1, index1) in item.Content.split('|')" :key="index1"></span>
                                </div>
                                <span class="fongt13 text_1 红色字体">{{计算大小(item).和值}}</span>
                                <span class="fongt13 text_1">{{计算大小(item).大小}}</span>
                                <span class="fongt13 text_1">{{计算大小(item).单双}}</span>
                            </div>
                        </li>
                    </ul>
                </van-list>
            </div>
            
            
            <div class="走势内容" v-if="查看类型==1">
                <ul class="title_1">
                    <li :class="{'active':走势查看==0}" @tap="走势查看=0">第一球</li>
                    <li :class="{'active':走势查看==1}" @tap="走势查看=1">第二球</li>
                    <li :class="{'active':走势查看==2}" @tap="走势查看=2">第三球</li>
                </ul>
                
                <div class="内容1">
                    <ul class="走势列表">
                        <li class="header">
                            <div class="期数">期号</div>
                            <div class="号码">
                                <div class="item" ref="号码item"><span>1</span> </div>
                                <div class="item"> <span>2</span> </div>
                                <div class="item"> <span>3</span> </div>
                                <div class="item"> <span>4</span> </div>
                                <div class="item"> <span>5</span> </div>
                                <div class="item"> <span>6</span> </div>
                            </div>
                        </li>
                        <li class="header">
                            <div class="期数">出现次数</div>
                            <div class="号码">
                                <div class="item" v-for="(item, index) in 开奖走势1.出现次数" :key="index"><span>{{item}}</span></div>
                            </div>
                        </li>
                    </ul>

                    <van-list v-model="loading1" :finished="开奖走势1.list.length<=走势条数" finished-text="暂无相关数据" @load="onLoad1">
                        <ul class="走势列表">
                            <li v-for="(item, index) in 开奖走势1.list" :key="index" v-if="item.Content && index<走势条数">
                                <div class="期数">{{item.IssueCode.substring(4)}}</div>
                                <div class="号码">
                                    <canvas1 :height="height" :width="item.width" :left="item.left" :start="item.start" class="canvas1"/>
                                    <div class="item" :class="{'active':item1.number}" v-for="(item1, index1) in item.list" :key="index1">
                                        <span>{{item1.number ? item1.number : item1.累计}}</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </van-list>
                </div>
            </div>

        </div>
    </div>
</template>


<script>
import { 时间格式化 } from "@/assets/js/通用.js";
import header1 from '@/pages/开奖走势/components/头部.vue';
import canvas1 from './components/斜线canvas.vue';
import { mapState } from 'vuex';

export default {
    name:"",
    components:{
        header1,
        canvas1
    },
    provide(){
        return{
            改变头部:(index)=>{
                this.查看类型=index
            }
        }
    },
    data() {
        return {
            loading:false,
            loading1:false,
            当前显示条数:0,
            走势条数:20,
            查看类型:0,
            走势查看:0,
            width:0,
            height:"",
        }
    },
    filters:{
        时间格式(time){
            return 时间格式化('hh:mm',time)
        }
    },
    computed: {
        ...mapState({
            开奖记录:x=>x.开奖走势.开奖记录
        }),
        开奖走势1(){
            var this_1=this;
            // this.开奖走势1=[];
            var 开奖走势1=[]
            var 出现次数=[0,0,0,0,0,0]
            if(this.开奖记录.length==0){
                return {
                    list:[],
                    出现次数:[]
                }
            }
            for (let i = this.开奖记录.length-1; i >= 0; i--) {
                if(!this.开奖记录[i].Content){
                    continue
                }
                var obj=Object.assign({},this.开奖记录[i]);
                var 开奖号= this.开奖记录[i].Content.split('|');
                    obj.开奖号=开奖号
                    obj.出现次数=[0,0,0,0,0,0]
                if(开奖走势1.length>0){
                    obj.list=[
                                                                                //倒序永远是和第一个对比
                        {number: 开奖号[this.走势查看]==1 ? 1 : '' , 累计: 开奖号[this.走势查看]==1 ? 0 : 开奖走势1[0].list[0].累计+1},
                        {number: 开奖号[this.走势查看]==2 ? 1 : '' , 累计: 开奖号[this.走势查看]==2 ? 0 : 开奖走势1[0].list[1].累计+1},
                        {number: 开奖号[this.走势查看]==3 ? 1 : '' , 累计: 开奖号[this.走势查看]==3 ? 0 : 开奖走势1[0].list[2].累计+1},
                        {number: 开奖号[this.走势查看]==4 ? 1 : '' , 累计: 开奖号[this.走势查看]==4 ? 0 : 开奖走势1[0].list[3].累计+1},
                        {number: 开奖号[this.走势查看]==5 ? 1 : '' , 累计: 开奖号[this.走势查看]==5 ? 0 : 开奖走势1[0].list[4].累计+1},
                        {number: 开奖号[this.走势查看]==6 ? 1 : '' , 累计: 开奖号[this.走势查看]==6 ? 0 : 开奖走势1[0].list[5].累计+1},
                    ]
                    出现次数=[
                        开奖号[this.走势查看]==1 ? 出现次数[0]+1 : 出现次数[0],
                        开奖号[this.走势查看]==2 ? 出现次数[1]+1 : 出现次数[1],
                        开奖号[this.走势查看]==3 ? 出现次数[2]+1 : 出现次数[2],
                        开奖号[this.走势查看]==4 ? 出现次数[3]+1 : 出现次数[3],
                        开奖号[this.走势查看]==5 ? 出现次数[4]+1 : 出现次数[4],
                        开奖号[this.走势查看]==6 ? 出现次数[5]+1 : 出现次数[5]
                    ]

                }else{
                    obj.list=[
                        {number:开奖号[this.走势查看]==1 ? 1 : '', 累计: 开奖号[this.走势查看] ==1 ? 0 : 1 },
                        {number:开奖号[this.走势查看]==2 ? 1 : '', 累计: 开奖号[this.走势查看] ==2 ? 0 : 1 },
                        {number:开奖号[this.走势查看]==3 ? 1 : '', 累计: 开奖号[this.走势查看] ==3 ? 0 : 1 },
                        {number:开奖号[this.走势查看]==4 ? 1 : '', 累计: 开奖号[this.走势查看] ==4 ? 0 : 1 },
                        {number:开奖号[this.走势查看]==5 ? 1 : '', 累计: 开奖号[this.走势查看] ==5 ? 0 : 1 },
                        {number:开奖号[this.走势查看]==6 ? 1 : '', 累计: 开奖号[this.走势查看] ==6 ? 0 : 1 },
                    ]
                }
                if(开奖走势1.length>0){
                    if(开奖号[this.走势查看]<开奖走势1[0].开奖号[this.走势查看]){
                        obj.start="left";
                        obj.left=开奖号[this.走势查看]*this.width - this.width/2;
                    }else{
                        obj.start="right";
                        obj.left=开奖走势1[0].开奖号[this.走势查看]*this.width - this.width/2;
                    }
                        obj.width= (开奖走势1[0].开奖号[this.走势查看] - 开奖号[this.走势查看])*this.width
                        obj.width = Math.abs(obj.width)==0 ? 1 : Math.abs(obj.width);
                }
                开奖走势1.unshift(obj)
            }
            return {
                list:开奖走势1,
                出现次数:出现次数
            }
        }
    },
    methods: {
        onLoad(){
            this.当前显示条数=this.当前显示条数+20
            this.loading=false;
        },
        onLoad1(){
            this.走势条数=this.走势条数+20;
            this.loading1=false;
        },
        获取开奖号码(){
        },
        计算大小(item){
            var list=item.Content.split('|');
            var number=0;
                list.forEach(item => {
                    number= parseInt(item)+number
                });
            var obj={
                    和值:number,
                    大小:number>=11 ? '大' :"小",
                    单双:number%2==0 ? '双' :"单"
                }
            return obj;
        },
        获取宽度(){
            if(this.查看类型==1 && !this.width){
                try {
                    this.width=this.$refs.号码item.offsetWidth;
                    this.height=this.$refs.号码item.offsetHeight;
                } catch (error) {
                    setTimeout(() => {
                        this.获取宽度()
                    }, 100);
                }
            }
        },
    },
    mounted() {
        if(this.$route.query.zs){
            this.查看类型=1
        }
        this.获取宽度();
    },
    watch: {
        查看类型(){
            this.$nextTick(()=>{
                this.获取宽度();
            })
        }
    },
}
</script>

<style lang="scss" scoped>

.fongt13{
    font-size: _vw(13);
}
.content{
    height: 100%;
    display: flex;
    flex-direction: column;
    .头部{
        flex-shrink: 0;
    }
    .内容{
        height: 100%;
    }
}

.开奖号码1{
    overflow: auto;
    height: 100%;
}
.开奖号{
    background: #ffffff;
    text-align: center;
    margin: 0;
    .定位{
        position: sticky;
        top: 0px;
        background: #ffffff;
    }
    >li{
        // padding: _vw(10) _vw(5);
        display: flex;
        align-items: center;
        // border-block:
        border-bottom: 1px solid #efeff4;
    }
    .时间{
        color: #999999;
        font-size: _vw(13);
        width: _vw(50);
        flex-shrink: 0;
    }
    .期数{
        width: _vw(60);
        flex-shrink: 0;
        color: #999999;
        font-size: _vw(13);
    }

    .号码1{
        display: flex;
        width: _vw(80);
        justify-content: center;
    }

    .号码{
        width: _vw(25);
        height: _vw(25);
        background-image: url('/image/k3bg.png');
        background-size: _vw(178);
        &.号码_1{
            background-position: 0px 0px;
        }
        &.号码_2{
            background-position: _vw(-28) 0px;
        }
        &.号码_3{
            background-position: _vw(-56) 0px;
        }
        &.号码_4{
            background-position: _vw(-84) 0px;
        }
        &.号码_5{
            background-position: _vw(-112) 0px;
        }
        &.号码_6{
            background-position: _vw(-140) 0px;
        }
    }
    .红色字体{
        color: $color;
    }
    .item{
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .item1{
        color: #212121;
        font-size: _vw(14);
    }
    .item2{
        color: #333333;
        font-size: _vw(12);
    }
}


.走势内容{
    height: 100%;
    display: flex;
    flex-direction: column;
    
}
.title_1{
    flex-shrink: 0;
    height: _vw(36);
    display: flex;
    align-items: center;
    padding: 0px _vw(5);
    background: #efeff4;
    margin: 0;
    li{
        width: _vw(70);
        height: _vw(24);
        line-height: _vw(24);
        text-align: center;
        border-radius: _vw(24);
        margin: 0px _vw(10) 0px 0px;
        font-size: _vw(14);
        list-style: none;
    }
    .active{
        background: #ff7a21;
        color: #ffffff;
    }
}
.内容1{
    flex-grow: 1;
    overflow: auto;
}
.走势列表{
    flex-shrink: 0;
    // overflow: auto;
    font-size: _vw(13);
    text-align: center;
    margin: 0;
    >li{
        display: flex;
        height: _vw(34);
    }
    li:nth-child(2n-1):not(.header){
        background: #ffffff;
        .期数{
            background: #e8e4de
        }
    }
    .header{
        background: #e8e4de;
        border-bottom: 1px solid #ffffff;
        // position: sticky;
        // top: 0px;
        z-index: 2;
    }
    .期数{
        height: 100%;
        width: _vw(75);
        line-height: _vw(34);
        flex-shrink: 0;
    }
    .号码{
        flex-grow: 1;
        display: flex;
        position: relative;
        .item {
            width: calc(100% / 6);
            border-left: 1px solid #ede9e5;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .active{
            span{
                display: block;
                width: _vw(18);
                height: _vw(18);
                background: $color;
                color: #ffffff;
                text-align: center;
                border-radius: 100%;
                position: relative;
                z-index: 1;
            }
        }
    }
}

</style>
