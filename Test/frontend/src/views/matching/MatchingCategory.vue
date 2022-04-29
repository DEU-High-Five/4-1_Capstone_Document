<template>
  <div>
    <a class="light_shadow" style="font-size: 30px; font-weight:800; top:-13px; padding: 0 10px; position: relative; border-radius: 5px;"># {{getUserUniv}}</a>
    <br>
    <div v-if="isEmpty(this.myMajorData)"  style="text-align:center; height: 70vh;">
    <CSpinner style="margin-top: 35vh">
    </CSpinner>
    </div>
    <div v-else>
    <div id="sec1" data-aos="fade-up" data-aos-once="true">
    <h3 v-if="!getUserInfo.authorized" style="width: 10rem; background-color:purple; color: white; font-size: 20px; font-weight: 600; padding: 3px 10px; border-radius: 5px;">재학 인증 미완료</h3>
    <div>
    <h5 style="float:left">나의 학과 <a style="font-weight:600;">/ {{ getUserMajor }}</a></h5>
    <div class="medium text" style="float:right" @click="gotoCategoryView(1)">더보기 +</div>
    </div><br><br>
    <CCard class="my_major_card" @click="gotoViewPost(myMajorData.num)">
      <CCardBody class="category_card">
        <CRow>
          <CCol sm="5" v-if="this.myMajorData.title != ''">
            <h4 id="card_title_compact" class="card-title mb-0" v-text="this.myMajorData.title"></h4>
            <div class="medium" style="margin-top: 10px" v-text="this.myMajorData.subTitle"></div>
          </CCol>
          <CCol sm="5" v-else>
            <h4 id="card_title_compact" class="card-title mb-0">아직 게시물이 없습니다.</h4>
            <div class="medium" style="margin-top: 10px">새로운 게시물의 주인공이 되어보세요!</div>
          </CCol>
          <CCol sm="7" class="d-none d-md-block">
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
    </div>
    <div id="sec1" data-aos="fade-up" data-aos-once="true" data-aos-delay="100">
    <div>
    <h5 style="float:left">나의 학교 <a style="font-weight:600;">/ {{ getUserUniv }}</a></h5>
    <div class="medium text" style="float:right" @click="gotoCategoryView(2)">더보기 +</div>
    </div><br><br>
    <CCard class="my_univ_card" @click="gotoViewPost(myUnivData.num)">
      <CCardBody class="category_card">
        <CRow>
          <CCol sm="5" v-if="myUnivData.title != ''">
            <h4 id="card_title_compact" class="card-title mb-0" v-text="myUnivData.title"></h4>
            <div class="medium" style="margin-top: 10px" v-text="myUnivData.subTitle"></div>
          </CCol>
          <CCol sm="5" v-else>
            <h4 id="card_title_compact" class="card-title mb-0">아직 게시물이 없습니다.</h4>
            <div class="medium" style="margin-top: 10px">새로운 게시물의 주인공이 되어보세요!</div>
          </CCol>
          <CCol sm="7" class="d-none d-md-block">
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
    </div>
    <div id="sec1" data-aos="fade-up" data-aos-once="true" data-aos-delay="200">
    <div>
    <h5 style="float:left">친구 <a style="font-weight:600;">/ {{ getUserMajor }}</a></h5>
    <div class="medium text" style="float:right" @click="gotoCategoryView(3)">더보기 +</div>
    </div><br><br>
    <CCard class="friends_card" @click="gotoViewPost(friendsData.num)">
      <CCardBody class="category_card">
        <CRow>
          <CCol sm="5" v-if="friendsData.title != ''">
            <h4 id="card_title_compact" class="card-title mb-0" v-text="friendsData.title"></h4>
            <div class="medium" style="margin-top: 10px" v-text="friendsData.subTitle"></div>
          </CCol>
          <CCol sm="5" v-else>
            <h4 id="card_title_compact" class="card-title mb-0">아직 게시물이 없습니다.</h4>
            <div class="medium" style="margin-top: 10px">새로운 게시물의 주인공이 되어보세요!</div>
          </CCol>
          <CCol sm="7" class="d-none d-md-block">
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
    </div>
    <div id="sec1" data-aos="fade-up" data-aos-delay="300" data-aos-once="true" data-aos-anchor="top-top">
    <div>
    <h5 style="float:left">동아리 <a style="font-weight:600;">/ {{ getUserMajor }}</a></h5>
    <div class="medium text" style="float:right" @click="gotoCategoryView(4)">더보기 +</div>
    </div><br><br>
    <CCard class="club_card" @click="gotoViewPost(clubData.num)">
      <CCardBody class="category_card">
        <CRow>
          <CCol sm="5" v-if="clubData.title != ''">
            <h4 id="card_title_compact" class="card-title mb-0" v-text="clubData.title"></h4>
            <div class="medium" style="margin-top: 10px" v-text="clubData.title"></div>
          </CCol>
          <CCol sm="5" v-else>
            <h4 id="card_title_compact" class="card-title mb-0">아직 게시물이 없습니다.</h4>
            <div class="medium" style="margin-top: 10px">새로운 게시물의 주인공이 되어보세요!</div>
          </CCol>
          <CCol sm="7" class="d-none d-md-block">
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
    </div>
    <CModal
      :closeOnBackdrop="false"
      title="Modal_3"
      color="white"
      :show.sync="isNotAuthenticated"
      :centered="true"
    >
      로그인 정보가 만료되었습니다. 로그인 페이지로 이동합니다.
      <template #header>
        <h6 class="modal-title">로그인 만료됨</h6>
        <CButtonClose @click="gotoLogin()" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="gotoLogin()" color="success">  확인  </CButton>
      </template>
    </CModal>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import http from "../../http"

export default {
  name: 'MatchingCategory',
  data () {
    return {
      myMajorData: {},
      myUnivData: {},
      friendsData: {},
      clubData: {},
      tableData: {},
    }
  },
  created(){
    this.$store.commit("pageStore/set_page", ["pageInfo", "매칭"])
    this.$store.commit("pageStore/set_page", ["pageRoute", ""])
  
    http.post('/matching', {
      user_univ: this.getUserInfo.univ,
      user_major: this.getUserInfo.major
    }).then((res) => {
      if (res.status === 200) { 
        this.myMajorData = res.data.posts.myMajor
        this.myUnivData = res.data.posts.myUniv
        this.friendsData = res.data.posts.friends
        this.clubData = res.data.posts.club
      }
      }).catch(function (error){
        console.log(error)
    })
    // http.post('/users/refresh', {
    //   userId: this.getUserInfo.userId
    // }).then((res) => {
    //   console.log(res.data.message)
    //   if (res.status === 200) { 
    //     if(res.data.state == true){
    //       console.log(res.data.refreshed + " refreshed")
    //       if (res.data.refreshed == 'access'){
    //         this.$store.commit("refreshToken", res.data.newToken);
            
    //       }
    //     }
    //     else{
    //       this.$store.commit('set', ['sidebarShow', false])
    //       this.$store.dispatch("logout", {})
    //       .then(() => this.redirect())
    //       .catch(({ message }) => alert(message))
    //     }
    //   }
    //   }
    //   ).catch(function (error){
    //     console.log(error)
    // })
  },
  computed:{
    ...mapGetters([
      "isNotAuthenticated",
      "getUserUniv",
      "getUserMajor",
      "getUserInfo"
      ])
  },
  methods: {
    isEmpty(value){
      if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
        return true
        }else{
          return false
        }
    },
    redirect() {
        console.log("redirect")
        if (!this.isNotAuthenticated) {
          this.$router.push({
            name: "Login",
          })
        }
      },
    aa(){
      console.log(this.$store.state.userStore.isAuthenticated)
    },
    color (value) {
      let $color
      if (value <= 25) {
        $color = 'info'
      } else if (value > 25 && value <= 50) {
        $color = 'success'
      } else if (value > 50 && value <= 75) {
        $color = 'warning'
      } else if (value > 75 && value <= 100) {
        $color = 'danger'
      }
      return $color
    },
    // getUserUniv(){
    //   this.$store.state.userStore.userUniv
    // },
    gotoLogin(){
        this.$router.replace({ path: '/pages/login' })
    },
    gotoCategoryView(value){
      if (value != ''){
        this.$store.commit("pageStore/set_page", ["category", value])
        this.$router.push({ name: 'CategoryView', query: {data : JSON.stringify({category: value})} })
        //this.$router.push({ name: 'CategoryView' })
      }
    },
    gotoViewPost(value){
      if (value != ''){
        this.$router.push({ name: 'ViewPost', query: {data : JSON.stringify({num: value})} })
      }
    },
  }
}
</script>
