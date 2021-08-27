<template>
    <ul class="底部">
        <li class="btn_1" @click="清空()">{{注数==0 ? '机选' : '清空'}}</li>
        <li class="金额">
            <div>{{注数}}注<span class="红色字体">{{总金额}}</span>元</div>
            <!-- <div>可用余额<span class="红色字体">{{userinfo.Money}}</span>元</div> -->
        </li>
        <li class="btn_2" @click="确定()">确定</li>
    </ul>
</template>

<script>
import { mapState , mapGetters, mapMutations, mapActions } from "vuex";
export default {
    name:"",
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            userinfo:x=>x.user.userinfo,
            选号配置: x => x.投注.选号配置,
            即将开奖:X=>X.投注.即将开奖
        }),
        ...mapGetters({
            总金额:'投注/总金额',
            注数:'投注/注数'
        }),
    },
    methods: {
        ...mapMutations({
            设置state:'投注/设置state',
        }),
        ...mapActions({
            设置待确认投注:'投注/设置待确认投注'
        }),
        清空(){
            if(this.注数==0){
                this.选号配置.设置机选();
                this.设置待确认投注()
            }else{
                if(!this.选号配置.list || this.选号配置.list.length==0){
                    this.选号配置.手动输入='';
                    this.选号配置.手动list=[];
                }else{
                    this.选号配置.list.forEach(item => {
                        item.选号.forEach(x=>{
                            x.active=false;
                        })
                    });
                }
            }
        },
        确定(){
            if(!this.即将开奖.IssueCode){
                this.$toast('未开盘');
                return
            }else if(this.注数==0){
                this.$toast('请选择号码');
                return
            }
            this.设置待确认投注()
        }
    },
    mounted() {

    },
}
</script>

<style lang="scss" scoped>
.底部{
    display: flex;
    align-items: center;
    background: #ffffff;
    height: _vw(44);
    font-size: _vw(14);
    color: #ffffff;
    .btn_1,
    .btn_2{
        height: 100%;
        width: _vw(80);
        flex-shrink: 0;
        line-height: _vw(44);
        text-align: center;
    }
    .btn_1{
        background: #404247;
    }
    .btn_2{
        @include bgcolor;
    }
    .金额{
        width: 100%;
        text-align: center;
        background: #2a2d32;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .红色字体{
        color: red;
    }
}
</style>