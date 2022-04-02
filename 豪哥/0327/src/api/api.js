import axios from './axios.js'

const login=(user)=>axios.post('/api/auth/login',user)

/**
 * 
 * @param {参数	page, size} query 
 * @returns 用户列表
 */
const userList = (query)=>axios.get('/api/user',{params:query})
/* 
    添加
    {"name": "", "password": "", "roles": "ADMIN", "status": 0}
*/

const addUser = (query)=>axios.post('/api/user',query)

// 删除用户
const deleteUser = (id)=>axios.delete(`/api/user/${id}`)

// 更新用户
const updateUser=(user)=>axios.put(`/api/user/${user.id}`,user)

/* 
    参数	key			查找关键字
			startDate	起始时间
			endDate		截止时间
			page, size
*/
const contentList = (query)=>axios.get('/api/content',{params:query})

/* 
    content=内容
    from提交
*/
const addContent = (from)=>axios.post('/api/content',from)

//删除
const deleteContent = (id) =>axios.delete(`/api/content/${id}`)

// 修改密码
const changePassword = (obj)=>axios.post('/api/auth/password',obj)

export {
    login,
    userList,
    addUser,
    deleteUser,
    updateUser,
    contentList,
    addContent,
    deleteContent,
    changePassword
}