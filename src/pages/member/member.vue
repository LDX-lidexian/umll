<template>
  <div>
    <v-add :info="info" ref="add" @init="init"></v-add>
    <v-list :list="list" @edit="edit($event)"></v-list>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { reqmemberList } from "../../utils/http";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      list: [],
      info:{
        isshow:false,
      }
    };
  },
  methods: {
    init() {
      reqmemberList().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    edit(uid){
      this.info.isshow=true,
      this.$refs.add.getOne(uid)
    }
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>