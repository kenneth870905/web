<template>
    <div class="home">
        <header1 :list="newList" :买入汇率="买入汇率" />
        <div class="显示选择">
            显示选项：
            <!-- <el-checkbox-group v-model="checkboxGroup2" :max="6" @change="change1"> -->
            <div class="border" v-for="(item, index) in list" :key="index">
                <el-checkbox class="checkbox" :disabled="newList.length>=6 && !item.check" @change="change1(item)" v-model="item.check" :label="item.name"></el-checkbox>
                <el-select v-model="item.pageSize" size="mini" style="width: 80px;">
                    <el-option label="10条" :value="10"></el-option>
                    <el-option label="15条" :value="15"></el-option>
                    <el-option label="20条" :value="20"></el-option>
                    <el-option label="100条" :value="100"></el-option>
                </el-select>
            </div>
            <div>
                <el-select v-model="Refresh" size="mini" style="width: 130px;">
                    <el-option label="3.5秒刷新一次" :value="3.5"></el-option>
                    <el-option label="5秒刷新一次" :value="5"></el-option>
                    <el-option label="10秒刷新一次" :value="10"></el-option>
                    <el-option label="20秒刷新一次" :value="20"></el-option>
                </el-select>(请求间隔时间)
            </div>
            <!-- </el-checkbox-group> -->
        </div>

        <ul class="tableList" :class="'length_'+newList.length">
            <li v-for="item in newList">
                <tableList :item="item" :mairu="买入汇率" :maichu="卖出汇率" :shouxufei="手续费" :zhuid="主号ID" :fuid="副号ID" :Refresh="Refresh" />
            </li>
        </ul>
    </div>
</template>

<script>
import header1 from "@/components/头部.vue";
import tableList from "@/components/买入卖出.vue";

import { mapMutations, mapState } from "vuex";
import axios from 'axios'
export default {
    components: {
        header1,
        tableList
    },
    provide() {
        return {
            setitem: (key, value) => {
                this[key] = value
            }
        }
    },
    data() {
        return {
            // BTC-ETH-HT-XRP-LTC-EOS-USDT
            list: [
                { name: 'BTC', check: false, pageSize: 10, wsinstId:'BTC-USDT' , tick: { close: "" }, },
                { name: 'ETH', check: false, pageSize: 10, wsinstId:'ETH-USDT' , tick: { close: "" }, },
                // { name: 'HT',  check: false, pageSize: 10 },
                // { name: 'XRP', check: false, pageSize: 10 },
                // { name: 'LTC', check: false, pageSize: 10 },
                // { name: 'EOS', check: false, pageSize: 10 },
                { name: 'USDT', check: false, pageSize: 10, tick: { close: "" }, },
                // { name: 'DOGE', check: false, pageSize: 10 },
            ],
            checkboxGroup2: [],
            ws: '', //连接对象

            买入汇率: "",
            手续费: "",
            卖出汇率: "",
            主号ID: "",
            副号ID: "",
            Refresh: 3.5
        }
    },
    computed: {
        ...mapState({
            token: "token"
        }),
        newList() {
            let l = this.list.filter(x => x.check)
            return l
        }
    },
    methods: {
        ...mapMutations({
            setToken: "setToken"
        }),
        验证登录() {
            // return
            let token = this.$route.query.token ? this.$route.query.token : this.token
            if (!token) {
                this.$router.push('/404')
                return
            }
            this.setToken(token)
            axios.post('http://1.huobi456.com/huobi/public/index.php/user/getuserinfo?token=' + token, '').then(res => {
                console.log(res)
                if (res.code != 1) {
                    this.$router.push('/404')
                }
            }).catch(err => {
                console.error(err);
                this.$router.push('/404')
            })
        },
        change1(item) {
            if (item.name == 'USDT') return
            if (item.check) {
                var str = {
                    "op": "subscribe",
                    "args": [
                        {
                            "channel": "tickers-3s",
                            "instId": item.wsinstId
                        }
                    ]
                };
                this.ws.send(JSON.stringify(str));
            } else {
                // var str = { "unsub": item.ws, id: item.coinId };
                var str = {
                    "op": "unsubscribe",
                    "args": [
                        {
                            "channel": "tickers-3s",
                            "instId": item.wsinstId
                        }
                    ]
                };
                this.ws.send(JSON.stringify(str));
            }
        },
        链接ws() {
            // wss://wspri.okex.com:8443/ws/v5/public
            // wss://wspri.coinall.ltd:8443/ws/v5/public
            this.ws = new WebSocket("wss://wspri.okex.com:8443/ws/v5/public");
            // this.ws = new WebSocket("wss://api.huobi.pro/ws");
            this.ws.onopen = () => {
                this.list.forEach(item => {
                    if (item.check && item.name != 'USDT') {
                        this.change1(item)
                    }
                });
            }
            this.ws.onmessage = (evt) => {
                let res = JSON.parse(evt.data)
                // console.log(res)
                if(res.data && res.data.length>0){
                    let obj2 = this.list.find(x=>x.wsinstId == res.arg.instId)
                    if(obj2){
                        obj2.tick.close = res.data[0].last
                    }
                }

            }
            // 鏂紑 web socket 杩炴帴鎴愬姛瑙﹀彂浜嬩欢
            this.ws.onclose = () => {
                console.log('断开连接')
                this.链接ws()
            };
        }
    },
    mounted() {
        // this.验证登录()
        this.链接ws()
    },
}
</script>

<style lang="scss" scoped>
.home {
    padding-bottom: 20px;
}
.显示选择 {
    margin: 10px 0px 0px;
    border: 1px solid #eee;
    padding: 10px 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    position: sticky;
    top: 0px;
    font-size: 12px;
    background: rgba($color: #fff, $alpha: 0.9);
    box-shadow: 0px 0px 2px 0px #6f6f6f;
    > div {
        margin: 0px 15px;
        padding: 5px;
    }
    .border {
        border: 1px solid #b9b9b9;
    }
    .checkbox {
        margin-right: 10px;
    }
}
.tableList {
    display: flex;
    flex-wrap: wrap;
    margin: 5px 0px;
    &.length_1 {
        li {
            width: 100%;
        }
    }
    &.length_2 {
        li {
            width: 50%;
        }
    }
    li {
        width: calc(100% / 3);
        transition: all 0.3s;
        padding: 0px 2px;
        margin: 10px 0px 0px;
    }
}
</style>

