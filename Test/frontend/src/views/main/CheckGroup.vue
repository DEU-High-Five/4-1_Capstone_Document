<template>
  <div>
    <CContainer>
      <CRow v-if="isExist" class="justify-content-center">
        <CCol md="8" id="login_body">
          <div id="reg_final_description_zone">
            <div style="margin-top: 20%">
              <div
                id="sec1"
                data-aos="fade-down"
                data-aos-duration="800"
                data-aos-once="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  role="img"
                  class="c-icon c-icon-custom-size"
                  height="100"
                >
                  <path
                    fill="#a90b0b"
                    d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"
                    class="ci-primary"
                  ></path>
                </svg>
              </div>
              <br />
              <div
                id="sec1"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-once="true"
              >
                <div>
                  <h1 class="bold" style="font-size: 30px">
                    찾던 기관이 맞나요?
                  </h1>
                </div>
                <br />
                <div
                  class="light_dark_shadow border-outline-color"
                  style="padding: 20px 0; text-align: center"
                >
                  <h2 class="bold">{{ title }}</h2>
                  <h6 style="width: 70%; margin: 0 auto">{{ subtitle }}</h6>
                </div>
              </div>
              <div
                id="sec1"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-once="true"
                data-aos-delay="100"
              >
                <CButton
                  class="light_dark_shadow"
                  style="margin-top: 20%"
                  size="lg"
                  color="primary"
                  block
                  @click="gotoSuccessPage()"
                  >맞아요!</CButton
                >
                <CButton
                  class="light_dark_shadow"
                  size="lg"
                  variant="outline"
                  style="margin-top: 15px"
                  color="primary"
                  block
                  @click="checkModal = true"
                  >아닌데요?</CButton
                >
              </div>
            </div>
          </div>
        </CCol>
      </CRow>

      <CRow v-else class="justify-content-center">
        <CCol md="8" id="login_body">
          <div id="reg_final_description_zone">
            <div style="margin-top: 20%">
              <div
                id="sec1"
                data-aos="fade-down"
                data-aos-duration="800"
                data-aos-once="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  role="img"
                  class="c-icon c-icon-custom-size"
                  height="100"
                >
                  <rect
                    width="32"
                    height="176"
                    x="240"
                    y="176"
                    fill="#a90b0b"
                    class="ci-primary"
                  ></rect>
                  <rect
                    width="32"
                    height="32"
                    x="240"
                    y="384"
                    fill="#a90b0b"
                    class="ci-primary"
                  ></rect>
                  <path
                    fill="#a90b0b"
                    d="M274.014,16H237.986L16,445.174V496H496V445.174ZM464,464H48V452.959L256,50.826,464,452.959Z"
                    class="ci-primary"
                  ></path>
                </svg>
              </div>
              <br />
              <div>
                <h1 class="bold" style="font-size: 35px">
                  존재하지 않는<br />기관 코드입니다.
                </h1>
              </div>
              <CButton
                class="light_dark_shadow"
                style="margin-top: 20%"
                size="lg"
                color="primary"
                block
                @click="gotoMain"
                >홈 화면으로 돌아가기</CButton
              >
              <CButton
                class="light_dark_shadow"
                size="lg"
                variant="outline"
                style="margin-top: 15px"
                color="primary"
                block
                @click="gotoPreviousPage"
                >다시 찾아보러 가기</CButton
              >
            </div>
          </div>
        </CCol>
      </CRow>
      <CModal
        class="show d-block position-static"
        :show.sync="checkModal"
        :centered="true"
        title="upload_modal"
        size="sm"
        color="white"
      >
        <h5>다시 찾아볼까요?</h5>
        <template #header>
          <h4 class="modal-title">다시 등록하러 가기</h4>
          <CButtonClose @click="checkModal = false" class="text-white" />
        </template>
        <template #footer>
          <CButton
            @click="
              checkModal = false;
              gotoMain();
            "
            style="width: 80px"
            color="danger"
            >아니요</CButton
          >
          <CButton
            @click="
              checkModal = false;
              gotoPreviousPage();
            "
            style="width: 60px"
            color="success"
            >네</CButton
          >
        </template>
      </CModal>
    </CContainer>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import http from "../../http";
export default {
  name: "CheckGroup",
  data() {
    return {
      isExist: true,
      groupCode: "",
      title: "응소 실습준비실 #1",
      subtitle: "동의대학교 응용소프트웨어공학과 실습준비실 1번입니다.",
      checkModal: false,
    };
  },
  created() {
    this.groupCode = JSON.parse(this.$route.query.data).groupCode;
  },
  computed: {
    ...mapGetters(["isNotAuthenticated", "getUserInfo"]),
  },
  methods: {
    // 기관코드로 DB 접근, 기관 이름과 기관 설명 가져오기
    gotoMain() {
      this.$router.replace({ name: "MainHome" });
    },
    gotoPreviousPage() {
      this.$router.replace({ name: "JoinGroup" });
    },
    gotoSuccessPage() {
      this.$router.replace({ name: "JoinGroupSuccess" });
    },
  },
};
</script>