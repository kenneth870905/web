<template>
    <ul class="样式1">
        <li class="title" v-if="name">
            <!-- <span>{{name ? name : "未设置名称"}}</span> -->
            <span  v-for="(item, index) in name" :key="index">{{item}}</span>
        </li>
        <div class="选号区">
            <li class="list_1" >
                <div @click="选择(item)" :class="{'active':item.active}" v-for="(item, index) in 位置" :key="index">{{item.name}}</div>
            </li>
        </div>
    </ul>
</template>

<script>
// 样式说明
// 36*36 圆形样式
export default {
    name:"",
    props:{
        显示头部:{
            default:true
        },
        位置:{
            default:()=>{
                return []
            },
            // default:[1,2,3,4,5,6]
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
            this.选号.forEach(item => {
                item.active=item.number>=5
            });
        },
        选小(){
            this.选号.forEach(item => {
                item.active=item.number<5
            });
        },
        选单(){
            console.log(1)
            this.选号.forEach(item => {
                item.active=item.number%2==1
            });
        },
        选双(){
            this.选号.forEach(item => {
                item.active=item.number%2==0
            });
        },
        清空(){
            this.选号.forEach(item => {
                item.active=false
            });
        },
        选择(item){
            item.active=!item.active
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
        height: _vw(22);
        line-height: _vw(22);
        border-radius: _vw(22);
        overflow: hidden;
        .active{
            @include bgcolor;
            color: #ffffff;
        }
        div{
            width: 100%;
            text-align: center;
            margin: 0px 1px;
        }
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
