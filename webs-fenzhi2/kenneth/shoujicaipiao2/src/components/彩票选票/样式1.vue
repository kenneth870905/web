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
                <div @click="选择(item,index1)" v-for="(item, index1) in 选号" :key="index1">
                    <span :class="{'active':item.active}">{{item.name}}</span>
                </div>
            </li>
        </div>
    </ul>
</template>

<script>
// 样式说明
// 36*36 圆形样式
import { mapState } from "vuex";
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
        max:{
            default:0
        },
        row:{
            default:0
        },
        name:""
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            选号配置: x => x.投注.选号配置
        })
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
        },
        选小(){
            for (let i = 0; i < this.选号.length; i++) {
               this.选号[i].active=i < this.选号.length/2                
            }
        },
        选单(){
            for (let i = 0; i < this.选号.length; i++) {
               this.选号[i].active = i%2==0    
            }
        },
        选双(){
            for (let i = 0; i < this.选号.length; i++) {
               this.选号[i].active = i%2==1  
            }
        },
        清空(){
            this.选号.forEach(item => {
                item.active=false
            });
        },
        选择(item,index_1){
            if(!this.max){
                this.$set(item, 'active', !item.active)
            }else if(!item.active){
                var index=1
                this.选号.forEach(item=>{
                    if(index>=this.max){
                        item.active=false
                    }else if(item.active){
                        index++
                    }
                })
                this.$set(item, 'active', !item.active)
            }else{
                item.active=false
            }

            if(this.选号配置.选号免重复 && item.active){
                console.log(index);
                for (let i = 0; i < this.选号配置.list.length; i++) {
                    if(i!=this.row){
                        this.选号配置.list[i].选号[index_1].active=false                
                    }
                    // for (let j = 0; j <  this.选号配置.list[i].选号.length; j++) {
                    // }
                }
            }
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
            span{
                margin: 5px auto;
                border: 1px solid #e2e2e2;
                border-radius: 100%;
                width: _vw(40);
                height: _vw(40);
                display: block;
                line-height: _vw(40)
            }
            span.active{
                @include bgcolor;
                color: #ffffff;
            }
            text-align: center;
            font-size: _vw(14);
        }
    }
}
</style>
