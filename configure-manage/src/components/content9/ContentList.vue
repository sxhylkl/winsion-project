<template>
  <div>
    <div id="button">
      <div class="block">
      <span class="wrapper">
        <el-button :plain="true" type="info" @click="add">添加</el-button>
        <el-button :plain="true" type="info" @click="edit">修改</el-button>
        <el-button :plain="true" type="info" @click="handleDelete">删除</el-button>
      </span>
      </div>
    </div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card>
            <div slot="header">
              <span style="line-height: 20px;">组织机构管理</span>
            </div>
            <div style="height: 600px;overflow: auto">
              <el-tree :data="listData" :props="defaultProps" accordion @node-click="handleNodeClick"
                       :highlight-current="true"></el-tree>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card>
            <div slot="header">
              <span style="line-height: 20px;">基本信息</span>
            </div>
            <div v-show="currentRow">
              <div class="current-info"><span class="current-info-space">区域类型：</span>{{currentData.typeName}}</div>
              <div class="current-info"><span class="current-info-space">区域名称：</span>{{currentData.areaName}}</div>
              <div class="current-info"><span class="current-info-space">区域编号：</span>{{currentData.number}}</div>
              <div class="current-info"><span class="current-info-space">对应的BSSID：</span>{{currentData.ssId}}</div>
              <div class="current-info"><span class="current-info-space">车站级：</span>
                <el-switch
                  v-model="value"
                  on-color="#13ce66"
                  off-color="#ff4949">
                </el-switch>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>


</template>

<script>
  import * as types from '../../store/mutation-types'
  import {messageAlert} from '../../api'
  export default {
    props: ['listData'],
    data() {
      return {
        defaultProps: {
          children: 'list',
          label: 'name'
        },
        currentRow: null
      };
    },
    computed: {
      value(){
        return this.currentRow && this.currentRow.data.countFlag == '1'
      },
      currentData(){
        return this.currentRow ? this.currentRow.data : {typeName: '', areaName: '', number: '', ssId: ''}
      }
    },
    methods: {
      handleNodeClick(data) {
        this.currentRow = data;
      },
      add() {
        if (!this.currentRow) {
          messageAlert(this, '请选择区域管理', '提示')
          return
        }
        this.$store.commit(types.CONTENT9_LIST_ADD_INFO, {
          areaName: '',
          parentName: this.currentRow.data.areaName,
          parentId: this.currentRow.data.areaId,
          number: '',
          countFlag: '',
          typeName: '',
          ssId: '',
        })
      },
      edit(){
        if (!this.currentRow) {
          messageAlert(this, '请选择区域管理', '提示')
          return
        }
        this.$store.commit(types.CONTENT9_LIST_EDIT_INFO, this.currentRow.data)
      },
      handleDelete() {
        if (!this.currentRow) {
          messageAlert(this, '请选择区域管理', '提示')
          return
        }
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch(types.CONTENT9_LIST_CONFIRM_DELETE_INFO_ACTION, {
            data: this.currentRow.data,
            _this: this
          })
        }).catch(()=> {
        })
      }
    }
  }
</script>

<style scoped>
  #button {
    padding: 10px 0;
  }

  .current-info {
    margin-top: 20px
  }

  .current-info-space {
    margin-right: 15px;
  }

  .el-card {
    height: 720px;
  }

  .el-tree {
    border: none;
  }
</style>
