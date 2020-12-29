<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- 表格列表 -->
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>
    <!-- 弹框 -->
    <v-add :info="info" @init="init" :list="list" ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { reqMenulist } from "../../utils/http";
// import Public from "../../public";

export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd: true,
      },
      list: [],
    };
  },
  methods: {
    willAdd() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    init() {
      reqMenulist().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    edit(id) {
      //弹框出现
      this.info.isshow = true;
      this.info.isadd = false;
      //让add发请求
      this.$refs.add.getOne(id);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>