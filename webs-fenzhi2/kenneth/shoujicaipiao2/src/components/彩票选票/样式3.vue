<template>
    <ul class="样式1">
        <li class="title" v-if="name">
            <span v-for="(item, index) in name" :key="index">{{item}}</span>
        </li>
        <div class="选号区">
            <li class="list_1" v-if="显示头部">
                <span>全</span>
                <span>大</span>
                <span>小</span>
                <span>单</span>
                <span>双</span>
                <span>生肖</span>
                <span>清</span>
            </li>
            <!-- <li class="生肖">
                <span>鼠</span>
                <span>牛</span>
                <span>虎</span>
                <span>兔</span>
                <span>龙</span>
                <span>蛇</span>
                <span>马</span>
                <span>羊</span>
                <span>猴</span>
                <span>鸡</span>
                <span>狗</span>
                <span>猪</span>
            </li> -->
            <li class="itemlist">
                <div @click="选择(item)" v-for="(item, index) in 选号" :key="index">
                    <span class="号码" :class="(marSixNums.nums[item.name] ? marSixNums.nums[item.name].color : '') +' '+(item.active ? 'active' :'')">{{item.name}}</span>
                    <span class="赔率" v-if="item.显示赔率 && item.赔率">{{item.赔率}}</span>
                </div>
            </li>
        </div>
    </ul>
</template>

<script>
import { mapState } from 'vuex';
// 样式说明
// 圆形样式  主要用于六合彩
export default {
    name:"",
    props:{
        显示头部:{
            default:true
        },
        选号:{
            default:()=>{
                return [0,1,2,3,4,5,6,7,8,9,10]
            },
            // default:[1,2,3,4,5,6]
        },
        max:{
            default:0
        },
        name:"",
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            marSixNums:'marSixNums'
        })
    },
    methods: {
        选择(item){
            if(item.active){
                this.$set(item, 'active', false)
                return
            }
            if(this.max){
                // console.log(this.选号.filter(x=>x.active))
                if(this.选号.filter(x=>x.active).length>=this.max){
                    this.$toast('最多选择'+this.max+'个')
                }else{
                    this.$set(item, 'active', !item.active)
                }
            }else{
                this.$set(item, 'active', !item.active)
            }
        },
    },
    mounted() {
        
    },
}
</script>

<style lang="scss" scoped>
.样式1{
    padding: _vw(10) ;
    margin: 0px _vw(5) _vw(5) _vw(5);
    background: #ffffff;
    display: flex;
    // align-items: center;
    border-radius: 5px;
    .title{
        width: _vw(25);
        text-align: center;
        flex-shrink: 0;
        font-size: 14px;
        display: flex;
        flex-direction:column;
    }
    .选号区{
        width: 0;
        flex-grow: 1;
    }
    .list_1{
        display: flex;
        justify-content: space-between;
        font-size: _vw(14);
        background: #e2e2e2;
        padding: 0px 25px;
        height: _vw(22);
        line-height: _vw(22);
        border-radius: _vw(22);
        margin: 0px 0px _vw(10) 0px;
        position: relative;
        
    }
    .生肖{
        background: #717171;
        border-radius: 6px;
        display: flex;
        text-align: center;
        flex-wrap: wrap;
        color: #ffffff;
        font-size: _vw(14);
        padding: _vw(3) 0px;
        span{
            width: calc(100% / 6) ;
        }
    }
    .itemlist{
        display: flex;
        flex-wrap: wrap;
        div{
            width: 20%;
            border-radius: 100%;
            .号码{
                margin: _vw(10) auto 0px;
                border: 1px solid #e2e2e2;
                border-radius: 100%;
                width: _vw(40);
                height: _vw(40);
                display: block;
                line-height: _vw(40);
                &.灰{
                    color: #6c757d;
                }
                &.绿{
                    color: #28a745;
                }
                &.蓝{
                    color: #007bff;
                }
                &.红{
                    color: $color;
                }
            }
            .号码.active{
                @include bgcolor;
                color: #ffffff;
            }
            text-align: center;
            font-size: _vw(14);
            .赔率{
                font-size: _vw(12);
                color: $color;
            }
        }
    }
}
</style>
