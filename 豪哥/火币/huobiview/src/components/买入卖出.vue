<template>
    <div class="flex">
        <div>
            <table>
                <thead>
                    <tr>
                        <th colspan="5" class="t1">{{name}}买入广告</th>
                    </tr>
                    <tr class="title2">
                        <th>#</th>
                        <th>价格</th>
                        <th>利润</th>
                        <th>数量</th>
                        <th>昵称</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in list2" :class="getClass1(item).trclass">
                        <td>{{index+1}}</td>
                        <td>{{item.price ? parseFloat(item.price).toFixed(2) : ''}}</td>
                        <td :class="getClass1(item).tdclass">{{jisuan_lirun(item)}}</td>
                        <td>{{item.tradeCount ? parseFloat(item.tradeCount).toFixed(2) : ''}}</td>
                        <td>
                            <div class="userName">
                                <div>{{item.userName ? item.userName.substring(0,7) : ''}}</div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th colspan="5" class="t2">{{name}}卖出广告</th>
                    </tr>
                    <tr class="title2">
                        <th>#</th>
                        <th>价格</th>
                        <th>利润</th>
                        <th>数量</th>
                        <th>昵称</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in list3" :class="getClass1(item).trclass">
                        <td>{{index+1}}</td>
                        <td>{{item.price ? parseFloat(item.price).toFixed(2) : ''}}</td>
                        <td :class="getClass1(item).tdclass">{{jisuan_lirun11(item)}}</td>
                        <td>{{item.tradeCount ? parseFloat(item.tradeCount).toFixed(2) : ''}}</td>
                        <td>
                            <div class="userName">
                                <div>{{item.userName ? item.userName.substring(0,7) : ''}}</div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
function in_array(stringToSearch, arrayToSearch) {
    for (s = 0; s < arrayToSearch.length; s++) {
        thisEntry = arrayToSearch[s].toString(); 
        if (thisEntry == stringToSearch) { 
            return true; 
        }
    } 
    return false;
}

import axios from "axios";
export default {
    props: {
        name: {
            default: ''
        }
    },
    data() {
        return {
            list: [
                { name: 'BTC', coinId: 1, ws: '' },
                { name: 'ETH', coinId: 3, ws: '' },
                { name: 'HT', coinId: 4, ws: '' },
                { name: 'XRP', coinId: 7, ws: '' },
                { name: 'LTC', coinId: 8, ws: '' },
                { name: 'EOS', coinId: 5, ws: '' },
                { name: 'USDT', coinId: 2, ws: '' },
            ],
            list2: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            list3: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            id: '',
            time: "",    //定时器
            time2: "",    //定时器
            zhuid: "",
            mairuhui: "",
            maichuhui: "",
            shouxufei: "",
            fuid:'',
            hulv4:"",
            hulv2:""
        }
    },
    computed: {
        fuidarr:function(){
            return this.fuid.split('|')
        }
    },
    methods: {
        // 买入
        jisuan_lirun: function (item) {
            var chajia = "0000"
            if (this.mairuhui != "" && this.maichuhui != "" && this.shouxufei != "") {
                chajia = item.price - this.hulv4;
                chajia = chajia.toFixed(2)
            }
            return chajia
        },
        // 卖出
        jisuan_lirun11:function(item){
            var chajia = "0000"
            if (this.mairuhui !="" && this.maichuhui !="" && this.shouxufei !=""){
                chajia=item.price-this.hulv2;
                chajia = chajia.toFixed(2)
            }
            return chajia
        },
        getClass1: function (item) {
            var txtname = item.userName ? item.userName.substring(0, 7) : null;
            var trclass = ''
            var tdclass = ''
            if (txtname === this.zhuid) {
                trclass = 'hongdibai'
            } else if (this.fuidarr.find(x=>x==txtname)) {
                trclass = 'landibai'
            } else {
                tdclass = 'lirun'
            }
            return { trclass: trclass, tdclass: tdclass }
        },
        获取买入() {
            if (!this.name) return;
            let coinId = this.list.find(x => x.name == this.name).coinId
            // console.log(this.name, coinId)
            // axios.get(`https://otc-api-hk.eiijo.cn/v1/data/trade-market?coinId=${coinId}&currency=1&tradeType=sell&currPage=1&payMethod=0&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=`,'')
            axios.get(`https://otc-api.huobi.com/v1/data/trade-market?coinId=${coinId}&currency=1&tradeType=sell&currPage=1&payMethod=0&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=`, '').then(res => {
                console.log(res)
                this.list2 = res.data
                this.time = setTimeout(() => {
                    this.获取买入()
                }, 3.5 * 1000);
                
            }).catch(err => {
                console.error(err);
                this.time = setTimeout(() => {
                    this.获取买入()
                }, 3.5 * 1000);
            })
        },
        获取卖出(){
            if (!this.name) return;
            let coinId = this.list.find(x => x.name == this.name).coinId
            axios.get(`https://otc-api.huobi.com/v1/data/trade-market?coinId=${coinId}&currency=1&tradeType=buy&currPage=1&payMethod=0&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=`, '').then(res => {
                this.list3 = res.data
                this.time2 = setTimeout(() => {
                    this.获取卖出()
                }, 3.5 * 1000);
                
            }).catch(err => {
                console.error(err);
                this.time2 = setTimeout(() => {
                    this.获取卖出()
                }, 3.5 * 1000);
            })
        }
    },
    mounted() {
        console.log(this.name)
        this.获取买入()
        this.获取卖出()
        // this.time = setInterval(() => {
        //     this.获取买入()
        // }, 3.5 * 1000);
        
    },
    beforeDestroy() {
        // clearInterval(this.time)
        try {
            clearTimeout(this.time)
        } catch (error) {}
        try {
            clearTimeout(this.time2)
        } catch (error) {}
    },
    watch: {
        name(nw, ow) {
            // console.log(nw, ow, this.name)
            try {
                clearTimeout(this.time)
            } catch (error) {}
            try {
                clearTimeout(this.time2)
            } catch (error) {}
            this.获取买入()
            this.获取卖出()
        }
    }
}
</script>

<style lang="scss" scoped>
.flex {
    display: flex;
    > div {
        width: 50%;
        padding: 0px 1px;
    }
}
table {
    width: 100%;
    border: 1px solid #dee2e6;
    font-size: 12px;
    text-align: center;
    border-collapse: collapse;
}
.title2 {
    background: #000;
    color: #fff;
}
td,
th {
    padding: 5px 2px;
    border-left: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
}
.t1 {
    font-size: 25px;
    color: #1e7e34;
}
.t2 {
    font-size: 25px;
    color: #c82333;
}
</style>