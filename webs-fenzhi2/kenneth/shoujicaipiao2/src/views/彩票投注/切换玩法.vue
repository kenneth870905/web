<template>
    <div class="玩法">
        <div class="遮罩" @click="隐藏切换玩法('')"></div>
        <div class="内容" >
            <ul class="选项">
                <li @click="点击一级(item ,index)" :class="{'active':item==玩法一级}" v-for="(item, index) in 彩票配置.Menus" :key="index">
                    <span>{{item.Label}}</span>
                </li>
            </ul>
            <div v-for="(item, index) in 玩法一级.SubMenus" :key="index">
                <div class="标题">{{item.Label}}</div>
                <ul class="选项">
                    <li @click="点击三级(item1,index1)" :class="{'active':item1==玩法三级}" v-for="(item1, index1) in item.Methods" :key="index1">
                        <span>{{item1.Label}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    name:"",
    inject:['隐藏切换玩法'],
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState({
            玩法数组:x=>x.投注.玩法数组,
            玩法:x=>x.投注.玩法,
            彩票配置:x=>x.投注.彩票配置,
            玩法一级:x=>x.投注.玩法一级,
            玩法二级:x=>x.投注.玩法二级,
            玩法三级:x=>x.投注.玩法三级,
        }),
    },
    methods: {
        ...mapMutations({
            设置state:"投注/设置state"
        }),
        ...mapActions({
            设置购彩样式:'投注/设置购彩样式'
        }),
        点击一级(item){
            console.log('点击一级玩法')
            this.设置state(['玩法一级',item]);
            if(item.SubMenus){
                this.设置state(['玩法三级',item.SubMenus[0].Methods[0]]);
            }else{
                this.隐藏切换玩法();
                this.设置state(['玩法三级',item.Method]);
            }
            this.隐藏切换玩法()
            this.设置购彩样式()
        },
        点击三级(item){
            this.设置state(['玩法三级',item]);
            this.设置购彩样式();
            this.隐藏切换玩法();
        }
    },
    mounted() {
    },
}
</script>

<style lang="scss" scoped>
.玩法{
    position: fixed;
    top: 0px;
    padding: 44px 0px 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 10;
    .遮罩{
        width: 100%;
        height: 100%;
        position: absolute;
        background: rgba(0,0,0,0.3);
        top: 0px;
        left: 0px;
    }
    .内容{
        background: #ffffff;
        position: relative;
        z-index: 3;
        padding: _vw(10) 0px 0px;
        height: 100%;
        overflow: auto;
        .标题{
            font-size: _vw(13);
            color: #000000;
            padding: 5px _vw(10);
        }
        .选项{
            flex-wrap: wrap;
            display: flex;
            text-align: center;
            font-size: _vw(13);
            border-bottom: 1px solid #eeeeee;
            margin: 0px 0px _vw(5);
            li{
                width: 25%;
                padding: 0px _vw(5) _vw(5);
                span{
                    display: block;
                    height: 28px;
                    border:1px solid #efefef;
                    color: #999999;
                    line-height: _vw(26);
                }
            }
            .active{
                span{
                    border:1px solid #be1204;
                    color: #be1204;
                }
            }
        }
    }
}
</style>
