<template>
    <div>
        <div class="title1">
            <span>商品分类</span>
            <el-button type size="mini" @click="添加()">添加</el-button>
        </div>

        <el-table :data="list" border>
            <el-table-column prop="id" width="50px" label="id"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column label="图标">
                <template slot-scope="s">
                    <img class="图标" v-if="s.row.img" :src="$api_url+'/'+s.row.img" alt="" srcset="">
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150px">
                <template slot-scope="s">
                    <el-button size="mini" @click="修改(s.row)">修改</el-button>
                    <el-button type="danger" @click="删除(s.row)" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- <el-pagination :total="total" :current-page="" :page-size="" @current-change="" layout=""></el-pagination> -->
        <el-dialog class="分类dialog" :close-on-click-modal="false" :title="分类.id ? '分类详情' : '添加分类'" :visible.sync="显示详情" width="300px">
            <div>
                <div class="title">名称</div>
                <el-input @keydown.enter.native="确定()" v-model="分类.name" placeholder="请输入分类名称"></el-input>
                <div class="title">图标</div>
                <div class="img" @click="clickFile()">
                    <i v-if="!分类.img && !base64" class="el-icon-plus"></i>
                    <img v-if="分类.img && !base64" :src="$api_url+'/'+分类.img" alt="" srcset="">
                    <img v-if="base64" :src="base64" alt="" srcset="">
                    
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="确定()">确 定</el-button>
            </span>
        </el-dialog>
        <input class="fileInput" v-if="showFile"  type="file" accept="image/*" ref="file1" @change="fileChange">

    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            list: [],
            total: 0,
            query: {
                page: 1,
                size: 100
            },
            type: 0, // 0 添加 1 修改  
            显示详情: false,
            分类: {
                id: "",
                name: "",
                img:""
            },
            showFile: false,
            base64:""
        }
    },
    methods: {
        async clickFile() {
            this.showFile = false
            await this.$nextTick()
            this.showFile = true
            this.$nextTick(() => {
                this.$refs.file1.click()
            })
        },
        fileChange(e) {
            let file = e.target.files[0]
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e)=>{
                this.base64 = e.target.result
            };
            // 富文本上传图片
           
        },
        上传图片(){
            return new Promise((resolve, reject) => {
                if(!this.base64){
                    resolve()
                }
                let file = this.$refs.file1.files[0]
                this.$loading(1)
                let f = new FormData()
                f.append('file', file)
                this.$axios({
                    method: 'post',
                    url: this.$api_url + '/api/upload',
                    data: f
                }).then(x => {
                    console.log(x)
                    this.$loading(0)
                    if (x.data && x.data.length > 0) {
                        this.分类.img = x.data[0]
                        resolve()
                    } else {
                        this.错误('图片上传失败');
                        reject()
                    }
                }).catch(err => {
                    this.错误('图片上传失败');
                    this.$loading(0)
                    reject()
                })
            });
        },
        获取分类() {
            this.$axios.get('/api/category', { params: this.query }).then(res => {
                this.list = res.data
            }).catch(err => {
            })
        },
        添加() {
            this.分类 = {
                id: "",
                name: "",
                img:''
            }
            this.base64 = ''
            this.显示详情 = true
        },
        修改(item) {
            this.分类 = {
                id: item.id,
                name: item.name,
                img:item.img
            }
            this.base64 = ''
            this.显示详情 = true
        },
        async 确定() {
            await this.上传图片()
            if (!this.分类.name) {
                this.错误('请输入分类名称');
                return
            }
            if (!this.分类.id) {
                this.$axios.post('/api/category', { name: this.分类.name,img:this.分类.img }).then(res => {
                    if (res.code === 0) {
                        this.正确('添加成功');
                        this.显示详情 = false
                        this.获取分类()
                    } else {
                        this.错误(res.message);
                    }
                }).catch(err => {
                    this.错误('添加失败，请联系管理员');
                })
            } else {
                this.$axios.put(`/api/category/${this.分类.id}`, { name: this.分类.name,img:this.分类.img }).then(res => {
                    if (res.code === 0) {
                        this.正确('修改成功');
                        this.显示详情 = false
                        this.获取分类()
                    } else {
                        this.错误(res.message);
                    }
                }).catch(err => {
                    this.错误('修改失败，请联系管理员');
                })
            }
        },
        删除(item) {
            this.$confirm('确定删除？?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete(`/api/category/${item.id}`)
                .then(res => {
                    if(res.code===0){
                        this.正确('删除成功')
                        this.获取分类()
                    }else{
                        this.错误(res.message)
                    }
                })
                .catch(err => {
                    this.错误('删除失败，请联系管理员')
                })
            })
        }
    },
    mounted() {
        this.获取分类()
    },
}
</script>

<style lang="scss" scoped>
.title1 {
    border-bottom: 1px solid #eee;
    padding: 0px 0px 10px;
    display: flex;
    justify-content: space-between;
}
.分类dialog {
    /deep/ .el-dialog__header {
        padding: 10px;
    }
    /deep/ .el-dialog__body {
        padding: 10px;
    }
    /deep/ .el-dialog__footer {
        padding: 10px;
    }
    .title{
        padding: 5px 0px;
    }
    .el-button{
        width: 100%;
    }
    .img{
        width: 130px;
        height: 130px;
        border: 1px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        i{
            font-size: 40px;
        }
    }
}
.图标{
    width: 50px;
    height: 50px;
    object-fit: cover;
    border: 1px solid #ccc;
}

.fileInput {
    display: none;
}

</style>