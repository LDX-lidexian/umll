<template>
  <div>
    <el-form-item label="图片" label-width="100px">
      <el-upload list-type="picture-card" action="#" :show-file-list="false" :on-change="changeImg">
        <img v-if="imgUrl" :src="imgUrl" class="avatar" />
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>