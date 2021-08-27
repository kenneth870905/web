<template>
    <ul class="list">
        <li v-for="(item, index) in 长龙统计" :key="index">
            <div class="mui-card">
                <div class="mui-card-content">
                    <span>{{item.name}}：</span>
                    <span>{{item.name1}}</span>
                    <span :class="{'红色':index==0}">{{item.number}}</span>
                    <span>期</span>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name:"",
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState({
            开奖记录:x=>x.开奖走势.开奖记录
        }),
        长龙统计(){
            var list=[
                {name:"第一名",大小:true,大:0,小:0,单双:true,单:0,双:0},
                {name:"第二名",大小:true,大:0,小:0,单双:true,单:0,双:0},
                {name:"第三名",大小:true,大:0,小:0,单双:true,单:0,双:0},
                {name:"第四名",大小:true,大:0,小:0,单双:true,单:0,双:0},
                {name:"第五名",大小:true,大:0,小:0,单双:true,单:0,双:0},
                {name:"第六名",大小:true,大:0,小:0,单双:true,单:0,双:0},
                {name:"第七名",大小:true,大:0,小:0,单双:true,单:0,双:0},
                {name:"第八名",大小:true,大:0,小:0,单双:true,单:0,双:0},
                {name:"第九名",大小:true,大:0,小:0,单双:true,单:0,双:0},
                {name:"第十名",大小:true,大:0,小:0,单双:true,单:0,双:0},
            ]
            var 未开奖次数=0;
            this.开奖记录.forEach(item => {
                if(!item.Content){
                    return
                }
                var 和值=0
                for (let i = 0; i < item.开奖号码.length; i++) {
                    // 和值=和值+ parseInt(item.开奖号码[i]);
                    if(list[i].大小){
                        if(list[i].大==0 && list[i].小==0){
                            item.开奖号码[i]>4 ? list[i].大++ : list[i].小++;
                        }else{
                            if(item.开奖号码[i]>4){
                                list[i].大>list[i].小 ? list[i].大++ : list[i].大小=false
                            }else{
                                list[i].大<list[i].小 ?list[i].小++ : list[i].大小=false
                            }
                        }
                    }
                    if(list[i].单双){
                        if(list[i].单==0 && list[i].双==0){
                            item.开奖号码[i]%2==0 ? list[i].双++ : list[i].单++;
                        }else{
                            if(item.开奖号码[i]%2==0){
                                list[i].双>list[i].双 ? list[i].单++ : list[i].单双=false
                            }else{
                                list[i].大<list[i].双 ?list[i].单++ : list[i].单双=false
                            }
                        }
                    }


                }

                // if(list[5].大小){
                //     if(list[5].大==0 && list[5].小==0){
                //         和值>22 ? list[5].大++ : list[5].小++;
                //     }else{
                //         if(和值>22){
                //             list[5].大>list[5].小 ? list[5].大++ : list[5].大小=false;
                //         }else{
                //             list[5].大<list[5].小 ? list[5].小++ : list[5].大小=false;
                //         }
                //     }
                // }
                // if(list[5].单双){
                //     if(list[5].单==0 && list[5].双==0){
                //         和值%2==0 ? list[5].双++ : list[5]++ 
                //     }else{
                //         if(和值%2==0){
                //             list[5].双>list[5].单 ? list[5].双++ : list[5].单双=false; 
                //         }else{
                //             list[5].双<list[5].单 ? list[5].单++ : list[5].单双=false; 
                //         }
                //     }
                // }
            });

            var list1=[];
            list.forEach(item=>{
                if(item.大>item.小 && item.大>=2){
                    var obj={
                            name:item.name,
                            name1:'大',
                            number:item.大
                        }
                    list1.push(obj)
                }else if(item.大<item.小 && item.小>=2){
                    var obj={
                            name:item.name,
                            name1:'小',
                            number:item.小
                        }
                    list1.push(obj)
                }

                if(item.单>item.双 && item.单>=2){
                    var obj={
                            name:item.name,
                            name1:'单',
                            number:item.单
                        }
                    list1.push(obj)
                }else if(item.双<item.单 && item.双>=2){
                    var obj={
                            name:item.name,
                            name1:'双',
                            number:item.双
                        }
                    list1.push(obj)
                }
            })

            return list1.sort((a,b)=>{
                return  b.number - a.number 
            })
        }   
    },
}
</script>

<style lang="scss" scoped>
.红色{
    color: $color;
}
.mui-card{
    margin: 5px;
}

.list{
    display: flex;
    flex-wrap: wrap;
    >li{
        width: calc(100% / 3);
    }
    .mui-card-content{
        height: _vw(46);
        text-align: center;
        line-height: _vw(46);
        color: #3a3a3a;
    }
}
</style>
