<template>
    <div class="VipDetails">
        <el-form :model="vip" size="mini" :rules="rules" ref="ruleForm" class="form">
            <el-form-item label="UID" prop="UID">
                <el-input :value="vip.UID" v-if="UID" :disabled="UID ? true : false"></el-input>
                <el-input v-model="vip.UID" v-if="!UID" >
                    <el-button type="" slot="append" @click="验证()">验证是否可用</el-button>
                </el-input>
            </el-form-item>
            <el-form-item label="法币昵称">
                <el-input v-model="vip.fiatNickname" placeholder></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="vip.name" placeholder></el-input>
            </el-form-item>
            <el-form-item label="电话号码">
                <el-input v-model="vip.phone" placeholder></el-input>
            </el-form-item>
            <el-form-item label="从事工作">
                <el-input v-model="vip.profession" placeholder></el-input>
            </el-form-item>
            <el-form-item label="买币用途">
                <el-input v-model="vip.use" placeholder></el-input>
            </el-form-item>
            <el-form-item label="身份证号码">
                <el-input v-model="vip.IDCard" placeholder></el-input>
            </el-form-item>
            <el-form-item label="身份证照片">
                <ul class="imgList">
                    <li v-for="(item,index) in vip.IDPhoto">
                        <el-image style="width: 100%; height: 100%" :src="$api_url+'/huobi/public/storage/' + item" :preview-src-list="[$api_url+'/huobi/public/storage/' + item]" fit="contain"></el-image>
                        <i class="delete el-icon-delete" @click="vip.IDPhoto.splice(index,1)"></i>
                    </li>
                    <li v-for="(item,index) in IDFiles">
                        <el-image style="width: 100%; height: 100%" :src="item.base64" :preview-src-list="[item.base64]" fit="contain"></el-image>
                        <i class="delete el-icon-delete" @click="IDFiles.splice(index,1)"></i>
                    </li>
                    <li class="add" @click="clickFile('IDPhoto')">
                        <i class="el-icon-plus"></i>
                    </li>
                </ul>
            </el-form-item>
            <el-form-item label="人脸视频验证">
                <el-button type class="btn-1" v-if="vip.FaceAuthentication">播放地址：{{vip.FaceAuthentication}}</el-button>
                <el-button type v-if="vip.FaceAuthentication" @click="vip.FaceAuthentication=''">删除地址</el-button>
                <el-button type v-if="!vip.FaceAuthentication" @click="clickFile('video')">选择视频</el-button>
                <div v-if="videoFile">已选择视频：{{videoFile.name}}</div>
            </el-form-item>
            <el-form-item label="银行卡流水">
                <ul class="imgList">
                    <li v-for="(item,index) in vip.BankFlow">
                        <el-image style="width: 100%; height: 100%" :src="$api_url+'/huobi/public/storage/' + item" :preview-src-list="[$api_url+'/huobi/public/storage/' + item]" fit="contain"></el-image>
                        <i class="delete el-icon-delete" @click="vip.BankFlow.splice(index,1)"></i>
                    </li>
                    <li v-for="(item,index) in BankFiles">
                        <el-image style="width: 100%; height: 100%" :src="item.base64" :preview-src-list="[item.base64]"  fit="contain"></el-image>
                        <i class="delete el-icon-delete" @click="BankFiles.splice(index,1)"></i>
                    </li>
                    <li class="add" @click="clickFile('BankFlow')">
                        <i class="el-icon-plus"></i>
                    </li>
                </ul>
            </el-form-item>
            <el-form-item label="补充信息">
                <el-input v-model="vip.AdditionalInformation" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder></el-input>
            </el-form-item>
            <el-form-item label="订单号">
                <el-input v-model="vip.orderNumber" placeholder></el-input>
            </el-form-item>
            <el-form-item label>
                <el-button type style="width: 100%;" size="small" @click="save()">保存</el-button>
            </el-form-item>
        </el-form>

        <input type="file" class="file" :accept="accept" v-if="showFile" ref="file" @change="changeFile()" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            accept: "image/*",
            showFile: false,
            fileType: "",        //IDPhoto 身份证 video 视频认证  BankFlow 银行卡流水
            UID:"",
            vip: {
                UID: "",
                fiatNickname: "",   //法币昵称
                name: "",    //姓名
                phone: "",   //手机号码
                profession: "",  //从事工作
                use: "",     //买币用途
                IDCard: "",  //身份证号
                IDPhoto: [], //身份证照片
                FaceAuthentication: "",  //人脸视频认证
                BankFlow: [],    //流水照片
                AdditionalInformation: "",   //补充信息
                orderNumber: "", //订单号码
                userId: "",
                modifyUser:"",  //修改者
                CreationTime: ""
            },
            rules: {
                UID: [
                    { required: true, message: '请输入UId', trigger: 'blur' }
                ],
            },
            // 证件上传
            IDFiles: [
                // {
                //     base64:"",
                //     file:""
                // }
            ],
            // 视频
            videoFile: "",
            //银行卡流水图片 格式和证件一样
            BankFiles: [],
            
        }
    },
    methods: {
        验证(){
            if(!this.vip.UID){
                return
            }
            this.$axios.post('/huobi/public/index.php/Vip/detectUID',{UID:this.vip.UID} ).then(res => {
                if(res.data.code==1){
                    this.$message({ showClose: true, message: 'UID可用', type: 'success' });
                }else{
                    this.$message({ showClose: true, message: 'UID不可用', type: 'error' });
                }
            }).catch(err => {
                console.error(err);
                this.$message({ showClose: true, message: '连接错误，请稍后再试', type: 'error' });
            })
        },
        clickFile(type) {
            this.fileType = type
            if(type=='video'){
                this.accept = 'video/*'
            }else {
                this.accept = 'image/*'
            }
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
            if (this.fileType == 'IDPhoto') {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = e => {
                    this.IDFiles.push({ base64: e.target.result, file: file })
                };
            }else if(this.fileType=='video'){
                this.videoFile = file
            }else if(this.fileType=='BankFlow'){
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = e => {
                    this.BankFiles.push({ base64: e.target.result, file: file })
                };
            }
        },
        save() {
            if (!this.vip.UID) {
                this.$message({ showClose: true, message: '请输入UID', type: 'error' });
                return
            }
            let formdata = new FormData()
                formdata.append('vip',JSON.stringify(this.vip) )
            this.IDFiles.forEach(x=>{
                formdata.append('IDFiles[]',x.file)
            })
                formdata.append('videoFile',this.videoFile)
            this.BankFiles.forEach(x=>{
                formdata.append('BankFiles[]',x.file)
            })
                if(!this.UID){
                    formdata.append('detect',true)
                }
            this.$axios.post('/huobi/public/index.php/Vip/setVip',formdata ).then(res => {
                if(res.data.code==1){
                    this.$message({ showClose: true, message: '保存成功', type: 'success' });
                    history.back()
                }else{
                    this.$message({ showClose: true, message: res.data.message, type: 'error' });
                }
            }).catch(err => {
                console.error(err);
                this.$message({ showClose: true, message: '连接错误，请稍后再试', type: 'error' });
            })
        },
        get(){
            this.$axios.post('/huobi/public/index.php/Vip/getByUID',{UID:this.UID}).then(res => {
                if(res.data.code==1){
                    this.vip = res.data.data
                }
            }).catch(err => {
            })
        }
    },
    mounted() {
        if(this.$route.query.UID){
            this.UID=this.$route.query.UID
            this.get()
        }
    },
}
</script>

<style lang="scss" scoped>
.VipDetails {
    padding: 20px;
}
.file{
    display: none;
}

.form {
    width: 500px;
    margin: 0px auto;
    border: 1px solid #eee;
    padding: 0px 15px;
    /deep/ .el-form-item__label {
        float: none;
    }
    .btn-1 {
        max-width: 300px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    /deep/ .el-input.is-disabled .el-input__inner{
        color: #000000;
    }
}
.imgList {
    display: flex;
    flex-wrap: wrap;
    li {
        width: 100px;
        height: 100px;
        background: #eee;
        margin: 5px;
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        border: 1px solid #d2d2d2;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .add {
        font-size: 30px;
        cursor: pointer;
    }
    .delete {
        color: red;
        background: rgba($color: #000000, $alpha: 0.3);
        position: absolute;
        top: 0px;
        right: 0px;
        padding: 5px 5px;
        cursor: pointer;
    }
}
</style>