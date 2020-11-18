<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">{{typelist[type]}}</h1>
            <button @click="g()" class="mui-btn mui-btn-blue mui-btn-link mui-pull-right">去下注</button>
        </header>
        <div class="mui-content mui-fullscreen">
            <!-- <van-sticky :offset-top="44"> -->
            <header1  class="头部"/>
            <!-- </van-sticky> -->
            <div class="list">
                <van-list v-model="loading" :finished="list.length>=total && init && !loading" finished-text="没有更多了" @load="onLoad">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell" @click="$router.push('/lhzlDetails?i='+item.Id+'&n='+item.Title)" v-for="(item, index) in list" :key="index">
                            {{item.Title}}
                        </li>
                    </ul>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
import { config, mapState } from "vuex";
import { api_六合资料 } from "@/api/游戏彩票接口.js";
import header1 from './头部.vue';
export default {
    name: "",
    components: {
        header1
    },
    data() {
        return {
            typelist: ['', '公式专区', '高手专区', '精选彩图', '马会资料'],
            query: {
                page: 0,
                rows: 20,
                typeId: '',
            },
            total: 0,
            list: [],
            loading: false,
            init:false
        }
    },
    computed: {
        ...mapState({
            config:'config'
        }),
        type() {
            return this.$route.params.type
        },
    },
    methods: {
        g(){
            if(this.config.newbet){
                this.$router.push(`/buyLottery?i=70001&t=2`)
            }else{
                this.$router.push('/cpiframe?i=70001&t=2')
            }
        },
        onLoad(){
            this.query.page++;
            this.获取数据();
        },
        获取数据() {
            this.init=true;
            // this.loading=true;
            this.query.typeId = this.$route.params.type;
            api_六合资料(this.query).then(x => {
                this.list = [ ...this.list , ...x.data.rows ];
                this.total = x.data.total;
                this.loading = false
            }).catch(err=>{
                this.loading = false
            })
        }
    },
    mounted() {
        // this.获取数据();

    },
}
</script>

<style lang="scss" scoped>
.list{
    font-size: _vw(14);
}
.mui-content{
    display: flex;
    flex-direction: column;
    .头部{
        flex-shrink: 0;
    }
    .list{
        margin: _vw(5) 0px 0px;
        height: 100%;
        overflow: auto;
    }
}
</style>