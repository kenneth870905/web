<template>
    <table class="table5" cellspacing="0px">
        <thead>
            <tr>
                <th>期数</th>
                <th>时间</th>
                <th>显示号码</th>
                <th colspan="3">总和</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in list" v-if="item.Content">
                <td>{{item.IssueCode}}</td>
                <td>{{item.ResultDatetime}}</td>
                <td class="num_td">
                    <div class="num_td_box">
                        <div :class="'BackColor_' + item.Content[0]">{{item.Content[0]}} </div>+
                        <div :class="'BackColor_' + item.Content[1]">{{item.Content[1]}} </div>+
                        <div :class="'BackColor_' + item.Content[2]">{{item.Content[2]}} </div>=
                        <div :class="'BackColor_' + 总和(item.Content).和值">{{总和(item.Content).和值}} </div>
                    </div>
                </td>
                <td>{{总和(item.Content).和值}}</td>
                <td>{{总和(item.Content).大小}}</td>
                <td>{{总和(item.Content).单双}}</td>
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
        }
    },
    methods: {
        总和(arr){
            var 和值 = arr.reduce((prev,current,index,arr)=>{
                return parseInt(prev) + parseInt(current)
            })
            return {
                和值:和值,
                大小:和值>=13 ? '大':"小",
                单双:和值%2==0 ? '双':"单"
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
.table5 {
    border-collapse: collapse;
    width: 100%;
    thead {
        width: 100%;
        background: #fff2c9;
        th:nth-child(3) {
            width: 390px;
        }
        th:nth-child(4) {
            width: 280px;
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

.num_td_box{
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
        border-radius: 100%;
    }
}
.BackColor_1,
    .BackColor_4,
    .BackColor_7,
    .BackColor_10,
    .BackColor_16,
    .BackColor_19,
    .BackColor_22,
    .BackColor_25 {
        background: #6acc7b;
    }
    .BackColor_2,
    .BackColor_5,
    .BackColor_8,
    .BackColor_11,
    .BackColor_17,
    .BackColor_20,
    .BackColor_23,
    .BackColor_36 {
        background: #51abf0;
    }
    .BackColor_3,
    .BackColor_6,
    .BackColor_9,
    .BackColor_12,
    .BackColor_15,
    .BackColor_18,
    .BackColor_21,
    .BackColor_24 {
        background: #f45959;
    }
    .BackColor_0,
    .BackColor_13,
    .BackColor_14,
    .BackColor_27 {
        background: #999999;
    }
</style>
