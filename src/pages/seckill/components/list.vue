<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="title" label="活动名称" width="180"></el-table-column>
      <el-table-column prop="status" label="状态" width="150">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {reqseckillDelete} from "../../../utils/http"
import { erroralert, successalert } from "../../../utils/alert";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "seckill/list",
    }),
  },
  methods: {
    ...mapActions({
      reqSeckillList: "seckill/reqList",
    }),
    //删除
    del(id) {
      reqseckillDelete({ id: id }).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.reqSeckillList();
        }
      });
    },
    //编辑
    edit(id) {
      this.$emit("edit", id);
    }
  },
  mounted() {
    this.reqSeckillList();
  },
};
</script>

<style>
</style>