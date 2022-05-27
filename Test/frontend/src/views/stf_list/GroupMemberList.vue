<template>
  <div>
    <CCard v-for="(member, index) in memberList" :key="index">
        <CCardHeader v-if="member.isManager" style="background-color: #DDD; height: 20px; position: relative;">
            <h6 style="position: absolute; top: 3px; font-weight: 800;">관리자</h6>
        </CCardHeader>
        <CCardBody style="height:120px">
            <h2>{{member.name}} ({{member.id}})</h2>
            <p style="margin-bottom: 5px">{{member.desc}}</p>
            <p>연락처: {{member.phone}}</p>
      </CCardBody>
      <CCardFooter>
          <CRow> 
          <CCol col="5">
            <CButton class="middle_shadow bold" color="primary" style="font-size:16px" @click="deleteStuff(index)" block>회원 삭제</CButton>
          </CCol>
          <CCol col="7">
            <CButton class="middle_shadow bold" color="success" style="font-size:16px; background-color: #436e5e; border-color: #436e5e;" @click="ModifyStuff(index)" block>관리자로 지정</CButton>
          </CCol>
        </CRow>
      </CCardFooter>
    </CCard>
  </div>
</template>


<script>

import { mapGetters } from "vuex";
import http from "../../http";
export default {
  name: "ViewList",

  data() {
    return {
      groupCode: "",

      varia: false,


      memberList: [
          {
              id: "아이디",
              name: "이름",
              desc: "직급/부서",
              phone: "010-1111-2222",
              isManager: true
          },
          {
              id: "아이디",
              name: "이름",
              desc: "직급/부서",
              phone: "010-1111-2222",
              isManager: false
          },
      ],
    };
  },
  created() {
    if (this.$store.state.pageStore.groupcode == "")
      this.groupCode = JSON.parse(this.$route.query.data).groupCode
    else this.groupCode = this.$store.state.pageStore.groupcode;

    let pms = ""
    if (this.$store.state.pageStore.isManager == ""){
      pms = JSON.parse(this.$route.query.data).to;
    }
    else pms = this.$store.state.pageStore.isManager
    this.$store.commit("addListStore/clear_all")
    this.$store.commit("pageStore/set_page", ["isFooterVisible", "true"]);
    this.$store.commit("pageStore/set_page", ["addList", "false"]);

    this.$store.commit("pageStore/set_page", ["groupCode", this.groupCode]);


    /* 백엔드 연동 이후 백엔드에서 기관에 대한 사용자의 권한(관리자, 사용자)을 확인해야 함. 그 결과 값을 이 곳에서 받아와야 함. */
    if (pms == 'manage'){
      this.$store.commit("pageStore/set_page", ["headerTitle", "나의 관리 기관"]);
      this.$store.commit("pageStore/set_page", ["isManager", "manage"]);
    }
    if (pms == 'affiliation'){
      this.$store.commit("pageStore/set_page", ["headerTitle", "나의 소속 기관"]);
      this.$store.commit("pageStore/set_page", ["isManager", "affiliation"]);
    }

      /* JWT를 이용해 userId 확인 */
      http
        .post("주소", {
          groupCode: this.groupCode
        })
        .then((res) => {
          if (res.data.success == true) {
            
          }
          if (res.data.success == false) {
            this.$router.replace({ path: "/pages/register_failed" });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
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
          groupCode: this.groupCode
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
  },
};
</script>