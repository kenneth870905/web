<template>
    <div>
        <div ref="锚点">
            <el-page-header  @back="goBack" :content="sp.id ? '编辑商品' : '添加商品'"></el-page-header>
        </div>
        <div class="form">
            <el-form :model="sp" :rules="spRules" ref="spFrom" size="small" label-width="80px" @submit.native.prevent>
                <el-form-item label="商品分类" prop="categoryId">
                    <el-select v-model="sp.categoryId">
                        <el-option v-if="!sp.categoryId" label="请选择分类" :value="0"></el-option>
                        <el-option v-for="(item, index) in 分类" :label="item.name" :value="item.id"></el-option>
                        <!-- <el-option label="一级和二级用户都可以购买" :value="1" :key="1"></el-option>
                        <el-option label="只有二级用户才可以购买" :key="2" :value="2"></el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item label="放置首页">
                    <el-select v-model="sp.isHomePage">
                        <el-option label="否" :value="false"></el-option>
                        <el-option label="是" :value="true"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否推荐">
                    <el-select v-model="sp.isRecommend">
                        <el-option label="否" :value="false"></el-option>
                        <el-option label="是" :value="true"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="sp.name" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item label="商品标题">
                    <el-input v-model="sp.title" placeholder="放置首页商品请输入标题，其他可忽略"></el-input>
                </el-form-item>
                <el-form-item label="商品简介">
                    <el-input type="textarea" v-model="sp.brief"></el-input>
                </el-form-item>
                <el-form-item label="购买级别">
                    <el-select v-model="sp.level">
                        <el-option label="允许所有用户购买" :key="0" :value="0"></el-option>
                        <el-option label="一级和二级用户都可以购买" :value="1" :key="1"></el-option>
                        <el-option label="只有二级用户才可以购买" :key="2" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="一级价格" prop="levelOnePrice">
                    <el-input v-model="sp.levelOnePrice" type="number" step="0.01" @change="change_1('levelOnePrice')" placeholder="请输入一级价格"></el-input>
                </el-form-item>
                <el-form-item label="二级价格" prop="levelTwoPrice">
                    <el-input v-model="sp.levelTwoPrice" type="number" step="0.01" @change="change_1('levelTwoPrice')" placeholder="请输入二级价格"></el-input>
                </el-form-item>
                <el-form-item label="积分价格" prop="creditPrice">
                    <el-input v-model="sp.creditPrice" type="number" step="0.01" @change="change_1('creditPrice')" placeholder="请输入积分价格"></el-input>
                </el-form-item>
                <el-form-item label="限购数量">
                    <el-input v-model="sp.maxPurchaseCount" type="number" step="0.01" placeholder="限购数量：0 表示不限购"></el-input>
                </el-form-item>

                <el-form-item label="是否返佣">
                    <el-radio-group v-model="sp.isKickback">
                        <el-radio :label="true">返佣</el-radio>
                        <el-radio :label="false">不返佣</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="返佣比例" prop="kickbackRate" v-if="sp.isKickback">
                    <el-input v-model="sp.kickbackRate" type="number" step="0.01" @change="change_1('kickbackRate')" placeholder="请输入返佣比例"></el-input>
                </el-form-item>
                <el-form-item label="封面图片">
                    <div class="封面" @click="changeFile(1)">
                        <i v-if="!sp.coverImg && !coverImgFile.base64" class="el-icon-plus"></i>
                        <img v-if="coverImgFile.base64" :src="coverImgFile.base64" alt="" srcset="">
                        <img v-if="sp.coverImg && !coverImgFile.base64" :src="$api_url+'/'+sp.coverImg" alt="">
                    </div>
                </el-form-item>
                <el-form-item label="轮播图片">
                    <ul class="轮播图">
                        <li v-for="(item,index) in sp.imgs">
                            <img :src="$api_url +'/'+item" alt="" srcset="">
                            <i class="el-icon-delete" @click="sp.imgs.splice(index,1)"></i>
                        </li>
                        <li v-for="(item,index) in imgsFiles">
                            <img :src="item.base64" alt="" srcset="">
                            <i class="el-icon-delete" @click="imgsFiles.splice(index,1)"></i>
                        </li>
                        <li @click="changeFile(2)">
                            <i class="el-icon-plus"></i>
                        </li>
                    </ul>
                </el-form-item>
                <el-form-item label="图文介绍">
                    <div class="编辑器">
                        <quill-editor class="editor" v-model="sp.description" ref="myQuillEditor" :options="editorOption">
                        </quill-editor>
                    </div>
                </el-form-item>
                <div>
                    <el-button native-type="submit" @click="onSubmit()" class="btn_1" type="warning">保存</el-button>
                </div>
            </el-form>
        </div>

        <input class="fileInput" v-if="showFile" type="file" accept="image/*" ref="file1" @change="fileChange">
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

export default {
    name: "",
    components: {
        quillEditor
    },
    data() {
        return {
            sp: {
                id:"",
                name: "",   //名称
                level: 0,    //允许购买的用户级别，比如level为1那一级和二级用户都可以购买，level为2那只有二级用户才可以购买 那默认就是0，允许所有用户购买
                levelOnePrice: '', //一级价格
                levelTwoPrice: '', //二级价格
                creditPrice: '',    //积分价格
                isKickback: true,   //是否返佣
                kickbackRate: 0,  //返佣比例
                maxPurchaseCount:0,     //限购 0 不限购
                imgs: [],           //轮播图片
                coverImg: "",       //封面
                description: "",     //详情
                categoryId:'',
                isHomePage:false,   //否放置首页
                isRecommend:false,  //表示是否推荐
                brief:"",       //简介
            },
            spRules: {
                categoryId:[
                    { required: true, trigger: 'blur',
                        validator:(rule, value, callback)=>{
                            if(!value){ 
                                callback(new Error('请选择分类'));
                            }else{
                                callback()
                            }
                        }
                    }
                ],
                name: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' }
                ],
                levelOnePrice:[
                    {   trigger: 'blur',required:true,
                        validator: (rule, value, callback)=>{
                            if(value===''){
                                callback(new Error('请输入一级价格'));
                            }else if(value<=0){
                                callback(new Error('价格必须大于0'));
                            }else{
                                callback()
                            }
                        }
                    }
                ],
                levelTwoPrice:[
                    { required: true, trigger: 'blur',
                        validator: (rule, value, callback)=>{
                            if(value===''){
                                callback(new Error('请输入二级价格'));
                            }else if(value<=0){
                                callback(new Error('价格必须大于0'));
                            }else{
                                callback()
                            }
                        }
                    }
                ],
                creditPrice:[
                    {  trigger: 'blur',
                        validator: (rule, value, callback)=>{
                            if(!Number.isInteger(value)){
                                callback(new Error('积分价格必须是整数'));
                            }else{
                                callback()
                            }
                        }
                    }
                ],
                kickbackRate:[
                    {  trigger: 'blur',
                        validator: (rule, value, callback)=>{
                            if(value<0 || value>1){
                                callback(new Error('返佣范围在0-1之间如：0.5'));
                            }else{
                                callback()
                            }
                        }
                    }
                ]
            },

            coverImgFile: {
                base64:"",
                file:""
            },
            imgsFiles: [],

            showFile: false,
            file_type: 1, //1封面 2 轮播图 3 富文本图片

            // 富文本编辑器
            // https://www.jianshu.com/p/21dab85b7fa8
            editorOption: {
                // theme: "snow", // or 'bubble'
                placeholder: "请输入内容",
                modules: {
                    toolbar: {
                        container: [
                            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
                            [{ header: 1 }, { header: 2 }], // 1、2 级标题
                            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
                            ["image"] // 链接、图片、视频
                        ],
                        handlers: {
                            image: async (value) => {
                                if (value) {
                                    // 触发input框选择图片文件
                                    this.changeFile(3)
                                } else {
                                    console.log(false)
                                    // this.quill.format("image", false);
                                }
                            },
                        }
                    }
                }
            },
            分类:[]
        }
    },
    computed: {

    },
    methods: {
        goBack() {
            history.back()
        },
        fileChange(e) {
            let file = e.target.files[0]
            if (this.file_type == 1) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e)=>{
                    console.log(e)
                    this.coverImgFile.base64 = e.target.result
                    // e.target.result
                };
                this.coverImgFile.file = file
                return
            } else if (this.file_type == 2) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e)=>{
                    var obj = {
                        base64:e.target.result,
                        file:file
                    }
                    this.imgsFiles.push(obj)
                    // e.target.result
                };
                
                return
            }
            // 富文本上传图片
            this.$loading(1)
            let f = new FormData()
            f.append('file', file)
            this.$axios({
                method: 'post',
                url: this.$api_url + '/api/upload',
                data: f
            }).then(x => {
                console.log(x)
                if (x.data && x.data.length > 0) {
                    let quill = this.$refs.myQuillEditor.quill;
                    let length = quill.getSelection().index;
                    quill.insertEmbed(length, "image", this.$api_url + '/' + x.data[0]);
                    // 调整光标到最后
                    quill.setSelection(length + 1);
                } else {
                    this.$message({ showClose: true, message: '图片上传失败', type: 'error' });
                }
                this.$loading(0)
            }).catch(err => {
                this.$message({ showClose: true, message: '图片上传失败', type: 'error' });
                this.$loading(0)
            })
        },
        async changeFile(type) {
            this.file_type = type
            this.showFile = false
            await this.$nextTick()
            this.showFile = true
            this.$nextTick(() => {
                this.$refs.file1.click()
            })
        },
        onSubmit() {
            this.$refs.spFrom.validate((valid) => {
                if (valid) {
                    // console.log('可以提交')
                    if(!this.sp.id){
                        this.add()
                    }else{
                        this.修改()
                    }
                } else {
                    console.log(valid)
                    this.$message({ showClose: true, message: '内容填写有误', type: 'error' });
                    this.$refs.锚点.scrollIntoView({behavior:'smooth'})
                    return false;
                }
            })
        },
        upload1(){
            return new Promise((r,e)=>{
                if(!this.coverImgFile.file){
                    r()
                }else{
                    let f = new FormData()
                    f.append('file', this.coverImgFile.file)
                    this.$axios.post('/api/upload',f).then(res => {
                        console.log(res)
                        if(res.data && res.data.length>0){
                            this.coverImgFile={base64:"",file:""}
                            this.sp.coverImg = res.data[0]
                        }
                        r()
                    }).catch(err => {
                        r()
                    })
                }
            })
        },
        upload2(){
            return new Promise((r,e)=>{
                if(this.imgsFiles.length==0){
                    r()
                }else{
                    let f = new FormData()
                    this.imgsFiles.forEach(item=>{
                        f.append('file', item.file)
                    })
                    this.$axios.post('/api/upload',f).then(res => {
                        console.log(res)
                        if(res.data && res.data.length>0){
                            this.imgsFiles = []
                            this.sp.imgs = [...this.sp.imgs,...res.data]
                        }
                        r()
                    }).catch(err => {
                        r()
                    })
                }
            })
        },
        async add(){
            this.$loading(1)
            Promise.all([this.upload1(),this.upload2()]).then(list=>{
                this.$axios.post('/api/product',this.sp)
                .then(res => {
                    console.log(res)
                    if(res.code==0){
                        this.$message({ showClose: true, message: '添加成功', type: 'success' });
                        history.back()
                    }else{
                        this.$message({ showClose: true, message: '添加失败，请联系管理员', type: 'error' });
                    }
                    this.$loading()
                })
                .catch(err => {
                    this.$message({ showClose: true, message: '添加失败，请联系管理员', type: 'error' });
                    this.$loading(0)
                })
            })
        },
        修改(){
            this.$loading(1)
            Promise.all([this.upload1(),this.upload2()]).then(list=>{
                delete this.sp.createdAt
                delete this.sp.updatedAt
                delete this.sp.deletedAt
                this.$axios.put(`/api/product/${this.sp.id}`,this.sp).then(res => {
                    console.log(res)
                    if(res.code==0){
                        this.$message({ showClose: true, message: '更新成功', type: 'success' });
                        history.back()
                    }else{
                        this.$message({ showClose: true, message: '更新失败，请联系管理员', type: 'error' });
                    }
                    this.$loading()
                })
                .catch(err => {
                    this.$message({ showClose: true, message: '更新失败，请联系管理员', type: 'error' });
                    this.$loading(0)
                })
            })
        },
        getproduct(){
            this.$axios.get(`/api/product/${this.sp.id}`)
            .then(res => {
                if(res.code==0)
                this.sp = res.data
            })
            .catch(err => {
            })
        },
        change_1(key){
            this.sp[key] = this.sp[key] ? Math.ceil(this.sp[key]*100)/100 : 0
        },
        获取商品分类(){
            this.$axios.get(`/api/category`,{params:{page:1,size:1000}})
            .then(res => {
                if(res.code===0){
                    this.分类 = res.data
                    if(!this.sp.id && this.分类.length>0){
                        this.sp.categoryId = this.分类[0].id
                    }
                }
            })
        }
    },
    mounted() {
        this.获取商品分类()
        this.sp.id = this.$route.query.id
        if(this.sp.id){
            this.getproduct()
        }
    },
    watch: {
       
    },
}
</script>

<style lang="scss" scoped>
/deep/ .ql-container {
    min-height: 300px;
}

.fileInput {
    display: none;
}

.编辑器 {
    width: 400px;
}

.btn_1 {
    width: 100%;
}
.el-page-header {
    border-bottom: 1px solid #bfbfbf;
    padding-bottom: 15px;
}
.form {
    padding: 20px 0px 0px;
}

.封面 {
    width: 180px;
    height: 180px;
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
        font-size: 28px;
    }
    &:hover {
        border: 1px dashed #409eff;
    }
    img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

.轮播图 {
    padding: 20px;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    display: flex;
    flex-wrap: wrap;
    li {
        width: 180px;
        height: 180px;
        margin: 5px;
        border: 1px dashed #d9d9d9;
        // cursor: pointer;
        position: relative;
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        i {
            position: absolute;
        }
        .el-icon-delete {
            top: 0px;
            right: 0px;
            font-size: 25px;
            color: red;
            cursor: pointer;
        }
        .el-icon-plus {
            top: 0px;
            left: 0px;
            bottom: 0px;
            right: 0px;
            margin: auto;
            width: 28px;
            height: 28px;
            font-size: 28px;
        }
        &:last-child {
            cursor: pointer;
            &:hover {
                border: 1px dashed #409eff;
            }
        }
    }
}
</style>