<template>
  <div>
    <CContainer>
      <CRow>
        <div
          style="
            width: 100px;
            height: 100px;
            border: dashed 3px #a90b0b;
            margin: 0 auto;
          "
        >
            <CIcon
                size="custom"
                width="30"
                style="margin: 32px 0 0 32px; color: #a90b0b"
                :content="$options.icons.plusIcon"
            />
        </div>
      </CRow>
      <CRow>
        <label style="margin: 10px auto 20px auto">+ 버튼을 눌러 썸네일을 등록하세요.</label>
      </CRow>
      <CForm>
        <CInput
          id="noWarning"
          type="text"
          label="물품 이름"
          description="물품의 이름을 입력하세요.(최대 20자)"
          value=""
          v-model="stuffName"
          autocomplete="off"
          maxlength="20"
          :is-valid="show_warning_stuff_name"
          invalid-feedback="물품 이름이 입력되지 않습니다."
        >
        </CInput>
        <CTextarea
          type="text"
          label="물품 세부정보"
          placeholder="제품 사양, 위치, 주의사항 등을 자유롭게 입력해주세요.(최대 200자)"
          horizontal
          rows="9"
          v-model="stuffDetail"
          maxlength="200"
          :is-valid="show_warning_stuff_detail"
          invalid-feedback="세부정보를 입력해주세요."
        />
      </CForm>
    </CContainer>

    <div style="width: 10px; height: 100px"></div>
    <div
      style="
        position: fixed;
        width: 100%;
        height: 80px;
        bottom: 0;
        padding-top: 10px;
        background-color: #ffffff;
      "
    >
      <CButton
        class="bold"
        color="primary"
        variant="outline"
        style="width: 92%; height: 45px; font-size: 16px; border-width: 2px;"
        block
        >목록에 추가</CButton
      >
    </div>
    <CModal
      class="show d-block position-static"
      :show.sync="uploadModal"
      :centered="true"
      title="upload_modal"
      size="sm"
      color="white"
    >
      <h5>추가하시겠습니까?</h5>
      <template #header>
        <h4 class="modal-title">물품 추가 확인</h4>
        <CButtonClose @click="uploadModal = false" class="text-white" />
      </template>
      <template #footer>
        <CButton @click="uploadModal = false" style="width: 60px" color="danger"
          >취소</CButton
        >
        <CButton
          @click="
            uploadModal = false;
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

<style scoped>
.was-validated .form-control:invalid,
.form-control.is-invalid {
  border-color: #d8dbe0;
  background-image: none;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.was-validated .form-control:invalid:focus,
.form-control.is-invalid:focus {
  border-color: #d8dbe0;
  box-shadow: none;
}
</style>

<script>
import { cilPlus } from "@coreui/icons";
import { mapGetters } from "vuex";
import http from "../../http";
export default {
  name: "GenNewGroup",
  icons: {
    plusIcon: cilPlus,
  },
  data() {
    return {
      //userName: this.getUserInfo.userName,
      userName: "정성주",
      stuffName: "",
      stuffDetail: "",
      uploadModal: false,

      warning_group_name: false,
      warning_group_desc: false,
    };
  },
  created() {},
  // metaInfo: {
  //   meta: [
  //     { charset: 'utf-8' },
  //     { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  //   ],
  // },
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
      // 물품 이름
      if (
        this.stuffName == "" ||
        this.stuffName.length < 1 ||
        this.stuffName.length > 20
      ) {
        this.warning_group_name = true;
      } else {
        this.warning_group_name = false;
      }

      // 세부 정보
      if (
        this.stuffDetail == "" ||
        this.stuffDetail.length < 1 ||
        this.stuffDetail.length > 200
      ) {
        this.warning_group_desc = true;
      } else {
        this.warning_group_desc = false;
      }

      if (this.warning_group_name || this.warning_group_desc) {
        return false;
      }
      this.uploadModal = true;
      return true;
    },
    show_warning_stuff_name() {
      if (this.warning_group_name) return false;
      return "";
    },
    show_warning_stuff_detail() {
      if (this.warning_group_desc) return false;
      return "";
    },
    check_and_send() {
      let html_content = this.stuffDetail.replaceAll(/(\n|\r\n)/g, "<br>");

      //임시
      return this.$router.replace({
        name: "GenGroupSuccess",
        query: { data: JSON.stringify({ groupCode: "1234-5678" }) },
      });

      http
        .post("/matching/upload", {
          userId: "",
          userName: this.getUserInfo.univ,
          stuffName: this.stuffName,
          stuffDetail: html_content,
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
      this.$router.replace({ name: "MainHome" });
    },
  },
};
</script>