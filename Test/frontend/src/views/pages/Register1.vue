
<template>
  <div class="c-app">
    <CWrapper>
      <CHeader fixed light style="padding-left: 20px; padding-top: 10px;">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon c-icon-custom-size" height="42" @click="primaryModal = true">
            <polygon fill="var(--ci-primary-color, currentColor)" points="497.333 239.999 80.092 239.999 176.087 144.004 153.46 121.377 18.837 256 153.46 390.623 176.087 367.996 80.09 271.999 497.333 271.999 497.333 239.999" class="ci-primary">
            </polygon>
         </svg>
        </div>
        <div id="title_text">
          <h2 style="font-weight:800">회원가입</h2>
        </div>
     </CHeader>
      <div class="c-body">
        <main class="c-main">
          <CContainer>
            <CRow class="justify-content-center">
              <CCol md="4" style="width:85%">
                <CForm>
                  <CSelect 
                    @change="set_univ($event)"
                    name="select_univ"
                    label="재학 중인 학교를 선택해주세요."
                    :description="description_text1"
                    horizontal
                    :options="options1"
                    placeholder="학교를 선택해주세요."
                  />
                  <a class="warning_text" v-if="show_warning && warning_univ">학교가 선택되지 않았습니다.</a>
                  <CSelect 
                    @change="set_dep($event)"
                    name="select_department"
                    label="학과를 선택해주세요."
                    :description="description_text2"
                    horizontal
                    :options="options2"
                    placeholder="학과를 선택해주세요."
                    :disabled="isOp1Selected"
                  />
                  <a class="warning_text" v-if="show_warning && warning_dep">학과가 선택되지 않았습니다.</a>
                  <CInputFile
                    label="재학 증명 파일을 업로드해주세요."
                    horizontal
                    custom
                    type="file"
                    class="text_ellipsis"
                    accept="image/jpeg, image/png, application/pdf"
                    :placeholder="select_file_desc"
                    description="20MB 이하의 jpg, png, pdf 파일만 업로드 가능합니다."
                    @change="load_file"
                  />
                  <a class="warning_text" v-if="show_warning && warning_file">재학 증명 파일이 선택되지 않았습니다.</a>
                </CForm>
              </CCol>
            </CRow>
            <CCard style="margin-top: 40px;">
              <CCardHeader color="danger" style="color:white; font-size:15px">※경고! 본 프로그램은 현재 개발 진행 중인 <br><b>베타 버전</b>입니다.</CCardHeader>
              <CCardBody>
                서비스 정식 출시 이전에 입력된 <b>모든 데이터(회원 정보, 아이디, 채팅 기록, 게시물 등)</b>는 정식 출시 이후 모두 삭제되며, 개인정보 보호를 위해 정식 서비스 이전에는 민감한 정보(전화번호 등)를 함부로 입력하지 마십시오.
                (베타 버전 서비스 중에는 재학 인증을 실시하지 않습니다.)
              </CCardBody>
            </CCard>
          </CContainer>
        </main>
      </div>
      <CFooter fixed style="height: 20%; background-color: white;">
        <CButton size="lg" color="primary" style="margin:10px auto; width:95%;" block @click="gotoNextPage">다음</CButton>
      </CFooter>
      <CModal
        title="Modal title"
        color="primary"
        :show.sync="primaryModal"
      >
        로그인 화면으로 돌아가시겠습니까?<br>작성된 내용은 모두 지워집니다.
        <template #header>
          <h6 class="modal-title">로그인 화면으로 이동</h6>
          <CButtonClose @click="primaryModal = false" class="text-white"/>
        </template>
        <template #footer>
          <CButton @click="checker(false)" color="white">아니오</CButton>
          <CButton @click="checker(true)" color="primary">  예  </CButton>
        </template>
      </CModal>
    </CWrapper>
  </div>
</template>

<style>
.custom-file-label::after{
  content: "파일 선택" !important
}
</style>

<script>
import univList from "../../../src/assets/department.json";

export default {
  name: 'Register1',
  data() { 
    return { 
      show_warning: false,
      warning_univ: false,
      warning_dep: false,
      warning_file: false,
      sel_univ: "",
      sel_dep: "",
      primaryModal: false,
      goLogin: false,

      cert_file: '',
      select_file_desc: "업로드 할 파일 선택...",

      horizontal: { label:'col-3', input:'col-9' },
      options1: [],
      options2: [],
      }; 
    }, 
    created(){
      univList.Root.content.map((items) =>{
        this.options1.push(items.schoolName[0])
      });
      const set = new Set(this.options1);
      this.options1 = [...set];
        // var vm = this;
        // axios.get('https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=9936f19d7c5d9d9463b5b70446af377e&svcType=api&svcCode=SCHOOL&contentType=json&gubun=univ_list&perPage=10000')
        //   //.then(response => this.options1 = response.data)
        //   .then(response => 
        //     //this.univ_array = response.data.dataSearch.content[0]
        //       response.data.dataSearch.content.forEach(function(item,index,arr2){
        //           vm.options1.push(arr2[index+1].schoolName)
        //         }
        //       )
        //   )
        //   .catch();
    },
  methods: { 
    valid_check(){
      return this.show_warning && this.warning_univ
    },
    load_file(event){
      var checker = ''
      checker = event[0]
      if(checker = '')
        return;
      var double_check = false
      switch(event[0].type){
        case "image/png":
          double_check = true;
          break;
        case "image/jpeg":
          double_check = true;
          break;
        case "application/pdf":
          double_check = true;
          break;
      }
      if ((event[0].size/1048576) < 20 && double_check){
        this.cert_file = event[0]
        if (event[0].name.length < 28)
          this.select_file_desc = event[0].name
        else{
          var file_name = event[0].name;
          this.select_file_desc = file_name.substr(0, 28) + "...";
        }
        //console.log(event[0].name.length)
      }
    },
    gotoNextPage(){
      if (this.sel_univ == ""){
        this.show_warning = true;
        this.warning_univ = true;
      }else{ 
        this.warning_univ = false; 
      } 
      if (this.sel_dep == ""){
        this.show_warning = true;
        this.warning_dep = true;
      }else{ 
        this.warning_dep = false; 
      }
      if (this.cert_file == ''){
        this.show_warning = true;
        this.warning_file = true;
      }else{ 
        this.warning_file = false; 
      } 
      if(!this.warning_univ && !this.warning_dep && !this.warning_file){
        this.$store.commit("set", ["reg_univ", this.sel_univ])
        // this.$store.commit("set_register_store", ["reg_univ", this.sel_univ])
        this.$store.commit("registerStore/set_reg", ["reg_univ", this.sel_univ])
        this.$store.commit("registerStore/set_reg", ["reg_major", this.sel_dep])
        this.$store.commit("registerStore/set_reg", ["reg_cert_file", this.cert_file])
        //console.log(this.$store.state.registerStore.reg_major)
        this.$router.replace({ path: '/pages/register2' })
      }
    },
    gotoLogin(){
      this.primaryModal = true;
      this.$router.replace({ path: '/pages/login' })
    },
    checker(goLogin){
      if(goLogin){
        this.$store.commit("registerStore/resetAll")
        this.$router.replace({ path: '/pages/login' })
      }
      else this.primaryModal = false
    },
    set_univ(event){
      this.sel_univ = event.target.value
      // var vm = this;
      //   axios.get('https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=9936f19d7c5d9d9463b5b70446af377e&svcType=api&svcCode=SCHOOL&contentType=json&gubun=univ_list&perPage=10000')
      //     //.then(response => this.options1 = response.data)
      //     .then(response => 
      //         response.data.dataSearch.content.forEach(function(item,index,arr2){
      //             vm.options1.push(arr2[index+1].schoolName)
      //           }
      //         )
      //     )
      //     .catch();
      this.options2.splice(0)
      univList.Root.content.map((items) =>{
        if (this.sel_univ == items.schoolName[0])
          this.options2.push(items.departmentName[0])
      });
    },
    set_dep(event){
      this.sel_dep = event.target.value
    }
  }, 
  computed:{
    isOp1Selected(){
      return this.sel_univ == ""
    },
    description_text1(){
      if(this.sel_univ == "")
       return "필수 선택 사항입니다."
      else return ""
    },
    description_text2(){
      if(this.sel_univ == "")
       return ""
      else if(this.sel_dep == "") 
        return "필수 선택 사항입니다."
      else return ""
    },
  }
};

</script>