<template>
    <div class="积分变化">
        <div class="title">积分详情</div>
        <div>
            <el-date-picker @change="changeTime" value-format="yyyy-MM-dd" size="small" v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
        </div>
        <div class="table2">
            <el-table :data="list2" border size="mini">
                <el-table-column width="150px" label="时间" prop="createdAt"></el-table-column>
                <el-table-column label="变更详情" prop="content"></el-table-column>
            </el-table>
        </div>
        <div class="分页" v-show="total2> q1.size">
            <el-pagination background @current-change="changePage2" :page-size="q1.size" layout="prev, pager, next" :total="total2">
            </el-pagination>
        </div>
        
    </div>
</template>

<script>
import moment from 'moment'

export default {
    data() {
        return {
            userid:"",
            value1:[
                moment().subtract(7,'days').format('YYYY-MM-DD'),
                moment().add(1,'days').format('YYYY-MM-DD')
            ],
            list2:[],
            total2:0,
            q1:{    //查询个人积分记录
                page:1,
                size:10
            },
        }
    },
    methods: {
        changeTime(val){
            this.q1.page = 1;
            this.个人积分统计()
        },
        个人积分统计(){
            this.list2 = []
            var q = {
                uid:this.userid,
                page:this.q1.page,
                size:this.q1.size,
                startDate:this.value1[0],
                endDate:this.value1[1]
            }
            this.$axios.get('/api/creditLog',{params:q})
            .then(res => {
                if(res.code===0){
                    this.total2 = res.total
                    this.list2 = res.data
                }
            })
            .catch(err => {
            })
        },
        changePage2(i){
            this.q1.page = i
            this.个人积分统计()
        },
    },
    mounted() {
        this.userid = this.$route.query.id
        this.个人积分统计()
    },
}
</script>

<style lang="scss" scoped>
.title {
    padding-bottom: 5px;
    border-bottom: 1px solid #d0d0d0;
    margin: 0px 0px 10px 0px;
}
.积分变化{
    box-shadow: 0px 0px 5px 0px #737373;
    padding: 10px;
    border-radius:5px;
    font-size: 14px;
}
.table2{
    // min-height: 400px;
}
.分页{
    padding: 3px 0px 0px;
    text-align: right;
}
</style>