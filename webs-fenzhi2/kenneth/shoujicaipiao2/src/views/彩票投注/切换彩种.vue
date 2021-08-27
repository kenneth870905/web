<template>
    <div class="切换彩种">
        <ul>
            <li @click="切换彩票(item)" :class="{'active':当前彩种.id==item.id}" v-for="(item, index) in list" :key="index">
                <span>{{item.title}}</span>
            </li>
        </ul>
        <div @click="隐藏切换彩种()" class="遮罩"></div>
    </div>
</template>

<script>
import { mapState, mapMutations , mapGetters } from 'vuex';
export default {
    name: "",
    inject:['隐藏切换彩种'],
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState({
            玩法类型: state => state['投注']['玩法类型'],
        }),
        ...mapGetters({
            当前彩种:'投注/当前彩种',
            list:"全部彩票"
        })
    },
    methods: {
        ...mapMutations({
            设置state:"投注/设置state"
        }),
        切换彩票(item){
            // this.$router.push('/buyLottery?t='+item.type+'&t1='+item.type1)
            // this.设置state(['玩法类型',item])
            // this.$router.replace('/buyLottery?t='+item.type+'&t1='+item.type1)

            this.设置state(['彩票id',item.id]);
            this.隐藏切换彩种()
            if(this.$route.query.t){
                this.$router.replace('/buyLottery?i='+item.id+'&t='+this.$route.query.t)
            }else{
                this.$router.replace('/buyLottery?i='+item.id)
            }

        }
    },
}
</script>

<style lang="scss" scoped>
.切换彩种 {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 2;
    padding-top: 44px;
    > ul {
        position: relative;
        z-index: 1;
        background: #ffffff;
        display: flex;
        flex-wrap: wrap;
        max-height: 50vh;
        overflow: auto;
        padding-bottom: _vw(10);
        li {
            width: calc(100% / 3);
            padding: _vw(5) _vw(5) 0px;
            span {
                height: _vw(28);
                border: 1px solid #e8e8e8;
                text-align: center;
                line-height: _vw(28);
                font-size: _vw(14);
                display: block;
                color: #777777;
            }
            &.active {
                span {
                    color: $color;
                    border: 1px solid $color;
                }
            }
        }
    }
    .遮罩 {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
    }
}
</style>
