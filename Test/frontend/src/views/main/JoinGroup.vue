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
          />
          <label>기관 코드</label>
            <CRow class="form-group">
              <CCol col="4" class="pr-1">
                <CInput 
                  class="mb-0" 
                  oninput="this.value = this.value.replace(/[^0-9a-f.]/g, '').replace(/(\..*)\./g, '$1');" 
                  maxlength='4'
                  v-model="groupCode[0]"
                  :is-valid="show_warning_group_code" 
                />
              </CCol>
              <span style="padding: 5px 1% 0 1%">-</span>
              <CCol col="4" class="pl-1">
                <CInput 
                  class="mb-0" 
                  oninput="this.value = this.value.replace(/[^0-9a-f.]/g, '').replace(/(\..*)\./g, '$1');" 
                  maxlength='4'
                  v-model="groupCode[1]"
                  :is-valid="show_warning_group_code"
                />
              </CCol>
            </CRow>
            <p v-if="this.warning_group_code" style="margin-top: -0.75rem; color:#e55353; font-size:80%">올바른 형식이 아닙니다.</p>
            <p style="margin-top: -0.75rem; color:#768192; font-size:80%">가입할 기관의 코드 8자리를 입력해주세요.</p>
          <CInput id="noWarning"
            type="text"
            label="직급/부서"
            description="본인의 직급 혹은 부서를 입력해주세요.(최대 20자)"
            value=""
            v-model="userDescription"
            autocomplete="off"
            maxlength="20"
            :is-valid="show_warning_user_desc"
            invalid-feedback="직급/부서가 입력되지 않았습니다."
          />
        </CForm>
      <CButton size="lg" color="primary" style="margin:10% auto; width:95%;" block @click="upload_checker">다음</CButton>
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
    <div class="btn-floating" @click="gotoMain">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon c-icon-custom-size" height="30"><path fill="var(--ci-primary-color, currentColor)" d="M469.666,216.45,271.078,33.749a34,34,0,0,0-47.062.98L41.373,217.373,32,226.745V496H208V328h96V496H480V225.958ZM248.038,56.771c.282,0,.108.061-.013.18C247.9,56.832,247.756,56.771,248.038,56.771ZM448,464H336V328a32,32,0,0,0-32-32H208a32,32,0,0,0-32,32V464H64V240L248.038,57.356c.013-.012.014-.023.024-.035L448,240Z" class="ci-primary"></path></svg>
    </div>
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
      userName: "",
      groupCode: ['', ''],
      userDescription: "",
      uploadModal: false,

      warning_group_code: false,
      warning_user_desc: false,
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
      // 기관 코드
      if(this.groupCode[0].length != 4 || this.groupCode[1].length != 4){
        this.warning_group_code = true;
      }else{
        this.warning_group_code = false;
      }

      // 직급/부서
      if(this.userDescription == '' || this.userDescription.length < 1 || this.userDescription.length > 20){
        this.warning_user_desc = true;
      }else{
        this.warning_user_desc = false;
      }

      if(this.warning_group_code || this.warning_user_desc){
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
      //임시
      return this.$router.replace({ name: 'CheckGroup', query: {data : JSON.stringify({groupCode:this.groupCode})} })

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
    gotoMain(){
        this.$router.push({ name: 'MainHome' })
    },
  }
}
</script>