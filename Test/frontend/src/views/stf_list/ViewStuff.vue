<template>
  <div>
    <CContainer class="justify-content-center">
      <div
        style="width: 100%; height: 100%; text-align: center"
      >
        <img
          class="middle_shadow"
          style="border-radius: 20px"
          src="../../assets/images/Logo_only_black.svg"
          width="130"
          height="130"
        />
      </div>
      <CRow class="mt-3">
        <h2 class="bold" style="margin: 0 auto;">{{ stuff.title }}</h2>
      </CRow>
      <CRow>
        <h6 class="mt-2"  style="margin: 0 auto; text-align: center;">{{ stuff.subtitle }}</h6>
      </CRow>
      <CRow class="mt-3">
      <div v-if="!stuff.available" class="style-pill" style="color: #a90b0b; margin: 0 auto">
        대여 중
      </div>
      <div v-else class="style-pill" style="color: #00aa1c; margin: 0 auto">대여 가능</div>
      </CRow>
      <CRow class="mt-4"> 
          <CCol col="6">
            <CButton class="middle_shadow bold" color="primary" style="font-size:16px" @click="returnModal=true" :disabled="stuff.available" block>반납</CButton>
          </CCol>
          <CCol col="6">
            <CButton class="middle_shadow bold" color="success" style="font-size:16px; background-color: #436e5e; border-color: #436e5e;" @click="rentalModal=true"  block>대여</CButton>
          </CCol>
        </CRow>
        <CRow v-if="this.$store.state.pageStore.isManager=='manage'" class="mt-3 pl-3 pr-3"> 
            <CButton class="middle_shadow bold" color="info" style="font-size:16px" block>물품 정보 수정</CButton>
        </CRow>
        <CRow class="mt-4">
          <h6 style="margin: 0 auto">마지막 대여자: {{maskingName(last.name)}}</h6>
        </CRow>
        <CRow class="mt-1">
          <h6 style="margin: 0 auto">대여 일시: {{get_time(last.date)}}</h6>
        </CRow>
    </CContainer>
    <CModal
      class="show d-block position-static"
      :show.sync="rentalModal"
      :centered="true"
      title="upload_modal"
      size="sm"
      color="white"
    >
      <h5>대여하시겠습니까?</h5>
      <template #header>
        <h4 class="modal-title">대여 확인</h4>
        <CButtonClose @click="rentalModal = false" class="text-white" />
      </template>
      <template #footer>
        <CButton @click="rentalModal = false" style="width: 60px" color="danger"
          >취소</CButton
        >
        <CButton
          @click="
            rentalModal = false;
            check_and_send();
          "
          style="width: 60px"
          color="success"
          >확인</CButton
        >
      </template>
    </CModal>
    <CModal
      class="show d-block position-static"
      :show.sync="returnModal"
      :centered="true"
      title="upload_modal"
      size="sm"
      color="white"
    >
      <h5>반납하시겠습니까?</h5>
      <template #header>
        <h4 class="modal-title">반납 확인</h4>
        <CButtonClose @click="returnModal = false" class="text-white" />
      </template>
      <template #footer>
        <CButton @click="returnModal = false" style="width: 60px" color="danger"
          >취소</CButton
        >
        <CButton
          @click="
            returnModal = false;
            check_and_send();
          "
          style="width: 60px"
          color="success"
          >확인</CButton
        >
      </template>
    </CModal>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import http from "../../http";
export default {
  name: "ViewList",

  data() {
    return {
      stuffCode: "",
      rentalModal: false,
      returnModal: false,
      modifyModal: false,
      stuff: {
        title: "물품 이름 1",
        subtitle: "물품에 대한 간략한 설명입니다.",
        file: "",
        available: true,
      },
      last:{
        name: "정현수",
        date: "2022-06-01T11:20:33"
      }
    };
  },
  created() {
    this.stuffCode = JSON.parse(this.$route.query.data).stuffCode;
  },
  computed: {
    ...mapGetters(["isNotAuthenticated", "getUserInfo"]),
  },
  methods: {
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
    gotoAddStuff() {
      this.$router.push({ name: "AddNewStuff" });
    },
    maskingName(strName) {
      if (strName.length > 2) {
          var originName = strName.split('');
          originName.forEach(function(name, i) {
            if (i === 0 || i === originName.length - 1) return;
            originName[i] = '*';
          });
          var joinName = originName.join();
          return joinName.replace(/,/g, '');
        } else {
          var pattern = /.$/;
          return strName.replace(pattern, '*');
        }
    },
    get_time(time){
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
      else{
        return time.split('T')[0];
      }
    },
  },
};
</script>