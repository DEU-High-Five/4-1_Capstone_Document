<template>
  <div>
    <div v-if="false"  style="text-align:center; height: 70vh;">
    <CSpinner style="margin-top: 35vh">
    </CSpinner>
    </div>
    <div v-else>
      <CWrapper style="min-height: 73vh; margin-bottom:90px" id="chat">
        <div style="text-align: center; margin-bottom: 10px">
          <div style="background-color:#EEE; padding: 5px 20px; border-radius: 30px;">
            <a>채팅에 참여하였습니다.</a><br>
            <a>경고! 본 채팅방을 이용해 민감한 개인정보 등을<br>공유하지 마십시오.</a>
          </div>
        </div>
      <div v-for="(message, index) in chat" :key="index">
        <!-- 타인 메시지 -->
        <div v-if="!message.MY_MESSAGE" style="margin: 10px 0">
          <div v-if="index == 0">
            <div id="circle" class="ml-2" style="float: left"/>
            <h6 style="margin-left: 3.5rem">{{message.NICKNAME}}</h6>
          </div>
          <div v-else>
            <div v-if="chat[index-1].MY_MESSAGE">
              <div id="circle" class="ml-2" style="float: left"/>
              <h6 style="margin-left: 3.5rem">{{message.NICKNAME}}</h6>
            </div>
          </div>
          <div>
            <div style="clear:left"/>
            <div class="light_dark_shadow stranger_chat">
              <a>{{message.CONTENT}}</a>
            </div>
              <a style="float:left; margin-left:10px; color:#AAA"> {{get_message_time(message.CREATED_AT)}}</a>
          </div>
        </div>

        <!-- 본인 메시지 -->
        <div v-else class="mr-2">
          <div class="light_dark_shadow my_chat" style="margin: 10px 0 10px 0">
            <a>{{message.CONTENT}}</a>
          </div>
          <a style="float:right; margin-right:5px; color:#AAA; margin-top:20px">
            <!-- <a v-if="message.checked">읽음</a><a v-else>안 읽음</a>  -->
            {{get_message_time(message.CREATED_AT)}}
            </a>
          <div style="clear:right"/>
        </div>
        </div>
      </CWrapper>
      <CFooter style="position: fixed; height: 17vh; background-color: white;">
      <CInput style="margin-bottom: 50%;width: 100%; padding-top:10px" type="text" value="" v-model="input_message" autocomplete="off" maxlength="30">
      <template #append>
        <CButton color="info" style="padding: 0 0.5rem" @click="send_message()"><CIcon size="lg" :content="$options.sendIcon"/></CButton>
      </template>
      </CInput>
      </CFooter>
    </div>
  </div>
</template>
<style scoped>
#circle{
  background-color: grey;
  width: 2.5rem;
  height: 2.5rem;
}

.stranger_chat{
 padding: 5px 10px; font-size: 18px; border-radius: 5px; max-width: 70%; margin-left: 2.5rem; word-break: break-all; float:left
}

.my_chat{
  background-color: #EEE; padding: 5px 10px; font-size: 18px; border-radius: 5px; max-width: 80%; word-break: break-all; float: right;
}

</style>

<script>
import { cilPaperPlane } from '@coreui/icons'

import http from "../../http"
export default {
  name: 'MyAccount',
  sendIcon: cilPaperPlane,
  created(){
      this.$store.commit("pageStore/set_page", ["pageInfo", "쪽지"])
      this.$store.commit("pageStore/set_page", ["pageRoute", ""])
      http.post('/message', {
        message_num: this.$store.state.pageStore.message
      }).then((res)=>{
        if (res.status == 200){
          this.isEmpty = res.data.isArrayEmpty
          if (!this.isEmpty)
            this.chat = res.data.result
        }
      }).catch(function (error){
        console.log(error)
      });
  },
  data () {
    return {
      isEmpty: true,
      input_message: '',
      chat:[],
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
    request_message(){
      http.post('/message', {
        message_num: this.$store.state.pageStore.message
      }).then((res)=>{
        if (res.status == 200){
          this.isEmpty = res.data.isEmpty
          if (!this.isEmpty)
            this.chat = res.data.result
        }
      }).catch(function (error){
        console.log(error)
      });
    },
    async send_message(){
      if (this.input_message == '') return;
      await http.post('/message/send', {
        message_num: this.$store.state.pageStore.message,
        content: this.input_message
      }).then((res) => {
          if (res.status === 200) { 
            this.request_message();
            this.input_message = '';
          }
        }).catch(function (error){
          console.log(error)
        });
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
    get_message_time(time){
      if(time == undefined) return;
      var temp = new Date(time.split('T')[0] + ' ' + time.split('T')[1]);
      var now = new Date();
      var diff = (now.getTime() - temp.getTime()) / 1000
      if(diff < 1){
        return "방금";
      }
      else if(diff < 60){
        return parseInt(diff) + "초 전";
      }
      else if(diff < 60 * 60){
        return parseInt(diff/60) + "분 전";
      }
      else if(diff < 24 * 60 * 60){
        return parseInt(diff/(60*60)) + "시간 전";
      }
      else if(diff < 30 * 24 * 60 * 60){
        return parseInt(diff/(60*60*24)) + "일 전";
      }
      else if(diff < 12 * 30 * 24 * 60 * 60){
        return parseInt(diff/(60*60*24*30)) + "달 전";
      }
      else{
        return parseInt(diff/(60*60*24*30*12)) + "년 전";
      }
    },
  }
}
</script>