
const a =()=>import('@/views/register.vue')

export default [
    {path: '/', redirect: 'login'},
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login.vue')
    },
    {
        path: '/register',
        name: 'register的name',
        component: a
    },
    
    {
        path: '/complaintAdvice',
        name: 'complaintAdvice',
        component: () => import('@/views/complaintAdvice.vue')
    }
]