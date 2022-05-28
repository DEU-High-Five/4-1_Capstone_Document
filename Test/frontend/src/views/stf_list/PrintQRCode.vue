<template>
  <div>
    <CRow>
      <CCol col="6">
        <CSelect
          label="행 개수"
          @change="set_col($event)"
          :options="col_option"
        />
      </CCol>
      <CCol col="6">
        <CSelect
          label="QR코드 크기"
          @change="set_size($event)"
          :options="size_option"
        />
      </CCol>
    </CRow>
    <div style="zoom:0.6">
    <div id="print_area">
      <CRow>
        <CCol
          :col="qr_cols"
          class="pl-2 pr-2"
          v-for="(qrcode, index) in stuffQR"
          :key="index"
        >
        <!-- <vue-qr :text="qrcode.code" :callback="test" qid="testid" :size="qr_size"/> -->
        <vue-qr :text="qrcode.code" qid="testid" :size="qr_size"/>
        <span :style="{fontSize:font_size + 'px', marginLeft:20}">{{qrcode.name}}</span>
          <!-- <vue-qrcode 
            :value="qrcode.code"
            errorCorrectionLevel="h" /> -->
        </CCol>
      </CRow>
    </div>
    </div>
    <div class="btn-floating-bottom" @click="print">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon c-icon-custom-size" height="35"><path fill="var(--ci-primary-color, currentColor)" d="M420,128.1V16H92V128.1A80.1,80.1,0,0,0,16,208V400H84V368H48V208a48.054,48.054,0,0,1,48-48H416a48.054,48.054,0,0,1,48,48V368H420v32h76V208A80.1,80.1,0,0,0,420,128.1Zm-32-.1H124V48H388Z" class="ci-primary"></path><rect width="32" height="32" x="396" y="200" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect><path fill="var(--ci-primary-color, currentColor)" d="M116,264H76v32h40V496H388V296h40V264H116ZM356,464H148V296H356Z" class="ci-primary"></path></svg>
        
    </div>
  </div>
</template>


<script>
//import VueQrcode from 'vue-qrcode'
import VueQr from 'vue-qr'
import { mapGetters } from "vuex";
import http from "../../http";
export default {
  name: "ViewList",
  components:{
   VueQr 
    //VueQrcode
  },
  data() {
    return {
      qr_cols: 12,
      qr_size: 100,
      font_size: 15,
      col_option: [
        1, 2, 3
      ],
      size_option: [
        { 
          value: 's', 
          label: '작게'
        },
        { 
          value: 'm', 
          label: '보통'
        },
        { 
          value: 'l', 
          label: '크게'
        },
      ],
      stuffQR:[
        {
          code:"123123123123123123213",
          name: "QR 샘플1",
        },
        {
          code:"123123123123123123213",
          name: "QR 샘플2",
        },
        {
          code:"123123123123123123213",
          name: "QR 샘플3",
        },
        {
          code:"123123123123123123213",
          name: "QR 샘플1",
        },
        {
          code:"123123123123123123213",
          name: "QR 샘플2",
        },
        {
          code:"123123123123123123213",
          name: "QR 샘플3",
        },
        {
          code:"123123123123123123213",
          name: "QR 샘플1",
        },
        {
          code:"123123123123123123213",
          name: "QR 샘플2",
        },
        {
          code:"123123123123123123213",
          name: "QR 샘플3",
        },
        {
          code:"123123123123123123213",
          name: "QR 샘플1",
        },
        {
          code:"123123123123123123213",
          name: "QR 샘플2",
        },
        {
          code:"123123123123123123213",
          name: "QR 샘플3",
        },
      ]
    };
  },
  created() {
    if (this.$store.state.pageStore.groupcode == "")
      this.groupCode = JSON.parse(this.$route.query.data).groupCode;
    else this.groupCode = this.$store.state.pageStore.groupcode;

    let pms = "";
    if (this.$store.state.pageStore.isManager == "") {
      pms = JSON.parse(this.$route.query.data).to;
    } else pms = this.$store.state.pageStore.isManager;
    this.$store.commit("addListStore/clear_all");
    this.$store.commit("pageStore/set_page", ["isFooterVisible", "true"]);
    this.$store.commit("pageStore/set_page", ["addList", "false"]);

    this.$store.commit("pageStore/set_page", ["groupCode", this.groupCode]);

    /* 백엔드 연동 이후 백엔드에서 기관에 대한 사용자의 권한(관리자, 사용자)을 확인해야 함. 그 결과 값을 이 곳에서 받아와야 함. */
    if (pms == "manage") {
      this.$store.commit("pageStore/set_page", [
        "headerTitle",
        "나의 관리 기관",
      ]);
      this.$store.commit("pageStore/set_page", ["isManager", "manage"]);
    }
    if (pms == "affiliation") {
      this.$store.commit("pageStore/set_page", [
        "headerTitle",
        "나의 소속 기관",
      ]);
      this.$store.commit("pageStore/set_page", ["isManager", "affiliation"]);
    }

    /* JWT를 이용해 userId 확인 */
    http
      .post("주소", {
        groupCode: this.groupCode,
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
    print () {
      // Pass the element id here
      this.$htmlToPaper('print_area');
    },
    // test(dataUrl,id){
    //         console.log(dataUrl, id)
    //     },
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
    set_col(event){
      switch(event.target.value){
        case '1':
          this.qr_cols = 12;
          break;
        case '2':
          this.qr_cols = 6;
          break;
        case '3':
          this.qr_cols = 4;
          break;
        default:
          this.qr_cols = 12;
          break;
      }
    },
    set_size(event){
      switch(event.target.value){
        case 's':
          this.qr_size = 100;
          this.font_size = 15;
          break;
        case 'm':
          this.qr_size = 130;
          this.font_size = 25;
          break;
        case 'l':
          this.qr_size = 150;
          this.font_size = 35;
          break;
        default:
          this.qr_size = 50;
          this.font_size = 15;
          break;
      }
      console.log(this.font_size)
    }
  },
};
</script>