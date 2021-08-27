<template>
    <table class="table" cellspacing="0px">
        <thead>
            <tr>
                <th>期数</th>
                <th>时间</th>
                <th>正马</th>
                <th>特码</th>
                <th colspan="4">总和</th>
                <th colspan="5">特码</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="item.Content" v-for="(item, index) in list" :key="index">
                <td>{{item.IssueCode}}</td>
                <td>{{item.ResultDatetime}}</td>
                <td class="num_td">
                    <div class="num_td_box">
                        <div :class="markSixNums.nums[item1].color" v-if="index1<6" v-for="(item1, index1) in item.Content" :key="index1">
                            <p>{{item1}}</p>
                            <p>{{markSixNums.nums[item1].sx}}</p>
                        </div>
                    </div>
                </td>
                <td class="num_td">
                    <div class="num_td_box">
                        <div :class="markSixNums.nums[item.Content[6]].color">
                            <p>{{item.Content[6]}}</p>
                            <p>{{markSixNums.nums[item.Content[6]].sx}}</p>
                        </div>
                    </div>
                </td>
                <td>{{总和(item.Content).和值}}</td>
                <td>{{总和(item.Content).大小}}</td>
                <td>{{总和(item.Content).单双}}</td>
                <td :class="总和(item.Content).颜色()">{{总和(item.Content).颜色()}}</td>
                <td>{{特码(item.Content).单双() }}</td>
                <td>{{特码(item.Content).大小() }}</td>
                <td>{{特码(item.Content).合大小() }}</td>
                <td>{{特码(item.Content).合单双() }}</td>
                <td>{{特码(item.Content).合尾() }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: "",
    props: {
        list: {
            default: () => []
        }
    },
    data() {
        return {
            markSixNums: $.base.markSixNums
        }
    },
    methods: {
        总和(arr) {
            var 和值 = arr.reduce((prev, current, index, arr) => {
                return parseInt(prev) + parseInt(current)
            })
            //总和颜色
            var getColor = ()=>{
                var list = arr.reduce((res, cur, index , list)=>{ //参数1  必需。初始值, 或者计算结束后的返回值。 //参数2 	必需。当前元素  //参数3 	可选。当前元素的索引  //参数4 可选。当前元素所属的数组对象。
                    let color = this.markSixNums.nums[cur].color;
                    let o = res.find(x=>x.colorName == color);
                    if(o){
                        if(index==6){
                            o.number = o.number+1.5
                        }else{
                            o.number++
                        }
                    }else{
                        let o1 = {
                                number:1,
                                colorName:color
                            }
                        res.push(o1)
                    }
                    return res;
                    //这个括号是 初始化 数据
                },[])
                list.sort((a,b)=>{
                    return b.number - a.number
                })
                // return list
                if(list.length>2){
                    var str = list[0].number==list[1].number ? '和局' : list[0].colorName ;
                    return str
                }else{
                    return list[0].colorName
                }
            }
            var 数量 = 0

            return {
                和值: 和值,
                大小: 和值 >= 175 ? '大' : "小",
                单双: 和值 % 2 == 0 ? '双' : '单',
                颜色: getColor
            }
        },
        特码(arr){
            let 特码 = arr[6]
            let 个位 = parseInt(特码 % 10);
            let 十位 = parseInt((特码 % 100) / 10);
            // let 尾合 = 个位+十位
            let 尾合 = 10
            return {
                单双(){  
                    if(特码==49){
                        return '和'
                    }else if(特码%2==0){
                        return '双'
                    }else{
                        return '单'
                    }
                },
                大小(){
                    if(特码==49){
                        return '和'
                    }else if(特码 >= 25){
                        return '大'
                    }else{
                        return '小'
                    }
                },
                合大小(){
                    if (特码 == 49) {
                        return "合"
                    } else if (尾合 >= 7) {
                        return "合大"
                    } else {
                        return "合小"
                    }
                },
                合单双(){
                    if (特码 == 49) {
                        return "合"
                    } else if (尾合 % 2 == 0) {
                        return "合双"
                    } else {
                        return "合单"
                    }
                },
                合尾(){
                    if (特码 == 49) {
                        return "合"
                    } else if (个位 >= 5) {
                        return '尾大'
                    } else {
                        return "尾小"
                    }
                }
            }
        }
    },
    mounted() {

    },
}
</script>

<style lang="scss" scoped>
.activeSiseBig {
    background: #6275b8 !important;
}
.activeSiseLittle {
    background: #f9982e !important;
}

tbody {
    min-height: 400px;
    tr {
        td {
            border-collapse: collapse;
            vertical-align: middle;
            border: 1px solid #ffcd9b;
            height: 36px;
            text-align: center;
            min-width: 28px;
            font-size: 14px;
        }
    }
}
.table {
    border-collapse: collapse;
    width: 100%;
    thead {
        width: 100%;
        background: #fff2c9;
        th:nth-child(3) {
        }
        th:nth-child(4) {
        }
        tr {
            border: 1px solid #ffcd9b;
            background: #fff2c9;
            border-collapse: collapse;
            th {
                border: 1px solid #ffcd9b;
                height: 36px;
                color: #673300;
                vertical-align: middle;
                border-collapse: collapse;
            }
        }
    }
}

.num_td_box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    .绿 {
        background: #6acc7b;
    }
    .红 {
        background: #f45959;
    }
    .蓝 {
        background: #51abf0;
    }
    div {
        width: 26px;
        height: 50px;
        background: #51abf0;
        margin: 4px 2px 4px 2px;
        padding-bottom: 1px;
        p {
            margin: 0px;
            line-height: 25px;
        }
        p:nth-child(1) {
            color: #ffffff;
            width: 27px;
            height: 50%;
        }
        p:nth-child(2) {
            color: #000000;
            background: #fff;
            width: 24px;
            height: 50%;
            margin: 0px auto;
        }
    }
}

.和局 {
    color: #161515;
}
.蓝 {
    color: #058fcf;
}
.红 {
    color: red;
}
.绿 {
    color: green;
}
</style>
