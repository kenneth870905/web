<template>
    <div class="计划" v-loading="计划.加载中">
        <header class="header_1">
            <i class="btn_1 el-icon-refresh" @click="获取计划()"></i>
            <span class="彩票名称">
                <i class="el-icon-info" @click="显示帮助=true"></i>
                <div @click="选择彩票()" ref="计划名称">
                    {{计划.Title}}
                </div>
            </span>
            <el-dropdown @command="handleCommand" class="计划名" trigger="click">
            <!-- <el-dropdown @command="handleCommand" class="计划名"> -->
                <span class="">
                    {{计划.method}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="item" v-for="(item, index) in 计划.Methods" :key="index">{{item}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </header>

        <div class="彩票" ref="彩票" :style="style1">
            <ul>
                <li @click="选择(item)" v-for="(item, index) in 计划.Lotterys" :key="index">
                    <div>{{item.LotteryName}}</div>
                </li>
            </ul>
        </div>

        <div class="list1">
            <el-table :data="计划.list" style="width: 100%" size="mini" border>
                <el-table-column label="期号" width="40" align="center">
                    <template slot-scope="r">
                        <div>
                            {{r.row.IssueCode.substring(r.row.IssueCode.length-3)}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="号码" align="center" width="60">
                    <template slot-scope="r">
                        <div v-if="r.row.Result">{{r.row.Result}}</div>
                        <div v-else class="待开">待开</div>
                    </template>
                    <!-- <div class="待开">待开</div> -->
                    <!-- <div class="中奖">10</div> -->
                </el-table-column>
                <el-table-column label="购彩计划" align="center">
                    <template slot-scope="r">
                        <div class="号码2">
                            <!-- <span v-for="(item, index) in r.row.Plan.split('|')"  :class="item==r.row.Result ? '中奖': ''" :key="index">{{item}}</span> -->
                            <span v-for="(item, index) in r.row.Plan.split('|')" :class="{中奖:是否中奖(item,r.row)}" :key="index">{{item}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="当前成本" align="center" width="55" prop="CurrentCost"></el-table-column>
                <el-table-column label="累计成本" align="center" width="55" prop="TotalCost"></el-table-column>
                <el-table-column label="盈利/亏损" align="center" width="55">
                    <template slot-scope="r">
                        <div :class="r.row.ProfitLoss >=0 ? '赢':'亏'">
                            {{r.row.ProfitLoss}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="开奖时间" align="center" width="55">
                    <template slot-scope="r">
                        {{r.row.ResultDate | filter_t}}
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog title="帮助说明" class="帮助说明" :visible.sync="显示帮助" width="400px" center>
            <div>
                <h2>购彩计划</h2>
                <div class="title_1">
                    <span></span>
                    <span>功能介绍</span>
                </div>
                <div class="text_1">
                    依据历史大数据规律为基础，提供购彩计划作为参考，建议使用阶梯倍投方法投注，如果亏损10000或者累计成本达100000则标记为失败。
                </div>
                <div class="title_1">
                    <span></span>
                    <span>本推荐玩法</span>
                </div>
                <div class="text_1">
                    追踪和值大小，以倍投形式，第一期以5为基数从“盈利亏损”中扣除作为“当前成本”，并累加至“累计成本”。如果预测中奖，则以两倍赔率增加“盈利亏损”，下一期以5为基数继续预测；如果预测不成功，则下一期以3倍的成本进行倍投。
                </div>
                <div class="title_1">
                    <span></span>
                    <span>使用技巧</span>
                </div>
                <div class="text_1">
                    建议使用“阶梯倍投”方式投注。
                </div>
                <div class="title_1">
                    <span></span>
                    <span>更新计划</span>
                </div>
                <div class="text_1">
                    <div>以下情况会更新计划</div>
                    <div>1、"累计成本"达100000。</div>
                    <div> 2、"盈利亏损"亏损10000。</div>
                    <div>3、每天第一期。</div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { 时间格式化 } from "@/assets/js/通用.js";
import { mapState , mapActions } from "vuex";
export default {
    name: "",
    data() {
        return {
            list: [],
            // 彩票: [
            //     { "id": "10002", "title": "重庆时时彩" },
            //     { "id": "20001", "title": "北京PK拾" },
            //     { "id": "10001", "title": "分分时时彩" },
            //     { "id": "70001", "title": "香港六合彩" },
            //     { "id": "20002", "title": "幸运飞艇" },
            //     { "id": "20004", "title": "五分PK拾" },
            //     { "id": "20000", "title": "极速PK拾" },
            //     { "id": "20003", "title": "威尼斯飞艇" },
            //     { "id": "70000", "title": "极速六合彩" },
            //     { "id": "10000", "title": "三分时时彩" },
            //     { "id": "40004", "title": "分分快3" },
            //     { "id": "50000", "title": "幸运28" },
            //     { "id": "60005", "title": "分分11选5" },
            //     { "id": "60000", "title": "山东11选5" },
            //     {
            //         "id": "30002",
            //         "title": "极速3D",
            //     },
            //     {
            //         "id": "30000",
            //         "title": "排列三",
            //     },
            //     {
            //         "id": "30001",
            //         "title": "福彩3D",
            //     },
            //     {
            //         "id": "10003",
            //         "title": "五分时时彩",
            //     }
            // ],
            style1: {
                display: 'none',
                height: ''
            },
            显示帮助: false
        }
    },
    computed: {
        ...mapState({
            计划:x=>x.计划
        }),
    },
    filters:{
        filter_t(time){
            try {
                return 时间格式化('hh:mm',time)  
            } catch (error) {
                return time
            }
        }
    },
    methods: {
        ...mapActions({
            获取计划:"计划/获取计划"
        }),
        是否中奖(n,obj){
            if(!obj.Result){
                return false
            }
            var list = obj.Result.split('|');
            return list.includes(n)
        },
        handleCommand(x) {
            console.log(x);
            this.计划.method = x;
            this.获取计划();
        },
        async 选择彩票(t) {
            if (this.style1.display == "block" || t == -1) {
                this.style1.height = '0px';
                setTimeout(() => {
                    this.style1.display = 'none';
                }, 300);
            } else {
                this.style1.display = "block";
                this.style1.height = '0px';
                await this.$nextTick();
                this.style1.height = this.$refs.彩票.querySelector('.彩票>ul').clientHeight + 'px';
            }
        },
        选择(item) {
            console.log(item);
            this.计划.Title = item.LotteryName;
            this.计划.LotteryCode = item.LotteryCode;
            this.计划.method = '';
            this.获取计划();
        },
        点击body(e) {
            console.log(e)
            if (e.target != this.$refs.计划名称) {
                this.选择彩票(-1)
            }
        }
    },
    mounted() {
        for (let i = 0; i < 30; i++) {
            this.list.push(i)
        }
        document.querySelector('body').addEventListener('click', this.点击body);

        this.获取计划();

    },
    beforeDestroy() {
        document.querySelector('body').removeEventListener('click', this.点击body)
    },
}
</script>

<style lang="scss" scoped>
/deep/ .el-popper{
    margin-top: 0px;
}
.计划 {
    height: 100%;
    position: relative;
}

.彩票 {
    position: absolute;
    width: 100%;
    top: 44px;
    left: 0px;
    display: none;
    background: #ffffff;
    box-shadow: 0px 0px 10px 1px #909090;
    transition: all 0.3s;
    overflow: hidden;
    z-index: 1;
    ul {
        display: flex;
        flex-wrap: wrap;
        min-height: 200px;
        align-items: baseline;
        align-content: baseline;
    }
    li {
        width: calc(100% / 3);
        box-sizing: border-box;
        padding: 5px 5px;
        font-size: 14px;
        div {
            color: #8c8c8c;
            padding: 5px 0px;
            border: 1px solid #eeeeee;
            text-align: center;
            cursor: pointer;
            &:hover {
                color: #000000;
            }
        }
    }
}
.header_1 {
    height: 44px;
    background: var(--color);
    display: flex;
    align-content: center;
    justify-content: center;
    position: relative;
    color: #ffffff;
    .btn_1 {
        position: absolute;
        line-height: 44px;
        top: 0px;
        left: 10px;
        cursor: pointer;
        font-size: 20px;
        transition: all 0.3s;
        &:hover {
            transform: rotate(-180deg);
        }
    }
    .计划名 {
        position: absolute;
        line-height: 44px;
        right: 10px;
        cursor: pointer;
        /deep/ .el-dropdown-selfdefine {
            color: #ffffff;
        }
    }
    .彩票名称 {
        display: flex;
        align-items: center;
        div {
            margin: 0px 0px 0px 3px;
            padding: 1px 5px;
            border-radius: 3px;
            font-size: 16px;
            border: 1px solid #ffffff;
            cursor: pointer;
        }
    }
}

.list1 {
    height: calc(100% - 44px);
    overflow: auto;
    // * 设置滚动条的样式 */
    &::-webkit-scrollbar {
        width: 6px;
    }
    /* 滚动槽 */
    &::-webkit-scrollbar-track {
        // -webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
        background: #e8e8e8;
    }
    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
        background: #2e394d;
        border-radius: 6px;
    }
    /deep/ .el-table th > .cell {
        padding-left: 0px;
        padding-right: 0px;
    }
    /deep/ .el-table .cell {
        padding-left: 0px;
        padding-right: 0px;
        overflow: inherit;
    }
    .待开 {
        color: #ec0022;
    }
    .中奖 {
        position: relative;
        min-width: 20px;
        height: 20px;
        line-height: 18px;
        text-align: center;
        border: 1px solid #ec0022;
        border-radius: 100%;
        display: inline-block;
        &::after {
            position: absolute;
            content: "中";
            top: -10px;
            right: -10px;
            font-size: 12px;
            color: #ec0022;
        }
    }
    .赢{
        color: red;
    }
    .亏{
        color: #005dcc;
    }
    .号码2 {
        span {
            margin: 0px 2px;
        }
    }
}

.帮助说明 {
    /deep/ .el-dialog__header {
        background: var(--color);
        color: #ffffff;
    }
    /deep/ .el-dialog__title {
        color: #ffffff;
    }
    /deep/ .el-dialog__headerbtn .el-dialog__close {
        color: #ffffff;
    }
    /deep/ .el-dialog__body {
        padding: 0px 20px 10px;
        height: 400px;
        overflow: auto;
        // * 设置滚动条的样式 */
        &::-webkit-scrollbar {
            width: 6px;
        }
        /* 滚动槽 */
        &::-webkit-scrollbar-track {
            // -webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
            background: #e8e8e8;
        }
        /* 滚动条滑块 */
        &::-webkit-scrollbar-thumb {
            background: #2e394d;
            border-radius: 6px;
        }
    }
    h2 {
        text-align: center;
        color: #ec0022;
        font-size: 22px;
    }
    .title_1{
        font-size: 15px;
        font-weight: bold;
        color: #333333;
        margin: 10px 0px;
        >span:nth-child(1){
            background: #ec0022;
            display: inline-block;
            width: 6px;
            margin: 0px 4px 0px 0px ;
            height: 15px;
        }
    }
    .text_1{
        color: #666;
        padding-left: 5px;
        font-size: 14px;
        line-height: 22px;
    }
}
</style>