<template>
    <div>
        <Alert>
            {{type ? '即将到期设备' : '所有设备'}}
            <template slot="desc">
                提示：此处为设备统计，仅用于查看设备，为了保持分组应用一致性，如需安装、卸载应用等操作，请前往页面左侧分组内进行操作
            </template>
        </Alert>
        <ul class="list1">
                    <li v-for="item in list">
                        <div class="header-1">
                            <!-- <Checkbox v-if="item.status==1" title="设备id">{{item.deviceId}}</Checkbox> -->
                            <div>{{item.deviceId}}</div>
                            <span>{{item.setId | filterName(设备类型)}}</span>
                        </div>
                        <div class="img-box">
                            <div v-if="!item.截图base64">
                                <span v-if="item.status==1">{{item.截图msg}}</span>
                                <span v-if="item.status==2">已到期</span>
                            </div>
                            <img v-else :src="item.截图base64" alt="" srcset="">
                        </div>
                        <div class="footer-1">
                            <Dropdown v-if="item.status==1" trigger="click" placement="top-start">
                                <Button size="small" icon="md-arrow-dropup"></Button>
                                <DropdownMenu slot="list">
                                    <ul class="操作List">
                                        <li @click="续费(item)">续费</li>
                                        <li @click="远程地址(item)">远程控制</li>
                                        <!-- <li @click="重启云机(item)">重启云机</li>
                                        <li @click="启动应用(item)">启动应用</li>
                                        <li @click="恢复出厂设置(item)">恢复出厂设置</li> -->
                                    </ul>
                                </DropdownMenu>
                            </Dropdown>
                            <div v-else></div>
                            <span>{{item.dueTime}}到期</span>
                        </div>
                    </li>
                </ul>
                <Page v-show="total" class="分页" :total="total" :page-size="query.size" @on-change="changePage" />
        
        
        <!-- 远程控制 -->
        <yckz ref="yckz" />
    </div>
</template>

<script>
import  moment  from "moment";
import yckz from '@/components/远程控制.vue'

import { mapState } from 'vuex';
export default {
    components:{
        yckz
    },
    data() {
        return {
            type:'',
            query:{
                page: 1,
                size: 10,
                setName: "",
                status:0,
                startDueTime:"",
                endDueTime:""
            },
            list:[],
            total:0,
            loading:false
        }
    },
    computed:{
        ...mapState({
            设备类型: "设备类型"
        })
    },
    filters:{
        filterName(setId, 机型list) {
            return 机型list.find(x => x.setId == setId) ? 机型list.find(x => x.setId == setId).name : ''
        }
    },
    methods: {
        获取云机(){
            this.loading = true
            this.$axios.get(`/api/device`, { params: this.query }).then(res => {
                if (res.data.code === 0) {
                    let data = res.data.data
                    data.forEach(element => {
                        element.截图msg = '屏幕获取等待中'
                        element.截图base64 = ''
                    });
                    this.total = res.data.total
                    this.list = data
                    this.获取截图(0)
                }
                this.loading = false
            }).catch(err => {
                this.loading = false
            })
        },
        async 获取截图(index) {
            // this.截图完毕=false
            if(index > this.list.length-1){
                // console.log('全部完毕')
                // this.截图完毕 = true
                // this.setTime(this.定时刷新)
                return
            } 
            //过期了
            if(this.list[index].status==2){
                this.获取截图(index+1)
                return
            }
            // 等待5秒
            console.log('正在等待')
            await new Promise((resolve, reject) => {
                setTimeout(() => resolve(), 1000*5); 
            });
            console.log('等待结束')
            var item = this.list[index]
            item.截图msg = '正在获取'
            this.$axios.get(`/api/device/${item.id}/snapshot`, '').then(res => {
                if (res.data.code === 0) {
                    item.截图msg = '获取成功'
                    item.截图base64 = 'data:image/jpg;base64,' + res.data.data
                } else {
                    item.截图msg = res.data.message
                }
                this.获取截图(index+1)
            }).catch(err => {
                item.截图msg = '连接错误'
                this.获取截图(index+1)
            })
        },
        changePage(i) {
            this.query.page = i
            this.获取云机()
        },
        续费(item) {
            this.$Modal.confirm({
                title: "提示",
                content: `确定给deviceId:${item.deviceId}手机续费吗？`,
                onOk: () => {
                    this.$Spin.show();
                    this.$axios.post(`/api/device/${item.id}/renew`, '')
                        .then(res => {
                            if (res.data.code === 0) {
                                this.正确('续费成功')
                                this.获取设备()
                            } else {
                                this.正确(res.data.message)
                            }
                            this.$Spin.hide();
                        })
                        .catch(err => {
                            console.error(err);
                            this.错误('系统错误，稍后再试')
                            this.$Spin.hide();
                        })
                }
            })
        },
        远程地址(item) {
            this.$refs.yckz.init(item)
        },
        init(){
            this.type = this.$route.query.t ? this.$route.query.t : '' 
            this.list =[]
            this.total = 0
            this.loading=false
            if(this.type){
                this.query.startDueTime = moment().format('YYYY-MM-DD HH:mm:ss')
                this.query.endDueTime = moment().add(3, 'days').format('YYYY-MM-DD HH:mm:ss')
            }else{
                this.query.startDueTime = ''
                this.query.endDueTime = ''
            }
            this.获取云机()
        },
        
    },
    mounted() {
        this.init()
    },
    watch:{
        '$route'(){
            this.init()
        }
    }
}
</script>

<style lang="scss" scoped>

.list1 {
    display: flex;
    flex-wrap: wrap;
    > li {
        width: 216px;
        margin: 0px 20px 20px 0px;
    }
    .header-1 {
        display: flex;
        padding: 5px;
        background: #f6f6f6;
        justify-content: space-between;
        align-items: center;
    }
    .img-box {
        position: relative;
        height: 384px;
        background: #1f1f1f;
        > div {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0px;
            left: 0px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #9a9a9a;
        }
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    .footer-1 {
        background: #f6f6f6;
        padding: 5px;
        height: 35px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .操作List {
            line-height: 30px;
        }
        li {
            padding: 0px 10px;
            cursor: pointer;
            &:hover {
                background: #eee;
            }
        }
    }
}

.分页 {
    margin: 15px 0px;
    text-align: right;
}
</style>