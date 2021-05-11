<template>
    <div>
        <div class="title1">
            操作记录
        </div>
        <el-date-picker @change="changeTime" value-format="yyyy-MM-dd" size="small" v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>

        <div class="table">
            <el-table :data="list" border size="mini">
                <el-table-column label="类型">
                    <template slot-scope="scope">
                        {{opType[scope.row.opType]}}
                    </template>
                </el-table-column>
                <el-table-column label="时间" prop="createdAt"></el-table-column>
                <el-table-column label="详情" prop="content"></el-table-column>
            </el-table>
        </div>
        
        <div class="分页">
            <el-pagination background @current-change="changePage" :page-size="query.size" layout="prev, pager, next" :total="total"></el-pagination>
        </div>

    </div>
</template>

<script>
import moment from 'moment'

export default {
    name:"",
    components:{
    },
    data() {
        return {
            opType:['','登录','商品','积分'],      //1是登录，2是商品，3是积分
            query:{
                page:1,
                size:10,
                startDate:"",
                endDate:""
            },
            list:[],
            total:0,
            time:[
                moment().subtract(7,'days').format('YYYY-MM-DD'),
                moment().add(1,'days').format('YYYY-MM-DD')
            ],
        }
    },
    methods:{
       获取操作记录(){
           this.query.startDate = this.time ? this.time[0] :""
           this.query.endDate = this.time ? this.time[1] :""
           this.$axios.get('/api/adminLog',{params:this.query} ).then(res => {
               console.log(res)
               if(res.code===0){
                   this.list=res.data
                   this.total = res.total
               }
           }).catch(err => {
               console.error(err); 
           })
       },
        changeTime(){
           console.log(132)
            this.query.page = 1
            this.获取操作记录()
        },
       changePage(i){
           this.query.page = i
           this.获取操作记录()
       }
    },
    mounted() {
        this.获取操作记录()
    },
}
</script>

<style lang="scss" scoped>
.title1 {
    border-bottom: 1px solid #eee;
    padding: 0px 0px 10px;
    margin: 0px 0px 15px 0px;
}

.table {
    margin: 15px 0px 0px;
    min-height: 400px;
}
.分页 {
    text-align: right;
    margin: 10px 0px;
}


</style>