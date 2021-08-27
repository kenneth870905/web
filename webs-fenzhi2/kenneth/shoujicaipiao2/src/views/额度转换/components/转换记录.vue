<template>
    <div>
        <van-list v-model="数据.loading" @load="xiayiye" :finished="!数据.loading && 数据.total<=数据.list.length && 数据.total>-1" finished-text="没有更多了">
            <ul class="mui-table-view list">
                <li class="mui-table-view-cell item" v-for="(item, index) in 数据.list" :key="index">
                    <div>
                        <div v-if="item.Type=='转出'">
                            {{config.title}} → {{item.SystemType}}
                        </div>
                        <div v-else>
                            {{item.SystemType}} → {{config.title}}
                        </div>
                        <span class="time">
                            {{item.Createtime}}
                        </span>
                    </div>
                    <div class="钱" :class="{黄色:item.Type=='转出'}">
                        {{item.Amount}}
                    </div>
                </li>
            </ul>
        </van-list>
    </div>
</template>

<script>
import { api_资金明细列表 } from "@/api/资金接口.js";
import { mapState } from "vuex";
export default {
    name:"",
    data() {
        return {
            数据:{
                loading:false,
                list:[],
                total:-1
            },
            query:{
                page: 0,
                rows: 20,
                type: '',
                types:[2,3]
            }
        }
    },
    computed: {
        ...mapState({
            config:'config'
        })
    },
    methods: {
        获取明细(){
            console.log('获取数据')
            api_资金明细列表(this.query).then(x=>{
                console.log(x)
                this.数据.list = [...this.数据.list , ...x.data.rows]
                this.数据.total = x.data.total;
                this.数据.loading = false;
            }).catch(err=>{
                this.数据.total = 0;
                this.数据.loading = false;
            })
        },
        xiayiye(){
            this.query.page++
            this.获取明细()
        }
    },
    mounted() {
        // this.获取明细()
        
    },
}
</script>

<style lang="scss" scoped>
.list{
    .item{
        display: flex;
        font-size: _vw(14);
        div:nth-child(1){
            flex-grow: 1;
        }
        .time{
            font-size: _vw(12);
            color: #969696;
        }
        .钱{
            font-weight: bold;
            &.黄色{
                color:#f97e00;
            }
        }
    }
}
</style>
