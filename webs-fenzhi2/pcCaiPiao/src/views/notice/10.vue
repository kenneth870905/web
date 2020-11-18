<template>
    <table class="table1" cellspacing="0px">
        <thead>
            <tr>
                <th>期数</th>
                <th>时间</th>
                <th>
                    <div class="table_min">
                        <div :class="{'activecls':minIndex==1}" @click="minIndex=1">显示号码</div>
                        <div :class="{'activecls':minIndex==2}" @click="minIndex=2">显示大小</div>
                        <div :class="{'activecls':minIndex==3}" @click="minIndex=3">显示单双</div>
                    </div>
                </th>
                <th colspan="3">总和</th>
                <th>前三</th>
                <th>中三</th>
                <th>后三</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in list" v-if="item.Content">
                <td>{{item.IssueCode}}</td>
                <td>{{item.ResultDatetime}}</td>
                <td>
                    <div v-show="minIndex==1">
                        <div class="num_td_box">
                            <div v-for="item1 in item.Content">{{item1}}</div>
                        </div>
                    </div>
                    <div v-show="minIndex==2">
                        <div class="num_td_box">
                            <div :class="{'activeSiseBig':大小单双(item1).大小=='小','activeSiseLittle':大小单双(item1).大小=='大'}" v-for="item1 in item.Content">
                                {{大小单双(item1).大小}}
                            </div>
                        </div>
                    </div>
                    <div v-show="minIndex==3">
                        <div class="num_td_box">
                            <div :class="{'activeSiseBig':大小单双(item1).单双=='双','activeSiseLittle':大小单双(item1).单双=='单'}" v-for="item1 in item.Content">
                                {{大小单双(item1).单双}}
                            </div>
                        </div>
                    </div>
                </td>
                <td class="zh">{{和值(item.Content).sum}}</td>
                <td class="zh">{{和值(item.Content).大小}}</td>
                <td class="zh">{{和值(item.Content).单双}}</td>
                <td v-if="item.Content">{{计算豹子(item.Content,0)}}</td>
                <td v-if="item.Content">{{计算豹子(item.Content,1)}}</td>
                <td v-if="item.Content">{{计算豹子(item.Content,2)}}</td>
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
            minIndex: 1,
            list2:[]
        }
    },
    methods: {
        计算豹子(arr, type) {
            var index = 0;
            var list1 = ['杂六', '半顺', '对子', '顺子', '豹子']
            var name = "杂六"
            var list = [];
            for (let i = type; i < 3 + type; i++) {
                list.push(arr[i])
            }
            list.forEach(item => {
                item = parseInt(item);
                var length = list.filter(x => x == item).length;
                if (length == 3) {
                    index = 4
                } else if (length == 2) {
                    //'对子'
                    index = index > 2 ? index : 2
                } else {
                    if (item == 0 || item == 9) {
                        if (item == 0) {
                            var length1 = list.filter(x => x == 1 || x == 9).length;
                            var length2 = list.filter(x => x == 1).length
                            var length3 = list.filter(x => x == 9).length
                            if (length2 == 2 || length3 == 2) {
                                index = 2
                            } else if (length1 == 2) {
                                //'顺子'
                                index = index > 3 ? index : 3
                            } else if (length1 == 1) {
                                //'半顺'
                                index = index > 1 ? index : 1
                            }
                        } else {
                            var length1 = list.filter(x => x == 0 || x == 8).length;
                            var length2 = list.filter(x => x == 1).length
                            var length3 = list.filter(x => x == 9).length
                            if (length2 == 2 || length3 == 2) {
                                index = 2
                            } else if (length1 == 2) {
                                //'顺子'
                                index = index > 3 ? index : 3
                            } else if (length1 == 1) {
                                //'半顺'
                                index = index > 1 ? index : 1
                            }
                        }
                    } else {
                        var length1 = list.filter(x => x == item - 1 || x == item + 1).length;
                        var length2 = list.filter(x => x == item - 1).length
                        var length3 = list.filter(x => x == item + 1).length
                        if (length2 == 2 || length3 == 2) {
                            index = 2
                        } else if (length1 == 2) {
                            //'顺子'
                            index = index > 3 ? index : 3
                        } else if (length1 == 1) {
                            //'半顺'
                            index = index > 1 ? index : 1
                        }
                    }
                }
            })
            return list1[index]
        },
        大小单双(item){
            let  o = {
                    大小:item>=5 ? '大':"小",
                    单双:item%2==0 ? '双':"单",
                }
            return o
            // 大小: bd[i] >= 5 ? '大' : "小",
            // 单双: bd[i] % 2 == 0 ? '双' : "单",
        },
        和值(arr){
            var 和值 = arr.reduce((prev,current,index,arr)=>{
                return parseInt(prev) + parseInt(current)
            })
            return {
                sum:和值,
                大小: 和值 >= 23 ? "大" : "小",
                单双: 和值 % 2 == 0 ? "双" : "单"
            }
        }
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
.num_td_box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    div {
        width: 25px;
        height: 25px;
        text-align: center;
        line-height: 23px;
        color: #ffffff;
        margin: 0px 2px 0px 1px;
    }
}
.num_td_box {
    font-size: 22px;
    div {
        font-size: 14px;
        border-radius: 50%;
        background: red;
    }
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
// th里 table_min  切换 公用开始
.table_min {
    display: flex;
    align-items: center;
    justify-content: center;
    div {
        cursor: pointer;
        width: 66px;
        height: 29px;
        background: #b9b9b9;
        line-height: 29px;
        color: #ffffff;
        margin: 0px 2px 0px 2px;
        border-radius: 4px;
        font-size: 14px;
    }
    .activecls {
        background: #50515f;
    }
}
// 点击全部展示的table结束
.table1 {
    border-collapse: collapse;

    width: 100%;
    thead {
        width: 100%;
        background: #fff2c9;
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
                font-weight: 400;
            }
        }
    }
    tbody {
        tr {
            td {
            }
            .zh {
                padding: 0px 4px 0px 4px;
            }
        }
    }
}
</style>