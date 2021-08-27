<template>
    <div>
        <el-dialog title="注单详情" :visible.sync="聊天室state.投注记录.show" width="1000px">
            <el-button-group class="类型">
                <el-button size="mini" type="primary" @click="分类('')" :plain="聊天室state.投注记录.query.state!=''">全部</el-button>
                <el-button size="mini" type="primary" @click="分类(1)" :plain="聊天室state.投注记录.query.state!=1">未结算</el-button>
                <el-button size="mini" type="primary" @click="分类(2)" :plain="聊天室state.投注记录.query.state!=2">已中奖</el-button>
                <el-button size="mini" type="primary" @click="分类(3)" :plain="聊天室state.投注记录.query.state!=3">未中奖</el-button>
                <el-button size="mini" type="primary" @click="分类(4)" :plain="聊天室state.投注记录.query.state!=4">未开奖</el-button>
            </el-button-group>
            <el-table size="mini" height="400" border stripe :data="聊天室state.投注记录.list">
                <el-table-column fixed="left" width="120" prop="LotteryName" label="彩票名称"></el-table-column>
                <el-table-column width="120" prop="MethodName" label="玩法名称"></el-table-column>
                <el-table-column width="120" prop="TotalPrice" label="投注金额"></el-table-column>
                <el-table-column width="120" label="中奖金额">
                    <template slot-scope="scope">
                        <span class="未结算" v-if="scope.row.Cancel">
                            已撤单
                        </span>
                        <span class="未结算" v-else-if="scope.row.ResultMoney== null">
                            未结算
                        </span>
                        <span class="未中奖" v-else-if="scope.row.ResultMoney==0">
                            未中奖
                        </span>
                        <span class="中奖" v-else>
                            中奖（{{scope.row.ResultMoney}}）
                        </span>
                    </template>
                </el-table-column>
                <el-table-column width="180" prop="Createtime" label="下注时间"></el-table-column>
                <el-table-column prop="Content" label="下注详情"></el-table-column>
                <el-table-column fixed="right" align="center" width="100" label="分享到聊天室">
                    <template slot-scope="scope">
                        <!-- <el-button size="mini" type="success" icon="el-icon-check" circle></el-button>                       -->
                        <el-button @click="分享(scope.row)" size="mini" type="success" icon="el-icon-male" circle></el-button>                      
                    </template>
                </el-table-column>
            </el-table>
            <div class="分页">
                <el-pagination 
                    background
                    :page-size="聊天室state.投注记录.query.rows"
                    :current-page="聊天室state.投注记录.query.page"
                    layout="prev, pager, next" 
                    @current-change="change"
                    :total="聊天室state.投注记录.total">
                </el-pagination>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { api_分享到聊天室 } from "@/api/聊天室接口.js";

import { mapState , mapActions} from "vuex";
export default {
    name: "",
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            聊天室state:x=>x.聊天室 
        })
    },
    methods: {
        ...mapActions({
            加载中:"加载中",
            成功提示:'成功提示',
            失败提示:"失败提示",
            获取投注记录:'聊天室/获取投注记录'
        }),
        分类(type){
            this.聊天室state.投注记录.query.state=type;
            this.聊天室state.投注记录.query.page=1;
            this.获取投注记录();
        },
        change(x){
            // console.log(x)
            this.聊天室state.投注记录.query.page=x;
            this.获取投注记录();
        },
        async 分享(item){
            var a = await this.$confirm('此操作将分享注单到聊天室, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() =>true).catch(() => false);
            if(!a){
                return
            }
            this.加载中(true)
            api_分享到聊天室(item.Id).then(x=>{
                if(x.data.code==0){
                    this.成功提示('分享成功！')
                    this.聊天室state.投注记录.show=false;
                }else{
                    this.失败提示(x.data.msg)
                }
                this.加载中(false)
            }).catch(err=>{
                this.加载中(false)
                this.失败提示('系统错误，稍后再试!')
            })

        }
    },
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__body{
    padding-top: 0px;
}
/deep/ .el-table__body-wrapper{
    
}
.类型{
    margin-bottom: 10px;
}
.分页{
    text-align: center;
    margin: 20px 0px 0px;
}
</style>