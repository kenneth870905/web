<template>
    <ul class="样式1">
        <li class="title" v-if="name">
            <!-- <span>{{name ? name : "未设置名称"}}</span> -->
            <span  v-for="(item, index) in name" :key="index">{{item}}</span>
        </li>
        <div class="选号区">
            <li class="list_1" v-if="显示头部">
                <div @click="选全()">全</div>
                <div @click="选大()">大</div>
                <div @click="选小()">小</div>
                <div @click="选单()">单</div>
                <div @click="选双()">双</div>
                <div @click="清空()">清</div>
            </li>
            <li class="itemlist">
                <div @click="选择(item)" v-for="(item, index) in 选号" :key="index">
                    <span class="号码" :class="(item.active ? 'active' :'')+' '+item.color ">{{item.name}}</span>
                    <span class="赔率" v-if="item.显示赔率 && item.赔率">{{item.赔率}}</span>
                </div>
            </li>
        </div>
    </ul>
</template>

<script>
// 样式说明
// 36*36 圆形样式 pc蛋蛋专用
export default {
    name:"",
    props:{
        显示头部:{
            default:true
        },
        选号:{
            default:()=>{
                return []
            },
        },
        name:""
    },
    data() {
        return {
        }
    },
    methods: {
        选全(){
            this.选号.forEach(item => {
                item.active=true
            });
        },
        选大(){
            for (let i = 0; i < this.选号.length; i++) {
               this.选号[i].active=i >= this.选号.length/2
            }
            // this.选号.forEach(item => {
            //     item.active=item.name>=5
            // });
        },
        选小(){
            for (let i = 0; i < this.选号.length; i++) {
               this.选号[i].active=i < this.选号.length/2                
            }
            // this.选号.forEach(item => {
            //     item.active=item.name<5
            // });
        },
        选单(){
            for (let i = 0; i < this.选号.length; i++) {
               this.选号[i].active = i%2==0    
            }
            // this.选号.forEach(item => {
            //     item.active=item.name%2==1
            // });
        },
        选双(){
            for (let i = 0; i < this.选号.length; i++) {
               this.选号[i].active = i%2==1  
            }
            // this.选号.forEach(item => {
            //     item.active=item.name%2==0
            // });
        },
        清空(){
            this.选号.forEach(item => {
                item.active=false
            });
        },
        选择(item){
            this.$set(item, 'active', !item.active)
        },
    },
    mounted() {
        
    },
    watch: {
        
    },
}
</script>

<style lang="scss" scoped>
.样式1{
    padding: _vw(10) ;
    margin: 0px _vw(5) _vw(5) _vw(5);
    background: #ffffff;
    display: flex;
    align-items: center;
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
            }
        }
    }
}
</style>
