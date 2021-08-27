<template>
    <div>
        <div class="mui-card" v-for="(item, index) in 两面统计" :key="index">
            <div class="mui-card-header" :class="{'冠军':index==0,'季军':index==1}">{{item.name}}</div>
            <div class="mui-card-content">
                <ul class="详情">
                    <li>
                        <div>单</div>
                        <div>双</div>
                        <div>大</div>
                        <div>小</div>
                    </li>
                    <li>
                        <div>{{item.单}}</div>
                        <div>{{item.双}}</div>
                        <div>{{item.大}}</div>
                        <div>{{item.小}}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name:"",
    data() {
        return {
            list:[
                '第一名',
                '第二名',
                '第三名',
                '第四名',
                '第五名',
                '第六名',
                '第七名',
                '第八名',
                '第九名',
                '第十名',
                '亚冠和',
            ]
        }
    },
    computed: {
        ...mapState({
            开奖记录:x=>x.开奖走势.开奖记录
        }),
        两面统计(){
            var list=[
                {name:"第一球",单:0,双:0,大:0,小:0},
                {name:"第二球",单:0,双:0,大:0,小:0},
                {name:"第三球",单:0,双:0,大:0,小:0},
                {name:"第四球",单:0,双:0,大:0,小:0},
                {name:"第五球",单:0,双:0,大:0,小:0},
                {name:"总和",单:0,双:0,大:0,小:0},
            ]
            this.开奖记录.forEach(item => {
                if(!item.Content){
                    return
                }
                var 和值=0
                for (let i = 0; i < item.开奖号码.length; i++) {
                    item.开奖号码[i]%2==0 ? list[i].双++ : list[i].单++;
                    item.开奖号码[i]>4 ? list[i].大++ : list[i].小++;
                    和值=和值+parseInt(item.开奖号码[i])
                }
                和值%2==0 ? list[5].双++ : list[5].单++;
                和值>22 ? list[5].大++ : list[5].小++;
            });
            return list
        }
    },
    methods: {
        
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
    &.季军{
        background: #2eaae8;
    }
}
.详情{
    li{
        display: flex;
        border-bottom: 1px solid #eeeeee;
        div{
            width: calc(100% / 4);
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
