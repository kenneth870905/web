<template>
    <div class="号码分布">
        <ul class="筛选条件">
            <li class="数量">
                <div @tap="点击筛选(item)" v-for="(item, index) in list" :key="index" :class="{'active':筛选号码.find(x=>x==item)}">
                    <div>
                        <span class="编号">{{item}}</span>
                        <i class="选中 icon iconfont icon-gouxuanzhong"></i>
                    </div>
                </div>
            </li>
            <li class="单双大小">
                <div @tap="点击筛选('单')" :class="{'active':筛选号码.find(x=>x=='单')}">单</div>
                <div @tap="点击筛选('双')" :class="{'active':筛选号码.find(x=>x=='双')}">双</div>
                <div @tap="点击筛选('大')" :class="{'active':筛选号码.find(x=>x=='大')}">大</div>
                <div @tap="点击筛选('小')" :class="{'active':筛选号码.find(x=>x=='小')}">小</div>
            </li>
        </ul>
        <ul class="开奖号" >
            <li v-for="(item, index) in 30" :key="index">
                <div class="时间">11:30</div>
                <div class="期数">0529009</div>
                <div class="item item2">
                    <div class="号码列表">
                        <span class="号码">01</span>
                        <span class="号码">02</span>
                        <span class="号码">03</span>
                        <span class="号码">04</span>
                        <span class="号码">05</span>
                        <span class="号码">06</span>
                        <span class="号码">07</span>
                        <span class="号码">08</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:"",
    data() {
        return {
            list:['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20'],
            list1:['11','12','13','14','15','16','17','18','19','20'],
            筛选号码:[],
        }
    },
    methods: {
        点击筛选(item){
            var index = this.筛选号码.findIndex(x=>x==item);
            console.log(index);
            if(index==-1){
                this.筛选号码.push(item);
            }else{
                this.筛选号码.splice(index,1);
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.号码分布{
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
}
.筛选条件{
    flex-shrink: 0;
    background: #ffffff;
    padding: _vw(5);
    border-bottom: 1px solid #efeff4;
    .数量{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        >div{
            width:  (100vw - _vw(10)) / 10;
            height: (100vw - _vw(10)) / 10;
            padding: _vw(2);
            // width: _vw(30);
            // height: _vw(30);
            >div{
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid#989899;
                position: relative;
            }
            text-align: center;
            font-size: _vw(12);
            position: relative;
            border-radius: 3px;
            // .编号{
            //     line-height:  calc(#{_vw(30)} - 2px) ;
            // }
            &.active{
                >div{
                    border: 1px solid #ff7614;
                }
                .选中{
                    display: block;
                } 
            }
            .选中{
                position: absolute;
                top: 0px;
                left: 0px;
                color: #ff7614;
                font-size: _vw(18);
                display: none;
            }
        }
    }
    .单双大小{
        margin: _vw(5) 0px 0px;
        height: _vw(26);
        display: flex;
        font-size: _vw(13);
        border:1px solid #ff7614;
        color: #ff7614;
        border-radius: 3px;
        div{
            border-left: 1px solid #ff7614;
            width: 25%;
            text-align: center;
            line-height: calc(#{_vw(26)} - 2px);
        }
        .active{
            background: #ff7614;
            color: #ffffffff;
        }
        div:nth-child(1){
            border-left: none;
        }
    }
}

.开奖号{
    flex-grow: 1;
    overflow: auto;
    background: #ffffff;
    text-align: center;
    .定位{
        position: sticky;
        top: 0px;
        background: #ffffff;
    }
    >li{
        padding: _vw(10) _vw(5);
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
    .item{
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
}

.号码列表{
    display: flex;
    width: 100%;
    justify-content: space-around;
    .号码{
        width: _vw(22);
        height: _vw(22);
        background: #0064ec;
        border-radius: 100%;
        text-align: center;
        font-size: _vw(12);
        line-height: _vw(22);
        color: #ffffff;
        // text-shadow: 0px 1px 0px #000000;
    }
}




</style>
