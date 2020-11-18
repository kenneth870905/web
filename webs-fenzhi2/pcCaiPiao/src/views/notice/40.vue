<template>
    <table class="table4" cellspacing="0px">
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
                <td>
                    <div class="num_td_box4">
                        <div :class="'num_'+item1" v-for="(item1,index) in item.Content" v-if="item.Content"></div>
                    </div>
                </td>
                <td>{{和值(item.Content).和值}}</td>
                <td>{{和值(item.Content).大小}}</td>
                <td>{{和值(item.Content).单双}}</td>
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
        和值(arr){
            var 和值 = arr.reduce((prev,current,index,arr)=>{
                return parseInt(prev) + parseInt(current)
            })
            return{
                和值:和值,
                大小:和值>=11 ? '大':"小",
                单双:和值 % 2 == 0 ? '双':"单"
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
.table4 {
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
                font-weight: 400;
            }
        }
    }
}

.num_td_box4{
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
    .num_1 {
        background: url("~@/assets/images/k3num1.png") no-repeat;
        background-size: 100% 100%;
    }
    .num_2 {
        background: url("~@/assets/images/k3num2.png") no-repeat;
        background-size: 100% 100%;
    }
    .num_3 {
        background: url("~@/assets/images/k3num3.png") no-repeat;
        background-size: 100% 100%;
    }
    .num_4 {
        background: url("~@/assets/images/k3num4.png") no-repeat;
        background-size: 100% 100%;
    }
    .num_5 {
        background: url("~@/assets/images/k3num5.png") no-repeat;
        background-size: 100% 100%;
    }
    .num_6 {
        background: url("~@/assets/images/k3num6.png") no-repeat;
        background-size: 100% 100%;
    }
}
</style>
