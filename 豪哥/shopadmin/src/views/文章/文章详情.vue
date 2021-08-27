<template>
    <div>
        <div ref="锚点">
            <el-page-header  @back="goBack" :content="wz.id ? '编辑文章' : '添加文章'"></el-page-header>
        </div>
        <div class="form">
            <el-form :model="wz" :rules="wzRules" ref="wzFrom" size="small" label-width="80px" @submit.native.prevent>
                 <el-form-item label="文章类型" prop="categoryId">
                    <el-select v-model="wz.categoryId">
                        <el-option v-if="!wz.categoryId" label="请选择分类" value=""></el-option>
                        <el-option v-for="(item, index) in 分类" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章标题" prop="title">
                    <el-input v-model="wz.title" placeholder="请输入文章标题"></el-input>
                </el-form-item>
                <el-form-item label="文章简介">
                    <el-input type="textarea" v-model="wz.brief" :autosize="{minRows:2}" placeholder="请输入文章简介"></el-input>
                </el-form-item>
                <el-form-item label="封面图片">
                    <div class="封面" @click="changeFile(1)">
                        <i v-if="!wz.coverImg && !coverImgFile.base64" class="el-icon-plus"></i>
                        <img v-if="coverImgFile.base64" :src="coverImgFile.base64" alt="" srcset="">
                        <img v-if="wz.coverImg && !coverImgFile.base64" :src="$api_url+'/'+wz.coverImg" alt="">
                    </div>
                </el-form-item>
                <el-form-item label="图文介绍">
                    <div class="编辑器">
                        <quill-editor class="editor" v-model="wz.content" ref="myQuillEditor" :options="editorOption">
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
            wz: {
                id:"",
                title: "",   //名称
                brief:"",    //简介
                content:"",  //内容
                categoryId:"",  //类型Id
            },
            分类:[],
            coverImgFile: {
                base64:"",
                file:""
            },
            file_type:0,
            wzRules: {
                title: [
                    { required: true, message: '请输入标题  ', trigger: 'blur' }
                ]
            },
            
            showFile: false,

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
            }
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
            //封面
            if (this.file_type == 1) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e)=>{
                    this.coverImgFile.base64 = e.target.result
                };
                this.coverImgFile.file = file
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
            this.$refs.wzFrom.validate((valid) => {
                if (valid) {
                    if(!this.wz.id){
                        this.add()
                    }else{
                        this.修改()
                    }
                } else {
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
                            this.wz.coverImg = res.data[0]
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
            await this.upload1()
            this.$axios.post('/api/article',this.wz)
            .then(res => {
                if(res.code===0){
                    this.正确('添加成功')
                    history.back()
                }else{
                    this.错误(res.message)
                }
                this.$loading()
            })
            .catch(err => {
                this.$loading()
                this.错误('添加失败,请联系管理员')
            })
        },
        async 修改(){
            this.$loading(1)
            await this.upload1()
            delete this.wz.createdAt
            delete this.wz.deletedAt
            delete this.wz.updatedAt
            this.$axios.put(`/api/article/${this.wz.id}`,this.wz)
            .then(res => {
                if(res.code===0){
                    this.正确('修改成功')
                    history.back()
                }else{
                    this.错误(res.message)
                }
                this.$loading(0)
            })
            .catch(err => {
                this.错误('修改失败,请联系管理员')
            })
        },
        获取详情(){
            this.$axios.get(`/api/article/${this.wz.id}`,'')
            .then(res => {
                if(res.code===0){
                    this.wz = res.data
                }
            })
            .catch(err => {
            })
        },
        获取文章类型(){
            this.$axios.get('/api/articleCategory',{ params:  {page:1,size:1000} })
            .then(res => {
                console.log(res)
                this.分类 = res.data
            })
            .catch(err => {
                console.error(err); 
            })
        }
    },
    mounted() {
        this.wz.id = this.$route.query.id
        this.获取文章类型()
        if(this.wz.id){
            this.获取详情()
        }
    }
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


</style>