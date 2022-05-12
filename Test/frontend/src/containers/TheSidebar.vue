<template>
  <CSidebar
    color-scheme="light"
    fixed 
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarHeader style="background-color: white;">
      <img src="../assets/images/banner.svg" style="width:60%; height:90%;">
    </CSidebarHeader>
    <div style="padding: 1rem 1.2rem 1rem 1.2rem; border-bottom: solid 1px #f1f1f1; border-top:solid 1px #f1f1f1; background-color: #fafafa">
      <div id="circle" style="float:left; margin-right: 20px;" />
      <div style="padding-top: 15px; font-size: 16px;"><b class="font_bold"><!--{{getUserInfo.userId}}--> admin</b> 님</div> 
    </div>
      <!-- <CRenderFunction flat :content-to-render="$options.nav"/> -->
        <CSidebarNav>
          <CSidebarNavTitle>메인</CSidebarNavTitle>
          <CSidebarNavItem 
            name="홈 화면" 
            :icon="{content: $options.icons.homeIcon}"
            to='/main/MainHome'
          />

          <CSidebarNavTitle>마이 페이지</CSidebarNavTitle>
          <CSidebarNavItem 
            name="내 계정" 
            icon='cil-user'
            to='/myPages/MyAccount'
          />
          <CSidebarNavItem 
            name="설정" 
            icon='cil-settings'
            to='/myPages/MyAccount'
          />
          <!-- <CSidebarNavItem 
            name="내 매칭글" 
            icon='cil-pencil'
            to='/myPages/MyPostList'
          />
          <CSidebarNavDropdown
            name="신청 내역" 
            icon='cil-task'
          >
            <CSidebarNavItem 
              name="받은 신청 목록" 
              to='/myPages/MyRecvList'
            />
            <CSidebarNavItem 
              name="보낸 신청 목록" 
              to='/myPages/MyApplyList'
            />
          </CSidebarNavDropdown> -->

          <CSidebarNavTitle>계정</CSidebarNavTitle>
          <div style="width:100%;padding: 0.8445rem 1.2rem" @click="logout()">
            <CIcon class="c-sidebar-nav-icon" style="margin-left: 0;" :content="$options.icons.logoutIcon"/>
            <a style="height: 48px; padding: 0.8445rem 1.5rem">로그아웃</a>
          </div>
        </CSidebarNav>
    <!--  -->
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<style lang="scss" scoped>
#circle {
  width: 3rem;
  height: 3rem;
  background-image: url("../assets/images/profile_image.png");
}
</style>

<script>
import { cilHome, cilAccountLogout, cilUser } from '@coreui/icons'
import { mapGetters } from "vuex"
import nav from './_nav_opt'
export default {
  name: 'TheSidebar',
  icons: {
    homeIcon: cilHome,
    logoutIcon: cilAccountLogout,
    userIcon: cilUser
  },
  nav,
  computed: {
    ...mapGetters(["isAuthenticated", "getUserInfo"]),
    show () {
      return this.$store.state.sidebarShow 
    },
    minimize () {
      return this.$store.state.sidebarMinimize 
    }
  },
  methods:{
    redirect() {
        console.log("redirect")
        if (!this.isAuthenticated) {
          this.$router.push({
            name: "Login",
          })
        }
      },
    logout(){
      this.$store.commit('set', ['sidebarShow', false])
      this.$store.dispatch("logout", {})
      .then(() => this.redirect())
      .catch(({ message }) => alert(message))
    }
  }
}
</script>
