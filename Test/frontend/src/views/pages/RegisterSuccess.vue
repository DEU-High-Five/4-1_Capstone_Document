<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8" id="login_body">
            <CCard class="p-4" id="main_login">
              <div id="reg_final_description_zone">
                <div id="descript_text_final">
                  <div id="sec1" data-aos="fade-up-right" data-aos-duration="800" data-aos-once="true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon c-icon-custom-size" height="110"><path fill="#A90B0B" d="M474.444,19.857a20.336,20.336,0,0,0-21.592-2.781L33.737,213.8v38.066l176.037,70.414L322.69,496h38.074l120.3-455.4A20.342,20.342,0,0,0,474.444,19.857ZM337.257,459.693,240.2,310.37,389.553,146.788l-23.631-21.576L215.4,290.069,70.257,232.012,443.7,56.72Z" class="ci-primary"></path></svg>
                  </div>
                  <br><br>
                  <div id="sec1" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="200">
                    <h1 class="bold" style="font-size:35px">반가워요!</h1>
                  </div>
                  <div id="sec1" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="300">
                    <br>
                    <a v-bind:style="{fontSize: ftsize() +'px'}">회원가입이 성공적으로<br>완료되었습니다.</a>
                  </div>
                </div>
              </div>
              <CCardBody>
                <CButton size="lg" color="primary" block @click="gotoLogin">로그인 페이지로 이동</CButton>
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
          return 25
        else
          return 15
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