import axios from 'axios';
import qs from 'qs'
const api_开奖公告 = (obj) => {
    return axios.post(config.api_url + '/Lottery/Home/GetInfo', qs.stringify(obj))
}

//非低频彩 记录
// 低频彩 https://0698aa.com/Results/30001/年/年.json
// 普通   https://0698aa.com/Results/30002/年/年月日.json
const api_开奖记录=(id,year,date)=>{
    return axios.get(config.api_url+'/Results/'+id+'/'+year+'/'+date+'.json')
}


const apimin_开奖公告=(id)=>{ 
    var date=new Date()
    var month = date.getMonth() > 8 ? date.getMonth()+1 : '0'+(date.getMonth()+1);
    var 天= month.toString() + (date.getDate() >9 ? date.getDate() : '0'+date.getDate() )
    var 日 = date.getDate() >9 ? date.getDate() : '0'+date.getDate()
    console.log(config.api_url+'/Results/'+id+'/'+date.getFullYear()+'/'+date.getFullYear()+天+'.json')
    return axios.get(config.api_url+'/Results/'+id+'/'+date.getFullYear()+'/'+date.getFullYear()+天+'.json',)
}

const apimin_开奖公告_昨日=(id)=>{
        var now = new Date();
        var TwoDaysAgo = new Date();
        var nowMilliSeconds = now.getTime();
        TwoDaysAgo.setTime(nowMilliSeconds-(1*86400000));
        var day=TwoDaysAgo.getDate()>9 ? TwoDaysAgo.getDate() : '0'+TwoDaysAgo.getDate()
        //格式化月，如果小于9，前面补0  
        var month = ("0" + (TwoDaysAgo.getMonth() + 1)).slice(-2); 
        //拼装完整日期格式  
        var getToday = TwoDaysAgo.getFullYear()+month.toString()+(day);

    return axios.get(config.api_url+'/Results/'+id+'/'+now.getFullYear()+'/'+getToday+'.json',)
}

const apimin_开奖公告_前日=(id)=>{
    var now = new Date();
    var TwoDaysAgo = new Date();
    var nowMilliSeconds = now.getTime();
    TwoDaysAgo.setTime(nowMilliSeconds-(2*86400000));
    var day=TwoDaysAgo.getDate()>8 ? TwoDaysAgo.getDate() : '0'+TwoDaysAgo.getDate()
    var month = ("0" + (TwoDaysAgo.getMonth() + 1)).slice(-2);
    var getToday = TwoDaysAgo.getFullYear()+ month.toString() +(day);
    return axios.get(config.api_url+'/Results/'+id+'/'+now.getFullYear()+'/'+ getToday +'.json',)
}

const apimin_开奖公告_noDate=(id)=>{
    var date=new Date()
    var month=date.getMonth()
   month=month>9 ? month+1 :'0'+(month+1)
    return axios.get(config.api_url+'/Results/'+id+'/'+date.getFullYear()+'/'+date.getFullYear()+'.json',)
}

// lotteryCode: 70001
// state: 0 
const api_近期开奖=(query)=>{
    return axios.post(`${config.api_url}/M/Lottery/GetBetResults`,qs.stringify(query))
}


export {
    api_开奖公告,
    apimin_开奖公告,
    apimin_开奖公告_noDate,
    apimin_开奖公告_昨日,
    apimin_开奖公告_前日,
    api_近期开奖,
    api_开奖记录
}
