<template>
  <div>
    <div v-if="isEmpty(this.tableItems)"  style="text-align:center; height: 70vh;">
    <CSpinner style="margin-top: 35vh">
    </CSpinner>
    </div>
    <div v-else>
    <div id="sec1" data-aos="fade-up" data-aos-once="true">
    <div>
    <h5 style="float:left" v-text="this.pageTitle"></h5>
    <CButton
      pressed
      block
      color="secondary"
      shape="pill"
      aria-pressed="true"
      style="width: 150px; float:right; margin-top: -10px; font-weight:800"
      @click="gotoNewPost()"
      v-if="getUserInfo.authorized"
    >
    새 모집글 올리기
    </CButton>
    </div><br><br>
    </div>

    <!-- 게시물이 하나도 없을 때 출력 -->
     <CCard
      :class="getCardClass() + '_card'"
      id="sec2"
      v-if="this.tableItems.isEmpty"
      data-aos="fade-up"
      data-aos-once="true"
      data-aos-offset="-100"
     >
      <CCardBody class="category_detail">
        <CRow>
          <CCol sm="5">
            <h4 id="card_title" class="card-title mb-0">아직 게시물이 없습니다.</h4>
            <div class="medium" style="margin-top: 10px">새로운 게시물의 주인공이 되어보세요!</div>
          </CCol>
          <CCol sm="7" class="d-none d-md-block">
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="5" style="margin-top: 20px; left:-10px">
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>


    <CCard :class="getCardClass() + '_card'" v-for="(cards, index) in tableItems.result" :key="index" id="sec2" data-aos="fade-up" data-aos-once="true" data-aos-offset="-100" :data-aos-delay="delay_value(index)">
      <CRow id="card_head_count" v-if="!(cards.HEAD_COUNT == cards.BOARD_MAX)" :style="{backgroundColor: color(cards.HEAD_COUNT, cards.BOARD_MAX)}">
        <div style="margin:auto">{{cards.HEAD_COUNT}} / {{cards.BOARD_MAX}}</div>
      </CRow>
      <CRow id="card_head_count" v-else :style="{backgroundColor: color(cards.HEAD_COUNT, cards.BOARD_MAX)}">
        <div style="margin:auto">모집 완료</div>
      </CRow>
      <CCardBody class="category_detail" @click="gotoViewPost(cards.BOARD_NUM)">
        <CRow>
          <CCol sm="5">
            <h4 id="card_title" class="card-title mb-0 title_text_color" v-text="cards.TITLE"></h4>
            <div class="medium title_text_color sub_title" style="margin-top: 10px" v-text="cards.SUB_TITLE"></div>
          </CCol>
          <CCol sm="7" class="d-none d-md-block">
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="5" style="margin-top: 10px; left:-10px">
            <div v-if="cards.TAG_1 != null" id="tag_box" style="float:left">
              #{{ cards.TAG_1 }}
            </div>
            <div v-if="cards.TAG_2 != null" id="tag_box" style="float:left">
              #{{ cards.TAG_2 }}
            </div>
            <div v-if="cards.TAG_3 != null" id="tag_box" style="float:left">
              #{{ cards.TAG_3 }}
            </div>
          </CCol>
        </CRow>
      </CCardBody>
      <CCardFooter :class="'color_' + getCardClass()" style="color: white; padding: 0.1rem 1.25rem; text-align: right">
        모집 마감일 : {{cards.BOARD_DEADLINE.split("T")[0]}}
      </CCardFooter>
      <div v-if="get_close(cards.HEAD_COUNT, cards.BOARD_MAX, cards.BOARD_DEADLINE)" @click="gotoViewPost(cards.BOARD_NUM)">
        <CElementCover>
          <h1 class="d-inline font_bold" style="color:#555;">모집 마감</h1>
        </CElementCover>
      </div>
    </CCard>
    </div>
  </div>
</template>
<style scoped>
#card_title{
  font-weight: 800;
  width:80%;
  text-overflow: ellipsis;
  text-shadow: 3px 3px 7px #555555;
}
#tag_box{
  background-color: yellow;
  margin-left: 10px;
  border-radius: 5px;
  color: black;
  padding-left: 3px;
  padding-right: 3px;
}
#card_head_count{
  position: absolute;
  margin-top: 20px;
  left: 82%;
  width: 60px;
  height: 30px;
  border-radius: 3px;
  font-weight: 800;
  color: #fff;
  text-shadow: 3px 3px 7px rgb(92, 92, 92);
}
.category_detail{
  height: 160px;
  color: aliceblue;
}
</style>

<script>
import axios from 'axios';
import http from "../../http"
import { mapGetters } from "vuex"
export default {
  name: 'CategoryView',
  components: {
  },
  computed:{
    ...mapGetters([
      "isNotAuthenticated",
      "getUserInfo"
    ])
  },
  
  data () {
    return {
      category: '',
      pageTitle: '',
      cardClass: '',
      tableItems: [],
        // {
        //   title: "캡스톤 디자인 팀 구해요~!",
        //   sub_title: "스마트 앱 개발 계획인데 같이 하실 분!",
        //   tag: ["#상냥한", "#의기소침한", "#재밌는"],
        //   head_count_max: 4,
        //   head_count: 4,
        // },
    }
  },
  created(){
    this.category = this.$store.state.pageStore.category
    //this.category = JSON.parse(this.$route.query.data).category
    switch(this.$store.state.pageStore.category){
      case 1:
        this.$store.commit("pageStore/set_page", ["pageRoute", "> 나의 학과"])
        this.cardClass = "my_major"
        this.pageTitle = "나의 학과"
        break;
      case 2:
        this.$store.commit("pageStore/set_page", ["pageRoute", "> 나의 학교"])
        this.cardClass = "my_univ"
        this.pageTitle = "나의 학교"
        break;
      case 3:
        this.$store.commit("pageStore/set_page", ["pageRoute", "> 친구"])
        this.cardClass = "friends"
        this.pageTitle = "친구"
        break;
      case 4:
        this.$store.commit("pageStore/set_page", ["pageRoute", "> 동아리"])
        this.cardClass = "club"
        this.pageTitle = "동아리"
        break;
      default:
        this.cardClass = ''
        break;
    }
    this.$store.commit("pageStore/set_page", ["pageInfo", "매칭"])
    http.post('/matching/category', {
      category: this.$store.state.pageStore.category,
      user_univ: this.$store.state.userStore.userUniv,
      user_major: this.$store.state.userStore.userMajor,
    })
      .then((response) => {
        this.tableItems = response.data
      })
  },
  methods: {
    get_close(cnt, max, date){
      if (cnt >= max){
        return true;
      }
      var now = new Date();
      var temp = new Date(date.split('T')[0] + ' ' + date.split('T')[1]);
      if(now.getTime() > temp.getTime()){
        return true;
      }
      return false;
    },
    aa(card){
      console.log(card)
    },
    isEmpty(value){
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
    gotoLogin(){
        this.$router.push({ name: 'ViewPost' })
    },
    gotoNewPost(){
      this.$router.push({ name: 'NewPost', query: {data : JSON.stringify({category: this.category})} })
        //this.$router.push({ name: 'NewPost' })
    },
    getCardClass(){
      return this.cardClass
    },
    gotoViewPost(value){
      if (value != undefined){
        this.$router.push({ name: 'ViewPost', query: {data : JSON.stringify({num: value})} })
      }
    },
  }
}
</script>
