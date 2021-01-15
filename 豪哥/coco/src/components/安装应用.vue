<template>
    <div>
        <Modal class="安装" title="安装应用" v-model="显示弹框" width="1000" :mask-closable="false">
            <div class="box-1">
                <div class="title-1">
                    请选择需要安装的应用
                    <Button class="btn" type="success" @click="上传应用=true" size="small">上传应用</Button>
                    <!-- <Checkbox class="btn" v-model="全选应用">全选</Checkbox> -->
                    <Button class="btn" @click="获取应用列表()" size="small">刷新列表</Button>
                </div>
                <RadioGroup class="RadioGroup-1" v-model="packageName">
                    <ul class="list-1">
                        <li v-for="item in 应用">
                            <Radio :label="item.packagename" class="btn">{{item.appname}}</Radio >
                        </li>
                    </ul>
                </RadioGroup>
                <Spin fix v-if="loading_1">加载中</Spin>
            </div>
            <div class="box-1">
                <div class="title-1">
                    已安装应用
                </div>
                
            </div>

            <div slot="footer">
                <Button type="text" @click="显示弹框=false">取消</Button>
                <Button type="primary" @click="安装应用()">确定</Button>
            </div>
        </Modal>

        <Modal class="上传" title="上传应用" v-model="上传应用" width="500" :mask-closable="false">
            <Tabs v-model="type">
                <TabPane label="网络上传" name="1">
                    <div class="t-1">通过应用安装包apk的下载地址</div>
                    <Input type="text" v-model="fileUrl" placeholder="输入下载地址，如：http://www.xxx.com/xxx.apk" />
                </TabPane>
                <TabPane label="本地上传" name="2">
                    <div class="t-1">请选择apk文件，文件名请不要包含空格、斜杠和中文等特殊字符</div>
                    <Button @click="选择文件()">选择文件</Button> {{fileName}}
                </TabPane>
            </Tabs>
            <div slot="footer">
                <Button type="text" @click="上传应用=false">取消</Button>
                <Button type="primary" @click="上传()">确定</Button>
            </div>
        </Modal>
        <!-- accept=".apk" -->
        <input type="file" ref="file" class="file" v-if="showFile"  @change="changeFile()">
    </div>
</template>

<script>
export default {
    data() {
        return {
            显示弹框: false,
            全选: false,
            上传应用: false,
            应用: [],
            // 上传类型 1 网络上传 2 本地上传
            showFile:true,
            type:"1",
            fileUrl:'',     //网络上传地址
            fileName:"",
            全选应用:false,
            packageName:"",
            loading_1:false,   //获取应用
            //获取设备参数
            query:{
                page:1,
                size:10
            },
            loading_2:false,
            total:0,
            list_2:[],
            columns_2: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: 'deviceId',
                    key: 'deviceId'
                }
            ],
            选中:[]
        }
    },
    methods: {
        获取应用列表() {
            this.loading_1 =true
            this.$axios.get('/api/device/0/applist', '').then(res => {
                if (res.data.code === 0) {
                    let data = res.data.data
                    // data.forEach(element => {
                    //     element.active = false
                    // });
                    this.应用 = data
                }
                this.loading_1 = false
            }).catch(err => {
                this.loading_1 = false
            })
        },
        changePage(i){
            this.query.page = i
            this.获取设备()
        },
        获取设备(){
            this.$axios.get(`/api/device`,{params:this.query})
            .then(res => {
                if(res.data.code===0){
                    this.选中 = []
                    this.list_2 = res.data.data
                    this.total = res.data.total
                }
            })
            .catch(err => {
            })
        },
        上传apk(url){
            this.$Spin.show()
            this.$axios.post('/api/device/0/apkupload',{fileUrl:url}).then(res => {
                if(res.data.code===0){
                    this.上传应用 = false
                    this.showFile=false
                    this.fileUrl = ''
                    this.fileName = ''
                    this.获取应用列表()
                    this.正确('上传成功')
                }else{
                    this.错误(res.data.message)
                }
                this.$Spin.hide()
            }).catch(err => {
                this.错误('系统错误，稍后再试')
                this.$Spin.hide()
            })
        },
        上传(){
            if(this.type==1){
                if(!this.fileUrl){
                    this.错误('请输入APK网络地址')
                    return
                }
                this.上传apk(this.fileUrl)
            }else{
                if(this.$refs.file.files.length==0){
                    this.错误('请选择文件')
                    return
                }
                this.$Spin.show()
                let file = this.$refs.file.files[0]
                let f = new FormData()
                    f.append('file',file)
                this.$axios.post('/api/upload',f).then(res => {
                    if(res.data.code===0){
                        this.上传apk(this.$api + '/'+res.data.data[0])
                    }else{
                        this.错误(res.data.message)
                        this.$Spin.hide()
                    }
                }).catch(err => {
                    this.错误('系统错误，稍后再试')
                    this.$Spin.hide()
                })
            }
        },
        选择文件(){
            this.showFile = false
            this.fileName = ''
            this.$nextTick(()=>{
                this.showFile = true
                this.$nextTick(()=>{
                    this.$refs.file.click()
                })
            })
        },
        changeFile(){
            let file = this.$refs.file.files[0]
            this.fileName = file.name
        },
        select_2(selection,row){
            this.选中 = selection
        },
        安装应用(){
            if(!this.packageName){
                this.错误('请选择应用')
                return
            }else if(this.选中.length==0){
                this.错误('请选择设备')
                return
            }else{
                let deviceIdList = []
                for (let index = 0; index < this.选中.length; index++) {
                    deviceIdList.push(this.选中[index].deviceId)
                }
                let o ={
                    packageName:this.packageName,
                    deviceId:deviceIdList.join(',')
                }
                this.$Spin.show()
                this.$axios.post('/api/device/0/apkissue',o).then(res => {
                    if(res.data.code===0){
                        this.成功('安装成功')
                    }else{
                        this.错误(res.data.message)
                    }
                    this.$Spin.hide()
                }).catch(err => {
                    console.error(err); 
                    this.错误('系统错误，稍后再试')
                    this.$Spin.hide()
                })
            }
        },
        init(){
            // this.选中 = []
            // this.packageName = ''
            this.显示弹框=true
            this.获取应用列表()
            // this.获取设备()
        }
    },
    mounted() {
        
    },
}
</script>

<style lang="scss" scoped>
.file{
    display: none;
}
.安装 {
    .box-1 {
        height: 230px;
        overflow: auto;
        position: relative;
    }
    .title-1 {
        background: #eee;
        display: flex;
        align-items: center;
        padding: 5px;
        .btn {
            margin: 0px 5px;
            cursor: pointer;
        }
    }
    .RadioGroup-1{
        display: block;
    }
    /deep/ td,
    /deep/ th{
        height: auto;
        padding: 0px;
    }
}

.上传 {
    .t-1 {
        margin: 0px 0px 10px;
    }
}

.list-1{
    display: flex;
    flex-wrap: wrap;
    position: relative;
    li{
        margin: 5px;
        width: 200px;
    }
}

.分页{
    text-align: right;
}
</style>