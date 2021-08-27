<template>
    <ul class="mui-table-view list">
        <li class="mui-table-view-cell">
            <span>发包数</span>
            <div>：{{huizong.countSend ? huizong.countSend : 0 }}</div>
        </li>
        <li class="mui-table-view-cell">
            <span>发包总金额</span>
            <div :class="huizong.sumSend>0 ? 'jin' : 'chu'">：{{huizong.sumSend ? huizong.sumSend : 0}}</div>
        </li>
        <li class="mui-table-view-cell">
            <span>抽包数</span>
            <div>：{{huizong.countReceive ? huizong.countReceive : 0}}</div>
        </li>
        <li class="mui-table-view-cell">
            <span>抽包总获得</span>
            <div class="jin">：{{huizong.sumReceive ? huizong.sumReceive : 0}}</div>
        </li>
        <li class="mui-table-view-cell">
            <span>踩雷数</span>
            <div class="chu">：{{huizong.countBombLoss ? huizong.countBombLoss : 0}}</div>
        </li>
        <li class="mui-table-view-cell">
            <span>踩雷总亏损</span>
            <div class="chu">：{{huizong.sumBombLoss ? huizong.sumBombLoss : 0}}</div>
        </li>
        <li class="mui-table-view-cell">
            <span>中雷数</span>
            <div>：{{huizong.countBombGain ? huizong.countBombGain : 0}}</div>
        </li>
        <li class="mui-table-view-cell">
            <span>中雷总获利</span>
            <div class="jin">：{{huizong.sumBombGain ? huizong.sumBombGain : 0}}</div>
        </li>
        <li class="mui-table-view-cell">
            <span>总出入</span>
            <div :class="huizong.total>0 ? 'jin' : 'chu'">：{{huizong.total ? huizong.total : 0}}</div>
        </li>
    </ul>
</template>

<script>
export default {
    name: "",
    props:{
        huizong:{
            default:()=> ({})
        }
    },
    data() {
        return {

        }
    },
}
</script>


<style lang="scss" scoped>
.list{
    font-size: _vw(14);
    .mui-table-view-cell{
        display: flex;
        align-items: center;
    }
    span{
        width: _vw(85);
        text-align: justify;
        text-align-last: justify;
        color: #333333;
    }
    div{
        margin: 0px 0px 0px 7px;
        font-weight: bolder;
    }
}

.chu{
    color: #2e9143;
}
.jin{
    color: #bd3058;
}
</style>
