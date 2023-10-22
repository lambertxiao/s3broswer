<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-sub-menu index="1">
      <template #title>账号管理</template>
      <el-menu-item index="2-1">登陆账号</el-menu-item>
      <el-menu-item index="2-2">修改信息</el-menu-item>
      <el-menu-item index="2-3">退出账号</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="2" @click="dialogFormVisible = true">设置</el-menu-item>
  </el-menu>
  <el-dialog v-model="dialogFormVisible" title="设置">
    <el-form :model="form">
      <el-form-item label="分片大小" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="并发数" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
</script>

<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>