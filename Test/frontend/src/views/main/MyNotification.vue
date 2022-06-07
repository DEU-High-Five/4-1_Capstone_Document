<template>
  <div>
      <div style="margin-bottom: 100px">
        <h1 class="ml-2" style="margin-bottom: 1rem; font-weight: 800;">알림</h1>
        <div v-for="(noti, index) in myNoti" :key="index">
        <CCard style="margin-bottom: 0.5rem; border:solid 1px #777">
            <CCardBody v-if="noti.target=='manager_apl_recv'">
                <h4 class="bold">새로운 회원이 들어왔어요!</h4>
                <h6><b>기관:</b> {{noti.groupName}}</h6>
                <h6><b>새 회원:</b> {{noti.userName}}({{noti.userId}})</h6>
            </CCardBody>
            <CCardBody v-else-if="noti.target=='manager_del_noti'">
                <h4 class="bold">기관의 물품이 삭제되었어요.</h4>    <!-- 관계자가 삭제한 것이 아닌 경우 신고 기능 필요 -->
                <h6><b>기관:</b> {{noti.groupName}}</h6>
                <h6><b>삭제된 물품:</b> {{noti.stuffName}}</h6>
                <h6><b>삭제한 관리자:</b> {{noti.modifierName}}({{noti.modifier}})</h6>
            </CCardBody>
            <CCardBody v-else-if="noti.target=='manager_add_noti'">
                <h4 class="bold">기관의 물품이 삭제되었어요.</h4>    <!-- 관계자가 삭제한 것이 아닌 경우 신고 기능 필요 -->
                <h6><b>기관:</b> {{noti.groupName}}</h6>
                <h6><b>삭제된 물품:</b> {{noti.stuffName}}</h6>
                <h6><b>삭제한 관리자:</b> {{noti.modifierName}}({{noti.modifier}})</h6>
            </CCardBody>
            <CCardBody v-else-if="noti.target=='manager_rental_noti'">
                <h4 class="bold">물품이 대여되었어요.</h4>    <!-- 관계자가 삭제한 것이 아닌 경우 신고 기능 필요 -->
                <h6><b>기관:</b> {{noti.groupName}}</h6>
                <h6><b>대여된 물품:</b> {{noti.stuffName}}</h6>
                <h6><b>대여한 회원:</b> {{noti.modifierName}}({{noti.modifier}})</h6>
            </CCardBody>
            <CCardBody v-else-if="noti.target=='manager_return_noti'">
                <h4 class="bold">물품이 반납되었어요.</h4>    <!-- 관계자가 삭제한 것이 아닌 경우 신고 기능 필요 -->
                <h6><b>기관:</b> {{noti.groupName}}</h6>
                <h6><b>반납된 물품:</b> {{noti.stuffName}}</h6>
                <h6><b>반납한 회원:</b> {{noti.modifierName}}({{noti.modifier}})</h6>
            </CCardBody>
        </CCard>
        </div>
        </div>
  </div>
</template>


<script>

import { mapGetters } from "vuex";
import http from "../../http";
export default {
  name: "Settings",

  data() {
    return {
      myNoti:[
          {
              target: "manager_apl_recv",
              groupCode: "11112222",
              groupName: "기관 이름",
              userId: "asmdkl",
              userName: "홍길동"
          },
          {
              target: "manager_apl_recv",
              groupCode: "11112222",
              groupName: "기관 이름",
              userId: "asmdkl",
              userName: "홍길동"
          },
          {
              target: "manager_del_noti",
              groupCode: "11112222",
              groupName: "기관 이름",
              stuffCode: "22223333",
              stuffName: "물품 이름1#1",
              modifier: "asmdkl",
              modifierName: "홍길동"
          },
          {
              target: "manager_add_noti",
              groupCode: "11112222",
              groupName: "기관 이름",
              stuffCode: "22223334",
              stuffName: "물품 이름1#1",
              modifier: "asmdkl",
              modifierName: "홍길동"
          },
          {
              target: "manager_add_noti",
              groupCode: "11112222",
              groupName: "기관 이름",
              stuffCode: "22223334",
              stuffName: "물품 이름1#1",
              modifier: "asmdkl",
              modifierName: "홍길동"
          },
          {
              target: "manager_rental_noti",
              groupCode: "11112222",
              groupName: "기관 이름",
              stuffCode: "22223334",
              stuffName: "물품 이름1#1",
              modifier: "asmdkl",
              modifierName: "홍길동"
          },
          {
              target: "manager_return_noti",
              groupCode: "11112222",
              groupName: "기관 이름",
              stuffCode: "22223334",
              stuffName: "물품 이름1#1",
              modifier: "asmdkl",
              modifierName: "홍길동"
          },
            
      ]

    };
  },
  created() {},
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
        .post("/matching/upload", {
          userId: "",
          userName: this.getUserInfo.univ,
          groupName: this.groupName,
          groupDescription: html_content,
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
  },
};
</script>