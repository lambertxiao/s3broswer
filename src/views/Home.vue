<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <SystemBar/>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Accounts/>
        </el-aside>
        <el-main>
          <FileList/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import SystemBar from '../components/SystemBar.vue';
import Accounts from '../components/Accounts.vue';
import FileList from '../components/FileList.vue';
</script>
