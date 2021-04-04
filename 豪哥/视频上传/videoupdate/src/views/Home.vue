<template>
    <div class="content">
        <div class="w1400">
            <div class="header">
                <el-button size="small" @click="changePassword()">修改密码</el-button>
                <el-button type="warning" size="small" @click="out()">退出登录</el-button>
            </div>

            <div class="box-1">
                <!-- <el-upload class="upload-demo" drag :action="$api+'update'" accept="video/*" name="video" :on-progress="progress" :on-success="上传成功"> -->
                <el-upload drag :action="$api+'public/index.php/index/'+'update'" :headers="updateHeaders" accept="video/*" name="video" :on-progress="progress" :on-success="上传成功" :on-error="上传失败">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                        将视频拖到此处，或点击上传
                        <div>
                            <em>只能上传视频文件</em>
                        </div>
                    </div>
                </el-upload>
                <div class="jindu" v-if="上传中">
                    <el-progress type="circle" :percentage="上传进度"></el-progress>
                </div>
            </div>

            <div class="header">
                <el-button type="warning" size="small" @click="deleteAll()">删除所有</el-button>
            </div>

            <el-table :data="list" border size="mini">
                <el-table-column label="文件名" prop="name" width="200px"></el-table-column>
                <el-table-column label="播放地址">
                    <template #default="s">
                        <a :href="$api+'public/'+s.row.url" target="view_window">{{$api+'public/'+s.row.url}}</a>
                    </template>
                </el-table-column>
                <el-table-column label="时间" prop="time" width="160px"></el-table-column>
                <el-table-column label="操作" width="80px">
                    <template #default="s">
                        <el-button type="warning" size="mini" @click="删除(s.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { reactive, getCurrentInstance, onMounted, ref } from 'vue'
export default {
    name: '',
    components: {
    },
    data() {
        return {
            test: "13"
        }
    },
    setup(props) {
        // const internalInstance = getCurrentInstance()
        const { proxy } = getCurrentInstance()

        let list = reactive([])

        let 上传中 = ref(false)
        let 上传进度 = ref(0)
        let out = () => {
            proxy.$router.push('/login')
            localStorage.removeItem('videoUpdate')
        }

        // 上传请求头
        let updateHeaders = reactive({
            Authorization: 'bearer ' + localStorage.videoUpdate
        })
        //进度条
        let progress = (event, file, fileList) => {
            上传进度.value = file.percentage.toFixed(0);
            上传中.value = true
        }

        let 上传成功 = (response, file, fileList) => {
            if (response.code == 1) {
                上传进度.value = 100
                proxy.$message({ showClose: true, message: '上传成功', type: 'success' });
                getList()
            } else if (response.code == -1) {
                proxy.$messageBox({
                    title: "提示",
                    message: "登录已过期，请重新登录",
                    type: 'warning',
                    callback: () => {
                        proxy.$router.push('/login')
                        localStorage.removeItem('videoUpdate')
                    }
                })
            } else {
                proxy.$message({ showClose: true, message: '上传失败，请联系管理员', type: 'error' });
            }
            setTimeout(() => {
                上传中.value = false
            }, 500);
        }

        let 上传失败 = (err, file, fileList) => {
            proxy.$message({ showClose: true, message: '上传失败，请联系管理员', type: 'error' });
            setTimeout(() => {
                上传中.value = false
            }, 500);
        }

        let getList = () => {
            proxy.$axios.get('getVideo', '').then(res => {
                list.length = 0
                list.push(...res)
            }).catch(err => { })
        }
        let 删除 = async (index) => {
            await proxy.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            proxy.$axios.post('delete', { index: index, item: list[index] }).then(res => {
                if (res.code == 1) {
                    proxy.$message({ showClose: true, message: '删除成功', type: 'success' });
                    getList()
                } else {
                    proxy.$message({ showClose: true, message: '删除失败', type: 'error' });
                }
            }).catch(err => {
                proxy.$message({ showClose: true, message: '删除失败，请联系客服', type: 'error' });

            })
        }

        let deleteAll = async () => {
            await proxy.$confirm('确定删除所有?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            proxy.$axios.post('deleteAll', '').then(res => {
                if (res.code == 1) {
                    getList()
                    proxy.$message({ showClose: true, message: '删除成功', type: 'success' });
                } else {
                    proxy.$message({ showClose: true, message: '删除失败', type: 'error' });
                }
            }).catch(err => {
                proxy.$message({ showClose: true, message: '删除失败，请联系客服', type: 'error' });
            })

        }

        let changePassword = () => {
            proxy.$prompt('请输入密码', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /\S/,
                inputErrorMessage: '请输入密码'
            }).then(({ value }) => {
                proxy.$axios.post('changePassword',{password:value}).then(res => {
                    console.log(res)
                    if(res.code==1){
                        proxy.$message({ showClose: true, message: '修改成功', type: 'success' });
                    }else{
                        proxy.$message({ showClose: true, message: '修改失败', type: 'success' });
                    }
                }).catch(err => {
                    proxy.$message({ showClose: true, message: '修改失败，请联系客服', type: 'success' });
                })
            }).catch(() => {});
        }

        onMounted(() => {
            getList()
        })

        return {
            list,
            updateHeaders,
            progress,
            上传成功,
            上传中,
            上传进度,
            上传失败,
            getList,
            删除,
            deleteAll,
            out,
            changePassword
        }
    }
}
</script>

<style lang="scss" scoped>
.w1400 {
    max-width: 1400px;
    margin: 0px auto;
    height: 100%;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    padding: 1px 10px 0px;
    background: #fff;
}
.content {
    height: 100%;
    background: #eee;
}
// 隐藏自带进度条
/deep/ .el-upload-list {
    display: none;
}
.box-1 {
    width: 360px;
    height: 180px;
    margin: 10px auto;
    position: relative;
    .jindu {
        position: absolute;
        top: 0px;
        width: 100%;
        height: 100%;
        background: rgba($color: #000, $alpha: 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        /deep/ .el-progress__text {
            color: #fff;
        }
    }
}

.header {
    padding: 10px 0px;
    text-align: right;
}
</style>
