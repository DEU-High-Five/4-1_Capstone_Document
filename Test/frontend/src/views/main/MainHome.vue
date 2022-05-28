<template>
  <div>
    <div v-if="isEmpty(1)" style="text-align: center; height: 70vh">
      <CSpinner style="margin-top: 35vh"> </CSpinner>
    </div>
    <div v-else>
      <CContainer>
        <div
          id="sec1"
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-once="true"
        >
          <CRow>
            <h5
              class="main_color"
              style="
                float: left;
                font-weight: 800;
                font-size: 20px;
                margin-left: 10px;
              "
            >
              나의 관리 기관
            </h5>
          </CRow>
          <CRow>
            <CCol
              col="6"
              class="pl-2 pr-2"
              v-for="(cards, index) in myManagement"
              :key="index"
            >
              <CCard
                class="main_color_border middle_shadow"
                @click="gotoViewList(cards.groupCode, cards.state)"
              >
                <CCardBody class="category_card" style="padding: 1rem">
                  <CCol>
                    <CRow sm="5" v-if="cards.title != ''">
                      <h4 class="card_title mb-0" v-text="cards.title"></h4>
                    </CRow>
                    <hr
                      style="
                        margin: 6px 0 0 -10px;
                        width: 120%;
                        border-color: #a90b0b;
                      "
                    />
                    <CRow>
                      <div
                        class="card_sub_title"
                        style="color: black; margin-top: 10px"
                        v-text="cards.subtitle"
                      ></div>
                    </CRow>
                  </CCol>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol col="6" class="pl-2 pr-2">
              <CCard
                class="main_color_background dark_shadow"
                @click="gotoGenNewGroup()"
              >
                <CCardBody class="category_card" style="padding: 1rem; display: inline-flex; margin: auto;">
                  <CIcon
                    size="custom"
                    width="50"
                    style="color: #df6f6f;"
                    :content="$options.icons.plusIcon"
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </div>

        <div
          id="sec1"
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-once="true"
          data-aos-delay="100"
        >
          <CRow class="mt-3">
            <h5
              class="main_color"
              style="
                float: left;
                font-weight: 800;
                font-size: 20px;
                margin-left: 10px;
              "
            >
              나의 소속 기관
            </h5>
          </CRow>
          <CRow>
            <CCol
              col="6"
              class="pl-2 pr-2"
              v-for="(cards, index) in myAffiliation"
              :key="index"
            >
              <CCard
                class="main_color_border middle_shadow"
                @click="gotoViewList(cards.groupCode, cards.state)"
              >
                <CCardBody class="category_card" style="padding: 1rem">
                  <CCol>
                    <CRow sm="5" v-if="cards.title != ''">
                      <h4 class="card_title mb-0" v-text="cards.title"></h4>
                    </CRow>
                    <hr
                      style="
                        margin: 6px 0 0 -10px;
                        width: 120%;
                        border-color: #a90b0b;
                      "
                    />
                    <CRow>
                      <div
                        class="card_sub_title"
                        style="color: black; margin-top: 10px"
                        v-text="cards.subtitle"
                      ></div>
                    </CRow>
                  </CCol>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol col="6" class="pl-2 pr-2">
              <CCard
                class="main_color_background dark_shadow"
                @click="gotoJoinGroup()"
              >
                <CCardBody class="category_card" style="padding: 1rem; display: inline-flex; margin: auto;">
                  <CIcon
                    size="custom"
                    width="50"
                    style="color: #df6f6f;"
                    :content="$options.icons.plusIcon"
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </div>
        <!-- <CModal
        :closeOnBackdrop="false"
        title="Modal_3"
        color="white"
        :show.sync="isNotAuthenticated"
        :centered="true"
      > -->

        <CModal
          :closeOnBackdrop="false"
          title="Modal_3"
          color="white"
          :centered="true"
        >
          로그인 정보가 만료되었습니다. 로그인 페이지로 이동합니다.
          <template #header>
            <h6 class="modal-title">로그인 만료됨</h6>
            <CButtonClose @click="gotoLogin()" class="text-white" />
          </template>
          <template #footer>
            <CButton @click="gotoLogin()" color="success"> 확인 </CButton>
          </template>
        </CModal>
      </CContainer>
    </div>
    <div style="width: 10px; height: 100px"></div>
  </div>
</template>
<style scoped>
</style>


<script>
import { cilPlus } from "@coreui/icons";
import { mapGetters } from "vuex";
import http from "../../http";

export default {
  name: "MainHome",
  icons: {
    plusIcon: cilPlus,
  },
  data() {
    return {
      myManagement: [
        {
          groupCode: "00000001",
          title: "응용소프트웨어 실습실 #1",
          subtitle: "동의대 응용소프트웨어공학 실습준비실입니다.",
          state: "manage"
        },
        {
          groupCode: "00000002",
          title: "(주) 동의 컴퍼니 웹 개발 부서",
          subtitle: "동의컴퍼니 웹 개발 부서입니다.",
          state: "manage"
        },
      ],
      myAffiliation: [
        {
          groupCode: "10000001",
          title: "AI 인공지능학과 실습준비실",
          subtitle: "동의대 인공지능 실습 준비실입니다.",
          state: "affiliation"
        },
        {
          groupCode: "10000002",
          title: "재즈사랑모임 악기 보관실",
          subtitle: "재즈와 리듬을 사랑하는 사람들 양산의 자랑 재사모",
          state: "affiliation"
        },
        {
          groupCode: "10000003",
          title: "서울시 청년 인재 양성 프로젝트",
          subtitle: "서울 SW 청년 인재 양성을 위한 프로젝트 그룹입니다.",
          state: "affiliation"
        },
      ],
    };
  },
  created() {
    this.$store.commit("pageStore/clear_all")
    /*
    http.post('/홈 경로', {
      userId: this.getUserInfo.userId
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

    http.post('/users/refresh', {
      userId: this.getUserInfo.userId
    }).then((res) => {
      console.log(res.data.message)
      if (res.status === 200) { 
        if(res.data.state == true){
          console.log(res.data.refreshed + " refreshed")
          if (res.data.refreshed == 'access'){
            this.$store.commit("refreshToken", res.data.newToken);
            
          }
        }
        else{
          this.$store.commit('set', ['sidebarShow', false])
          this.$store.dispatch("logout", {})
          .then(() => this.redirect())
          .catch(({ message }) => alert(message))
        }
      }
      }
      ).catch(function (error){
        console.log(error)
    })
    */
  },
  computed: {
    ...mapGetters(["isNotAuthenticated", "getUserInfo"]),
  },
  methods: {
    isEmpty(value) {
      if (
        value == "" ||
        value == null ||
        value == undefined ||
        (value != null &&
          typeof value == "object" &&
          !Object.keys(value).length)
      ) {
        return true;
      } else {
        return false;
      }
    },
    redirect() {
      console.log("redirect");
      if (!this.isNotAuthenticated) {
        this.$router.push({
          name: "Login",
        });
      }
    },
    aa() {
      console.log(this.$store.state.userStore.isAuthenticated);
    },
    color(value) {
      let $color;
      if (value <= 25) {
        $color = "info";
      } else if (value > 25 && value <= 50) {
        $color = "success";
      } else if (value > 50 && value <= 75) {
        $color = "warning";
      } else if (value > 75 && value <= 100) {
        $color = "danger";
      }
      return $color;
    },
    // getUserUniv(){
    //   this.$store.state.userStore.userUniv
    // },
    gotoLogin() {
      this.$router.replace({ path: "/pages/login" });
    },
    gotoCategoryView(value) {
      if (value != "") {
        this.$store.commit("pageStore/set_page", ["category", value]);
        this.$router.push({
          name: "CategoryView",
          query: { data: JSON.stringify({ category: value }) },
        });
        //this.$router.push({ name: 'CategoryView' })
      }
    },

    gotoGenNewGroup() {
      this.$router.push({ name: "GenNewGroup" });
    },
    gotoJoinGroup() {
      this.$router.push({ name: "JoinGroup" });
    },
    gotoViewList(value, target) {
      if (value != "") {
        this.$router.push({ name: 'ViewList', query: {data : JSON.stringify({groupCode: value, to: target})} })
        //this.$router.push({ name: "ViewListTmp" });
      }
    },
  },
};
</script>
