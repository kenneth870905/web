
import { api_GetPersonInfo } from "@/api/个人资料.js";


export default {
    namespaced: true,
    state:{
        Person:{},      //个人设置
    },
    getters:{},
    mutations:{},
    actions:{
        getPersonInfo({state}){
            return new Promise((resolve, reject) => {
                api_GetPersonInfo().then(x => {
                    state.Person = x.data;
                    resolve()
                }).catch(err => {
                    reject()
                 })
            });
        }
    },
    modules:{},
}