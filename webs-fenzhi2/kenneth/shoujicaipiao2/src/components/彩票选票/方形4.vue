<template>
    <div class="方形4">
        <div class="标题" v-if="name">
            {{name}}
        </div>
        <ul>
            <li v-for="(item, index) in 选号" :key="index" @click="选择(item)">
                <div :class="{'active':item.active}">
                    <div class="号码" :class="item.color">{{item.name}}</div>
                    <div class="赔率">{{item.赔率}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
// 样式说明
// 一排3个方形样式
export default {
    name:"",
    props:{
        // 显示头部:{
        //     default:true
        // },
        选号:{
            default:()=>{
                return []
            },
        },
        max:{
            default:0
        },
        name:""
    },
    data() {
        return {
            // 选号1:this.选号          
        }
    },
    methods: {
        选择(item){
            // this.$set(item, 'active', !item.active)
            if(item.active){
                this.$set(item, 'active', false)
                return
            }
            if(this.max==1){
                this.选号.forEach(item_1 => {
                    if(item_1==item){
                        this.$set(item, 'active', !item.active)
                    }else{
                        this.$set(item_1, 'active', false)
                    }
                });
            }else if(this.max){
                // console.log(this.选号.filter(x=>x.active))
                if(this.选号.filter(x=>x.active).length>=this.max){
                    this.$toast('最多选择'+this.max+'个')
                }else{
                    this.$set(item, 'active', !item.active)
                }
            }else{
                this.$set(item, 'active', !item.active)
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.方形4{
    margin-bottom: _vw(10);
    .标题{
        display: inline-block;
        background: #dbedff;
        margin: _vw(5) 0px _vw(5);
        font-size: _vw(14);
        min-width: _vw(70);
        text-align: center;
        line-height: _vw(26);
        border-top-right-radius: _vw(26);
        border-bottom-right-radius: _vw(26);
        // box-shadow: 2px 2px 4px 0px #cecece
        padding: 0px _vw(10);
    }
    ul{
        display: flex;
        flex-wrap: wrap;
        padding-top: _vw(5);
        >li{
            padding: 0px _vw(5);
            margin: 0px 0px _vw(10) 0px;
            width: calc(100% / 4);
            >div{
                background: #ffffff;
                border-radius: 5px;
                height: _vw(50);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                // box-shadow: 0px 0px 4px 0px #cecece;
                border: 1px solid #cccccc;
                
                &.active{
                    background: #ffc9c9;
                }
                .号码{
                    font-size: _vw(16);
                    // color: #757575;
                    color: #000000;
                    &.红{
                        color: #dc3545;
                    }
                    &.绿{
                        color: #28a745 ;
                    }
                    &.蓝{
                        color: #007bff ;
                    }
                }
                .赔率{
                    font-size: _vw(12);
                    color: #ec0022;
                }
            }
        }
    }
}

</style>
