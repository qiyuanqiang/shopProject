<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>账号列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 白色内容区域 -->
        <div class="page_content">
            <!-- 搜索栏 -->
            <div class="flex">
            <div class="input_box">
                <el-input
                v-model="searchParams.query"
                placeholder="搜索关键字"
                class="input-with-select"
                >
                <template #append>
                    <el-button>
                    <el-icon @click="searchList"><Search /></el-icon>
                    </el-button>
                </template>
                </el-input>
            </div>
            </div>
            <!-- 表格 -->
            <el-table :data="goodsList" style="width: 100%">
                <el-table-column prop="goods_name" label="商品名称" width="180" />
                <el-table-column prop="goods_price" label="价格(￥)" width="180" />
                <el-table-column prop="goods_number" label="商品数量(kg)"/>
                <el-table-column prop="goods_weight" label="商品重量"/>
                <!-- 状态 -->
                <el-table-column prop="goods_state" label="商品状态">
                    <template #default="scope">
                        <p>{{switchState(scope.row.goods_state)}}</p>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                v-model:currentPage="searchParams.pagenum"
                v-model:page-size="searchParams.pagesize"
                :page-sizes="[2,5,10,20]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="searchList"
                @current-change="searchList"
            />
        </div>
    </div>
</template>

<script type="text/javascript">
import { reactive, toRefs } from '@vue/reactivity'
import { getGoodsApi } from '../../util/request.js'
export default {
  name: "goods",
  setup() {
    // 数据
    const data = reactive({
        // 查询参数
        searchParams: {
            query: "",
            pagesize: 5,
            pagenum: 1
        },
        // 用户总数
        total:0,
        goodsList: []
    })
    // 方法
    // 查询
    const searchList = () => {
        getGoodsApi(data.searchParams).then(res => {
        if(res.data) {
          data.goodsList = res.data.goods
          data.total=res.data.total
        }
      })
    }
    // 转换状态
    const switchState = (state) => {
        switch (state) {
            case 0:
                return '未通过'
            case 1:
                return '审核中'
            case 2:
                return '已审核'
        
            default:
                return '未通过'
        }
    }
    // 执行
    searchList()
    return {
        ...toRefs(data),
        searchList,
        switchState
    }
  }
}
</script>

<style lang="less" scoped>
</style>
