import axios from 'axios';
import qs from 'qs'
const api_股票代码模糊查询=(inputValue)=>{  
    return axios.post(config.api_url+'/api/Stock/SearchStock?stockCode='+inputValue,)
}
const api_添加自选股=(inputValue)=>{ 
    return axios.post(config.api_url+'/api/Stock/AddMemberStock?stockCode='+inputValue,)
}

const api_删除自选股=(inputValue)=>{  
    return axios.post(config.api_url+'/api/Stock/DeleteStock?stockCode='+inputValue,)
}

const api_有效合约=()=>{ 
    return axios.get(config.api_url+'/api/Contract/GetContractInfo')
}
const api_获取用户自选股=(obj)=>{ 
    return axios.post(config.api_url+'/api/Stock/GetMemberStocks',obj)
}

const api_创建委托=(obj)=>{  
    return axios.post(config.api_url+'/api/Contract/CreateDelegate?StockCode='+obj.StockCode+'&StockName='+obj.StockName+'&Count='+obj.Count+'&ContractCode='+obj.ContractCode+'&Price='+obj.Price+'&delegateType='+obj.delegateType)
}
const api_股票详情=(id)=>{ 
    return axios.post(config.api_url+'/api/Stock/GetStockInfo?stockCode='+id)
}

const api_首页上证深证指数=()=>{   
    return axios.get(config.api_url+'/api/Stock/GetCompositeIndexs')
}

const api_撤销委托单=(id)=>{  
    return axios.post(config.api_url+'/api/Contract/ManuallyCancel?delegateCode='+id)
}

const api_返回股票的委托数据=(id)=>{  
    return axios.post(config.api_url+'/api/Contract/GetDelegateList?delegateCode='+id)
}


export {
    api_添加自选股,
    api_股票代码模糊查询,
    api_删除自选股,
    api_有效合约,
    api_获取用户自选股,
    api_创建委托,
    api_股票详情,
    api_首页上证深证指数,
    api_撤销委托单,
    api_返回股票的委托数据

}