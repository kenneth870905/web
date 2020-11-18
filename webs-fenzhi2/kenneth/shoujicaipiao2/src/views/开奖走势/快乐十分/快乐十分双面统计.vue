<template>
    <div>
        <div class="mui-card" v-for="(item, index) in list" :key="index">
            <div class="mui-card-header" :class="{'冠军':index==0,'亚军':index==1}">{{item}}</div>
            <div class="mui-card-content">
                <ul class="详情">
                    <li>
                        <div>单</div>
                        <div>双</div>
                        <div>大</div>
                        <div>小</div>
                        <div>龙</div>
                        <div>虎</div>
                    </li>
                    <li>
                        <div>110</div>
                        <div>200</div>
                        <div>50</div>
                        <div>60</div>
                        <div>80</div>
                        <div>99</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"",
    data() {
        return {
            list:[
                '第一球',
                '第二球',
                '第三球',
                '第四球',
                '第五球',
                '第六球',
                '第七球',
                '第八球',
                '总和',
            ]
        }
    },
}
</script>

<style lang="scss" scoped>
.mui-card-header{
    background: #9da9c2;
    color: #ffffff;
    justify-content: center;
    &.冠军{
        background: #ff7614;
    }
    &.亚军{
        background: #2eaae8;
    }
}
.详情{
    li{
        display: flex;
        border-bottom: 1px solid #eeeeee;
        div{
            width: calc(100% / 6);
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            height: _vw(40);
            line-height: _vw(40);
            border-left: 1px solid #eeeeee;
        }
        >div:nth-child(1){
            border-left: none;
        }
    }
}
</style>
