<template>
  <div>
    <CCard id="sec1" class="light_shadow" data-aos="fade-up" data-aos-once="true">
      <CCardBody>
        <CRow class="justify-content-center mb-3">
            <div id="circle" style="float:center"></div>
        </CRow>
        <CRow class="justify-content-center mb-1">
      <h1 style="float:left; font-size: 30px;" >{{getUserInfo.nickname}} ({{getUserInfo.userId}})</h1>
        </CRow>
        <CRow class="justify-content-center">
        <h3 v-if="getUserInfo.authorized" style="text-align: center; width: 10rem; background-color:blue; color: white; font-size: 20px; font-weight: 600; padding: 3px 10px; border-radius: 5px;">재학 인증 완료</h3>
        <h3 v-else style="text-align: center; width: 10rem; background-color:purple; color: white; font-size: 20px; font-weight: 600; padding: 3px 10px; border-radius: 5px;">재학 인증 미완료</h3>
        </CRow>
        <CRow class="justify-content-center">
        <h4 v-text="getUserInfo.univ"></h4>
        </CRow>
        <CRow class="justify-content-center">
        <h5 v-text="getUserInfo.major"></h5>
        </CRow>
      </CCardBody>
      <CButton color="success" style="font-size:20px">
        회원정보 수정
      </CButton>
    </CCard>
    <CCard class="light_shadow" id="sec1" data-aos="fade-up" data-aos-once="true" data-aos-delay="50" @click="gotoMyPostList()">
      <CCardBody>
      <h5>내 게시물 목록</h5>
      </CCardBody>
    </CCard>
    <CCard class="light_shadow" id="sec1" data-aos="fade-up" data-aos-once="true" data-aos-delay="100" data-aos-offset="-100" @click="gotoMyRecvList()">
      <CCardBody>
        <h5>받은 신청 목록</h5>
      </CCardBody>
    </CCard>
    <CCard class="light_shadow" id="sec1" data-aos="fade-up" data-aos-once="true" data-aos-delay="150" data-aos-offset="-100" @click="gotoMyApplyList()">
      <CCardBody>
        <h5>보낸 신청 목록</h5>
      </CCardBody>
    </CCard>
    <CCard class="light_shadow" id="sec1" data-aos="fade-up" data-aos-once="true" data-aos-delay="150" data-aos-offset="-100" @click="gotoMessage()">
      <CCardBody>
        <h5>쪽지</h5>
      </CCardBody>
    </CCard>
  </div>
</template>
<style scoped>
#circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url("../../assets/images/profile_image.png");
  background-size: cover;
  box-shadow: 3px 3px 7px #CCC;
}
</style>

<script>
import { mapGetters } from "vuex"
export default {
  name: 'MyAccount',
  created(){
      this.$store.commit("pageStore/set_page", ["pageInfo", "내 계정"])
      this.$store.commit("pageStore/set_page", ["pageRoute", ""])
  },
  data () {
    return {
    }
  },
  computed:{
    ...mapGetters([
      "getUserInfo"
      ])
  },
  methods: {
    delay_value(index){
      if (index < 4)
        return index * 100
      else return 0
    },
    color (value, max) {
      let $color
      let $temp = value/max
      if ($temp <= 0.5) {
        $color = 'rgb(37,186,14)'
      } else if ($temp > 0.5 && $temp <= 0.75) {
        $color = 'rgb(255, 127, 0)'
      } else if ($temp > 0.75 && $temp < 0.98) {
        $color = 'rgb(245,89,25)'
      }
      else $color = 'rgb(177,30,49)'
      return $color
    },
    gotoMyPostList(){
        this.$router.push({ path: '/myPages/MyPostList' })
    },
    gotoMyApplyList(){
        this.$router.push({ path: '/myPages/MyApplyList' })
    },
    gotoMyRecvList(){
        this.$router.push({ path: '/myPages/MyRecvList' })
    },
    gotoMessage(){
        this.$router.push({ name: 'MessageHome' })
    },
  }
}
</script>