<template>
  <div>
    <!--添加和编辑界面-->
    <el-dialog :title="status=='add'?'添加用户管理信息':'修改用户管理信息'" v-model="dialogFormVisible" @close="cancel">
      <el-form :model="form" style="width: 80%;padding-right: 15%;height: 600px;overflow: auto">
        <el-form-item label="所属站点" :label-width="formLabelWidth">
          <el-select v-model="form.areaName" placeholder="请选择">
            <el-option
              v-for="areaItem in area"
              :label="areaItem.areaName"
              :value="areaItem.id"
              :key="areaItem.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.loginName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" :label-width="formLabelWidth">
          <el-input v-model="form.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="照片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="http://172.16.0.17:7788/kingkong/0.01/test/uploadSingleFile/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img v-if="form.photoUrl" :src="form.photoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="登录密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="内部电话号码" :label-width="formLabelWidth">
          <el-input v-model="form.sipTellAddress" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.sipPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="对讲用户名" :label-width="formLabelWidth">
          <el-input v-model="form.mmpUser" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="对讲密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.mmPwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="生效时间" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="form.startTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="失效时间" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="form.endTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="管理员" :label-width="formLabelWidth">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门" :label-width="formLabelWidth">
          <el-select v-model="form.orgName" placeholder="请选择" @change="handleChangeOrg">
            <el-option
              v-for="organizationItem in organization"
              :label="organizationItem.orgName"
              :value="organizationItem.orgId"
              :key="organizationItem.orgId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属职能组" :label-width="formLabelWidth">
          <el-select v-model="form.postName" placeholder="请选择" @change="handleChangePost">
            <el-option
              v-for="postItem in post"
              :label="postItem.postName"
              :value="postItem.postId"
              :key="postItem.postId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属班组" :label-width="formLabelWidth">
          <el-select v-model="form.teamName" placeholder="请选择">
            <el-option
              v-for="teamItem in team"
              :label="teamItem.teamName"
              :value="teamItem.teamName"
              :key="teamItem.teamName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属角色" :label-width="formLabelWidth">
          <el-select v-model="form.roleName" placeholder="请选择">
            <el-option
              v-for="roleItem in role"
              :label="roleItem.roleName"
              :value="roleItem.roleId"
              :key="roleItem.roleId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as types from '../../../store/mutation-types'
  import {messageAlert} from '../../../api'
  export default{
    props: ['form', 'visible', 'status', 'organization', 'post', 'team', 'area', 'role', 'flag1', 'flag2'],
    data() {
      return {
        imageUrl: '',
        formLabelWidth: '120px',
      };
    },
    computed: {
      dialogFormVisible() {
        return this.visible
      },
    },
    methods: {
      cancel(){
        this.$store.dispatch(types.CONTENT11_1_CONFIRM_CANCEL_INFO_ACTION)
      },
      handleChangeOrg(value){
        //实现添加和修改的操作，不会执行下面的调用
        if (this.flag1) {
          this.$store.commit(types.CONTENT11_1_UPDATE_STATUS_1, false)
          return
        }
        this.form.postName = ''
        this.form.teamName = ''
        this.$store.dispatch(types.CONTENT11_1_GET_POST_INFO_ACTION, value)
      },
      handleChangePost(value){
        //实现添加和修改的操作，不会执行下面的调用
        if (this.flag2) {
          this.$store.commit(types.CONTENT11_1_UPDATE_STATUS_2, false)
          return
        }
        this.form.teamName = ''
        this.$store.dispatch(types.CONTENT11_1_GET_TEAM_INFO_ACTION, {org: this.form.orgName, post: value})
      },
      confirm(){
        //提示用户完成信息
        if (this.form.areaName.trim() == '') {
          messageAlert(this, '请选择所属站点', '提示')
          return
        } else if (this.form.userName.trim() == '') {
          messageAlert(this, '请填写真实姓名', '提示')
          return
        } else if (this.form.password.trim() == '') {
          messageAlert(this, '请填写登陆密码', '提示')
          return
        } else if (this.form.sipTellAddress.trim() == '') {
          messageAlert(this, '请填写内部电话号码', '提示')
          return
        } else if (this.form.sipPassword.trim() == '') {
          messageAlert(this, '请填写电话密码', '提示')
          return
        } else if (this.form.mmpUser.trim() == '') {
          messageAlert(this, '请填写对讲用户名', '提示')
          return
        } else if (this.form.mmPwd.trim() == '') {
          messageAlert(this, '请填写对讲密码', '提示')
          return
        } else if (new Date(this.form.startTime).getTime() == '') {
          messageAlert(this, '请选择生效时间', '提示')
          return
        } else if (new Date(this.form.endTime).getTime() == '') {
          messageAlert(this, '请选择失效时间', '提示')
          return
        } else if (this.form.status.trim() == '') {
          messageAlert(this, '请选择管理员状态', '提示')
          return
        } else if (this.form.teamName.trim() == '') {
          messageAlert(this, '请选择所属部门', '提示')
          return
        } else if (this.form.roleName.trim() == '') {
          messageAlert(this, '请选择所属角色', '提示')
          return
        }

        //对于不同状态，调用不同接口
        if (this.status == 'add') {
          this.$store.dispatch(types.CONTENT11_1_CONFIRM_ADD_INFO_ACTION, {data: this.form, _this: this})
        } else {
          this.$store.dispatch(types.CONTENT11_1_CONFIRM_EDIT_INFO_ACTION, {data: this.form, _this: this})
        }
      },
      handleAvatarSuccess(res, file) {
        this.form.photoUrl = res.data
      },
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px solid #bfcbd9;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
