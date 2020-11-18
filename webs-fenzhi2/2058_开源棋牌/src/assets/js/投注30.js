
class 投注30{
    constructor(玩法){
        this.玩法=玩法
    }
    get 球组(){
        var codeList={
            300:this.设置选号(['百位','十位','个位'],0,9),
            302:this.设置选号([''],0,27,true),
            200:this.设置选号(['十位','个位'],0,9),
            202:this.设置选号([''],0,18,true),
            204:this.设置选号(['组选'],0,9),
            220:this.设置选号(['百位','十位'],0,9),
            222:this.设置选号([''],0,18,true),
            227:this.设置选号(['组选'],0,9),
            100:this.设置选号(['百位','十位','个位'],0,9),
            120:this.设置选号(['不定胆'],0,9),
        }
        if(codeList[this.玩法.Code]){
            return codeList[this.玩法.Code]
        }else{
            return[]
        }
    }
    设置选号(list,min,max,notitle){
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
}

export default 投注30