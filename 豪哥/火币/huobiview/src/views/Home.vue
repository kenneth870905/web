<template>
    <div class="home">
        <header1 />
        <div class="显示选择">
            显示选项：
            <el-checkbox-group v-model="checkboxGroup2" :max="6">
                <el-checkbox :label="item.name" v-for="(item, index) in list" :key="index"></el-checkbox>
            </el-checkbox-group>
        </div>
        
        <ul class="tableList">
            <li v-for="item in newList">
                <tableList :name="item.name"/>
            </li>
        </ul>

    </div>
</template>

<script>
import header1 from "@/components/头部.vue";
import tableList  from "@/components/买入卖出.vue";

import { mapMutations, mapState } from "vuex";
import axios from 'axios'
export default {
    components: {
        header1,
        tableList
    },
    data() {
        return {
            // BTC-ETH-HT-XRP-LTC-EOS-USDT
            list:[
                {name:'BTC',coinId:1,ws:'',排序:1},
                {name:'ETH',coinId:3,ws:'',排序:2},
                {name:'HT',coinId:4,ws:'',排序:3},
                {name:'XRP',coinId:7,ws:'',排序:4},
                {name:'LTC',coinId:8,ws:'',排序:5},
                {name:'EOS',coinId:5,ws:'',排序:6},
                {name:'USDT',coinId:2,ws:'',排序:7},
            ],
            checkboxGroup2: []
        }
    },
    computed: {
        ...mapState({
            token: "token"
        }),
        newList(){
            let l = []
            this.list.forEach(item=>{
                if(this.checkboxGroup2.find(x=>x==item.name)){
                    l.push(item)      
                }
            })
            return l
        }
    },
    methods: {
        ...mapMutations({
            setToken: "setToken"
        }),
        验证登录() {
            return
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
        链接ws() {
            // wss://api.huobi.pro/ws/v2
            // wss://api.huobi.pro/ws
            // var ws = new WebSocket("wss://api.huobiasia.vip/ws");
            var ws = new WebSocket("wss://api.huobi.pro/ws");
            //杩炴帴鎴愬姛鏃讹紝瑙﹀彂浜嬩欢
            ws.onopen = function () {
                //璇锋眰鍙傛暟
                // var param = "{\"sub\": \"market.btcusdt.kline.1min\",\"id\": \"id10\"}";
                var param = "{\"sub\": \"market.btcusdt.kline.1min\"}";
                // var param = "{\"sub\": \"market.btcusdt.kline.1min\",\"id\": \"id10\"}";
                ws.send(param);
            }
            //鎺ユ敹鍒版湇鍔＄鍝嶅簲鐨勬暟鎹椂锛岃Е鍙戜簨浠�
            ws.onmessage = function (evt) {
                var reader = new FileReader();
                reader.readAsArrayBuffer(evt.data, "utf-8")
                reader.onload = function (e) {
                    console.log(e)
                    console.log(reader.result.slice())
                }
            }
            // 鏂紑 web socket 杩炴帴鎴愬姛瑙﹀彂浜嬩欢
            ws.onclose = () => {
                console.log('断开连接')
                this.链接ws()
            };
        }
    },
    mounted() {
        this.验证登录()
        // this.链接ws()
    },
}
</script>

<style lang="scss" scoped>
.显示选择{
    margin: 10px 0px 0px;
    border: 1px solid #eee;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    position: sticky;
    top: 0px;
    background: rgba($color: #fff, $alpha: 0.9);
}
.tableList{
    display: flex;
    flex-wrap: wrap;
    margin: 5px 0px;
    li{
        width: calc(100%/3);
        padding: 0px 2px;
        margin: 10px 0px 0px;
    }
}
</style>

