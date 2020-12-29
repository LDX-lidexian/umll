<template>
  <div>
    <el-dialog :visible.sync="info.isshow" @closed="cancel">
      <el-form label-width="80px" :visible.sync="info.isshow">
        <!-- 活动名称 -->
        <el-form-item label="活动名称">
          <el-input v-model="user.rolename"></el-input>
        </el-form-item>
        <!-- 角色权限 -->
        <el-form-item label="角色权限">
          <el-tree
            ref="tree"
            :data="data"
            show-checkbox
            node-key="id"
            default-checked-all
            :props="defaultProps"
          ></el-tree>
        </el-form-item>
        <!-- 状态按钮 -->
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        {{user}}
        <el-button @click="getCheckedKeys">通过 key 获取</el-button>
        <!-- 修改按钮 -->
        <el-button type="primary" class="xg" @click="add(user)" v-if="info.isadd">添 加</el-button>
        <el-button type="primary" class="xg" v-else @click="update">修 改</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqRoleAdd,
  reqRoleDetal,
  reqRoleUpdate,
  reqMenulist,
} from "../../../utils/http";
import { successalert } from "../../../utils/alert";

export default {
  props: ["info", "list"],
  data() {
    return {
      data: [
        // {
        //   id: 1,
        //   label: "",
        //   children: [
        //     {
        //       id: 2,
        //       label: "",
        //     },
        //   ],
        // },
      ],
      user: {
        rolename: "",
        menus: "",
        status: 1,
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  methods: {
    empty() {
      this.user = {
        // id: 1,
        rolename: "",
        menus: "",
        status: 1,
      };
    },
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    add() {
      this.getCheckedKeys();
      reqRoleAdd(this.user).then((res) => {
        //是点击添加按钮显示添加
        this.info.isadd = true;
        if (res.data.code == 200) {
          successalert(res.data.msg);
        }
        //关闭弹框
        this.cancel();
        //清空
        this.empty();
        //刷新列表
        this.$emit("init");
      });
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
      let arr = this.$refs.tree.getCheckedKeys();
      this.user.menus = JSON.stringify(arr);
    },
    getOne(id) {
      reqRoleDetal({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          //补个id
          this.user.id = id;
          console.log(this.user.menus);
          this.user.menus = JSON.parse(this.user.menus);
          console.log(this.user.menus);
          this.resetChecked();
        }
      });
    },
    update() {
      // console.log(this.user, "222222222222");
      this.getCheckedKeys()
      // console.log(this.user, "3333333333");
      reqRoleUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },
    resetChecked() {
    this.$refs.tree.setCheckedKeys(this.user.menus);
  },
  },
  
  mounted() {
    reqMenulist().then((res) => {
      // console.log(res,"圣诞快乐啊啊啊啊啊啊啊啊啊啊啊");

      this.data = res.data.list;
      // console.log(this.data);
    });
  },
};
</script>

<style>
.zt {
  margin-left: -30px;
}
.xg {
  margin-left: 70px;
}
</style>