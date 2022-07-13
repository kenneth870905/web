var api="http://1.huobi456.com" //后台校验token地址

var list = [
    { name: 'BTC', check: false, pageSize: 10, wsinstId:'BTC-USDT' , tick: { close: "" }, },
    { name: 'ETH', check: false, pageSize: 10, wsinstId:'ETH-USDT' , tick: { close: "" }, },
    // { name: 'HT',  check: false, pageSize: 10 },
    // { name: 'XRP', check: false, pageSize: 10 },
    // { name: 'LTC', check: false, pageSize: 10 },
    // { name: 'EOS', check: false, pageSize: 10 },
    { name: 'USDT', check: false, pageSize: 10, tick: { close: "" }, },
    // { name: 'DOGE', check: false, pageSize: 10 },
]
// 买入第一页
var mairu1 = (coinId)=>{
    return `https://otc-api-hk.eiijo.cn/v1/data/trade-market?coinId=${coinId}&currency=1&tradeType=sell&currPage=1&payMethod=0&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=`
}