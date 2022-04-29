<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8" id="login_body">
            <CCard class="p-4" id="main_login">
              <div id="reg_final_description_zone">
                <div id="descript_text_final">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon c-icon-custom-size" height="100"><path fill="rgb(0,195,128)" d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z" class="ci-primary"></path><polygon fill="rgb(0,195,128)" points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808" class="ci-primary"></polygon></svg>
                  <br><br>
                  <h1>회원가입이<br>완료되었습니다.</h1>
                  <br>
                  <a v-bind:style="{fontSize: ftsize() +'px'}">재학 인증에 소요되는 시간은 제출된 서류에<br>따라 달라질 수 있으며, 최대 2~3일 소요됩니다.</a>
                </div>
              </div>
              <CCardBody>
                <CButton size="lg" color="success" block @click="gotoLogin">로그인 페이지로 이동</CButton>
              </CCardBody>
            </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: 'Register4',
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