<template>
  <CFooter id="footer" class="footer_bar" :fixed="true">
    <div class="footer_bar_content">
      <div class="footer_bar_btn">
      <router-link to="/myPages/MyAccount">
        <CIcon size="custom" width="25px" class="mt-2" :content="$options.user"/>
      </router-link>
        <h6 class="footer_bar_text">마이페이지</h6>
      </div>
      <div class="footer_bar_line"></div>
      <div class="footer_bar_btn">
        <router-link to="/myPages/MyApplyList">
          <CIcon size="custom" width="25px" class="mt-2" :content="$options.task"/>
          <h6 class="footer_bar_text">신청 현황</h6>
        </router-link>
        <!-- <CDropdown style="position: absolute; margin-left: 10px; top:-2px" toggler-text="" placement="top-end">
          <CDropdownItem>First Action</CDropdownItem>
          <CDropdownItem>Second Action</CDropdownItem>
          <CDropdownItem>Third Action</CDropdownItem>
          <CDropdownDivider></CDropdownDivider>
          <CDropdownItem>Something else here...</CDropdownItem>
          <CDropdownItem disabled>Disabled action</CDropdownItem>
        </CDropdown> -->
      </div>
      <div class="footer_bar_line"></div>
      <div class="footer_bar_btn">
        <router-link to="/matching/MatchingCategory">
          <CIcon size="custom" width="25px" class="mt-2" :content="$options.home"/>
        </router-link>
        <h6 class="footer_bar_text">홈</h6>
      </div>
      <div class="footer_bar_line"></div>
      <div class="footer_bar_btn">
        <!-- <router-link to="/myPages/MyApplyList"> -->
          <CIcon size="custom" width="25px" class="mt-2" :content="$options.comment"/>
        <!-- </router-link> -->
        <h6 class="footer_bar_text">댓글</h6>
      </div>
      <div class="footer_bar_line"></div>
      <div class="footer_bar_btn">
        <router-link to="/message/messageHome">
          <CIcon size="custom" width="25px" class="mt-2" :content="$options.envelope"/>
        </router-link>
        <h6 class="footer_bar_text">쪽지</h6>
      </div>
    </div>
  </CFooter>
</template>

<style>
.footer_bar{
  height: 9vh;
  background-color: white;
}
.footer_bar_line{
  margin-left: 3%;
  width: 1px; 
  height: 37px; 
  background-color: #aaa
}
.footer_bar_content{
  text-align: center; 
  width: 100%; 
  display:flex; 
  justify-content:center; 
  align-items: center;
}
.footer_bar_btn{
  margin-top: 3px;
  float: left;
  height: 8.5vh;
  width: 20%;
}
.footer_bar_btn:not(:first-child){
  margin-left: 3%;
}
.footer_bar_text{
  font-size: 10px; 
  margin-top: 5px
}
</style>

<script>
import { cilCommentSquare, cilEnvelopeClosed, cilHome, cilSettings, cilTask, cilUser } from '@coreui/icons'

export default {
  name: 'TheFooter',
  home: cilHome,
  settings: cilSettings,
  comment: cilCommentSquare,
  envelope:  cilEnvelopeClosed,
  task: cilTask,
  user: cilUser,

  data(){
    return{
    }
  }
}
</script>
