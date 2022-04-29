<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8" id="login_body">
            <CCard class="p-4" id="main_login">
              <div id="reg_final_description_zone">
                <div id="descript_text_final">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon c-icon-custom-size" height="100"><rect width="32" height="176" x="240" y="176" fill="#ccac00" class="ci-primary"></rect><rect width="32" height="32" x="240" y="384" fill="#ccac00" class="ci-primary"></rect><path fill="#ccac00" d="M274.014,16H237.986L16,445.174V496H496V445.174ZM464,464H48V452.959L256,50.826,464,452.959Z" class="ci-primary"></path></svg>
                  <br><br>
                  <h1>회원가입 중<br>오류가 발생했습니다.</h1>
                  <br>
                  <a v-bind:style="{fontSize: ftsize() +'px'}">일시적인 서버 오류로 회원가입에 실패했습니다.</a>
                    <br><br>
                  <a v-bind:style="{fontSize: ftsize() +'px'}">지속적으로 동일한 문제가 발생하는 경우
                      <br> 아래 이메일로 문의 부탁드립니다.
                   </a>
                   <br><br>
                   <div style="height: 50px; font-weight:800; padding-top:10px" class="light_shadow">
                    <a v-bind:style="{fontSize: ftsize()+3 +'px'}">hello@testmail.com</a>
                   </div>
                </div>
              </div>
              <CCardBody>
                <CButton size="lg" style="background-color:#ccac00; color:white" block @click="gotoLogin">로그인 페이지로 이동</CButton>
              </CCardBody>
            </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: 'RegisterFailed',
  data() { 
    return { 
      windowWidth: window.outerWidth,
      windowHeight: window.outerHeight,
      userId: null, 
      userPassword: null, 
      }; 
    }, 
    methods: { 
      ftsize(){
        if(this.windowWidth > 320)
          return 14
        else
          return 7
      },
      gotoRegister(){
        this.$router.replace({ path: '/pages/register1' })
      },
      gotoLogin(){
        this.$router.replace({ path: '/pages/login' })
      },
    }, 
};

</script>