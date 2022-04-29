<template>
  <div>
    <div v-if="isEmpty(this.tableData)"  style="text-align:center; height: 70vh;">
    <CSpinner style="margin-top: 35vh">
    </CSpinner>
    </div>
    <div v-else>
    <CCard id="sec1" data-aos="zoom-out-up" data-aos-once="true">
      <CCardBody>
        {{this.$route.params.num}}
    <div>
    <div>
      <h1 style="float:left; font-size: 30px; width:100%" v-text="tableData.title"></h1>
    </div>
    </div>
    <br><br><br>
    <div id="users">
      <div id="circle" style="float:left"></div>
      <div id="post_info">
        <h4 v-text="tableData.uploaderNickname"></h4>
        <h6 v-text="'등록일 : '+ tableData.createdAt.split('T')[0]"></h6>
        <h6 v-text="'마감일 : '+ tableData.deadline.split('T')[0]"></h6>
      </div>
    </div>
      </CCardBody>
      <CCardBody style="padding-top: 0; margin-top: -30px">
      <CCol>
        <div v-if="this.loadDelay">
          <CRow id="card_apply_btn">
            <CSpinner style="margin-left:30%" :grow="true"/>
          </CRow>
        </div>
        <div v-else-if="this.btn_enabled && !this.isLeader && this.isAuth">
          <CRow id="card_apply_btn" v-if="!(tableItems.head_count == tableItems.head_count_max) && !this.applied" @click="applyModal = true">
            <div style="margin: auto; font-size: 18px">지원하기</div>
          </CRow>
          <CRow id="card_apply_btn" v-else-if="!this.accepted && this.applied" style="background-color: #333333;">
            <div style="margin: auto; font-size: 18px">신청 완료</div>
          </CRow>
          <CRow id="card_apply_btn" v-else-if="this.accepted && this.applied" style="background-color: #6f00cc;">
            <div style="margin: auto; font-size: 18px">팀원</div>
          </CRow>
        </div>
        <div v-else-if="this.isLeader">
          <CRow id="card_apply_btn" style="background-color: #777;">
            <div style="margin: auto; font-size: 18px">팀장</div>
          </CRow>
        </div>
          <CRow id="card_head_count" v-if="!(tableData.headCount == tableData.max)" :style="{backgroundColor: color(tableData.headCount, tableData.max)}">
            <div style="margin: auto; font-size: 18px">{{tableData.headCount}} / {{tableData.max}}</div>
          </CRow>
          <CRow id="card_head_count" v-else :style="{backgroundColor: color(tableData.headCount, tableData.max)}">
            <div style="margin: auto; font-size: 16px;">모집 완료</div>
          </CRow>
        </CCol>
          <CElementCover v-if="get_close(tableData.headCount, tableData.max, tableData.deadline)">
            <h1 class="d-inline font_bold" style="color:#555;">모집 마감</h1>
          </CElementCover>
      </CCardBody>
      <CCardHeader style="font-size: 20px; font-weight: 600; border-top: solid 1px; border-color: #CCC; background-color: #EEE;">
        상세 설명
      </CCardHeader>
      <CCardBody>
      <h5 v-text="tableData.content"></h5>
      </CCardBody>
      <CCardFooter>
        <a v-if="tableData.tag_1 != null" class="view_tag">#{{tableData.tag_1}}</a>
        <a v-if="tableData.tag_2 != null" class="view_tag">#{{tableData.tag_2}}</a>
        <a v-if="tableData.tag_3 != null" class="view_tag">#{{tableData.tag_3}}</a>
      </CCardFooter>
    </CCard>
    <div id="sec1" data-aos="fade-up" data-aos-once="true" data-aos-delay="30" data-aos-anchor="top-top">
    <CInput
      label="댓글 작성"
      type="text"
      value=""
      v-model="comment_input"
      autocomplete="off"
      maxlength="30"
    >
    <template #append>
      <CButton color="success" @click="comment_upload()">등록</CButton>
    </template>
    </CInput>

    <div v-if="isEmpty(this.post_comments)"  style="text-align:center;">
    <CSpinner>
    </CSpinner>
    </div>
    <div v-else>
      <div v-if="this.post_comments.isEmpty">
      <CCard id="comment_box">
        <CCardBody>
        아직 댓글이 없습니다.
        </CCardBody>
      </CCard>
      </div>
      <div v-else>
      <CCard id="comment_box" v-for="comment in post_comments.result" :key="comment.id">
        <CCardHeader style="padding: 0.25rem 1.25rem;">
          <div style="float:left; font-weight: 600">{{comment.USER_NICKNAME}}({{comment.USER_ID}})</div>
          <div style="float:right; margin-left: 10px">{{ get_comment_time(comment.CREATED_AT) }}</div>
        </CCardHeader>
        <CCardBody>
        <div v-text="comment.CONTENT"></div>
        </CCardBody>
      </CCard>
      </div>
    </div>

    </div>
    <!-- :show.sync="applyModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="apply_modal"
      size="sm"
      color="dark" -->
    <CModal
      class="show d-block position-static" 
      :show.sync="applyModal"
      :centered="true"
      :no-close-on-backdrop="true"
      title="apply_modal"
      size="sm"
      color="white"
    >
      <h5>지원하시겠습니까?</h5>
      <template #header>
        <h4 class="modal-title">팀에 합류하기</h4>
        <CButtonClose @click="darkModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="applyModal = false" variant="outline" color="danger">아니오</CButton>
        <CButton @click="apply()" style="width: 60px" color="success">예</CButton>
      </template>
    </CModal>

    <CModal
      class="show d-block position-static" 
      :show.sync="doneModal"
      :centered="true"
      :no-close-on-backdrop="true"
      title="done_modal"
      size="sm"
      color="white"
    >
      <h5>지원 신청이 완료되었습니다.</h5>
      <template #header>
        <h4 class="modal-title">신청 완료</h4>
        <CButtonClose @click="doneModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="doneModal = false;" style="width: 60px" color="success">확인</CButton>
      </template>
    </CModal>


    <CModal
      class="show d-block position-static" 
      :show.sync="errorModal"
      :centered="true"
      title="error_modal"
      size="sm"
      color="white"
    >
      <h5>재학 인증 완료 후 댓글 작성이 가능합니다.</h5>
      <h5>(재학 인증 여부는 재로그인 시 갱신됩니다.)</h5>
      <template #header>
        <h4 class="modal-title">재학 인증 확인 실패</h4>
        <CButtonClose @click="errorModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="errorModal = false;" style="width: 60px" color="success">확인</CButton>
      </template>
    </CModal>
    </div>
  </div>
</template>
<style scoped>
#tag_box{
  margin: auto;
  background-color: yellow;
  margin-left: 10px;
  border-radius: 5px;
  color: black;
  padding-left: 3px;
  padding-right: 3px;
}
#card_head_count{
  margin-right: 30px;
  float: right;
  width: 80px;
  height: 35px;
  border-radius: 3px;
  font-weight: 800;
  color: #fff;
  text-shadow: 3px 3px 7px rgb(92, 92, 92);
}

#card_apply_btn{
  float: right;
  background-color: #a90b0b;
  width: 100px;
  height: 35px;
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
</style>

<script>
import http from "../../http"
export default {
  name: 'ViewPost',
  props: {
    prop_board: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isAuth: false,
      loadDelay: true,
      applied: false,
      accepted: false,
      isLeader: false,
      btn_enabled: false,
      errorModal: false,
      comment_empty: false,
      comment_input: '',
      page_num: 0,
      applyModal: false,
      doneModal: false,
      tableData: {},
      tableItems: {
          head_count_max: 4,
          head_count: 1,
        },
      post_comments:[]
    }
  },
  created() {
    this.page_num = JSON.parse(this.$route.query.data).num
    http.post('/matching/category/view', {
      num: JSON.parse(this.$route.query.data).num
    }).then((res) => {
      if (res.status === 200) {
        if(!res.data.isExist){
          return this.$router.replace({ name: 'View404' })
        }
        var cre_at = res.data.post.createdAt
        this.tableData = res.data.post
        this.tableData.createdAt = cre_at
        this.btn_enabled = res.data.auth && !res.data.isLeader
        this.isLeader = res.data.isLeader
        //console.log(this.tableData)
      }
      if (res.status === 400) {
        console.log(error)
      } 
            // if(res.data.success == true){
            //   //this.$router.replace({ path: '/pages/register_success' })
            // }
            // if(res.data.success == false){
            //   this.$router.replace({ path: '/pages/register_failed' })
            // }
      }).catch(function (error){
        console.log(error)
    });

    http.get('/matching/apply/' + JSON.parse(this.$route.query.data).num)
    .then((res) => {
      if (res.status === 200) {
        if(res.data.success){
          this.isAuth = true
          this.loadDelay = false
          this.applied = res.data.applied
          if(res.data.applied && res.data.accepted == 1){
            this.accepted = true;
          }
        }
      }
      else {
        console.log(error)
      } 
      }).catch(function (error){
        console.log(error)
    });

    this.comment_reset();
    // http.get('/matching/comment/' + JSON.parse(this.$route.query.data).num).then((res) => {
    //   if (res.status === 200 || res.status === 304) { 
    //     if(!res.data.isEmpty){
    //       this.post_comments = res.data.result
    //     }
    //   }
    //   }).catch(function (error){
    //     console.log(error)
    // })
  },
  methods: {
    apply(){
      this.applyModal = false; 
      http.post('/matching/apply', {
        board_num: JSON.parse(this.$route.query.data).num
      }).then((res) => {
          //if (res.status === 200 || res.status === 304) {
          if (res.data.success) { 
            this.doneModal = true; 
            this.applied = true;
          }
          // else{
              //재학 인증 실패 시
          // }
        }).catch(function (error){
          console.log(error)
      })

    },
    comment_reset(){
      http.get('/matching/comment/' + JSON.parse(this.$route.query.data).num).then((res) => {
      if (res.status === 200 || res.status === 304) { 
        this.post_comments = res.data
        
      }
      }).catch(function (error){
        console.log(error)
    })
    },
    comment_upload(){
      http.post('/matching/comment', {
        board_num: JSON.parse(this.$route.query.data).num,
        comment: this.comment_input
      }).then((res) => {
          if (res.status === 200) { 
            if(!res.data.auth){
              this.errorModal= true
            }
          }
        }).catch(function (error){
          console.log(error)
        });
      this.comment_input = '';
      this.comment_reset();
    },
    get_close(cnt, max, date){
      if (cnt >= max){
        return true;
      }
      var now = new Date();
      var temp = new Date(date.split('T')[0] + ' ' + date.split('T')[1]);
      if(now.getTime() > temp.getTime()){
        return true;
      }
      return false;
    },
    get_comment_time(time){
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
    isEmpty(value){
      if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
        return true
        }else{
          return false
        }
    },
    delay_value(index){
      if (index < 4)
        return index * 100
      else return 0
    },
    color (value, max) {
      let $color
      let $temp = value/max
      if ($temp <= 0.5) {
        $color = 'rgb(37,186,14)'
      } else if ($temp > 0.5 && $temp <= 0.75) {
        $color = 'rgb(255, 127, 0)'
      } else if ($temp > 0.75 && $temp < 0.98) {
        $color = 'rgb(245,89,25)'
      }
      else $color = 'rgb(177,30,49)'
      return $color
    },
    gotoLogin(){
        this.$router.push({ path: '/pages/login' })
    },
  }
}
</script>