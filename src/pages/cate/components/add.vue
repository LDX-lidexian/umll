<template>
  <div>
    <el-dialog :visible.sync="info.isshow">
      <el-form label-width="80px">
        <!-- 上级分类 -->
        <el-form-item label="上级分类" label-width="100px" class="sjfl" :model="user">
          <el-select v-model="user.pid">
            <el-option value disabled label="--请选择--"></el-option>
            <el-option :value="0" label="顶级分类"></el-option>
            <!-- 子分类 -->
            <el-option v-for="item in list" :key="item.id" :value="item.id" :label="item.catename"></el-option>
          </el-select>
        </el-form-item>

        <!-- 活动名称 -->
        <el-form-item label="分类名称">
          <el-input v-model="user.catename"></el-input>
        </el-form-item>
        <!-- 上传文件 -->
        <el-form-item label="图片" label-width="100px">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 状态按钮 -->
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        {{user}}
        <!-- 修改按钮 -->
        <el-button type="primary" @click="add" class="xg" v-if="info.isadd">添 加</el-button>
        <el-button type="primary" class="xg" @click="update()" v-else>修 改</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { reqcateAdd, reqcateDetail, reqcateUpdate } from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
import path from "path";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info", "init", "list"],
  data() {
    return {
      //图片地址
      imgUrl: "",
      user: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
    };
  },

  methods: {
    changeImg(e) {
      let file = e.raw;
      //文件大小验证 1M=1024KB 1KB=1024B
      if (file.size > 2 * 1024 * 1024) {
        erroralert("文件大小不能超过2M");
        return;
      }
      //后缀名
      let extname = path.extname(file.name);
      let arr = [".png", ".gif", ".jpg", ".jpeg"];
      if (!arr.some((item) => item === extname)) {
        erroralert("请上传图片");
        return;
      }
      //文件生成一个url地址
      this.imgUrl = URL.createObjectURL(file);
      //赋值给user.img
      this.user.img = file;
    },
    //弹框消失
    cancel() {
      this.info.isshow = false;
    },
    //清空弹框数据
    empty() {
      (this.imgUrl = ""),
        (this.user = {
          pid: "",
          catename: "",
          img: null,
          status: 1,
        });
    },
    add() {
      reqcateAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          //弹框消失
          this.cancel();
          //清空弹窗数据
          this.empty();
          //刷新列表
          this.init();
        }
      });
    },
    //编辑获取一条数据
    getOne(id) {
      reqcateDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.id = id;
          this.imgUrl = this.$pre + this.user.img;
        }
      });
    },
    update() {
      reqcateUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          //弹框消失
          this.cancel();
          //清空弹窗数据
          this.empty();
          //刷新列表
          this.init();
        }
      });
    },
  },
};
</script>

<style scoped lang="stylus">
.zt {
  margin-left: -30px;
}

.xg {
  margin-left: 70px;
}

.sjfl {
  margin-left: -20px;
}

// 原生js的样式
.my-upload {
  width: 100px;
  height: 100px;
  border: 1px dashed #999;
  position: relative;
}

.my-upload .add {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  color: #666;
}

.my-upload .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}

.my-upload .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}

/* element-ui的样式 */
.form >>>.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed black;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
  position: absolute;
  top: 1px;
  left: 1px;
}
</style>