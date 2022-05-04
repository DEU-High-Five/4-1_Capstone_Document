<template>
  <div>
    <CContainer>
      <CRow>
        <h3 class="font_bold ml-2">관리힐 기관 등록</h3>
      </CRow>
        <CForm>
          <CInput id="noWarning"
            type="text"
            label="관리자 이름"
            v-model="userName"
            disabled
          >
          </CInput>
          <CInput id="noWarning"
            type="text"
            label="기관 이름"
            description="관리할 기관의 이름을 입력하세요.(최대 45자)"
            value=""
            v-model="groupName"
            autocomplete="off"
            maxlength="45"
            :is-valid="show_warning_group_name"
            invalid-feedback="기관 이름이 입력되지 않습니다."
          >
          </CInput>
          <CTextarea
            type="text"
            label="기관 간단 설명"
            placeholder="기관을 간략히 설명해주세요.(최대 200자)"
            horizontal
            rows="9"
            v-model="groupDescription"
            :is-valid="show_warning_group_desc"
            invalid-feedback="내용을 입력해주세요."
          />
        </CForm>
      <CButton size="lg" color="primary" style="margin:30% auto 0 auto; width:95%;" block @click="upload_checker">다음</CButton>
    <CModal
      class="show d-block position-static" 
      :show.sync="uploadModal"
      :centered="true"
      title="upload_modal"
      size="sm"
      color="white"
    >
      <h5>등록하시겠습니까?</h5>
      <template #header>
        <h4 class="modal-title">관리 기관 등록 확인</h4>
        <CButtonClose @click="uploadModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="uploadModal = false;" style="width: 60px" color="danger">취소</CButton>
        <CButton @click="uploadModal = false; check_and_send();" style="width: 60px" color="success">확인</CButton>
      </template>
    </CModal>
    </CContainer>
    <div class="btn-floating" @click="gotoMain">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon c-icon-custom-size" height="30"><path fill="var(--ci-primary-color, currentColor)" d="M469.666,216.45,271.078,33.749a34,34,0,0,0-47.062.98L41.373,217.373,32,226.745V496H208V328h96V496H480V225.958ZM248.038,56.771c.282,0,.108.061-.013.18C247.9,56.832,247.756,56.771,248.038,56.771ZM448,464H336V328a32,32,0,0,0-32-32H208a32,32,0,0,0-32,32V464H64V240L248.038,57.356c.013-.012.014-.023.024-.035L448,240Z" class="ci-primary"></path></svg>
    </div>
  </div>
</template>

<style scoped>
.was-validated .form-control:invalid, .form-control.is-invalid {
  border-color: #d8dbe0;
  background-image: none;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.was-validated .form-control:invalid:focus, .form-control.is-invalid:focus {
  border-color: #d8dbe0;
  box-shadow: none;
}
</style>

<script>
import { mapGetters } from "vuex"
import http from "../../http"
export default {
  name: 'GenNewGroup',
  data () {
    return {
      userName: "정성주",
      groupName: "",
      groupDescription: "",
      uploadModal: false,

      warning_group_name: false,
      warning_group_desc: false,
    }
  },
  created() {
  },
  // metaInfo: {
  //   meta: [
  //     { charset: 'utf-8' },
  //     { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  //   ],
  // },
  computed:{
    ...mapGetters([
      "isNotAuthenticated",
      "getUserInfo"
    ]),
  },
  methods: {
    show_upload_modal(){
      const checker = this.upload_checker()
      if (!checker)
        return;
      return this.uploadModal = true;
    },
    upload_checker(){
      // 기관 이름
      if(this.groupName == '' || this.groupName.length < 1 || this.groupName.length > 45){
        this.warning_group_name = true;
      }else{
        this.warning_group_name = false;
      }

      // 내용
      if(this.groupDescription == '' || this.groupDescription.length < 1 || this.groupDescription.length > 200){
        this.warning_group_desc = true;
      }else{
        this.warning_group_desc = false;
      }

      if(this.warning_group_name || this.warning_group_desc){
        return false;
      }
      this.uploadModal = true;
      return true;
    },
    show_warning_group_name() {
      if(this.warning_group_name)
        return false;
      return '';
    },
    show_warning_group_desc() {
      if(this.warning_group_desc)
        return false;
      return '';
    },
    check_and_send(){
      let html_content = this.groupDescription.replaceAll(/(\n|\r\n)/g, "<br>");

      //임시
      return this.$router.replace({ name: 'GenGroupSuccess', query: {data : JSON.stringify({groupCode:"1234-5678"})} })

      http.post('/matching/upload', {
        userId: "",
        userName: this.getUserInfo.univ,
        groupName: this.groupName,
        groupDescription: html_content,
      }).then((res) => {
        console.log(res.data.success)
        if(res.data.success == true){
          this.$router.replace({ name: 'GenGroupSuccess', query: {data : JSON.stringify({num: res.data.target})} })
        }
        if(res.data.success == false){
          this.$router.replace({ path: '/pages/register_failed' })
        }
      }).catch(function (error){
        console.log(error)
      })
    },
    gotoMain(){
        this.$router.replace({ name: 'MainHome' })
    },
  }
}
</script>