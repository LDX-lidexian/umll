import Vue from "vue"
let vm = new Vue

//成功弹框
export let successalert = (msg)=>{
    vm.$message({
        message:msg,
        type:"success"
    })
}
//失败弹框
export let erroralert = (msg)=>{
    vm.$message({
        message:msg,
        type:"warning"
    })
}