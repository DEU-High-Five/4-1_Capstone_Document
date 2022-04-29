<template>
  <div>
    <h3 id="sec2" data-aos="fade-left" data-aos-once="true" class="font_bold">게시물 업로드</h3>
    <h3 id="sec2" data-aos="fade-left" data-aos-once="true" data-aos-delay="50">: {{get_page_category()}}</h3>
    <div id="sec2" data-aos="fade-up" data-aos-once="true" data-aos-delay="200">
    <CCard :class="getCardClass() + '_card'">
      <CRow id="card_head_count" style="backgroundColor: rgb(37,186,14)">
        <div style="margin:auto">1 / {{this.post_head_count_max}}</div>
      </CRow>
      <CCardBody class="category_detail">
        <CRow>
          <CCol sm="5">
            <h4 v-if="this.post_title == ''" id="card_title" class="card-title mb-0 title_text_color" style="opacity: 0.5" v-text="'게시물 제목을 입력하세요.'"></h4>
            <h4 v-else id="card_title" class="card-title mb-0 title_text_color" v-text="post_title"></h4>
            <div v-if="this.post_sub_title == ''" class="medium title_text_color sub_title" style="margin-top: 10px; opacity: 0.5" v-text="'부제목을 입력하세요.'"></div>
            <div v-else class="medium title_text_color sub_title" style="margin-top: 10px" v-text="this.post_sub_title"></div>
          </CCol>
          <CCol sm="7" class="d-none d-md-block">
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="5" style="margin-top:10px; left:-10px">
            <div v-if="this.post_tag_1 != ''" id="tag_box" style="float:left">
              #{{ this.post_tag_1 }}
            </div>
            <div v-if="this.post_tag_2 != ''" id="tag_box" style="float:left">
              #{{ this.post_tag_2 }}
            </div>
            <div v-if="this.post_tag_3 != ''" id="tag_box" style="float:left">
              #{{ this.post_tag_3 }}
            </div>
          </CCol>
        </CRow>
      </CCardBody>
      <CCardFooter :class="'color_' + getCardClass()" style="color: white; padding: 0.1rem 1.25rem; text-align: right">
        모집 마감일 : {{this.post_deadline}}
      </CCardFooter>
    </CCard>
    <h5 class="font_bold" style="text-align:center">[ 게시물 카드 미리보기 ]</h5>
    </div>

    <CCard id="sec1" data-aos="fade-up" data-aos-once="true" data-aos-delay="300">
      <CCardHeader>
        <h5>학교: <a class="font_bold">{{getUserInfo.univ}}</a></h5>
        <h5>학과: <a class="font_bold">{{getUserInfo.major}}</a></h5>
      </CCardHeader>
      <CCardBody>
        <CForm>
          <CInput id="noWarning"
            type="text"
            label="제목"
            value=""
            placeholder="게시물 제목을 입력하세요."
            description="업로드 할 게시물의 제목을 입력하세요.(5~30자)"
            v-model="post_title"
            autocomplete="off"
            maxlength="30"
            :is-valid="show_warning_title"
            invalid-feedback="제목 형태가 올바르지 않습니다."
          >
          </CInput>
          <CInput id="noWarning"
            type="text"
            label="부제목"
            placeholder="부제목을 입력하세요."
            value=""
            description="미리보기 카드에 적힐 부제목을 입력하세요.(1~40자)"
            v-model="post_sub_title"
            autocomplete="off"
            maxlength="40"
            :is-valid="show_warning_sub_title"
            invalid-feedback="부제목 형태가 올바르지 않습니다."
          >
          </CInput>
        </CForm>
        <div id="users">
          <div id="circle" style="float:left"/>
          <div id="post_info">
            <h4 v-text="getUserInfo.nickname"></h4>
            <h6 v-text="'등록일 : '+ get_now()"></h6>
            <h6 v-text="'마감일 : '+ this.post_deadline"></h6>
          </div>
        </div>
      </CCardBody>
      <CRow class="form-group ml-2 mr-2">
      <CCol col="8" style="padding: 0 5px">
      <CInput
        label="모집 마감일"
        type="date"
        :min="get_now()"
        :is-valid="show_warning_date"
        invalid-feedback="마감일 선택이 잘못되었습니다."
        @change="set_deadline($event)"
      />
      </CCol>
      <CCol col="4" style="padding: 0 5px">
        <CSelect
          label="모집 인원 수"
          :options="[2,3,4,5,6,7,8,9,10,11,12,13,14,15]"
          @change="set_head_count($event)"
        />
      </CCol>
      </CRow>
      <CRow class="form-group ml-2 mr-2">
        <CCol col="4" style="padding: 0 5px">
          <CSelect
          label="태그1"
          :options="tag_1"
          :is-valid="show_warning_tag"
          @change="set_tag($event, 0)"
        />
        </CCol>
        <CCol col="4" style="padding: 0 5px">
        <CSelect
          label="태그2"
          :options="tag_2"
          @change="set_tag($event, 1)"
        />
        </CCol>
        <CCol col="4" style="padding: 0 5px">
        <CSelect
          label="태그3"
          :options="tag_3"
          @change="set_tag($event, 2)"
        />
        </CCol>
      <a class="warning_text" style="margin-left: 10px; margin-top: -10px" v-if="warning_tag">태그는 최소 1개 이상 선택해야 합니다.</a>
      </CRow>
      <CCardHeader style="font-size: 20px; font-weight: 600; border-top: solid 1px; border-color: #CCC; background-color: #EEE;">
        상세 설명
      </CCardHeader>
      <CCardBody>
        <CTextarea
          placeholder="내용을 입력해주세요. (20자 이상)"
          horizontal
          rows="9"
          v-model="post_content"
          :is-valid="show_warning_content"
          invalid-feedback="내용을 입력해주세요."
        />
      </CCardBody>
      <CCardFooter>
        <CButton style="width:100%" size="lg" color="success" @click="show_upload_modal()">
          업로드
        </CButton>
      </CCardFooter>
    </CCard>
    <CModal
      class="show d-block position-static" 
      :show.sync="uploadModal"
      :centered="true"
      title="upload_modal"
      size="sm"
      color="white"
    >
      <h5>업로드 하시겠습니까?</h5>
      <template #header>
        <h4 class="modal-title">업로드 확인</h4>
        <CButtonClose @click="uploadModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="uploadModal = false;" style="width: 60px" color="danger">취소</CButton>
        <CButton @click="uploadModal = false; upload_post();" style="width: 60px" color="success">확인</CButton>
      </template>
    </CModal>
  </div>
</template>

<style scoped>
#tag_box{
  background-color: yellow;
  margin-left: 10px;
  border-radius: 5px;
  color: black;
  padding-left: 3px;
  padding-right: 3px;
}
#card_head_count{
  position: absolute;
  margin-top: 20px;
  left: 82%;
  width: 60px;
  height: 30px;
  border-radius: 3px;
  font-weight: 800;
  color: #fff;
  text-shadow: 3px 3px 7px rgb(92, 92, 92);
}
.category_detail{
  height: 160px;
  color: aliceblue;
}
#circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url("../../assets/images/profile_image.png");
  background-size: cover;
  box-shadow: 3px 3px 7px #CCC;
}
#post_info{
  float: left;
  margin-top: 20px;
  margin-left: 30px;
}
#users{
  width: 100%;
  height: 100px;
}
#line{
  width: 100%;
  border-top: solid 2px;
}
#comment_box{
  border: solid, 2px;
  margin-bottom: 10px;
}


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
  name: 'NewPost',
  data () {
    return {
      uploadModal: false,
      page_category: '',
      tag_1: [    // 추후 다른 방식으로 교체
        {
          value: null,
          label: "선택 안 함"
        },
        "태그1",
        "태그2",
        "태그3",
      ],
      tag_2: [
        {
          value: null,
          label: "선택 안 함"
        },
        "태그1",
        "태그2",
        "태그3",
      ],
      tag_3: [
        {
          value: null,
          label: "선택 안 함"
        },
        "태그1",
        "태그2",
        "태그3",
      ],
      cardClass: '',
      post_title: '',
      post_sub_title: '',
      post_head_count_max: 2,
      post_deadline: '-',
      post_content: '',
      post_tag_1: '',
      post_tag_2: '',
      post_tag_3: '',

      warning_title: false,
      warning_sub_title: false,
      warning_date: false,
      warning_tag: false,
      warning_content: false,
    }
  },
  created() {
    this.page_category = JSON.parse(this.$route.query.data).category
    switch(this.page_category){
      case 1:
        this.cardClass = "my_major"
        break;
      case 2:
        this.cardClass = "my_univ"
        break;
      case 3:
        this.cardClass = "friends"
        break;
      case 4:
        this.cardClass = "club"
        break;
      default:
        this.cardClass = ''
        break;
    }
  },
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
      // 제목
      if(this.post_title == '' || this.post_title.length < 5 || this.post_title.length > 30){
        this.warning_title = true;
      }else{
        this.warning_title = false;
      }

      // 부제목
      if(this.post_sub_title == '' || this.post_sub_title.length < 5 || this.post_sub_title.length > 40){
        this.warning_sub_title = true;
      }else{
        this.warning_sub_title = false;
      }

      // 날짜
      if (this.post_deadline == '-'){
        this.warning_date = true;
      }else{
        var now = new Date();
        var comp = new Date(this.post_deadline + " 23:59:59");
        if (now >= comp){
          this.warning_date = true;
        }else{
          this.warning_date = false;
        }
      }

      // 태그
      if(this.post_tag_1 == ''){
        this.warning_tag = true;
      }else{
        this.warning_tag = false;
      }

      // 내용
      if(this.post_content == '' || this.post_content.length < 5 || this.post_content.length > 500){
        this.warning_content = true;
      }else{
        this.warning_content = false;
      }

      if(this.warning_title || this.warning_sub_title || this.warning_date || this.warning_tag || this.warning_content){
        return false;
      }
      return true;
    },
    show_warning_title() {
      if(this.warning_title)
        return false;
      return '';
    },
    show_warning_sub_title() {
      if(this.warning_sub_title)
        return false;
      return '';
    },
    show_warning_date() {
      if(this.warning_date)
        return false;
      return '';
    },
    show_warning_tag() {
      if(this.warning_tag)
        return false;
      return '';
    },
    show_warning_content() {
      if(this.warning_content)
        return false;
      return '';
    },
    set_tag(event, v){
      switch(v){
        case 0:
          this.post_tag_1 = event.target.value
          break;
        case 1:
          this.post_tag_2 = event.target.value
          break;
        case 2:
          this.post_tag_3 = event.target.value
          break;
      }
    },
    get_page_category(){
      switch(this.page_category){
        case 1:
          return "나의 학과"
        case 2:
          return "나의 학교"
        case 3:
          return "친구"
        case 4:
          return "동아리"
      }
    },
    upload_post(){
      const checker = this.upload_checker()
      if (!checker)
        return;
      let html_content = this.post_content.replaceAll(/(\n|\r\n)/g, "<br>");
      http.post('/matching/upload', {
        post_univ: this.getUserInfo.univ,
        post_major: this.getUserInfo.major,
        post_category: this.page_category,
        post_deadline: this.post_deadline + " 23:59:59",
        post_head_count_max: this.post_head_count_max,
        userId: this.getUserInfo.userId,
        userNickname: this.getUserInfo.nickname,
        post_title: this.post_title,
        post_sub_title: this.post_sub_title,
        post_content: html_content,
        post_tag_1: this.post_tag_1,
        post_tag_2: this.post_tag_2,
        post_tag_3: this.post_tag_3,
      }).then((res) => {
        console.log(res.data.success)
        if(res.data.success == true){
          this.$router.replace({ name: 'ViewPost', query: {data : JSON.stringify({num: res.data.target})} })
        }
        if(res.data.success == false){
          this.$router.replace({ path: '/pages/register_failed' })
        }
      }).catch(function (error){
        console.log(error)
      })
    },
    set_deadline(event){
      this.post_deadline = event
    },
    set_head_count(event){
      this.post_head_count_max = event.target.value
    },
    
    get_now(){
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      if (month < 10)
        month = '0' + month
      let date = now.getDate();
      return year + "-" + month + "-" + date
    },
    delay_value(index){
      if (index < 4)
        return index * 100
      else return 0
    },
    gotoLogin(){
        this.$router.push({ path: '/pages/login' })
    },
    getCardClass(){
      return this.cardClass
    }
  }
}
</script>