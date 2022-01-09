<template>
    <div class="flex">
        <div>
            <table>
                <thead>
                    <tr>
                        <th colspan="5" class="t1">{{item.name}}买入广告</th>
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
                        <th colspan="5" class="t2">{{item.name}}卖出广告</th>
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
        item: {
            default: ()=>({})
        },
        mairu:{
            default:""
        },
        maichu:{
            default:""
        },
        shouxufei:{
            default:""
        },
        zhuid:{
            default:""
        },
        fuid:{
            default:""
        },
        Refresh:{
            default:3.5
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
            //买入
            list2: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            // list21: [],
            //卖出
            list3: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            // list31: [],
            id: '',
            time: "",    //定时器
            time2: "",    //定时器
            hulv4:"",
            hulv2:""
        }
    },
    // computed: {
    //     fuidarr:function(){
    //         return this.fuid.split('|')
    //     }
    // },
    methods: {
        // 买入
        jisuan_lirun: function (item) {
            var chajia = "0000"
            if (this.mairu && this.maichu && this.shouxufei) {
                let maichu = this.item.tick.close*this.maichu
                let hulv4 =  maichu + maichu*this.shouxufei
                chajia = item.price - hulv4;
                chajia = chajia.toFixed(2)
            }
            return chajia
        },
        // 卖出
        jisuan_lirun11:function(item){
            var chajia = "0000"
            if (this.mairu !="" && this.maichu !="" && this.shouxufei !=""){
                let 买入 = this.item.tick.close * this.mairu
                let hulv2 = 买入 - 买入 * this.shouxufei
                chajia=item.price-hulv2;
                chajia = chajia.toFixed(2)
            }
            return chajia
        },
        getClass1: function (item) {
            var txtname = item.userName ? item.userName.substring(0, 7) : null;
            var trclass = ''
            var tdclass = ''
            let fuidarr = this.fuid.split('|')
            if (txtname === this.zhuid) {
                trclass = 'hongdibai'
            } else if (fuidarr.find(x=>x==txtname)) {
                trclass = 'landibai'
            } else {
                tdclass = 'lirun'
            }
            return { trclass: trclass, tdclass: tdclass }
        },
        获取买入() {
            if (!this.item.coinId) return;
            let coinId = this.item.coinId
            let g1 = axios.get(`https://otc-api-hk.eiijo.cn/v1/data/trade-market?coinId=${coinId}&currency=1&tradeType=sell&currPage=1&payMethod=0&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=`, '')
            let g2 = new Promise((resolve, reject) => {
                resolve({'提示':'不需要请求第二页'})
            });
            if(this.item.pageSize>10){
                g2 = axios.get(`https://otc-api-hk.eiijo.cn/v1/data/trade-market?coinId=${coinId}&currency=1&tradeType=sell&currPage=2&payMethod=0&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=`, '')
            }

            Promise.all([g1,g2]).then(all=>{
                // console.log(all)
                let L1 = all[0].data
                let len = this.item.pageSize - 10
                let L2 = all[1].data ? all[1].data.slice(0,len) : []
                this.list2 = [...L1,...L2]
                this.time = setTimeout(() => {
                    this.获取买入()
                }, 1000 * this.Refresh);
            }).catch(err=>{
                this.time = setTimeout(() => {
                    this.获取买入()
                }, 1000 * this.Refresh);
            })
        },
        获取卖出(){
            if (!this.item.coinId) return;
            let coinId = this.item.coinId
            let g1 = axios.get(`https://otc-api-hk.eiijo.cn/v1/data/trade-market?coinId=${coinId}&currency=1&tradeType=buy&currPage=1&payMethod=0&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=`, '')
            let g2 = new Promise((resolve, reject) => {
                resolve({'提示':'不需要请求第二页'})
            });
            if(this.item.pageSize>10){
                g2 = axios.get(`https://otc-api-hk.eiijo.cn/v1/data/trade-market?coinId=${coinId}&currency=1&tradeType=buy&currPage=2&payMethod=0&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=`, '')
            }
            Promise.all([g1,g2]).then(all=>{
                console.log(all)
                let L1 = all[0].data
                let len = this.item.pageSize - 10
                let L2 = all[1].data ? all[1].data.slice(0,len) : []
                this.list3 = [...L1,...L2]
                this.time2 = setTimeout(() => {
                    this.获取卖出()
                }, 1000 * this.Refresh);
            }).catch(err=>{
                this.time2 = setTimeout(() => {
                    this.获取卖出()
                }, 1000 * this.Refresh);
            })
        }
    },
    mounted() {
        console.log(this.item.name,this.item.coinId)
        this.获取买入()
        this.获取卖出()
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
        'item.coinId'(nw, ow) {
            // console.log(nw, ow, this.name)
            try {
                clearTimeout(this.time)
            } catch (error) {}
            try {
                clearTimeout(this.time2)
            } catch (error) {}
            this.获取买入()
            this.获取卖出()
        },
        'item.pageSize'(nw, ow) {
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

.hongdibai {
    color: #FFFFFF;
    background-color: #c82333 !important;
}
.landibai {
    color: #FFFFFF;
    background-color: #0062c8 !important;
}
.lirun {
    color: #c82333
}
</style>