<template>
  <div>
    <el-table
      ref="tree"
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="角色编号" width="180"></el-table-column>
      <el-table-column prop="rolename" label="角色名称"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)" >编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {successalert} from "../../../utils/alert"
import {reqRoleDel} from "../../../utils/http"
export default {
  props: ["list","info"],
  data() {
    return {};
  },

  methods: {
    del(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqRoleDel({id:id}).then(res=>{
            if(res.data.code==200){
              //成功弹框
              successalert(res.data.msg)
              //通知父组件 刷新列表
              this.$emit("init")
            }
          })
        })
        .catch(() => {});
    },
    edit(id){
      this.$emit("edit",id)
      this.info.isadd = false
    }
  },
};
</script>

<style>
</style>