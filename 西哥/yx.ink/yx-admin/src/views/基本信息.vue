<template>
    <div class="app-container">
        <el-form class="form" size="mini">
            <el-form-item label="飞机/Telegram 号码">
                <el-input v-model="telegram.content" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="phone.content" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="微信">
                <el-input v-model="weixin.content" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="微信二维码">
                <el-col :span="24">
                    <div class="img-box" @click="选择图片()">
                        <i v-if="!wechatQR.content && !wechatQR.base64" class="el-icon-picture"/>
                        <img v-if="wechatQR.content && !wechatQR.base64" :src="$img_url+wechatQR.content" alt="" srcset="">
                        <img v-if="wechatQR.base64" :src="wechatQR.base64" alt="" srcset="">
                    </div>
                </el-col>
            </el-form-item>
            <el-form-item label="包邮底价">
                <el-input v-model="baoyou.content" placeholder="ru:5000，不需要写单位"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="" size="small" style="width: 100%;" @click="保存()">保存</el-button>
            </el-form-item>
        </el-form>

        <input class="hide" type="file" v-if="showFile" accept="image/*" @change="changeFile()" ref="file"> 
    </div>
</template>

<script>
export default {
    data() {
        return {
            telegram:{
                id:"",
                keyName:"telegram",
                content:""
            },
            phone:{
                id:"",
                keyName:"phone",
                content:""
            },
            weixin:{
                id:"",
                keyName:"weixin",
                content:""
            },
            wechatQR:{
                id:"",
                keyName:"wechatQR",
                content:"",
                //上传用
                base64:"",
            },
            showFile:false,
            wechatQR:{
                id:"",
                keyName:"wechatQR",
                content:"",
                //上传用
                base64:"",
            },
            //包邮
            baoyou:{
                id:"",
                keyName:"baoyou",
                content:"",
            }
        }
    },
    methods: {
        选择图片(){
            this.showFile = false
            this.$nextTick(()=>{
                this.showFile=true
                this.$nextTick(()=>{
                    this.$refs.file.click()
                })
            })
        },
        changeFile(){
            let file = this.$refs.file.files[0]
            let reader = new FileReader()
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                // this.wechatQR.base64 = e.target.result
                this.$set(this.wechatQR,'base64',e.target.result)
            };
        },
        getBasic(){
            this.$axios.post('/Basic/get','').then(res => {
                if(res.code==1){
                    let data =res.data
                    if(data.find(x=>x.keyName=='telegram')) this.telegram = data.find(x=>x.keyName=='telegram')
                    if(data.find(x=>x.keyName=='phone')) this.phone = data.find(x=>x.keyName=='phone')
                    if(data.find(x=>x.keyName=='weixin')) this.weixin = data.find(x=>x.keyName=='weixin')
                    if(data.find(x=>x.keyName=='wechatQR')) this.wechatQR = data.find(x=>x.keyName=='wechatQR')
                    if(data.find(x=>x.keyName=='baoyou')) this.baoyou = data.find(x=>x.keyName=='baoyou')
                }
            }).catch(err => {
            })
        },
        保存(){
            let list = [this.telegram,this.phone,this.weixin,this.wechatQR,this.baoyou]
            // let list = [this.telegram,this.phone,this.weixin,this.wechatQR]
            this.$Loadading(1)
            this.$axios.post('/Basic/set',{list:list}).then(res => {
                this.$Loadading()
                if(res.code==1){
                    this.getBasic()
                    this.正确('设置成功')
                }else{
                    this.错误('设置失败')
                }
            }).catch(err => {
                this.$Loadading()
                this.错误('系统错误，稍后再试')
            })
        }
    },
    mounted() {
        this.getBasic()
    },
}
</script>

<style lang="scss" scoped>
.form{
    width: 600px;
    margin: 10px auto;
    padding: 15px;
    box-shadow: 0px 0px 1px 0px #000;
}
.img-box{
    width: 200px;
    min-height: 200px;
    background: #eee;
    border: 1px solid #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    cursor: pointer;
    color: rgba($color: #000000, $alpha: 0.6);
    img{
        width: 100%;
        display: block;
    }
}
</style>
