export default {
    namespaced: true,  
    plugins:[
        createPersistedState({
            reducer(val){
                return {
                    userInfo:val.userInfo,
                    首次登陆:val.首次登陆
                }
            },
            // 使用 sessionStorage
            storage: window.sessionStorage,
            // 使用 cookie
            // storage: {
            //     getItem: key => Cookies.get(key),
            //     setItem: (key, value) => Cookies.set(key, value, { expires: 7 }),
            //     removeItem: key => Cookies.remove(key)
            // }
        })
    ],
    state:{
        定时器:"13",
    },
    getters:{

    },
    mutations:{

    },
    actions:{

    }
};