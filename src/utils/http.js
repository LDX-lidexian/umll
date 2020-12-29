import axios from "axios"
import qs from "qs"
import Vue from "vue"
import { erroralert } from "./alert"
//开发环境使用 8080
let baseUrl = "/api"
Vue.prototype.$pre = "http://localhost:3000"

//生产环境使用 打包
// let baseUrl=""
// Vue.prototype.$pre=""


//响应拦截
axios.interceptors.response.use(res => {
    console.group("本次请求地址是：" + res.config.url)
    console.log(res);
    console.groupEnd()
    //统一失败弹框
    if (res.data.code !== 200) {
        erroralert(res.data.msg)
    }
    return res
})

//post 带有文件类型的传参
function dataToFormData(user) {
    let data = new FormData()
    for (let i in user) {
        data.append(i, user[i])
    }
    return data
}
// 菜单管理+++++++++++++++++++++++++++++++++++++++++++++++++++

//添加
export const reqMenuAdd = (user) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(user)
    })
}
//列表
export let reqMenulist = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        params: {
            istree: true
        }
    })
}
//删除
export let reqMenuDel = (obj) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify(obj)
    })
}
//编辑修改一条
export let reqMenuDetal = (obj) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        params: obj
    })
}
//修改
export let reqMenuUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(user)
    })
}
//角色添加
export let reqRoleAdd = (user) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(user)
    })
}
//角色列表
export let reqRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get"
    })
}
//角色删除
export let reqRoleDel = (obj) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify(obj)
    })
}
//角色获取一条
export let reqRoleDetal = (obj) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: obj
    })
}
//角色修改
export let reqRoleUpdate = (obj) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(obj)
    })
}
//添加
export let reqManageAdd = (user) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(user)
    })
}

//列表 obj={page:1,size:50}
export let reqManagelist = (obj) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: obj
    })
}

//详情 user={uid:123342}
export let reqManageDetail = (user) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: user
    })
}

//修改 user={uid:"必填"}
export let reqManageUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(user)
    })
}

//删除 user={uid:13432}
export let reqManageDel = (user) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify(user)
    })
}
//总数
export let reqManageCount = () => {
    return axios({
        url: baseUrl + "/api/usercount"
    })
}
////////////////商品分类//////////////////
//商品添加
export let reqcateAdd = (user) => {
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: dataToFormData(user)
    })
}

//商品列表
export let reqcateList = (p) => {
    return axios({
        url: baseUrl + "/api/catelist",
        params: p
    })
}
//获取一条商品详情
export let reqcateDetail = (user) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: user
    })
}
//修改
export let reqcateUpdate = (user)=>{
    return axios({
        url:baseUrl +"/api/cateedit",
        method:"post",
        data:dataToFormData(user)
    })
}
//删除
export let reqcateDel =(user)=>{
    return axios({
        url:baseUrl+"/api/catedelete",
        method:"post",
        data:qs.stringify(user)
    })
}
//////////////////////轮播图../////////////////////////////////////////
//添加
export let reqbannerAdd = (user)=>{
    return axios({
        url:baseUrl + "/api/banneradd",
        method:"post",
        data:dataToFormData(user)
    })
}
//列表
export let reqbannerList = ()=>{
    return axios({
        url:baseUrl +"/api/bannerlist",
        method:"get"
    })
}
//获取一条
export let reqbannerDetail=(obj)=>{
    return axios({
        url:baseUrl +"/api/bannerinfo",
        method:"get",
        params:obj
    })
}
//修改
export let reqbannerUpdate=(user)=>{
    return axios({
        url:baseUrl+"/api/banneredit",
        method:"post",
        data:dataToFormData(user)
    })
}
//删除
export let reqbannerDel=(user)=>{
    return axios({
        url:baseUrl+"/api/bannerdelete",
        method:"post",
        data:qs.stringify(user)
    })
}
//////////////会员////////////////////
//列表
export let reqmemberList =()=>{
    return axios({
        url:baseUrl+"/api/memberlist",
        method:"get"
    })
}
//获取一条 {uid:uid}
export let reqmemberDetail=(obj)=>{
    return axios({
        url:baseUrl +"/api/memberinfo",
        method:"get",
        params:obj
    })
}
//修改
export let reqmemberUpdate=(user)=>{
    return axios({
        url:baseUrl + "/api/memberedit",
        method:"post",
        data:qs.stringify(user)
    })
}
/************商品规格管理 start**************************/

//添加 user={}
export let reqspecsAdd = (user) => {

    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(user)
    })
}

//列表 p={page:1,size:500}
export let reqspecslist = (p) => {
    return axios({
        url: baseUrl + "/api/specslist",
        params:p
    })
}

//详情 user={id:1}
export let reqspecsDetail = (user) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: user
    })
}

//修改 user={id:"必填"}
export let reqspecsUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(user)
    })
}

//删除 user={id:1}
export let reqspecsDel = (user) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify(user)
    })
}

//总数
export let reqspecsCount=()=>{
    return axios({
        url:baseUrl+"/api/specscount"
    })
}

/************商品规格管理 end**************************/