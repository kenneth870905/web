var vm = new Vue({
    el:"#vue",
    data() {
        return {
            list:[
                { name: 'BTC', check: false, pageSize: 10, wsinstId:'BTC-USDT' , tick: { close: "" }, 
                    list2:[],
                    list3:[] ,
                    time:"" //定时器
                },
                { name: 'ETH', check: false, pageSize: 10, wsinstId:'ETH-USDT' , tick: { close: "" }, 
                    list2:[],
                    list3:[] ,
                    time:"" //定时器
                },
                // { name: 'HT',  check: false, pageSize: 10 },
                // { name: 'XRP', check: false, pageSize: 10 },
                // { name: 'LTC', check: false, pageSize: 10 },
                // { name: 'EOS', check: false, pageSize: 10 },
                { name: 'USDT', check: false, pageSize: 10, tick: { close: "" }, 
                    list2:[],
                    list3:[] ,
                    time:"" //定时器
                },
                // { name: 'DOGE', check: false, pageSize: 10 },
            ],
            checkboxGroup2: [],
            ws: '', //连接对象

            买入汇率:"",
            手续费:"",
            卖出汇率:"",
            主号ID:"",
            副号ID:"",
            Refresh:3.5,
            //买入
            list2: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            //卖出
            list3: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        }
    },
    computed: {
        newList() {
            let l = this.list.filter(x => x.check)
            return l
        }
    },
    methods: {
        change1(item) {
            if (item.check) {
                this.获取买卖(item)
                if (item.name == 'USDT') return
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
                try {
                    clearTimeout(item.time)
                } catch (error) {
                }
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
        // 头部======
        newClose(close){
            // let str = close.toString()
            return close.toFixed(2)
        },
        买入1(item){
            if(this.买入汇率){
                var n = item.tick.close * this.买入汇率
                return Number.isFinite(n) ? n.toFixed(2) : '0000'
            }else{
                return '0000'
            }
        },
        买入2(item){
            if(this.买入汇率 && this.手续费){
                var n = item.tick.close * this.买入汇率
                var n2 = n - n*this.手续费
                return Number.isFinite(n2) ? n2.toFixed(2) : '0000'
            }else{
                return '0000'
            }
        },
        卖出1(item){
            if(this.卖出汇率){
                var n = item.tick.close * this.卖出汇率
                return Number.isFinite(n) ? n.toFixed(2) : '0000'
            }else{
                return '0000'
            }
        },
        卖出2(item){
            if(this.卖出汇率 && this.手续费){
                var n = item.tick.close * this.卖出汇率
                var n2 = n + n*this.手续费
                return Number.isFinite(n2) ? n2.toFixed(2) : '0000'
            }else{
                return '0000'
            }
        },
        // 表格
        // 买入
        jisuan_lirun: function (item,parent) {
            var chajia = "0000"
            if (this.买入汇率 && this.卖出汇率 && this.手续费) {
                // let 卖出汇率 = this.item.tick.close*this.卖出汇率
                let 卖出汇率 = parent.tick.close*this.卖出汇率
                let hulv4 =  卖出汇率 + 卖出汇率*this.手续费
                chajia = item.price - hulv4;
                chajia = chajia.toFixed(2)
            }
            return chajia
        },
        // 卖出
        jisuan_lirun11:function(item,parent){
            var chajia = "0000"
            if (this.买入汇率 !="" && this.卖出汇率 !="" && this.手续费 !=""){
                // let 买入 = this.item.tick.close * this.mairu
                let 买入 = parent.tick.close * this.买入汇率
                let hulv2 = 买入 - 买入 * this.手续费
                chajia=item.price-hulv2;
                chajia = chajia.toFixed(2)
            }
            return chajia
        },
        getClass1: function (item) {
            var txtname = item.nickName ? item.nickName.substring(0, 7) : null;
            var trclass = ''
            var tdclass = ''
            let fuidarr = this.副号ID.split('|')
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
            console.log("获取买入")
            if (!this.item.coinId) return;
            let coinId = this.item.coinId
            // let g1 = axios.get(`https://otc-api-hk.eiijo.cn/v1/data/trade-market?coinId=${coinId}&currency=1&tradeType=sell&currPage=1&payMethod=0&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=`, '')
            let g1 = axios.get(mairu1(coinId), '')
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
            console.log("获取卖出")
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
        },
        获取买卖(item){
            console.log(item)
            // console.log(this.item.name)
            let baseCurrency = item.name
            // axios.get(`https://www.ouyicn.tel/v3/c2c/tradingOrders/books?quoteCurrency=CNY&baseCurrency=${baseCurrency}&side=all&paymentMethod=all&userType=all&showTrade=false&receivingAds=false&noShowSafetyLimit=false&showFollow=false&showAlreadyTraded=false&isAbleFilter=false`)
            axios.get(`https://www.okx.com/v3/c2c/tradingOrders/books?quoteCurrency=CNY&baseCurrency=${baseCurrency}&side=all&paymentMethod=all&userType=all&showTrade=false&receivingAds=false&showFollow=false&showAlreadyTraded=false&isAbleFilter=false`)
            .then(x=>{
                console.log(x)
                item.list2 = x.data.data.sell.reverse()
                // .reverse()
                item.list3 = x.data.data.buy
                item.time = setTimeout(() => {
                    this.获取买卖(item)
                }, 1000 * this.Refresh);
            }).catch(err=>{
                console.log(err)
                item.time = setTimeout(() => {
                    this.获取买卖(item)
                }, 1000 * this.Refresh);
            })
        },
        链接ws(){
            // this.ws = new WebSocket("wss://wspri.coinall.ltd:8443/ws/v5/ipublic")
            this.ws = new WebSocket("wss://wspri.okx.com:8443/ws/v5/ipublic")
            
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
            this.ws.onclose = () => {
                console.log('断开连接')
                this.链接ws()
            };
        },
        验证登录() {
            // this.链接ws()
            // return
            let token = new URLSearchParams(location.href.substring(location.href.indexOf('?'))).get('token') ? new URLSearchParams(location.href.substring(location.href.indexOf('?'))).get('token') : sessionStorage.token
            if (!token) {
                location.href="404.html"
                return
            }
            sessionStorage.token = token
            axios.post('http://1.huobi456.com/huobi/public/index.php/user/getuserinfo?token=' + token, '').then(res => {
                console.log(res)
                if (res.data.code != 1) {
                    location.href="404.html"
                }else{
                    this.链接ws()
                }
            }).catch(err => {
                console.error(err);
                location.href="404.html"
            })
        },
    },
    mounted() {
        // this.链接ws()
        this.验证登录()
    },
})