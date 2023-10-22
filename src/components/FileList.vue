<template>
  <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column label="名称" property="key" width="120"/>
    <el-table-column property="size" label="类型/大小" width="120"/>
    <el-table-column property="storageClass" label="存储类型" />
    <el-table-column property="mtime" label="更新时间"  />
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          <el-icon><CopyDocument /></el-icon>
        </el-button>
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          <el-icon><Download /></el-icon>
        </el-button>
        <el-dropdown style="margin-left: 10px;">
          <el-button size="small">
            <el-icon><MoreFilled /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>删除</el-dropdown-item>
              <el-dropdown-item>重命名</el-dropdown-item>
              <el-dropdown-item>修改存储类型</el-dropdown-item>
              <el-dropdown-item>解冻</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElTable } from 'element-plus'
import {
  CopyDocument,
  Download,
  MoreFilled,
} from '@element-plus/icons-vue'


interface ObjectInfo {
  key: string
  size: number
  storageClass: string
  mtime: string
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<ObjectInfo[]>([])
const toggleSelection = (rows?: ObjectInfo[]) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value!.toggleRowSelection(row, false)
    })
  } else {
    multipleTableRef.value!.clearSelection()
  }
}
const handleSelectionChange = (val: ObjectInfo[]) => {
  multipleSelection.value = val
}

const tableData: ObjectInfo[] = [
  {
    key: 'test.data',
    size: 1024, 
    storageClass: "标准存储",
    mtime: "2023-10-01",
  },
]
</script>
