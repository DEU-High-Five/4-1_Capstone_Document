<template>
  <div>
    <div v-if="isArrayEmpty(this.messageList)" style="text-align:center; height: 70vh;">
    <CSpinner style="margin-top: 35vh">
    </CSpinner>
    </div>
    <div v-else>
    <div id="sec1" data-aos="fade-up" data-aos-once="true">
    <div>
    <h5 style="float:left">쪽지 목록</h5>
    </div><br><br>
    <div v-if="isEmpty">
    <CCard class="light_shadow">
      <CCardBody>
        <CRow>
            <CCol style="width:80%">
                <h4>쪽지가 없습니다.</h4>
            </CCol>
        </CRow>
      </CCardBody>
    </CCard>
    </div>
    <div v-else>
    <CCard
        class="light_shadow"
        v-for="(cards, index) in messageList" 
        :key="index"
    >
      <CCardBody style="padding: 0.5rem" @click="gotoChatView(cards.MESSAGE_NUM)">
        <CRow>
            <CCol class="ml-3">
                <h4 class="font_bold">{{cards.MESSAGE_NUM}} {{cards.USER_ID}}</h4>
            </CCol>
        </CRow>
        <CRow>
          <CCol class="ml-3">
          {{cards.SENDER_NICKNAME}} : {{cards.CONTENT}}
          </CCol>
        </CRow>
      </CCardBody>
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
  name: 'MessageHome',
  created(){
      this.$store.commit("pageStore/set_page", ["pageInfo", "쪽지"])
      this.$store.commit("pageStore/set_page", ["pageRoute", ""])
      http.get('/message/list').then((res)=>{
        if (res.status == 200){
          this.isEmpty = res.data.isEmpty
          if (!this.isEmpty)
            this.messageList = res.data.result
          else
            this.messageList = ["none"]
        }
      }).catch(function (error){
        console.log(error)
      });
  },
  data () {
    return {
      isEmpty: true,
      messageList:[],
    }
  },
  methods: {
    isArrayEmpty(value){
      if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
        return true
        }else{
          return false
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
    gotoPage(){
        this.$router.replace({ name: 'MyRecvList' })
    },
    gotoChatView(value){
      if (value == undefined) return;
      this.$store.commit("pageStore/set_page", ["message", value])
      this.$router.push({ name: 'ChatView' })
    },
  }
}
</script>