<template>
  <div>
    <CContainer>
      <CRow>
        <h3 class="font_bold ml-2">가입할 기관 등록</h3>
      </CRow>
        <CForm>
          <CInput id="noWarning"
            type="text"
            label="사용자 이름"
            v-model="userName"
            disabled
          >
          </CInput>
          <CInput id="noWarning"
            type="text"
            label="기관 코드"
            description="가입할 기관의 코드 8자리를 입력해주세요."
            value=""
            v-model="groupName"
            autocomplete="off"
            maxlength="8"
            :is-valid="show_warning_group_name"
            invalid-feedback="올바른 형식이 아닙니다."
          >
          </CInput>
          <CInput id="noWarning"
            type="text"
            label="직급/부서"
            description="본인의 직급 혹은 부서를 입력해주세요.(최대 20자)"
            value=""
            v-model="groupName"
            autocomplete="off"
            maxlength="20"
            :is-valid="show_warning_group_name"
            invalid-feedback="직급/부서가 입력되지 않았습니다."
          >
          </CInput>
        </CForm>
      <CButton size="lg" color="primary" style="margin:30% auto 0 auto; width:95%;" block @click="upload_checker">다음</CButton>
    <CModal
      class="show d-block position-static" 
      :show.sync="uploadModal"
      :centered="true"
      title="upload_modal"
      size="sm"
      color="white"
    >
      <h5>가입하시겠습니까?</h5>
      <template #header>
        <h4 class="modal-title">기관 가입 확인</h4>
        <CButtonClose @click="uploadModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="uploadModal = false;" style="width: 60px" color="danger">취소</CButton>
        <CButton @click="uploadModal = false; check_and_send();" style="width: 60px" color="success">확인</CButton>
      </template>
    </CModal>
    </CContainer>
  </div>
</template>

<style scoped>
.was-validated .form-control:invalid, .form-control.is-invalid {
  border-color: #d8dbe0;
  background-image: none;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.was-validated .form-control:invalid:focus, .form-control.is-invalid:focus {
  border-color: #d8dbe0;
  box-shadow: none;
}
</style>

<script>
import { mapGetters } from "vuex"
import http from "../../http"
export default {
  name: 'GenNewGroup',
  data () {
    return {
      userName: "정성주",
      groupCode: "",
      userDescription: "",
      uploadModal: false,

      warning_group_name: false,
      warning_group_desc: false,
    }
  },
  created() {
  },
  computed:{
    ...mapGetters([
      "isNotAuthenticated",
      "getUserInfo"
    ]),
  },
  methods: {
    show_upload_modal(){
      const checker = this.upload_checker()
      if (!checker)
        return;
      return this.uploadModal = true;
    },
    upload_checker(){
      // 기관 이름
      if(this.groupName == '' || this.groupName.length < 1 || this.groupName.length > 45){
        this.warning_group_name = true;
      }else{
        this.warning_group_name = false;
      }

      // 내용
      if(this.groupDescription == '' || this.groupDescription.length < 1 || this.groupDescription.length > 200){
        this.warning_group_desc = true;
      }else{
        this.warning_group_desc = false;
      }

      if(this.warning_group_name || this.warning_group_desc){
        return false;
      }
      this.uploadModal = true;
      return true;
    },
    show_warning_group_code() {
      if(this.warning_group_code)
        return false;
      return '';
    },
    show_warning_user_desc() {
      if(this.warning_user_desc)
        return false;
      return '';
    },
    check_and_send(){
      let html_content = this.groupDescription.replaceAll(/(\n|\r\n)/g, "<br>");

      //임시
      return this.$router.replace({ name: 'GenGroupSuccess', query: {data : JSON.stringify({groupCode:"1234-5678"})} })

      http.post('/matching/upload', {
        userId: "",
        userName: this.getUserInfo.univ,
        groupName: this.groupName,
        groupDescription: html_content,
      }).then((res) => {
        console.log(res.data.success)
        if(res.data.success == true){
          this.$router.replace({ name: 'GenGroupSuccess', query: {data : JSON.stringify({num: res.data.target})} })
        }
        if(res.data.success == false){
          this.$router.replace({ path: '/pages/register_failed' })
        }
      }).catch(function (error){
        console.log(error)
      })
    },
    gotoLogin(){
        this.$router.push({ path: '/pages/login' })
    },
  }
}
</script>