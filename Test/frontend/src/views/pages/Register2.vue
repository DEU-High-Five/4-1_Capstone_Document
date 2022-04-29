<template>
  <div class="c-app flex-row align-items-center">
    <CWrapper>
      <CHeader fixed light style="padding-left: 20px; padding-top: 10px;">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon c-icon-custom-size" height="42" @click="primaryModal = true">
            <polygon fill="var(--ci-primary-color, currentColor)" points="497.333 239.999 80.092 239.999 176.087 144.004 153.46 121.377 18.837 256 153.46 390.623 176.087 367.996 80.09 271.999 497.333 271.999 497.333 239.999" class="ci-primary">
            </polygon>
         </svg>
        </div>
        <div id="title_text">
          <h2 style="font-weight:800">회원가입</h2>
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
                    invalid-feedback="사용 불가능한 아이디입니다."
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
                    label="닉네임"
                    valid-feedback="사용 가능한 닉네임입니다."
                    invalid-feedback="사용 불가능한 닉네임입니다."
                    value=""
                    v-model="reg_nickname"
                    :is-valid="nickname_value_checker"
                    >
                    <template #append>
                      <CButton color="primary" @click="nickname_overlap_check()">중복확인</CButton>
                    </template>
                  </CInput>
                  <CInput
                    type="email"
                    label="이메일"
                    valid-feedback="사용 가능한 이메일 주소입니다."
                    value=""
                    v-model="reg_email"
                    :is-valid="email_value_checker"
                  />
                  <CSelect
                    @change="question_select($event)"
                    name="select_question"
                    label="본인 확인 질문"
                    horizontal
                    :options="options"
                    placeholder="본인 확인 질문을 선택해주세요."
                  />
                  <CInput
                    label="본인 확인 질문 답변"
                    v-model="reg_answer"
                    :description="description_text_answer()"
                    :disabled="is_question_selected"
                    :is-valid="answer_checker"
                  />
                  <div class="form-check" style="textalign-right; margin-top:20px; margin-bottom:80px">
                    <CInputCheckbox class="form-check-input" type="checkbox" value="" v-model="isAgreed" :custom="true" :inline="true" label="개인정보 수집 이용 동의" id="flexCheckDefault"/>
                  </div>
                </CForm>
        </CCol>
      </CRow>
    </CContainer>
      </main>
      </div>
      <CFooter fixed style="height: 10%; background-color: white;">
        <CButton size="lg" color="primary" style="margin:10px auto; width:95%;" block @click="gotoNextPage">다음</CButton>
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



    <CModal v-if="this.isNicknameValid"
      title="Modal_3"
      color="success"
      :show.sync="showNicknameOverlapModal"
      :centered="true"
    >
      사용 가능한 닉네임입니다.
      <template #header>
        <h6 class="modal-title">닉네임 중복확인</h6>
        <CButtonClose @click="showNicknameOverlapModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="showNicknameOverlapModal = false;" color="success">  확인  </CButton>
      </template>
    </CModal>
    <CModal v-else
      title="Modal_3"
      color="danger"
      :show.sync="showNicknameOverlapModal"
      :centered="true"
    >
      이미 사용 중인 닉네임입니다.
      <template #header>
        <h6 class="modal-title">닉네임 중복확인</h6>
        <!-- <CButtonClose @click="showNicknameOverlapModal = false" class="text-white"/> -->
      </template>
      <template #footer>
        <CButton @click="showNicknameOverlapModal = false;" color="danger">  확인  </CButton>
      </template>
    </CModal>

    <CModal
      :closeOnBackdrop="false"
      title="Modal_3"
      color="white"
      :show.sync="insert_checker"
      :centered="true"
    >
      비정상적 접근입니다. 로그인 페이지로 이동합니다.
      <template #header>
        <h6 class="modal-title">비정상적 접근 알림</h6>
        <CButtonClose @click="goToLoginChecker(true)" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="goToLoginChecker(true)" color="success">  확인  </CButton>
      </template>
    </CModal>
    </CWrapper>
  </div>
</template>

<style>
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
const bcrypt = require('bcryptjs')
export default {
  name: 'Register2',
  data() { 
    return { 
      insert_checker: false,

      reg_id: "",
      reg_pass: "",
      reg_pass_check: "",
      reg_nickname: "",
      reg_email: "",
      reg_verify_question: "",
      reg_answer: "",
      reg_agree: false,

      reg_id_temp: "",
      reg_pass_temp: "",
      reg_pass_check_temp: "",
      reg_nickname_temp: "",
      reg_email_temp: "",

      isUsableID: false,

      isIdValid: false,
      isPassValid: false,
      isNicknameValid: false,
      isEmailValid: false,
      isPassword1Valid: false,
      isPassword2Valid: false,
      isQuestionSelected: false,
      isAnswerValid: false,
      isAgreed: false,
      selected: [], // Must be an array reference!
      show: true,
      primaryModal: false,
      showIdOverlapModal: false,
      showNicknameOverlapModal: false,
      horizontal: { label:'col-3', input:'col-9' },
      desc_text_id: "5~20자 영문 숫자를 포함해주세요.",
      options: [
        { 
          value: '1', 
          label: '내가 다녔던 초등학교 이름은?'
        },
        { 
          value: '2', 
          label: '아버지 성함은?'
        },
        { 
          value: '3', 
          label: '어머니 성함은?'
        },
        { 
          value: '4', 
          label: '어렸을 때 내 별명은?'
        },
        { 
          value: '5', 
          label: '내가 좋아하는 노래는?'
        },
        { 
          value: '6', 
          label: '추억의 장소는?'
        },
        ],
      }; 
    }, 
    created(){
      console.log(this.$store.state.registerStore.reg_cert_file)
      if(this.$store.state.registerStore.reg_major === ""){
        this.insert_checker = true;
        //console.log(this.insert_checker)
      }
    },
    computed:{
        is_question_selected(){
          if (this.reg_verify_question != "")
            this.isQuestionSelected = true;
          return this.reg_verify_question == "";
        },
    },
    methods: { 
        id_overlap_check(){
          this.$http.post('/api/users/checkIdOverlap', {
            reg_id: this.reg_id
          }).then((res) => {
            if(res.data.success == true){
              this.isIdValid = true;
              //console.log('Available ID')
            }
            if(res.data.success == false){
              this.isIdValid = false;
              //console.log('Not available ID')
            }
            this.showIdOverlapModal = true;
          }).catch(function (error){
            console.log(error)
          })
          
          // ID 중복확인 체크 영역
          this.reg_id_temp = this.reg_id;
        },
        pass_check(val){
          var reg1 = /^[a-z0-9]{5,20}$/;    // a-z 0-9 중에 7자리 부터 14자리만 허용 한다는 뜻이구요
          var reg2 = /[a-z]/g;    
          var reg3 = /[0-9]/g;
          if(reg1.test(val) &&  reg2.test(val) && reg3.test(val)){
            this.isPassword1Valid = true;
            return true;
          }
          this.isPassword1Valid = false;
          return false;
        },
        pass_confirm_check(){
          if (this.isPassword1Valid && this.reg_pass === this.reg_pass_check){
            this.isPassword2Valid = true;
            return true;
          }
          return false;
        },
        nickname_overlap_check(){
          this.$http.post('/api/users/checkNickOverlap', {
            reg_nickname: this.reg_nickname
          }).then((res) => {
            if(res.data.success == true){
              this.isNicknameValid = true;
              //console.log('Available Nickname')
            }
            if(res.data.success == false){
              this.isNicknameValid = false;
              //console.log('Not available Nickname')
            }
            this.showNicknameOverlapModal = true;
          }).catch(function (error){
            console.log(error)
          })
          this.reg_nickname_temp = this.reg_nickname;
        },
        _check(){
          // ID 중복확인 체크 영역
          this.isIdValid
        },

        question_select(event){
          this.reg_verify_question = event.target.value;
          //console.log(this.reg_verify_question);
        },

        answer_checker(val){
          if(this.reg_answer != ""){
            this.isAnswerValid = true;
            return true;
          }
          this.isAnswerValid = false;
          return false;
        },
        


      goToLoginChecker(goLogin){
      if(goLogin){
        this.$store.commit("registerStore/resetAll")
        this.$router.replace({ path: '/pages/login' })
      }
      else this.primaryModal = false
    },
      description_text_id(){
        if (this.isIdValid)
          return ""
        else
          return "5~20자 영문 숫자를 포함해주세요."
      },
       description_text_pass(){
        if (this.isPassword1Valid)
          return ""
        else
          return "5~20자 영문 숫자를 포함해주세요."
      },
       description_text_pass_check(){
        if (this.isPassword1Valid && this.password2)
          return "비밀번호가 일치하지 않습니다."
        else
          return ""
      },

      description_text_answer(){
        if (this.isAnswerValid)
          return ""
        else
          return "필수 답변 사항입니다."
      },
      validCheck(){
        this.IdVaild = true
      },
      gotoNextPage(){
        //console.log(this.$store.register_data)
        if(this.isIdValid && this.isPassword1Valid && this.isPassword2Valid && this.isQuestionSelected && this.isNicknameValid && this.isEmailValid && this.isAnswerValid && this.isAgreed){
          const salt = bcrypt.genSaltSync();
          const encryptedPass = bcrypt.hashSync(this.reg_pass, salt);
          this.$store.commit("registerStore/set_reg", ["reg_id", this.reg_id])
          this.$store.commit("registerStore/set_reg", ["reg_password", encryptedPass])
          this.$store.commit("registerStore/set_reg", ["reg_nickname", this.reg_nickname])
          this.$store.commit("registerStore/set_reg", ["reg_email", this.reg_email])
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
      },
      nickname_value_checker (val) {
        if (this.reg_nickname_temp != "" && this.reg_nickname_temp != this.reg_nickname)
            this.isNicknameValid = false;
        if (this.isNicknameValid){
          return val ? val.length >= 2 : false
        }
      },
      email_value_checker (val) {
        // if (this.reg_email_temp != "" && this.reg_email_temp != this.reg_email)
        //     this.isEmailValid = false;
        // if (this.isEmailValid){
        var email_test = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
        if(email_test.test(val)){
          this.isEmailValid = true;
          return true;
        }
        this.isEmailValid = false;
        return false;
      },
      password_checker (val) {
        var reg1 = /^[a-z0-9]{5,20}$/;    // a-z 0-9 중에 7자리 부터 14자리만 허용 한다는 뜻이구요
        var reg2 = /[a-z]/g;    
        var reg3 = /[0-9]/g;
        if(reg1.test(val) &&  reg2.test(val) && reg3.test(val)){
          this.isPassword1Valid = true;
          return true;
        }
        this.isPassword1Valid = false;
        return false;
      },
      validator_pass_check(){
        if (this.isPassword1Valid && (this.reg_pass === this.reg_pass_check)){
          this.isPassword2Valid = true;
          return true;
        }
        else {
          this.isPassword2Valid = false;
          return false;
        }
      },
      answer (val) {
        if (val.length == 0){
          return false
        }
      return val ? val.length > 0 : false
      },
    }, 
};

</script>