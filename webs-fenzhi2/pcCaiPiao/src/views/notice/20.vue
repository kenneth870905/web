<template>
    <table class="table2" cellspacing="0px">
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
                <th colspan="3">冠亚和</th>
                <th colspan="5">1-5龙虎</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in list" v-if="item.Content">
                <td>{{item.IssueCode}}</td>
                <td>{{item.ResultDatetime}}</td>
                <td>
                    <div v-show="minIndex==1">
                        <div class="num_td_box1">
                            <div :class="'Bcolor_'+item1" v-for="item1 in item.Content">{{item1}}</div>
                        </div>
                    </div>

                    <div v-show="minIndex==2">
                        <div class="num_td_box1">
                            <div :class="{'activeSiseBig':大小单双(item1).大小=='小','activeSiseLittle':大小单双(item1).大小=='大'}" v-for="item1 in item.Content">{{大小单双(item1).大小}}</div>
                        </div>
                    </div>

                    <div v-show="minIndex==3">
                        <div class="num_td_box1">
                            <div :class="{'activeSiseBig':大小单双(item1).单双=='双','activeSiseLittle':大小单双(item1).单双=='单'}" v-for="item1 in item.Content">{{大小单双(item1).单双}}</div>
                        </div>
                    </div>
                </td>
                <td>{{冠亚和(item.Content).和值()}}</td>
                <td>{{冠亚和(item.Content).大小()}}</td>
                <td>{{冠亚和(item.Content).单双()}}</td>
                <td>{{龙虎(item.Content)[0]}}</td>
                <td>{{龙虎(item.Content)[1]}}</td>
                <td>{{龙虎(item.Content)[2]}}</td>
                <td>{{龙虎(item.Content)[3]}}</td>
                <td>{{龙虎(item.Content)[4]}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name:"",
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
        //单号
        大小单双(item){
            return {
                大小:item>=6 ? '大' : "小",
                单双:item%2==0 ? '双':"单" 
            }
        },
        龙虎(arr){
            return [
                arr[0] > arr[9] ? "龙" : "虎",
                arr[1] > arr[8] ? "龙" : "虎",
                arr[2] > arr[7] ? "龙" : "虎",
                arr[3] > arr[6] ? "龙" : "虎",
                arr[4] > arr[5] ? "龙" : "虎"
            ]
        },
        冠亚和(arr){
            return {
                和值:()=>parseInt(arr[0]) +parseInt(arr[1]),
                大小:()=>(parseInt(arr[0]) +parseInt(arr[1]))>11 ? '大' : "小",
                单双:()=>(parseInt(arr[0]) +parseInt(arr[1]))%2==0 ? '双' : "单"
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
.table2 {
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
    // tbody {
    //     tr {
    //         .zh {
    //             padding: 0px 4px 0px 4px;
    //         }
    //     }
    // }
}
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

.num_td_box1{
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

.num_td_box1 {
    div {
        border-radius: 4px;
    }
    .Bcolor_01 {
        background: #eedd0f;
    }
    .Bcolor_02 {
        background: #0092dd;
    }
    .Bcolor_03 {
        background: #4b4b4b;
    }
    .Bcolor_04 {
        background: #ff7600;
    }
    .Bcolor_05 {
        background: #17e2e5;
    }
    .Bcolor_06 {
        background: #5234ff;
    }
    .Bcolor_07 {
        background: #bfbfbf;
    }
    .Bcolor_08 {
        background: #ff2600;
    }
    .Bcolor_09 {
        background: #780b00;
    }
    .Bcolor_10 {
        background: #07bf00;
    }
}

</style>
