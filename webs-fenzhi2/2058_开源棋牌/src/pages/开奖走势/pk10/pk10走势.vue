<template>
    <div class="走势内容">
        <div class="头部">
            <ul class="title_1">
                <li :class="{'active':走势查看==0}" @tap="走势查看=0">万位走势</li>
                <li :class="{'active':走势查看==1}" @tap="走势查看=1">千位走势</li>
                <li :class="{'active':走势查看==2}" @tap="走势查看=2">百位走势</li>
                <li :class="{'active':走势查看==3}" @tap="走势查看=3">十位走势</li>
            </ul>
            <!-- <ul class="走势列表">
                <li class="header">
                    <div class="期数">期号</div>
                    <div class="号码">
                        <div class="item" ref="号码item"><span>01</span> </div>
                        <div class="item"> <span>02</span> </div>
                        <div class="item"> <span>03</span> </div>
                        <div class="item"> <span>04</span> </div>
                        <div class="item"> <span>05</span> </div>
                        <div class="item"> <span>06</span> </div>
                        <div class="item"> <span>07</span> </div>
                        <div class="item"> <span>08</span> </div>
                        <div class="item"> <span>09</span> </div>
                        <div class="item"> <span>10</span> </div>
                    </div>
                </li>
                <li class="header">
                    <div class="期数">出现次数</div>
                    <div class="号码">
                        <div class="item" v-for="(item1, index1) in 开奖走势1.出现次数" :key="index1"><span>{{item1}}</span> </div>
                    </div>
                </li>
            </ul> -->
        </div>
        <ul class="走势列表">
            <li class="header">
                    <div class="期数">期号</div>
                    <div class="号码">
                        <div class="item" ref="号码item"><span>01</span> </div>
                        <div class="item"> <span>02</span> </div>
                        <div class="item"> <span>03</span> </div>
                        <div class="item"> <span>04</span> </div>
                        <div class="item"> <span>05</span> </div>
                        <div class="item"> <span>06</span> </div>
                        <div class="item"> <span>07</span> </div>
                        <div class="item"> <span>08</span> </div>
                        <div class="item"> <span>09</span> </div>
                        <div class="item"> <span>10</span> </div>
                    </div>
                </li>
                <li class="header">
                    <div class="期数">出现次数</div>
                    <div class="号码">
                        <div class="item" v-for="(item1, index1) in 开奖走势1.出现次数" :key="index1"><span>{{item1}}</span> </div>
                    </div>
                </li>
            <van-list  :offset="10" v-model="loading1" :finished="开奖走势1.list.length<=查看条数" :finished-text="开奖走势1.length==0 ? '暂无相关数据' : '没有更多了'" @load="onLoad1">
                <li v-if="index<查看条数" v-for="(item, index) in 开奖走势1.list" :key="index">
                    <div class="期数">{{item.IssueCode.substring(4)}}</div>
                    <div class="号码">
                        <canvas1 :height="height" :width="item.width" :left="item.left" :start="item.start" class="canvas1"/>
                        <div class="item" :class="{'active':item1.number!==''}" v-for="(item1, index1) in item.list" :key="index1">
                            <span>{{item1.number ? item1.number : item1.累计}}</span>
                        </div>
                        <!-- <canvas1 :height="height" :width="item.width" :left="item.left" :start="item.start" v-if="list.length-1>index" class="canvas1"/>
                        <div class="item" :class="{'active':item.number==1}"> <span>1</span> </div> -->
                    </div>
                </li>
            </van-list>
        </ul>
    </div>
</template>

<script>
import canvas1 from '@/pages/开奖走势/components/斜线canvas.vue';
import { mapState } from 'vuex';
export default {
    name:"",
    components:{
        canvas1
    },
    data() {
        return {
            走势查看:0,
            list:[
                {number:2},
                {number:1},
                {number:5},
                {number:2},
                {number:6},
                {number:2},
            ],
            width:0,
            height:"",

            查看条数:0,
            loading1:false,
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
            var 出现次数=[0,0,0,0,0,0,0,0,0,0]
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
                if(开奖走势1.length>0){
                    obj.list=[
                        //倒序永远是和第一个对比
                        {number: 开奖号[this.走势查看]=='01' ? 1 : '' , 累计: 开奖号[this.走势查看]=='01' ? 0 : 开奖走势1[0].list[0].累计+1},
                        {number: 开奖号[this.走势查看]=='02' ? 2 : '' , 累计: 开奖号[this.走势查看]=='02' ? 0 : 开奖走势1[0].list[1].累计+1},
                        {number: 开奖号[this.走势查看]=='03' ? 3 : '' , 累计: 开奖号[this.走势查看]=='03' ? 0 : 开奖走势1[0].list[2].累计+1},
                        {number: 开奖号[this.走势查看]=='04' ? 4 : '' , 累计: 开奖号[this.走势查看]=='04' ? 0 : 开奖走势1[0].list[3].累计+1},
                        {number: 开奖号[this.走势查看]=='05' ? 5 : '' , 累计: 开奖号[this.走势查看]=='05' ? 0 : 开奖走势1[0].list[4].累计+1},
                        {number: 开奖号[this.走势查看]=='06' ? 6 : '' , 累计: 开奖号[this.走势查看]=='06' ? 0 : 开奖走势1[0].list[5].累计+1},
                        {number: 开奖号[this.走势查看]=='07' ? 7 : '' , 累计: 开奖号[this.走势查看]=='07' ? 0 : 开奖走势1[0].list[6].累计+1},
                        {number: 开奖号[this.走势查看]=='08' ? 8 : '' , 累计: 开奖号[this.走势查看]=='08' ? 0 : 开奖走势1[0].list[7].累计+1},
                        {number: 开奖号[this.走势查看]=='09' ? 9 : '' , 累计: 开奖号[this.走势查看]=='09' ? 0 : 开奖走势1[0].list[8].累计+1},
                        {number: 开奖号[this.走势查看]=='10' ? 9 : '' , 累计: 开奖号[this.走势查看]=='10' ? 0 : 开奖走势1[0].list[9].累计+1},
                    ]
                    出现次数=[
                        开奖号[this.走势查看]=='01' ? 出现次数[1]+1 : 出现次数[1],
                        开奖号[this.走势查看]=='02' ? 出现次数[2]+1 : 出现次数[2],
                        开奖号[this.走势查看]=='03' ? 出现次数[3]+1 : 出现次数[3],
                        开奖号[this.走势查看]=='04' ? 出现次数[4]+1 : 出现次数[4],
                        开奖号[this.走势查看]=='05' ? 出现次数[5]+1 : 出现次数[5],
                        开奖号[this.走势查看]=='06' ? 出现次数[6]+1 : 出现次数[6],
                        开奖号[this.走势查看]=='07' ? 出现次数[7]+1 : 出现次数[7],
                        开奖号[this.走势查看]=='08' ? 出现次数[8]+1 : 出现次数[8],
                        开奖号[this.走势查看]=='09' ? 出现次数[9]+1 : 出现次数[9],
                        开奖号[this.走势查看]=='10' ? 出现次数[9]+1 : 出现次数[9]
                    ]

                }else{
                    obj.list=[
                        {number:开奖号[this.走势查看]=='01' ? 1 : '', 累计: 开奖号[this.走势查看] =='01' ? 0 : 1 },
                        {number:开奖号[this.走势查看]=='02' ? 1 : '', 累计: 开奖号[this.走势查看] =='02' ? 0 : 1 },
                        {number:开奖号[this.走势查看]=='03' ? 1 : '', 累计: 开奖号[this.走势查看] =='03' ? 0 : 1 },
                        {number:开奖号[this.走势查看]=='04' ? 1 : '', 累计: 开奖号[this.走势查看] =='04' ? 0 : 1 },
                        {number:开奖号[this.走势查看]=='05' ? 1 : '', 累计: 开奖号[this.走势查看] =='05' ? 0 : 1 },
                        {number:开奖号[this.走势查看]=='06' ? 1 : '', 累计: 开奖号[this.走势查看] =='06' ? 0 : 1 },
                        {number:开奖号[this.走势查看]=='07' ? 1 : '', 累计: 开奖号[this.走势查看] =='07' ? 0 : 1 },
                        {number:开奖号[this.走势查看]=='08' ? 1 : '', 累计: 开奖号[this.走势查看] =='08' ? 0 : 1 },
                        {number:开奖号[this.走势查看]=='09' ? 1 : '', 累计: 开奖号[this.走势查看] =='09' ? 0 : 1 },
                        {number:开奖号[this.走势查看]=='10' ? 1 : '', 累计: 开奖号[this.走势查看] =='10' ? 0 : 1 },
                    ]
                }
                if(开奖走势1.length>0){
                    if(开奖号[this.走势查看]<开奖走势1[0].开奖号[this.走势查看]){
                        obj.start="left";
                        obj.left=开奖号[this.走势查看]*this.width - this.width/2;
                    }else{
                        obj.start="right";
                        obj.left= 开奖走势1[0].开奖号[this.走势查看]*this.width - this.width/2 ;
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
        },
        走势号码(){
            var list=this.list;
                for (let i = 0; i < list.length; i++) {
                    if(list.length-1>i){
                        if(list[i].number < list[i+1].number){
                            list[i].start = 'left';
                            list[i].left = list[i].number*this.width - this.width/2;
                        }else{
                            list[i].start = 'right';
                            list[i].left = list[i+1].number*this.width - this.width/2;
                        }
                        list[i].width = (list[i].number - list[i+1].number)*this.width;
                        list[i].width = Math.abs(list[i].width)==0 ? 1 : Math.abs(list[i].width);
                    }
                }
            return list
        }
    },
    methods: {
        onLoad1(){
            this.查看条数=this.查看条数+20
            this.loading1=false
        },
        获取宽度(){
            if(!this.width){
                this.width=this.$refs.号码item.offsetWidth;
                this.height=this.$refs.号码item.offsetHeight;
            }
        }
    },
    mounted() {
        this.获取宽度()
    },
    watch: {
        走势查看(){
            this.list.push({'number':this.走势查看+1} )
        }
    },
}
</script>

<style lang="scss" scoped>

.走势内容{
    height: 100%;
    display: flex;
    flex-direction: column;
    
    .头部{
        flex-shrink: 0;
    }
}

.title_1{
    flex-shrink: 0;
    height: _vw(36);
    display: flex;
    align-items: center;
    justify-content: space-between;
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
.走势列表{
    flex-grow: 1;
    overflow: auto;
    font-size: _vw(13);
    text-align: center;
    list-style: none;
    margin: 0;
    li{
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
