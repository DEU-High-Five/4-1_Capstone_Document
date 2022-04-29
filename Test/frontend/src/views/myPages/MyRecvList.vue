<template>
  <div>
    <div v-if="isEmpty(this.waitingList)"  style="text-align:center; height: 70vh;">
    <CSpinner style="margin-top: 35vh">
    </CSpinner>
    </div>
    <div v-else>
    <div id="sec1" data-aos="fade-up" data-aos-once="true">
    <div>
    <CButton
      pressed
      block
      color="secondary"
      shape="pill"
      aria-pressed="true"
      style="width: 150px; float:right; margin-top: -10px; font-weight:800"
      @click="gotoPage()"
    >
    보낸 신청 목록
    </CButton>
    <h5 style="float:left">대기 중인 신청</h5>
    </div><br><br>
    <div v-if="isEmpty1">
    <CCard class="light_shadow">
      <CCardBody>
        <CRow>
            <CCol style="width:80%">
                <h4>대기 중인 신청이 없습니다.</h4>
            </CCol>
        </CRow>
      </CCardBody>
    </CCard>
    </div>
    <div v-else>
    <CCard
        class="light_shadow"
        v-for="(cards, index) in waitingList" 
        :key="index"
    >
      <CCardBody>
        {{cards.MEMBER_NUM}}
        <CRow>
            <CCol style="width:80%">
                <h4 class="font_bold">{{cards.TITLE}}</h4>
                <h4>신청자: {{cards.USER_NICKNAME}}({{cards.USER_ID}})</h4>
            </CCol>
        </CRow>
        <CRow class="justify-content-between">
            <CCol style="text-align:center">
                <CButton color="danger" style="width: 100%" @click="setState(cards.MEMBER_NUM, 2)">
                    거부
                </CButton>
            </CCol>
            <CCol style="text-align:center">
                <CButton color="success" style="width: 100%" @click="setState(cards.MEMBER_NUM, 1)">
                    허가
                </CButton>
            </CCol>
            <CCol style="text-align:center">
                <CButton color="primary" style="width: 100%" @click="createMessage(cards.USER_ID)">
                    쪽지 전송
                </CButton>
            </CCol>
        </CRow>
      </CCardBody>
      <CCardFooter style="padding: 0.1rem 1.25rem; font-size:17px">
        카테고리: {{getCategory(cards.BOARD_CATEGORY)}}
      </CCardFooter>
    </CCard>
    </div>
    </div>

    <div id="sec1" data-aos="fade-up" data-aos-once="true" data-aos-delay="50" data-aos-offset="-500">
    <div>
    <h5 style="float:left">확정된 신청</h5>
    </div><br><br>
    <div v-if="isEmpty2">
        <CCard class="light_shadow">
      <CCardBody>
        <CRow>
            <CCol style="width:80%">
                <h4>신청 내역이 없습니다.</h4>
            </CCol>
        </CRow>
      </CCardBody>
    </CCard>
    </div>
    <div v-else>
    <CCard
        class="light_shadow"
        v-for="(cards, index) in determinedList" 
        :key="index"
    >
      <CCardBody>
        {{cards.MEMBER_NUM}}
        <CRow>
            <CCol style="width:80%">
                <h4 class="font_bold">{{cards.TITLE}}</h4>
                <h4>신청자: {{cards.USER_NICKNAME}}({{cards.USER_ID}})</h4>
                <h6>카테고리: {{getCategory(cards.BOARD_CATEGORY)}}</h6>
            </CCol>
        </CRow>
      </CCardBody>
      <CCardFooter v-if="cards.ACCEPTED == 2" class="bg-danger disable_padding">
        <h6 id="state_info_denied">신청 거부됨</h6>
      </CCardFooter>
      <CCardFooter v-else class="bg-success disable_padding">
        <h6 id="state_info_accepted">신청 승인됨</h6>
      </CCardFooter>
    </CCard>
    </div>
    </div>
    </div>
  </div>
</template>
<style scoped>
#state_info_denied{
  text-align: center; margin: 0 auto; color: white; font-weight: 600;
}
#state_info_accepted{
  text-align: center; margin: 0 auto; color: white; font-weight: 600;
}
</style>

<script>
import http from "../../http"
export default {
  name: 'MyRecvList',
  created(){
      this.$store.commit("pageStore/set_page", ["pageInfo", "받은 신청 목록"])
      this.$store.commit("pageStore/set_page", ["pageRoute", ""])
      http.get('/myPages/apply/recv').then((res)=>{
        if (res.status == 200){
          this.isEmpty1 = res.data.isEmpty1
          this.isEmpty2 = res.data.isEmpty2
          if (!this.isEmpty1)
            this.waitingList = res.data.waiting
          else
            this.waitingList = ["none"]
          this.determinedList = res.data.determined
        }
      }).catch(function (error){
        console.log(error)
      });
  },
  data () {
    return {
      isEmpty1: true,
      isEmpty2: true,
      waitingList:[],
      determinedList:[],
    }
  },
  methods: {
    createMessage(target){
      http.post('/message/create', {
        target_user: target
        }).then((res)=>{
        if (res.status == 200){
          this.$store.commit("pageStore/set_page", ["message", res.data.message_num])
          this.$router.push({ name: 'ChatView' })
        }
      }).catch(function (error){
        console.log(error)
      });
    },
    isEmpty(value){
      if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
        return true
        }else{
          return false
        }
    },
    setState(target, value){
      http.post('/myPages/apply/recv', {
        target_num: target,
        state: value
      }).then((res) => {
        if(res.status == 200){
          console.log(res.data.isFull)
        }
      }).catch(function (error){
        console.log(error)
      });
      http.get('/myPages/apply/recv').then((res)=>{
        if (res.status == 200){
          this.isEmpty1 = res.data.isEmpty1
          this.isEmpty2 = res.data.isEmpty2
          if (!this.isEmpty1)
            this.waitingList = res.data.waiting
          else
            this.waitingList = ["none"]
          this.determinedList = res.data.determined
        }
      }).catch(function (error){
        console.log(error)
      });
    },
    getCategory(value){
      switch(value){
        case 1:
          return "나의 학과"
        case 2:
          return "나의 학교"
        case 3:
          return "친구"
        case 4:
          return "동아리"
        default:
          return ""
      }
    },
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
    gotoPage(){
        this.$router.replace({ name: 'MyApplyList' })
    },
  }
}
</script>