<template>
    <div>
        <div class="topHeader">
            <a-button type="primary" @click="openModal() ">添加用户</a-button>
        </div>
        <a-table :dataSource="list" :columns="columns" rowKey="id" bordered size="small" :pagination="{pageSize:query.size,current:query.page,total:total}" @change="tableChange">
            <template #caozuo="{ text }">
                <a-space>
                    <a-popconfirm
                    placement="left"
                        title="确定删除确定删除确定删除确定删除?"
                        ok-text="是的"
                        cancel-text="否"
                        @confirm="deleteU(text)"
                    >
                        <a-button size="small" danger >删除</a-button>
                    </a-popconfirm> 
                    <a-button size="small" type="primary" @click="openModal(text)">修改</a-button>
                </a-space>
            </template>
        </a-table>

        <a-modal v-model:visible="showModal" title="用户详情" @ok="handleOk" width="400px" :maskClosable="false"  okText="确定" cancelText="取消">
            <a-form :model="user" ref="form" :labelCol="{span: 4}">
                <a-form-item name="name" :rules="rules.name" label="账号" >
                    <a-input v-model:value="user.name"></a-input>
                </a-form-item>
                <a-form-item name="password" :rules="rules.password" label="密码">
                    <a-input-password v-model:value="user.password"></a-input-password>
                </a-form-item>
                <a-form-item name="roles" label="角色">
                    <a-select v-model:value="user.roles">
                        <a-select-option value="USER">普通用户</a-select-option>
                        <a-select-option value="ADMIN">管理员</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="备注">
                    <a-textarea v-model:value="user.description"></a-textarea>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>


<script >
import { userList , addUser , deleteUser, updateUser } from "@/api/api.js";
import { reactive, ref } from '@vue/reactivity';
import { getCurrentInstance } from "vue";

import { Modal } from 'ant-design-vue';
import { object } from "vue-types";

export default {
    setup(props) {

        const { proxy } = getCurrentInstance()

        let columns = [
            {
                title: '账号',
                dataIndex: 'name',
            },
            {
                title: '权限',
                dataIndex: 'roles',
            },
            {
                title: '状态',
                dataIndex: 'status',
            },
            {
                title: '备注',
                dataIndex: 'description',
            }, 
            {
                title: "创建时间",
                dataIndex: "createdAt",
            },
            {
                title: "操作",
                key: "caozuo",
                slots: { customRender: 'caozuo' },
                width:"180px",
                align:"center"
            }
        ]

        let showModal = ref(false)
        let rules = {
            name:[
                { required: true, message: '请输入用户名' }
            ],
            password:[
                { required: true, message: '请输入密码' }
            ]
        }
        let user = reactive({
            name: "", 
            password: "", 
            roles: "USER", 
            status: 0,
            description:"",
            id:0
        })


        
        let form = ref()
        let query = reactive({
            page: 1,
            size: 10
        })
        let list = reactive([])
        let total = ref(0)
        
        let handleOk = async ()=>{
            await form.value.validate()
            let server = user.id ? updateUser : addUser
            server(user).then(res=>{
                proxy.$message.success(user.id ? '修改成功' : '添加成功')
                showModal.value=false
                getList()
            })
        }

        let openModal=(u)=>{
            if(u){
                Object.assign(user,u)
                delete user.createdAt
                delete user.deletedAt
                delete user.updatedAt
            }else{
                user.name=''
                user.password=''
                user.roles = 'USER'
                user.status = 0
                user.description = ''
                user.id = 0
            }
            showModal.value=true
        }
        
        let getList=()=>{
            userList(query).then(res => {
                list.length = 0
                list.push(...res.data)
                total.value = res.total
            }).catch(err=>{
                console.log(err)
            })
        }
        getList()

        let deleteU=(u)=>{
            console.log(u.id)
            deleteUser(u.id).then(res=>{
                proxy.$message.success('添加成功')
                getList()
            })
        }

        let tableChange = (pagination, filters, sorter)=>{
            query.page = pagination.current
            getList()
        }

        return {
            query,
            form,
            columns,
            list,
            total,
            showModal,
            rules,
            user,
            handleOk,
            openModal,
            deleteU,
            tableChange
        }
    }
}
</script>