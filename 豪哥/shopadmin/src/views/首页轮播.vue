<template>
    <div>
        <div class="btn-1">
            <el-button type="warning" @click="tianjia()">添加轮播图</el-button>
        </div>

        <ul class="list">
            <li v-for="item in list">
                <i class="el-icon-delete-solid" @click="del(item)"></i>
                <img v-if="item.img" :src="$api_url+'/'+item.img" alt="">
                <div v-if="item.relatedId">
                    <span v-if="item.relatedType=='article'">关联文章id：{{item.relatedId}}</span>
                    <span v-else>关联商品id：{{item.relatedId}}</span>
                </div>
            </li>
        </ul>

        <el-dialog title="添加轮播图" :visible.sync="showDialog" width="400px">
            <el-form size="mini">
                <el-form-item label="图片（比例：345*150）" class="item">
                    <div class="img-1" @click="clickFile()">
                        <i v-if="!img.base64" class="el-icon-plus"></i>
                        <img v-if="img.base64" :src="img.base64" alt="" srcset="">
                    </div>
                </el-form-item>
                <el-form-item label="关联类型（可不选）" class="item">
                    <el-select v-model="obj.relatedType" placeholder="" style="width: 100%;">
                        <el-option value="article" label="文章"></el-option>
                        <el-option value="product" label="产品"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关联id（可不填）" class="item">
                    <el-input v-model="obj.relatedId" :placeholder="obj.relatedType=='article' ? '请输入文章id' : '请输入产品id'"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="showDialog = false">取 消</el-button>
                <el-button type="primary" @click="save()">确 定</el-button>
            </span>
        </el-dialog>

        <input class="fileInput" v-if="showFile" type="file" accept="image/*" ref="file1" @change="fileChange">

    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            showDialog:false,
            obj:{
                img:"",
                "relatedType": "article",  //关联类型, 文章article, 产品product
                "relatedId": '', //关联id
                "priority": 1
            },
            showFile:false,
            img:{
                base64:"",
                file:''
            },
            list:[]
        }
    },
    methods:{
        tianjia(){
            this.img = {
                base64:"",
                file:""
            }
            this.showDialog = true
        },
        fileChange(e) {
            let file = e.target.files[0]
            this.img.file = file
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e)=>{
                console.log(e)
                this.img.base64 = e.target.result
                // e.target.result
            };
        },
        async clickFile() {
            this.showFile = false
            await this.$nextTick()
            this.showFile = true
            this.$nextTick(() => {
                this.$refs.file1.click()
            })
        },
        async save(){
            if(!this.img.base64){
                this.错误('请选择图片')
                return
            }
            this.$loading(true)
            let f = new FormData()
                f.append('file', this.img.file)
            let res = await this.$axios.post('/api/upload',f)
            let img_url = res.data ? res.data[0] : ''
            let obj=Object.assign({},this.obj)
                obj.relatedId = obj.relatedId ? parseInt(obj.relatedId) : 0
                obj.img = img_url
            this.$axios.post('/api/banner',obj).then(res => {
                console.log(res)
                this.$loading(false)
                if(res.code==0){
                    this.获取轮播()
                    this.$message({ showClose: true, message: '添加成功', type: 'success' });
                }else{
                    this.$message({ showClose: true, message: '添加失败，请联系管理员', type: 'error' });
                }
                this.showDialog=false
            }).catch(err => {
                this.showDialog=false
                console.error(err);
                this.$message({ showClose: true, message: '网络异常，稍后再试', type: 'error' });
                this.$loading(false) 
            })
        },
        获取轮播(){
            this.$axios.get('/api/banner','').then(res => {
                // console.log(res)
                this.list = res.data
            }).catch(err => {
            })
        },
        del(item){
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete(`/api/banner/${item.id}`,'')
                .then(res => {
                    if(res.code==0){
                        this.获取轮播()
                        this.$message({ showClose: true, message: '删除成功', type: 'success' });
                    }else{
                        this.$message({ showClose: true, message: '删除失败，请联系管理员', type: 'error' });
                    }
                })
                .catch(err => {
                    this.$message({ showClose: true, message: '网络异常，稍后再试', type: 'error' });
                    console.error(err); 
                })
            })
        }
    },
    mounted() {
        this.获取轮播()
    },
}
</script>

<style lang="scss" scoped>
.btn-1 {
    text-align: right;
}
.list{
    display: flex;
    flex-wrap: wrap;
    li{
        width: 345px;
        height: 150px;
        position: relative;
        background: #ccc;
        border: 1px solid #ccc;
        margin: 10px ;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        i{
            font-size: 25px;
            background: rgba($color: #000000, $alpha: 0.6);
            color: red;
            position: absolute;
            top: 0px;
            right: 0px;
            cursor: pointer;
            opacity: 0.7;
            &:hover{
                opacity: 1;
            }
        }
        div{
            position: absolute;
            left: 0px;
            bottom: 0px;
            padding: 5px 10px;
            font-size: 12px;
            width: 100%;
            background: rgba($color: #000000, $alpha: 0.6);
            color: #fff;
        }
    }
}
.fileInput{
    display: none;
}
.img-1{
    border: 1px solid #ccc;
    background: #eee;
    height: calc(360px * (150 / 350) );
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    i{
        font-size: 40px;
    }
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.item{
    /deep/ .el-form-item__label{
        float: none;
    }
}
</style>