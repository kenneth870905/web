class 循环选号{
    constructor(){
    }
    // 圆形选号
    设置选号_1(list,min,max,notitle){
        let list1=[];
        let 选号1=[];
        for (let i = min; i <=max; i++) {
            选号1.push({
                name:i,
                active:false
            })
        }   
        list.forEach( x=> {
            list1.push({
                notitle:notitle ? notitle : false,
                style:1,
                name:x,
                选号:JSON.parse(JSON.stringify(选号1))
                // 选号:选号1
            })
        });
        return list1
    }
    // 圆形选号
    设置选号_2(list1,list2,notitle){
        var list=[];
        var 选号=[];
        list2.forEach(item=>{
            选号.push({
                name:item,
                active:false
            })
        })
        list1.forEach(item=>{
            list.push({
                notitle:notitle ? notitle : false,
                style:1,
                name:item,
                选号:JSON.parse(JSON.stringify(选号))
            })
        })
        return list;
    }
    设置选号_3(list){
        // var list = [{"notitle":true,max:0,免重复:true,"style":1,"name":"二同号",list:[11,22,33,44],"选号":[]}]
        list.forEach(item=>{
            item.选号=[]
            item.list.forEach(x=>{
                item.选号.push({name:x,active:false})    
            })
        })
        return list;
    }
}

export default 循环选号