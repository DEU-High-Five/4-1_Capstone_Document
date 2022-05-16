<template>
  <div>
    <CCard class="light_shadow" style="border:solid 1px #AAA">
        <CCardBody>
            <h2 class="bold">{{ title }}</h2>
            <h6> {{ subtitle }} </h6>
        </CCardBody>
    </CCard>

    <CCard class="ml-3 mr-3" style="border: none" v-for="(stuff, index) in stuff_info" :key="index">
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
              width="90"
              height="90"
            />
          </div>
        </CCol>
        <CCol col="8">
          <CRow>
            <h2>{{stuff.title}}</h2>
          </CRow>
          <CRow>
            <p class="mb-2">{{stuff.subtitle}}</p>
          </CRow>
          <CRow>
            <div v-if="stuff.in_stock" class="style-pill" style="color: #a90b0b">
              대여 중
            </div>
            <div v-else class="style-pill" style="color: #00aa1c">
              대여 가능
            </div>
          </CRow>
        </CCol>
      </CRow>
    </CCard>
    <div style="height: 80px; width:10px">
    </div>
    <div class="btn-floating-bottom" @click="gotoAddStuff">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon c-icon-custom-size" height="35"><polygon fill="var(--ci-primary-color, currentColor)" points="440 240 272 240 272 72 240 72 240 240 72 240 72 272 240 272 240 440 272 440 272 272 440 272 440 240" class="ci-primary"></polygon></svg>
    </div>
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
      
      title: "응용소프트웨어 실습실 #1",
      subtitle: "동의대 응용소프트웨어공학 실습준비실입니다.",

      stuff_info:[
            {
                title: "물품 이름 1",
                subtitle: "물품에 대한 간략한 설명입니다.",
                in_stock: true,
            },
            {
                title: "물품 이름 2",
                subtitle: "물품에 대한 간략한 설명입니다.",
                in_stock: false,
            },
            {
                title: "물품 이름 3",
                subtitle: "물품에 대한 간략한 설명입니다.",
                in_stock: true,
            },
            {
                title: "물품 이름 4",
                subtitle: "물품에 대한 간략한 설명입니다.",
                in_stock: true,
            },
      ]

    };
  },
  created() {
    this.$store.commit("pageStore/set_page", ["isFooterVisible", "true"]);
    this.$store.commit("pageStore/set_page", ["addList", "false"]);
    if (JSON.parse(this.$route.query.data).to == 'manage')
      this.$store.commit("pageStore/set_page", ["headerTitle", "나의 관리 기관"]);
    if (JSON.parse(this.$route.query.data).to == 'affiliation')
      this.$store.commit("pageStore/set_page", ["headerTitle", "나의 소속 기관"]);
    this.groupCode = JSON.parse(this.$route.query.data).groupCode
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