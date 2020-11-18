<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">资金明细</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="header_1" @click="选择类型()">
                <span>{{ 当前分类 ? 当前分类.text : ''}}</span>
                <i class="icon iconfont icon-tubiaozhizuo-"></i>
            </div>

            <div class="content_1" ref="content1" @scroll="scroll($event)">
                <van-list v-model="数据.loading" :finished="!数据.loading && 数据.total<=数据.list.length" finished-text="没有更多了" @load="xiayiye">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell" @click="跳转(item)" v-for="(item, index) in 数据.list" :key="index">
                            <div class="mui-table">
                                <div class="mui-table-cell mui-col-xs-7">
                                    <h4 class="mui-ellipsis" :class="{'蓝色字体':item.Code}">({{item.SystemType}}){{item.Type}}</h4>
                                    <p class="mui-h6">{{item.Note}}</p>
                                </div>
                                <div class="mui-table-cell mui-col-xs-3 mui-text-right">
                                    <span class="mui-h5" :class="getAmountColor(item)">{{item.Amount}}</span> 元
                                    <p class="mui-h6 mui-ellipsis">{{item.Createtime}}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </van-list>
            </div>
            
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    name: "",
    data() {
        return {
            分类:[
                {value: '',text: '全部类型'}, 
                {value: '0',text: '提款'},
                {value: '1',text: '存款'}, 
                {value: '2',text: '转出'}, 
                {value: '3',text: '转入'}, 
                {value: '4',text: '支出'}, 
                {value: '5',text: '派奖'}, 
                {value: '6',text: '优惠'}, 
                {value: '7',text: '返水'}, 
                {value: '8',text: '彩金'}, 
                {value: '9',text: '推荐'}, 
                {value: '10',text: '返点'}, 
                {value: '11',text: '返佣'}, 
                {value: '12',text: '撤单'}, 
            ],
        }
    },
    computed: {
        ...mapState({
            数据:x=>x.资金明细.数据,
            滚动条位置:x=>x.资金明细.滚动条位置,
        }),
        当前分类(){
            return this.分类.find(x=>x.value == this.数据.query.type);
        }
    },
    methods: {
        ...mapActions({
            切换类型:'资金明细/切换类型',
            获取数据:'资金明细/获取数据',
            下一页:"资金明细/下一页",
            设置滚动条位置:"资金明细/设置滚动条位置"
        }),
        选择类型() {
            var 选择器 = new mui.PopPicker();
            选择器.setData(this.分类);
            选择器.pickers[0].setSelectedValue(this.当前分类.value);
            选择器.show((items) => {
                var type=items[0].value
                this.切换类型(type);

                选择器.dispose();
                选择器 = null;
            });
        },
        xiayiye(){
            this.下一页()
        },
        getAmountColor(item){
            if (item.AuditState == null){
                return '红色字体';
            }else if (item.AuditState == 0){
                return '蓝色字体';
            }else if (item.AuditState == 2){
                return '灰色字体'
            }else{
                return '红色字体';
            }
        },
        跳转(item){
            if(item.SystemType=='系统彩票'){
                this.$router.push('/order?code='+item.Code);
            }else{
                this.$toast('暂无详情') 
            }
        },
        scroll(e){
            this.设置滚动条位置(e.currentTarget.scrollTop)
        },
    },
    mounted() {
        setTimeout(() => {
            this.$refs.content1.scrollBy(0,this.滚动条位置)       
            // smoothScrollTo
            // scrollTo
            // scrollIntoView 
        }, 300);
        if(this.数据.list.length==0){
            this.获取数据();
        }
        

    },
    beforeDestroy() {
        
    },
}
</script>

<style lang="scss" scoped>
.mui-content{
    display: flex;
    flex-direction: column;
    .content_1{
        flex-grow: 1;
        overflow: auto;
    }
}
.header_1 {
    margin: 0px 0px _vw(5) 0px;
    border-bottom: 1px solid #efeff4;
    flex-shrink: 0;
    background: #ffffff;
    height: _vw(40);
    padding: 0px _vw(15);
    font-size: _vw(14);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    span {
        margin: 0px 5px 0px 0px;
    }
    i{
        color: #007aff;
    }
}

.蓝色字体{
    color: #007bff ;
}
.红色字体{
    color: $color;
}
.灰色字体{
    color: #6c757d;
}
</style>
