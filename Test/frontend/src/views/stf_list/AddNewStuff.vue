<template>
  <div>
    <CCard
      class="light_shadow"
      v-for="(stuff, index) in stuff_info"
      :key="index"
    >
      <CCardBody>
        <CRow>
          <CCol
            col="4"
            class="pl-1"
            style="
              width: 100px;
              height: 100px;
              align-items: center;
              text-align: center;
            "
          >
            <div style="width: 100%; height: 100%; overflow: hidden">
              <img
                class="light_shadow"
                style="border-radius: 20px"
                src="../../assets/images/Logo_only_black.svg"
                width="80"
                height="80"
              />
            </div>
          </CCol>
          <CCol col="8">
            <CRow>
              <h3 class="bold">{{ stuff.title }}</h3>
            </CRow>
            <CRow>
              <p class="mb-1" style="font-size: 20px; margin: auto 0">수량:</p>
              <div
                style="
                  display: inline-flex;
                  margin-left: auto;
                  margin-right: 17px;
                "
              >
                <CButton
                  class="ml-1 middle_shadow"
                  color="light"
                  style="
                    font-size: 16px;
                    font-weight: 800;
                    border: solid 1px #999;
                    width: 40px;
                  "
                  >-</CButton
                >
                <p
                  class="mb-1"
                  style="
                    font-size: 20px;
                    font-weight: 800;
                    margin: auto 0;
                    width: 60px;
                    text-align: center;
                  "
                >
                  {{ 1 }}
                </p>
                <CButton
                  class="middle_shadow"
                  color="light"
                  style="
                    font-size: 16px;
                    font-weight: 800;
                    border: solid 1px #999;
                    width: 40px;
                  "
                  >+</CButton>
              </div>
            </CRow>
          </CCol>
        </CRow>
        <CRow class="pl-4 pr-4">
          <p style="font-size:18px">{{stuff.subtitle}}</p>
        </CRow>
        <CRow> 
          <CCol col="6">
            <CButton class="middle_shadow bold" color="primary" style="font-size:16px" block>삭제</CButton>
          </CCol>
          <CCol col="6">
            <CButton class="middle_shadow bold" color="success" style="font-size:16px; background-color: #436e5e; border-color: #436e5e;" block>수정</CButton>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>

    <CCard class="border-outline-color middle_shadow" @click="addNew()">
      <CCardBody
        style="height: 80px; display: inline-block; margin: 8px auto 0 auto"
      >
        <CIcon
          size="custom"
          width="30"
          style="color: #a90b0b"
          :content="$options.icons.plusIcon"
        />
      </CCardBody>
    </CCard>
    <div style="width: 10px; height: 100px"></div>
    <div style="position:fixed; width: 100%; height: 80px; bottom: 0; padding-top: 10px;background-color: #ffffff;">
      <CButton class="bold" color="primary" style=" width: 92%; height: 45px; font-size:16px" block>물품 등록</CButton>
    </div>
  </div>
</template>


<script>
import { cilPlus } from "@coreui/icons";
import { mapGetters } from "vuex";
import http from "../../http";
export default {
  name: "AddNewStuff",
  icons: {
    plusIcon: cilPlus,
  },
  data() {
    return {
      groupCode: "",

      varia: false,

      title: "응용소프트웨어 실습실 #1",
      subtitle: "동의대 응용소프트웨어공학 실습준비실입니다.",

      stuff_info: [
        {
          title: "물품 이름 1",
          subtitle: "물품1에 대한 간략한 설명입니다.",
          in_stock: true,
        },
        {
          title: "물품 이름 2",
          subtitle: "물품2에 대한 간략한 설명입니다.",
          in_stock: false,
        },
      ],
    };
  },
  created() {
    this.$store.commit("pageStore/set_page", ["isFooterVisible", "false"]);
    this.$store.commit("pageStore/set_page", ["addList", "true"]);
  },
  computed: {
    ...mapGetters(["isNotAuthenticated", "getUserInfo"]),
  },
  methods: {
    show_upload_modal() {
      const checker = this.upload_checker();
      if (!checker) return;
      return (this.uploadModal = true);
    },
    upload_checker() {
      // 기관 코드
      if (this.groupCode[0].length != 4 || this.groupCode[1].length != 4) {
        this.warning_group_code = true;
      } else {
        this.warning_group_code = false;
      }

      // 직급/부서
      if (
        this.userDescription == "" ||
        this.userDescription.length < 1 ||
        this.userDescription.length > 20
      ) {
        this.warning_user_desc = true;
      } else {
        this.warning_user_desc = false;
      }

      if (this.warning_group_code || this.warning_user_desc) {
        return false;
      }
      this.uploadModal = true;
      return true;
    },
    show_warning_group_code() {
      if (this.warning_group_code) return false;
      return "";
    },
    show_warning_user_desc() {
      if (this.warning_user_desc) return false;
      return "";
    },
    check_and_send() {
      //임시
      return this.$router.replace({
        name: "CheckGroup",
        query: { data: JSON.stringify({ groupCode: this.groupCode }) },
      });

      http
        .post("주소", {
          userId: "",
          groupCode: this.groupCode,
        })
        .then((res) => {
          console.log(res.data.success);
          if (res.data.success == true) {
            this.$router.replace({
              name: "GenGroupSuccess",
              query: { data: JSON.stringify({ num: res.data.target }) },
            });
          }
          if (res.data.success == false) {
            this.$router.replace({ path: "/pages/register_failed" });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    gotoMain() {
      this.$router.push({ name: "MainHome" });
    },
    addNew() {
      this.$router.push({ name: "SetNewStuff" });
    },
  },
};
</script>