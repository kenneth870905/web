import nav from '../components/nav.vue'
const list=[
    {
        path:"/chat/messageList",
        components:{
            default:()=>import('@/views/聊天/会话列表.vue'),
            nav:nav,
        },
        meta:{
            需要登录:true,
            不能返回:true
        }
    },
    {
        path:'/chat/contactsList',
        components:{
            default:()=>import('@/views/聊天/通讯录.vue'),
            nav:nav
        },
        meta:{
            需要登录:true,
            不能返回:true
        }
    },
    {
        path:'/chat/addFriends',
        components:{
            default:()=>import('@/views/聊天/添加好友.vue'),
        }
    },
    {
        path:'/chat/newFriend',
        components:{
            default:()=>import('@/views/聊天/新朋友.vue'),
        }
    },
]
export default list