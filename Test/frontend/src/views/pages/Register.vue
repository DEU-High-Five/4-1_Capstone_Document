<template>
  <div class="c-app flex-row align-items-center">
    <CWrapper>
      <CHeader fixed light style="padding-left: 20px; padding-top: 10px;">
        <div @click="primaryModal = true">
           <CIcon size="xl" class="c-sidebar-nav-icon ml-1" style="margin-top: 8px; color: #A90B0B" :content="$options.icons.returnIcon"/>
        </div>
        <div id="title_text">
          <h2 style="font-weight:800; color: #A90B0B">회원가입</h2>
        </div>
      </CHeader>
      <div class="c-body">
        <main class="c-main">
          <CContainer>
            <CRow class="justify-content-center">
              <CCol md="4" style="width:85%">
                <CForm>
                  <CInput id="noWarning"
                    label="아이디"
                    valid-feedback="사용 가능한 아이디입니다."
                    :invalid-feedback="id_invalid_feedback()"
                    :description="description_text_id()"
                    value=""
                    v-model="reg_id"
                    :is-valid="id_value_checker"
                  >
                    <template #append>
                      <CButton color="primary" @click="id_overlap_check()">중복확인</CButton>
                    </template>
                  </CInput>
                  <CInput
                    style="font: small-caption"
                    label="비밀번호"
                    invalid-feedback="비밀번호를 올바르게 입력해주세요."
                    valid-feedback="사용 가능한 비밀번호입니다."
                    type="password"
                    :description="description_text_pass()"
                    value=""
                    v-model="reg_pass"
                    :is-valid="pass_check"
                  />
                  <CInput
                    style="font: small-caption"
                    label="비밀번호 확인"
                    type="password"
                    valid-feedback="비밀번호가 일치합니다."
                    :invalid-feedback="description_text_pass_check()"
                    value=""
                    v-model="reg_pass_check"
                    :is-valid="validator_pass_check"
                  />
                  <CInput
                    type="text"
                    label="이름"
                    valid-feedback="사용할 수 있는 이름 형식입니다."
                    invalid-feedback="이름을 입력해주세요."
                    value=""
                    v-model="reg_name"
                    :is-valid="show_warning_name"
                  />
                  <label>연락처</label>
                  <CRow class="form-group">
                    <CCol col="3" class="pr-1">
                      <CInput 
                        id="no-warn-image"
                        class="mb-0" 
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" 
                        maxlength='3'
                        v-model="temp_phone_num[0]"
                        :is-valid="show_warning_phone" 
                      />
                    </CCol>
                    <span style="padding: 5px 1% 0 1%">-</span>
                    <CCol col="3" class="pl-1 pr-1">
                      <CInput 
                        id="no-warn-image"
                        class="mb-0" 
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" 
                        maxlength='4'
                        v-model="temp_phone_num[1]"
                        :is-valid="show_warning_phone"
                      />
                    </CCol>
                    <span style="padding: 5px 1% 0 1%">-</span>
                    <CCol col="3" class="pl-1 pr-1">
                      <CInput 
                        id="no-warn-image"
                        class="mb-0" 
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" 
                        maxlength='4'
                        v-model="temp_phone_num[2]"
                        :is-valid="show_warning_phone"
                      />
                    </CCol>
                  </CRow>
                  <p v-if="this.warning_phone" style="margin-top: -0.75rem; color:#e55353; font-size:80%">연락처를 입력해주세요.</p>
                  <p v-if="this.isPhoneInserted" style="margin-top: -0.75rem; color:#2eb85c; font-size:80%">좋아요! 이제 다 왔어요!</p>
                  <CInputCheckbox
                    v-for="(option, index) in options"
                    :key="index"
                    :is-valid="show_warning_check(index)"
                    invalid-feedback="필수 사항입니다."
                    class="mb-2"
                    :label="option"
                    :value="option"
                    :custom="true"
                    @change="check_check(index)"
                  />
                </CForm>
              </CCol>
            </CRow>
          </CContainer>
        </main>
      </div>
      <CFooter fixed style="height: 10%; background-color: white;">
        <CButton size="lg" color="primary" style="margin:10px auto; width:95%;" block @click="check_and_send">다음</CButton>
      </CFooter>
      <CModal
        title="Modal title"
        color="primary"
        :show.sync="primaryModal"
      >
        로그인 화면으로 돌아가시겠습니까?<br>작성된 내용은 모두 지워집니다.
        <template #header>
          <h6 class="modal-title">로그인 화면으로 이동</h6>
          <CButtonClose @click="primaryModal = false" class="text-white"/>
        </template>
        <template #footer>
          <CButton @click="goToLoginChecker(false)" color="white">아니오</CButton>
          <CButton @click="goToLoginChecker(true)" color="primary">  예  </CButton>
        </template>
      </CModal>
      <CModal v-if="this.isIdValid && this.isUsableID"
        title="Modal_2"
        color="success"
        :show.sync="showIdOverlapModal"
      >
        사용 가능한 ID입니다.
        <template #header>
          <h6 class="modal-title">ID 중복확인</h6>
          <CButtonClose @click="showIdOverlapModal = false" class="text-white"/>
        </template>
        <template #footer>
          <CButton @click="showIdOverlapModal = false;" color="success">  확인  </CButton>
        </template>
      </CModal>
      <CModal v-else
        title="Modal_2"
        color="danger"
        :show.sync="showIdOverlapModal"
      >
        사용 불가능한 ID입니다.
        <template #header>
          <h6 class="modal-title">ID 중복확인</h6>
          <CButtonClose @click="showIdOverlapModal = false" class="text-white"/>
        </template>
        <template #footer>
          <CButton @click="showIdOverlapModal = false;" color="danger">  확인  </CButton>
        </template>
      </CModal>
    </CWrapper>
  </div>
</template>


<style>
#no-warn-image.is-invalid {
  background-image: none;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
  padding: 0.25rem 0.75rem;
}
#no-warn-image.is-valid {
  background-image: none;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
  padding: 0.25rem 0.75rem;
}
.form-control:focus {
  border-color: #777;
  -webkit-box-shadow: 0 0 0 0.2rem rgb(180 180 180 / 25%);
  box-shadow: 0 0 0 0.2rem rgb(180 180 180 / 25%);
}
</style>

<script>
import { cilChevronLeft } from '@coreui/icons'
const bcrypt = require('bcryptjs')
export default {
  name: 'Register',
  icons: {
    returnIcon: cilChevronLeft
  },
  data() { 
    return { 
      asas: '',

      reg_id: "",
      reg_pass: "",
      reg_pass_check: "",
      reg_name: "",
      reg_phone_number: "",

      temp_phone_num: ['','',''],

      reg_id_temp: "",

      warning_id: false,
      warning_pass: false,
      warning_pass_check: false,
      warning_name: false,
      warning_phone: false,
      warning_agree: false,

      isUsableID: false,

      isIdValid: false,
      isPassword1Valid: false,
      isPassword2Valid: false,
      isNameInserted: false,
      isPhoneInserted: false,
      isAgreed: [false, false],
      show: true,
      primaryModal: false,
      showIdOverlapModal: false,
      options: ['(필수) 개인정보 수집 이용 동의', '(선택) 마케팅 정보 이용 동의'],
    }; 
    },
    methods: { 
        check_check(idx){
          this.isAgreed[idx] = this.isAgreed[idx] ? false : true;
          if (this.isAgreed[0]) this.warning_agree = false;
        },
        data_checker(){
          let rt = false;
          if(!this.isIdValid){
            this.warning_id = true;
            rt = true;
          } 
          if(!this.isPassword1Valid){
            this.warning_pass = true;
            rt = true;
          } 
          if (!this.isPassword2Valid){
            this.warning_pass_check = true;
            rt = true;
          }
          if(this.reg_name.length < 2){
            this.warning_name = true;
            rt = true;
          }
          if(!this.isPhoneInserted){
            this.warning_phone = true;
            rt = true;
          } 
          if(!this.isAgreed[0]){
            this.warning_agree = true;
            rt = true;
          }
          return !rt;
        },

        id_invalid_feedback(){
          if(this.isIdValid)
            return "";
          else if(this.reg_id.length == 0)
            return "아이디를 입력해주세요."
          else
            return "중복확인을 눌러주세요."
        },

        show_warning_id() {
          if(this.warning_id)
            return false;
          return '';
        },

        show_warning_pass() {
          if(this.warning_pass)
            return false;
          return '';
        },
        show_warning_pass_check() {
          if(this.warning_pass_check)
            return false;
          return '';
        },
        show_warning_name() {
          if(this.warning_name && this.reg_name.length == 0)
            return false;
          else if (this.reg_name.length >= 2) return true;
          return '';
        },
        show_warning_phone() {
          if(this.warning_phone && (this.temp_phone_num[0] == '' || this.temp_phone_num[1] == '' || this.temp_phone_num[2] == ''))
            return false;
          else if (this.temp_phone_num[0].length == 3 && this.temp_phone_num[1].length >= 3 && this.temp_phone_num[2].length == 4){
            this.isPhoneInserted = true;
            this.warning_phone = false;
            return true;
          }
          this.warning_phone = false;
          return '';
        },
        show_warning_check(idx){
          if (this.isAgreed[0]) this.warning_agree = false;
          if(idx == 0 && this.warning_agree){
            return false;
          }
          return null;
        },








        id_overlap_check(){
          if (!this.reg_id) return;
          this.$http.post('/api/users/check/ID', {
            reg_id: this.reg_id
          }).then((res) => {
            if(res.data.success == true){
              this.isIdValid = true;
              //console.log('Available ID')
              this.reg_id_temp = this.reg_id;
            }
            if(res.data.success == false){
              this.isIdValid = false;
              this.warning_id = true;
              //console.log('Not available ID')
            }
            this.showIdOverlapModal = true;
          }).catch(function (error){
            console.log(error)
          })


          // this.isIdValid = true;
          // this.showIdOverlapModal = true;
          
          // // ID 중복확인 체크 영역
          // this.reg_id_temp = this.reg_id;
        },
        pass_check(val){
          if (!this.isPassword1Valid && this.warning_pass){
            if (this.reg_pass.length != 0) 
              this.warning_pass = false;
            return false;
          }
          var reg1 = /^[a-z0-9]{5,20}$/;
          var reg2 = /[a-z]/g;    
          var reg3 = /[0-9]/g;
          if(reg1.test(val) && reg2.test(val) && reg3.test(val)){
            this.isPassword1Valid = true;
            return true;
          }
          this.isPassword1Valid = false;
          return "";
        },
        pass_confirm_check(){
          if (!this.isPassword2Valid && this.warning_pass_check) return false;
          if (this.isPassword1Valid && this.reg_pass === this.reg_pass_check){
            this.isPassword2Valid = true;
            return true;
          }
          return "";
        },



      goToLoginChecker(goLogin){
      if(goLogin){
        this.$store.commit("registerStore/resetAll")
        this.$router.replace({ path: '/pages/login' })
      }
      else this.primaryModal = false
    },
      description_text_id(){
        if (this.isIdValid || this.warning_id)
          return ""
        else
          return "5~20자 영문 숫자를 포함해주세요."
      },
       description_text_pass(){
        if (this.isPassword1Valid || this.warning_pass)
          return ""
        else
          return "5~20자 영문 숫자를 포함해주세요."
      },
       description_text_pass_check(){
        if (this.isPassword1Valid)
          return "비밀번호가 일치하지 않습니다."
        else if (this.warning_pass_check)
          return "비밀번호 확인이 필요합니다."
        else
          return ""
      },

      description_text_answer(){
        if (this.isAnswerValid)
          return ""
        else
          return "필수 답변 사항입니다."
      },

      check_and_send(){
        if (this.data_checker()){
          const salt = bcrypt.genSaltSync();
          const encryptedPass = bcrypt.hashSync(this.reg_pass, salt);
          const phone_temp = this.temp_phone_num[0] + this.temp_phone_num[1] + this.temp_phone_num[2]
          this.$http.post('/api/users/signUp', {
            reg_id: this.reg_id,
            reg_password_crpt: encryptedPass,
            reg_name: this.reg_name,
            reg_phone: phone_temp,
            reg_privacy_agreement: this.isAgreed[0],
            reg_consent_marketing: this.isAgreed[1]
          }).then((res) => {
            //console.log(res.data.success)
            if(res.data.success == true){
              this.$router.replace({ path: '/pages/register_success' })
            }
            if(res.data.success == false){
              this.$router.replace({ path: '/pages/register_failed' })
            }
          }).catch(function (error){
            console.log(error)
          })
        }
      },
      sign_up(){
        //if(this.isIdValid && this.isPassword1Valid && this.isPassword2Valid && this.isQuestionSelected && this.isNicknameValid && this.isEmailValid && this.isAnswerValid && this.isAgreed){
        if (this.data_checker()){
          const salt = bcrypt.genSaltSync();
          const encryptedPass = bcrypt.hashSync(this.reg_pass, salt);
          this.$store.commit("registerStore/set_reg", ["reg_id", this.reg_id])
          this.$store.commit("registerStore/set_reg", ["reg_password", encryptedPass])
          this.$store.commit("registerStore/set_reg", ["reg_nickname", this.reg_nickname])
          //this.$store.commit("registerStore/set_reg", ["reg_email", this.reg_email])
          this.$store.commit("registerStore/set_reg", ["reg_verify_question", this.reg_verify_question])
          this.$store.commit("registerStore/set_reg", ["reg_question_answer", this.reg_answer])
          this.$router.replace({ path: '/pages/register3' })
          //console.log(this.$store.state.registerStore)
          //console.log(encryptedPass)
        }
      },
      id_value_checker (val) {
        if (this.reg_id_temp != "" && this.reg_id_temp != this.reg_id)
            this.isIdValid = false;
        if (this.isIdValid){
          var reg1 = /^[a-z0-9]{5,20}$/;
          var reg2 = /[a-z]/g;    
          var reg3 = /[0-9]/g;
          if(reg1.test(val) &&  reg2.test(val) && reg3.test(val)){
            this.isUsableID = true;
            return true;
          }
          this.isUsableID = false;
          return false;
        }
        if (this.warning_id) return false;
        return "";
      },
      validator_pass_check(){
        if (this.isPassword1Valid && (this.reg_pass === this.reg_pass_check)){
          this.isPassword2Valid = true;
          return true;
        }
        else {
          this.isPassword2Valid = false;
          if (this.reg_pass_check.length == 0) return "";
          return false;
        }
      },
    }, 
};

</script>