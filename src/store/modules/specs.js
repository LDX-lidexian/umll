import {reqspecslist} from "../../utils/http"
let state = {
    list:[]
}
let mutations = {
    changeList(state,arr){
        state.list=arr
    }
}
let getters = {
    list(state){
        return state.list
    }
}
let actions = {
    reqList(context){
        reqspecslist({page:1,size:40}).then(res=>{
            if(res.data.code==200){
                let list=res.data.list
                list.forEach(item=>{
                    item.attrs=JSON.parse(item.attrs)
                })
                context.commit("changeList",list)
            }
        })
    }
}
export default{
    state,mutations,getters,actions,
    namespaced: true
}