<template>
    <div>
        <Tabs @on-click="qiehuanTabs">
            <TabPane label="正常设备">

                <div class="header">
                    <Poptip trigger="hover" placement="bottom-start" :transfer="true">
                        <Button size="small" class="btn-1">
                            <Icon type="md-apps" />批量操作
                        </Button>
                        <ul class="批量操作" slot="content">
                            <li @click="重启云机(false)">重启主机</li>
                            <!-- <li @click="返回桌面()">返回桌面</li> -->
                            <!-- <li @click="启动关闭应用(true)">启动应用</li> -->
                            <!-- <li @click="启动关闭应用(false)">关闭应用</li> -->
                            <li @click="恢复出厂设置(false)">恢复出厂设置</li>
                            <li @click="上传文件(true)">组内上传</li>
                        </ul>
                    </Poptip>
                    <Button size="small" class="btn-1" @click="开发中()">
                        <Icon type="md-cube" />主机同步
                    </Button>
                    <Button size="small" @click="安装应用(query.setName)" class="btn-1">
                        <Icon type="logo-android" />安装应用
                    </Button>
                    <Button class="btn-1" size="small" @click="上传文件(false)">
                        <Icon type="md-cloud-upload" />上传文件
                    </Button>
                    <Dropdown  trigger="click" @on-click="setTime">
                        <Button class="btn-1" size="small">
                            {{btnText}}
                            <Icon type="ios-arrow-down"></Icon>
                        </Button>
                        <DropdownMenu slot="list">
                            <DropdownItem :name="30">间隔30秒刷新</DropdownItem>
                            <DropdownItem :name="60">间隔1分钟刷新</DropdownItem>
                            <DropdownItem :name="300">间隔5分钟刷新</DropdownItem>
                            <DropdownItem :name="0">截屏不刷新</DropdownItem>
                            <!-- <ul class="操作List">
                                <li @click="设置刷新(30)">间隔30秒刷新</li>
                                <li @click="设置刷新(60)">间隔1分钟刷新</li>
                                <li @click="设置刷新(60*5)">间隔5分钟刷新</li>
                                <li @click="设置刷新(0)">截屏不刷新</li>
                            </ul> -->
                        </DropdownMenu>
                    </Dropdown>
                </div>

                <ul class="list1">
                    <li v-for="item in list">
                        <div class="header-1">
                            <Checkbox v-if="item.status==1" title="设备id">{{item.deviceId}}</Checkbox>
                            <div v-else>{{item.deviceId}}</div>
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
                                        <li @click="重启云机(item)">重启主机</li>
                                        <li @click="启动应用(item)">启动应用</li>
                                        <li @click="恢复出厂设置(item)">恢复出厂设置</li>
                                    </ul>
                                </DropdownMenu>
                            </Dropdown>
                            <div v-else></div>
                            <span>{{item.dueTime}}到期</span>
                        </div>
                    </li>
                </ul>
                <Page v-show="total" class="分页" :total="total" :page-size="query.size" @on-change="changePage" />

           </TabPane>
            <TabPane label="过期设备">
                
                <ul class="list1">
                    <li v-for="item in 过期设备.list">
                        <div class="header-1">
                            <div>{{item.deviceId}}</div>
                            <span>{{item.setId | filterName(设备类型)}}</span>
                        </div>
                        <div class="img-box">
                            <div>
                                <span>已到期</span>
                            </div>
                        </div>
                        <div class="footer-1">
                            <div></div>
                            <span>{{item.dueTime}}到期</span>
                        </div>
                    </li>
                </ul>
                <Page v-show="过期设备.total" class="分页" :total="过期设备.total" :page-size="过期设备.query.size" @on-change="changePage2" />
            </TabPane>
        </Tabs>
        
        <Modal class="启动关闭" :title="(启动关闭.启动 ? '启动' : '关闭') + '应用'" v-model="启动关闭.show" width="300" :mask-closable="false">
            <Select class="Select" v-model="model1" :placeholder="'请选择需要'+(启动关闭.启动 ? '启动' : '关闭')+'的应用'">
                <Option v-for="item in 选中分组.appList" :value="item" :key="item">{{ item }}</Option>
            </Select>
            <div slot="footer">
                <Button @click="启动关闭.show=false">取消</Button>
                <Button type="primary" @click="启动()">确定</Button>
            </div>
        </Modal>

        <Modal class="启动关闭" :title="(启动关闭.启动 ? '启动' : '关闭') + '应用'" v-model="启动关闭.show" width="300" :mask-closable="false">
            <Select class="Select" v-model="model1" :placeholder="'请选择需要'+(启动关闭.启动 ? '启动' : '关闭')+'的应用'">
                <Option v-for="item in 选中分组.appList" :value="item" :key="item">{{ item }}</Option>
            </Select>
            <div slot="footer">
                <Button @click="启动关闭.show=false">取消</Button>
                <Button type="primary" @click="启动()">确定</Button>
            </div>
        </Modal>

        <Modal class="上传文件" :title="(组内上传 ? '组内' : '')+'上传文件'" v-model="上传弹框" width="500" :mask-closable="false">
            <Form ref="上传" :model="上传" :rules="上传验证" :label-width="120">
                <FormItem label="选择文件" prop="fileName">
                    <Button @click="选择文件()">选择文件</Button>
                    {{上传.fileName}}
                </FormItem>
                <FormItem label="文件存放路径" prop="savePath">
                    <Input v-model="上传.savePath" placeholder="默认为:/sdcard" />
                </FormItem>
            </Form>

            <div slot="footer" class="footer">
                <Button @click="上传弹框=false">取消</Button>
                <Button type="primary" @click="确定上传文件()">确定</Button>
            </div>
        </Modal>

        <input type="file" ref="file" class="file" v-if="showFile" @change="changeFile()" />

        <!-- 远程控制 -->
        <yckz ref="yckz" />
    </div>
</template>

<script>
import yckz from '@/components/远程控制.vue'
import { mapState } from 'vuex'
export default {
    inject: ['安装应用'],
    components: {
        yckz
    },
    data() {
        return {
            query: {
                page: 1,
                size: 10,
                setName: "",
                status:1
            },
            list: [],
            total: 0,
            loading: true,
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: 'deviceId',
                    key: 'deviceId'
                },
                {
                    title: 'setId',
                    slot: 'setId'
                },
                {
                    title: '到期时间',
                    // key: 'dueTime'
                    slot: 'dueTime'
                },
                {
                    title: '操作',
                    width: 200,
                    align: 'center',
                    slot: 'caozuo'
                }
            ],
            player: "",
            选中设备: [],
            启动关闭: {
                show: false,
                启动: true,  //false 表示关闭
            },
            model1: '',
            选中单个: '',
            // 上传
            组内上传: false,
            上传弹框: false,
            上传: { "deviceId": "", "fileUrl": "", "savePath": "/sdcard", "setName": "", fileName: "" },  //fileName 提交的时候不可以要
            上传验证: {
                fileName: [
                    { required: true, message: '请选择文件', trigger: 'blur' }
                ],
                savePath: [
                    { required: true, message: '请输入存放地址，默认为：/sdcard', trigger: 'blur' }
                ]
            },
            showFile: true,

            截图完毕:false,
            定时刷新:0,
            刷新定时器:'',
            btnText:"截屏不刷新",

            过期设备:{
                query:{
                    page: 1,
                    size: 10,
                    setName: "",
                    status:2
                },
                list:[],
                total:0,
                loading:false
            }
        }
    },
    computed: {
        ...mapState({
            分组: "分组",
            设备类型: "设备类型"
        }),
        选中分组() {
            if (this.分组.find(x => x.name == this.query.setName)) {
                var obj = this.分组.find(x => x.name == this.query.setName)
                obj.appList = obj.appList || []
                return obj
            } else {
                return { appList: [] }
            }
        }
    },
    filters: {
        filterName(setId, 机型list) {
            return 机型list.find(x => x.setId == setId) ? 机型list.find(x => x.setId == setId).name : ''
        }
    },
    methods: {
        开发中() {
            this.正确('功能更开发中')
        },
        获取设备() {
            this.loading = true
            this.$axios.get(`/api/device`, { params: this.query }).then(res => {
                if (res.data.code === 0) {
                    let data = res.data.data
                    // 明天这个时候
                    var dateTime = new Date();
                    dateTime = dateTime.setDate(dateTime.getDate() + 1);
                    data.forEach(element => {
                        element.截图msg = '屏幕获取等待中'
                        element.截图base64 = ''
                    });
                    this.total = res.data.total
                    this.list = data
                    // this.设置截图
                    this.获取截图(0)
                }
                this.loading = false
            }).catch(err => {
                this.loading = false
            })
        },
        async 获取截图(index) {
            this.截图完毕=false
            if(index > this.list.length-1){
                console.log('全部完毕')
                this.截图完毕 = true
                this.setTime(this.定时刷新)
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
        setTime(time){
            console.log(time)
            let str = {
                30:'间隔30秒刷新',
                60:'间隔1分钟刷新',
                300:'间隔5分钟刷新',
                0:'截屏不刷新'
            }
            this.btnText = str[time]
            this.定时刷新 = time

            try {
                clearInterval(this.刷新定时器)
            } catch (error) {}
            if(!this.定时刷新 || !this.截图完毕) return
            this.刷新定时器 = setInterval(()=>{
                this.获取设备()
            },1000*this.定时刷新)
        },
        changePage(i) {
            this.query.page = i
            this.获取设备()
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
        selectionChange(list) {
            this.选中设备 = list
        },
        重启云机(item) {
            console.log(item)
            // item =false 表示批量
            if (!item && this.选中设备.length == 0) {
                this.错误('请选择设备')
                return
            }
            var o = { deviceId: "" }
            if (!item) {
                let list2 = []
                this.选中设备.forEach(element => {
                    list2.push(element.deviceId)
                });
                o.deviceId = list2.join(',')
            } else {
                o.deviceId = item.deviceId
            }
            this.$Spin.show()
            this.$axios.post('/api/device/0/devicereboot', o).then(res => {
                if (res.data.code === 0) {
                    this.正确('重启成功，同步可能需要1-2分钟')
                } else {
                    this.错误(res.data.message)
                }
                this.$Spin.hide()
            }).catch(err => {
                this.错误('系统错误，稍后再试')
                console.error(err);
                this.$Spin.hide()
            })
        },
        恢复出厂设置(item) {
            console.log(item)
            // item =false 表示批量
            if (!item && this.选中设备.length == 0) {
                this.错误('请选择设备')
                return
            }
            var o = { deviceId: "" }
            if (!item) {
                let list2 = []
                this.选中设备.forEach(element => {
                    list2.push(element.deviceId)
                });
                o.deviceId = list2.join(',')
            } else {
                o.deviceId = item.deviceId
            }
            this.$Spin.show()
            this.$axios.post('/api/device/0/devicereset', o).then(res => {
                if (res.data.code === 0) {
                    this.正确('恢复出厂设置成功，同步可能需要1-2分钟')
                } else {
                    this.错误(res.data.message)
                }
                this.$Spin.hide()
            }).catch(err => {
                this.错误('系统错误，稍后再试')
                console.error(err);
                this.$Spin.hide()
            })
        },
        启动应用(item) {
            if (this.选中分组.appList.length == 0) {
                this.错误('该分组尚未安装应用')
                return
            }
            this.选中单个 = item
            this.model1 = false
            this.启动关闭.show = true
        },
        启动() {
            if (!this.model1) return
            this.启动关闭.show = false
            var o = { "deviceId": this.选中单个.deviceId, "packageName": this.model1, "arg": "" }
            this.$Spin.show()
            this.$axios.post('/api/device/0/apkrestart', o).then(res => {
                if (res.data.code === 0) {
                    this.正确('重启应用成功')
                } else {
                    this.错误(res.data.message)
                }
                this.$Spin.hide()
            }).catch(err => {
                this.错误('系统错误，稍后再试')
                this.$Spin.show()
                console.error(err);
            })
        },
        上传文件(type) {
            this.组内上传 = type
            if (!this.组内上传 && this.选中设备.length == 0) {
                this.错误('请选择设备')
                return
            }
            this.上传 = { "deviceId": "", "fileUrl": "", "savePath": "/sdcard", "setName": "", fileName: "" }  //fileName 提交的时候不可以要
            this.上传弹框 = true
        },
        选择文件() {
            this.showFile = false
            this.$nextTick(() => {
                this.showFile = true
                this.$nextTick(() => {
                    this.$refs.file.click()
                })
            })
        },
        changeFile() {
            let file = this.$refs.file.files[0]
            this.上传.fileName = file.name
        },
        确定上传文件() {
            this.$refs.上传.validate((valid) => {
                if (valid) {
                    console.log('可以上传')
                    this.上传服务器()
                }
            })
        },
        上传服务器() {
            this.$Spin.show()
            let file = this.$refs.file.files[0]
            let f = new FormData()
            f.append('file', file)
            this.$axios.post('/api/upload', f).then(res => {
                if (res.data.code === 0) {
                    this.上传.fileUrl = this.$api + '/' + res.data.data[0]
                    this.上传文件接口()
                } else {
                    this.错误(res.data.message)
                    this.$Spin.hide()
                }
            }).catch(err => {
                this.错误('系统错误，稍后再试')
                this.$Spin.hide()
            })
        },
        上传文件接口() {
            if (this.组内上传) {
                this.上传.setName = this.query.setName
            } else {
                let list = []
                this.选中设备.forEach(element => {
                    list.push(element.deviceId)
                });
                this.上传.deviceId = list.join(',')
            }
            this.$axios.post('/api/device/0/fileupload', this.上传).then(res => {
                if (res.data.code === 0) {
                    this.正确('上传成功')
                    this.上传弹框 = false
                } else {
                    this.错误(res.data.message)
                }
                this.$Spin.hide()
            }).catch(err => {
                console.error(err);
                this.$Spin.hide()
            })
        },
        qiehuanTabs(name){
            if(name==1 && this.过期设备.list.length==0){
                this.获取过期设备()
            }
        },
        获取过期设备(){
            this.过期设备.loading = true
            this.$axios.get(`/api/device`, { params: this.过期设备.query }).then(res => {
                if (res.data.code === 0) {
                    let data = res.data.data
                    
                    this.过期设备.total = res.data.total
                    this.过期设备.list = data
                    // this.设置截图
                }
                this.过期设备.loading = false
            }).catch(err => {
                this.过期设备.loading = false
            })
        },
        changePage2(i){
            this.过期设备.query.page=i
            this.获取过期设备()
        },
        init() {
            this.query.setName = this.$route.query.name
            this.获取设备()
            this.获取过期设备()
        }
    },
    mounted() {
        this.init()
    },
    watch: {
        '$route'() {
            this.init()
        }
    },
    beforeDestroy() {
        try {
            clearInterval(this.刷新定时器)
        } catch (error) {
        }
    },
}
</script>

<style lang="scss" scoped>
.header {
    padding: 0px 0px 10px;
    background: #fff;
    .btn-1 {
        margin: 0px 5px 0px 0px;
    }
}
.批量操作 {
    line-height: 38px;
    li {
        cursor: pointer;
        &:hover {
            color: #1890ff;
        }
    }
    li:not(:last-child) {
        border-bottom: 1px solid #eee;
    }
}

.table {
    overflow: auto;
    margin: 15px 0px 0px;
    min-height: 300px;
    .操作List {
        line-height: 30px;
    }
    li {
        cursor: pointer;
        &:hover {
            background: #eee;
        }
    }
}

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

.操作List {
            line-height: 30px;
            li {
            padding: 0px 10px;
            cursor: pointer;
            &:hover {
                background: #eee;
            }
        }
        }
        

.分页 {
    margin: 15px 0px;
    text-align: right;
}

#video {
    width: 300px;
    height: 667px;
    border: 1px solid #eeeeee;
}

.启动关闭 {
    .Select {
        margin-bottom: 50px;
    }
}

.上传文件 {
    .footer {
        text-align: center;
    }
}
.file {
    display: none;
}

.red-text {
    color: red;
}
</style>