<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 白色内容区域 -->
    <div class="page_content">
      <!-- 新建角色 -->
      <el-button type="primary" @click="addRoles">新建角色</el-button>
      <!-- 表格 -->
      <el-table :data="rolesList" style="width: 100%">
        <el-table-column prop="roleName" label="角色名称"/>
        <el-table-column prop="roleDesc" label="角色描述"/>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" @click="editRow(scope.row)">编辑</el-button>
            <el-button type="danger" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- dialog弹出框-新增编辑角色 -->
    <el-dialog v-model="dialogFormVisible" @close="closeForm" :title="editRowData.id ? '编辑角色' : '新增角色'">
        <!-- 
          表单
          | 参数名 | 参数说明 | 备注                        |
          | ------ | -------- | --------------------------- |
          | roleName | 角色名称 | 不能为空 |
          | roleDesc | 角色描述 | 可以为空 |
         -->
        <el-form 
          ref="rolesForm"
          :model="formData"
          :rules="rules"
        >
          <el-form-item label="角色名称" prop="roleName" label-width="100px">
            <el-input v-model="formData.roleName" placeholder="请输入角色名称" />
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc" label-width="100px">
            <el-input v-model="formData.roleDesc" placeholder="请输入角色描述" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="flex">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="submitForm(rolesForm)">确定</el-button>
          </div>
        </template>
      </el-dialog>
  </div>
</template>

<script type="text/javascript">
import { reactive, toRefs, ref } from '@vue/reactivity'
import { getRolesApi, rolesAddApi, rolesChangeInfoApi, rolesDeleteApi } from '../../util/request.js'
export default {
  name: "roles",
  setup() {
    // 数据
    const data = reactive({
      rolesList: [],
      dialogFormVisible: false,
      formData: {
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
            {
              required: true,
              message: '此项为必填项',
              trigger: 'blur',
            },
        ]
      },
      editRowData: {}
    })
    // 方法
    // 查询
    const getList = () => {
      getRolesApi().then(res => {
        if(res.data) {
          data.rolesList = res.data
        }
      })
    }
    // 清空表单
    const closeForm = () => {
      data.formData = {
        roleName: '',
        roleDesc: ''
      }
    }
    // 新增角色
    const addRoles = () => {
      data.dialogFormVisible = true
    } 
    // 新增提交表单
    const submitForm = (formEL) => {
        // validate
        formEL.validate(res => {
          if(!res) {
            return
          }
          if(data.formData.id) {
            rolesChangeInfoApi(data.formData).then(res => {
              if(res.data){
                // 隐藏弹出框
                data.dialogFormVisible = false
                // 更新角色列表
                getList()
              }
            })
          } else {
            // 表单通过
            rolesAddApi(data.formData).then(res => {
              if(res.data){
                // 隐藏弹出框
                data.dialogFormVisible = false
                // 更新角色列表
                getList()
              }
            })
          }
          
        })
    }
    // 数据编辑
    const editRow = row => {
      data.editRowData = row
      data.dialogFormVisible = true
      data.formData = {
        id: row.id,
        roleName: row.roleName,
        roleDesc: row.roleDesc
      }
    }
    // 删除用户
    const deleteRow = row => {
      // console.log(row)
      rolesDeleteApi(row).then(res => {
        if(res.meta.status === 200){
          // 隐藏弹出框
          data.dialogFormVisible = false
          // 更新角色列表
          getList()
        }
      })
    }
    // 执行
    getList()
    // ref获取dom
    const rolesForm = ref()
    return {
      ...toRefs(data),
      addRoles,
      submitForm,
      editRow,
      deleteRow,
      closeForm,
      rolesForm
    }
  }
}
</script>

<style lang="less" scoped>
</style>
