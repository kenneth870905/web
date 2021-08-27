
const import_1 =(path)=>{
    return new Promise((resolve, reject) => {
        document.querySelector('#_Loading_').style.display="flex";
        path = path.substring(2)
        resolve(import(`@/${path}`));
        setTimeout(() => {
            document.querySelector('#_Loading_').style.display="none";            
        }, 300);
    });
} 
export default [
    {
        path:"/hbGame/sendNN",
        component:()=>import_1('@/views/红包游戏/发布红包/牛牛红包.vue'),
        meta:{
            需要登录:true,
            不能返回:true
        }
    },{
        path:"/hbGame/lqxq1",
        component:()=>import_1('@/views/红包游戏/领取详情/详情1.vue'),
        meta:{
            需要登录:true,
            不能返回:true
        }
    },
];
