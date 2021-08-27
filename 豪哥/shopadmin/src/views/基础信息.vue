<template>
    <div>
        <div class="title1">
            基础信息设置
        </div>

        <el-form class="form" :model="基础信息" @submit.native.prevent size="small">
            <el-form-item label="微信联系方式">
                <el-input v-model="基础信息.wxAccount" placeholder="如：15111111111（微信）"></el-input>
            </el-form-item>
            <div class="title2">
                关于我们介绍
            </div>
            <div class="编辑器">
                <quill-editor class="editor" v-model="基础信息.introduction" ref="myQuillEditor" :options="editorOption">
                </quill-editor>
            </div>
            <el-button native-type="submit" @click="onSubmit()" class="btn_1" type="warning">保存</el-button>

        </el-form>

        <input class="fileInput" v-if="showFile" type="file" accept="image/*" ref="file1" @change="fileChange">

    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
export default {
    name:"",
    components:{
        quillEditor
    },
    data() {
        return {
            showFile:false,
            基础信息:{
                wxAccount:'',
                introduction:""
            },
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

        }
    },
    methods:{
        async changeFile() {
            this.showFile = false
            await this.$nextTick()
            this.showFile = true
            this.$nextTick(() => {
                this.$refs.file1.click()
            })
        },
        fileChange(e){
            let file = e.target.files[0]
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
        onSubmit(){
            delete this.基础信息.createdAt
            delete this.基础信息.deletedAt
            delete this.基础信息.updatedAt
            delete this.基础信息.id
            this.$axios.post('/api/config',this.基础信息)
            .then(res => {
                console.log(res)
                if(res.code===0){
                    this.$message({ showClose: true, message: '保存成功', type: 'success'});
                    this.getConfig()
                }else{
                    this.$message({ showClose: true, message: res.message, type: 'error'});
                }
            })
            .catch(err => {
                this.$message({ showClose: true, message: '网络错误，稍后再试', type: 'error'});
            })
        },
        getConfig(){
            this.$axios.get('/api/config')
            .then(res => {
                console.log(res)
                if(res.code===0 && res.data){
                    this.基础信息 = res.data
                }
            })
            .catch(err => {
            })
        }
    },
    mounted() {
        this.getConfig()
    },
}
</script>

<style lang="scss" scoped>
.title1 {
    border-bottom: 1px solid #eee;
    padding: 0px 0px 10px;
}

.fileInput {
    display: none;
}

.form{
    padding: 10px;
    margin: 20px auto 0px;
    width: 400px;
    border: 1px solid #eee;
}


/deep/ .ql-editor{
    min-height: 200px;
}

.title2{
    color:#606266;
    line-height: 32px;
}
.btn_1 {
    width: 100%;
    margin: 20px 0px 0px;
}


</style>