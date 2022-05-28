<template>
  <div>
    <CCard 
      class="light_shadow" v-if="isEmpty(stuff_info)"
    >
      <CCardBody>
        <h4 style="text-align:center"><b class="bold main_color">+</b> 버튼을 눌러<br>관리할 물품을 추가하세요.</h4>
      </CCardBody>
    </CCard>
    <CCard
      class="light_shadow" v-else
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
            <div v-if="stuff.file == ''" class="stf-image">
              <img
                class="light_shadow"
                style="border-radius: 20px"
                src="../../assets/images/Logo_only_black.svg"
                width="80"
                height="80"
              />
            </div>
            <div v-else class="stf-image">
              <img
                class="light_shadow"
                style="border-radius: 20px"
                :src="stuff.file"
                width="80"
                height="80"
              />
            </div>
          </CCol>
          <CCol col="8">
            <CRow>
              <h3 class="bold">{{ stuff.name }}</h3>
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
                  @click="modQuantity('decrease', index)"
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
                  {{ stuff.quantity }}
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
                  @click="modQuantity('increase', index)"
                  >+</CButton>
              </div>
            </CRow>
          </CCol>
        </CRow>
        <CRow class="pl-4 pr-4">
          <p style="font-size:18px">{{stuff.detail}}</p>
        </CRow>
        <CRow> 
          <CCol col="6">
            <CButton class="middle_shadow bold" color="primary" style="font-size:16px" @click="deleteStuff(index)" block>삭제</CButton>
          </CCol>
          <CCol col="6">
            <CButton class="middle_shadow bold" color="success" style="font-size:16px; background-color: #436e5e; border-color: #436e5e;" @click="ModifyStuff(index)" block>수정</CButton>
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
      <CButton class="bold" color="primary" style=" width: 92%; height: 45px; font-size:16px" @click="check_and_send()" block>물품 등록</CButton>
    </div>
  </div>
</template>

<style scoped>
.stf-image{
  width: 100%; height: 100%; overflow: hidden;
  background-size: cover;
  background-position: center;
}
</style>

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

      stuff_info: [],
    };
  },
  created() {
    this.$store.commit("pageStore/set_page", ["isFooterVisible", "false"]);
    this.$store.commit("pageStore/set_page", ["addList", "true"]);

    this.stuff_info = this.$store.state.addListStore.stuffList;
  },
  computed: {
    ...mapGetters(["isNotAuthenticated", "getUserInfo"]),
  },
  methods: {
    refresh_data(){
      this.stuff_info = this.$store.state.addListStore.stuffList;
    },
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
        name: "PrintQRCode"
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
    isEmpty(value){
      if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
        return true
        }else{
          return false
        }
    },
    modQuantity(mode, idx){
      switch(mode){
        case "decrease":
          if (this.stuff_info[idx].quantity <= 1) break;
          //this.stuff_info[idx].quantity--; 
          this.$store.commit("addListStore/decrease", idx);
          break;
        case "increase":
          this.$store.commit("addListStore/increase", idx);
          //this.stuff_info[idx].quantity++; 
          break;
      }
      this.refresh_data();
    },
     deleteStuff(idx){
      this.$store.commit("addListStore/delete", idx);
      this.refresh_data();
    },
    ModifyStuff(idx){
      this.$router.push({
        name: "ModifyNewStuff",
        query: { data: JSON.stringify({ stf_idx: idx }) },
      });
    },
    imgURL(file){
      return "aa"
    }
  },
};
</script>