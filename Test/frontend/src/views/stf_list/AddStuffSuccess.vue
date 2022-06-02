<template>
  <div>
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8" id="login_body">
              <div id="reg_final_description_zone">
                <div style="margin-top:20%">
                  <div id="sec1" data-aos="fade-up" data-aos-duration="800" data-aos-once="true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon c-icon-custom-size" height="100"><path fill="#a90b0b" d="M199.066,456l-7.379-7.514-3.94-3.9-86.2-86.2.053-.055L17.936,274.665l97.614-97.613,83.565,83.565L398.388,61.344,496,158.958,296.729,358.229,285.469,369.6ZM146.6,358.183l52.459,52.46.1-.1.054.054,52.311-52.311,11.259-11.368L450.746,158.958,398.388,106.6,199.115,305.871,115.55,222.306,63.191,274.665l83.464,83.463Z" class="ci-primary"></path></svg>
                  </div>
                  <br>
                  <div id="sec1" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="200">
                    <h1 class="bold" style="font-size:30px">기관이 등록되었어요!</h1>
                  </div>
                  <br>
                  <div id="sec1" class="light_dark_shadow" style="padding: 20px 0" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="300">
                    <h1>기관 코드:</h1>
                    <h2>{{groupCode}}</h2>
                  </div>
                </div>
                <CButton id="sec1" class="light_dark_shadow" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" data-aos-delay="400" style="margin-top:20%" size="lg" color="primary" block @click="gotoLogin">내 기관 관리하러 가기</CButton>
              </div>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>


<script>
import { mapGetters } from "vuex"
import http from "../../http"
export default {
  name: 'AddStuffSuccess',
  data () {
    return {
      groupCode: ""
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
    // 사용자 ID를 기반으로 최근에 관리자로 생성한 기관의 기관코드 받아오기
    // 접근도 기관코드로?
    gotoLogin(){
        this.$router.replace({ name: 'MainHome' })
    },
  }
}
</script>