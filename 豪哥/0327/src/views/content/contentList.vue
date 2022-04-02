<template>
    <div class="topHeader">
        <a-button type="primary" @click="openModal() ">录入内容</a-button>

        <a-form layout="inline">
            <a-form-item label="关键字">
                <a-input placeholder="关键字" v-model:value="query.key"></a-input>
            </a-form-item>
            <a-form-item label="时间">
                <a-range-picker 
                    v-model:value="time" :show-time="{defaultValue: [moment('00:00:00','HH:mm:ss'),moment('00:00:00','HH:mm:ss')] }"
                    format="YYYY-MM-DD HH:mm:ss" valueFormat="YYYY-MM-DD HH:mm:ss" :placeholder="['开始时间', '结束时间']"
                    >
                </a-range-picker>
            </a-form-item>
            <a-form-item>
                <a-button type="" @click="查询()">查询</a-button>
            </a-form-item>
        </a-form>
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
            </a-space>
        </template>
    </a-table>

    <a-modal v-model:visible="showModal" title="内容详情" @ok="handleOk" width="800px" :maskClosable="false"  okText="确定" cancelText="取消">
        <a-alert message="注意：一行为一条数据，换行表示多条数据" type="error" style="margin-bottom: 5px;"/>
        <a-form :model="content" ref="form" :labelCol="{span: 4}">
            <a-form-item name="content" :rules="rules.content">
                <a-textarea :rows="5" placeholder="请输入用内容" v-model:value="content.content"></a-textarea>
            </a-form-item>
        </a-form>
    </a-modal>
</template>


<script >
import { contentList , addContent , deleteContent } from "@/api/api.js";
import { reactive, ref } from '@vue/reactivity';
import { getCurrentInstance } from "vue";
import moment from "moment";
export default {
    setup(props) {

        const { proxy } = getCurrentInstance()

        let columns = [
            {
                title: '内容',
                dataIndex: 'content',
            },
            {
                title: "创建时间",
                dataIndex: "createdAt",
                width:"180px",
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
            content:[
                { required: true, message: '请输入用内容' }
            ]
        }
        let content = reactive({
            content:""
        })

        let form = ref(null)
        let time = ref()
        let query = reactive({
            key:"",
            get startDate(){
                return time.value && time.value.length>0 ? time.value[0] : ''
            },
            get endDate(){
                return time.value && time.value.length>0 ? time.value[1] : ''
            },
            page: 1,
            size: 20
        })
        
        let list = reactive([])
        let total = ref(0)
        
        let handleOk = async ()=>{
            await form.value.validate()
            addContent(content).then(res=>{
                proxy.$message.success('添加成功')
                showModal.value=false
                getList()
            })
        }

        let openModal=(u)=>{
            if(u){
                Object.assign(content,u)
                delete user.createdAt
                delete user.deletedAt
                delete user.updatedAt
            }else{
                content.content=''
            }
            showModal.value=true
        }
        
        let getList=()=>{
            contentList(query).then(res => {
                list.length = 0
                list.push(...res.data)
                total.value = res.total
            }).catch(err=>{
                console.log(err)
            })
        }
        getList()

        let 查询=()=>{
            query.page = 1
            getList()
        }

        let deleteU=(u)=>{
            deleteContent(u.id).then(res=>{
                proxy.$message.success('添加成功')
                getList()
            })
        }

        let tableChange = (pagination, filters, sorter)=>{
            query.page = pagination.current
            getList()
        }
        console.log(moment('00:00:00','HH:mm:ss').format("HH:mm:ss"))

        return {
            query,
            time,
            form,
            columns,
            list,
            total,
            showModal,
            rules,
            content,
            handleOk,
            openModal,
            deleteU,
            tableChange,
            查询,
            moment
        }
    }
}
</script>