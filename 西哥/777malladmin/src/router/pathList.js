// 动态设置权限
const verification = [
    {
        path: '/Users',
        name:"Users",
        component: () => import('@/views/会员/用户列表.vue'),
        meta: { title: '用户列表'}
    },
    {
        path: '/Orders',
        name:"Orders",
        component: () => import('@/views/彩票/订单.vue'),
        meta: { title: '订单信息'}
    },
    {
        path: '/Details',
        name:"Details",
        component: () => import('@/views/资金管理/资金明细.vue'),
        meta: { title: '资金明细'}
    },
    
    {
        path: '/AgentDetails',
        name:"AgentDetails",
        component: () => import('@/views/代理商管理/代理明细.vue'),
        meta: { title: '代理明细'}
    },
    {
        path: '/AgentWithdrawRecords',
        name:"AgentWithdrawRecords",
        component: () => import('@/views/代理商管理/提现明细.vue'),
        meta: { title: '代理提现明细'}
    },
    {
        path: '/Agentline',
        name:"Agentline",
        component: () => import('@/views/代理商管理/代理线管理.vue'),
        meta: { title: '代理线管理'}
    },
    
    {
        path:"/Withdraw",
        name:"Withdraw",
        component: () => import('@/views/提现审核.vue'),
        meta: { title: '提现审核'}
    },
    {
        path:"/SettleLog",
        name:"SettleLog",
        component: () => import('@/views/结算日志.vue'),
        meta: { title: '结算日志'}
    },
    {
        path:"/ErrorLog",
        name:"ErrorLog",
        component: () => import('@/views/错误日志.vue'),
        meta: { title: '错误日志'}
    },
    {
        path: '/LotteryManagement',
        name:"LotteryManagement",
        component: () => import('@/views/彩票/期数管理.vue'),
        meta: { title: '期数管理'}
    },
]
// 不需要动态 用于加入路由
const NoVerification = [
    {
        path: '/LotteryManagement',
        name:"LotteryManagement",
        component: () => import('@/views/彩票/期数管理.vue'),
        meta: { title: '期数管理'}
    },


    {
        path: '/funds/KeepRecords',
        name:"",
        component: () => import('@/views/资金管理/存款历史.vue'),
        meta: { title: '存款历史'}
    },
    {
        path: '/funds/DepositReview',
        name:"",
        component: () => import('@/views/资金管理/存款审核.vue'),
        meta: { title: '存款审核'}
    },
    {
        path: '/WithdrawRecords',
        name:"",
        component: () => import('@/views/资金管理/提现记录.vue'),
        meta: { title: '提现记录'}
    },
    // {
    //     path: '/tksh',
    //     name:"",
    //     component: () => import('@/views/资金管理/取款审核.vue'),
    //     meta: { title: '取款审核'}
    // },

    {
        path: '/user/Online',
        name:"",
        component: () => import('@/views/会员/在线会员.vue'),
        meta: { title: '在线会员'}
    },
    {
        path: '/user/DividedInto',
        name:"",
        component: () => import('@/views/会员/会员分层.vue'),
        meta: { title: '会员分层'}
    },


    {
        path: '/system/administrator',
        name:"",
        component: () => import('@/views/系统设置/管理员账号.vue'),
        meta: { title: '管理员账号'}
    },
    {
        path: '/system/Notice',
        name:"",
        component: () => import('@/views/系统设置/公告设置.vue'),
        meta: { title: '公告设置'}
    },

]
// 不需要动态 用于显示导航
const navlist = [
    NoVerification[0],
    {
        meta:{title:'资金管理'},
        children:[...NoVerification.slice(1,3)]
    },
    {
        meta:{title:'会员管理'},
        children:[...NoVerification.slice(3,5)]
    },
    
    {
        meta:{title:'系统设置'},
        children:[...NoVerification.slice(5)]
    }
]


export {
    verification,
    NoVerification,
    navlist
} 