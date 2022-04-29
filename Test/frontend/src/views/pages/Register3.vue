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
              <CSelect
                name="select_interest"
                label="관심 학과를 선택해주세요. (선택)"
                horizontal
                :options="majorList"
                placeholder="# 학과를 선택해주세요."
                @change="set_interest($event)"
              />
            </CForm>
        </CCol>
      </CRow>
    </CContainer>
        </main>
      </div>
      <CFooter fixed style="height: 10%; background-color: white;">
        <CButton size="lg" color="primary" style="margin:10px auto; width:95%;" block @click="gotoFinalPage">회원가입 완료</CButton>
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
        <CButton @click="checker(false)" color="white">아니오</CButton>
        <CButton @click="checker(true)" color="primary">  예  </CButton>
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
        <CButtonClose @click="gotoLogin()" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="gotoLogin()" color="success">  확인  </CButton>
      </template>
    </CModal>
      </CWrapper>
  </div>
</template>



<script>
import univList from "../../../src/assets/department.json";
export default {
  name: 'Register3',
  data() { 
    return { 
        insert_checker: false,
        primaryModal: false,
        goLogin: false,
        majorList: [],
        reg_interested_major: ""
      }; 
    }, 
    methods: { 
      checkAndSend(){
          this.$http.post('/api/users/signUp', {
            reg_univ: this.$store.state.registerStore.reg_univ,
            reg_major: this.$store.state.registerStore.reg_major,
            reg_id: this.$store.state.registerStore.reg_id,
            reg_password: this.$store.state.registerStore.reg_password,
            reg_nickname: this.$store.state.registerStore.reg_nickname,
            reg_email : this.$store.state.registerStore.reg_email,
            reg_verify_question: this.$store.state.registerStore.reg_verify_question,
            reg_question_answer: this.$store.state.registerStore.reg_question_answer,
            reg_interested_major: this.$store.state.registerStore.reg_interested_major
          }).then((res) => {
            //console.log(res.data.success)
            if(res.data.success == true){
              this.$router.replace({ path: '/pages/register_success' })
            }
            if(res.data.success == false){
              this.$router.replace({ path: '/pages/register_failed' })
            }
            this.$store.commit("registerStore/resetAll")
          }).catch(function (error){
            console.log(error)
          })
      },
      gotoFinalPage(){
        this.$store.commit("registerStore/set_reg", ["reg_interested_major", this.reg_interested_major])
        this.checkAndSend()
      },
      gotoLogin(){
        this.$router.replace({ path: '/pages/login' })
      },
      checker(goLogin){
        if(goLogin){
          this.$store.commit("registerStore/resetAll")
          this.$router.replace({ path: '/pages/login' })
        }
        else this.primaryModal = false
      },
      set_interest(event){
        this.reg_interested_major = event.target.value
      }
    }, 
    created(){
      if(this.$store.state.registerStore.reg_univ === "" || this.$store.state.registerStore.reg_id === ""){
        this.insert_checker = true;
      }
      //console.log(this.$store.state.registerStore)
      univList.Root.content.map((items) =>{
        if (this.$store.state.registerStore.reg_univ == items.schoolName[0])
          this.majorList.push(items.departmentName[0])
      });
    }
};

</script>