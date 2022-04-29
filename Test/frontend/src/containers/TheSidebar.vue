<template>
  <CSidebar
    color-scheme="light"
    fixed 
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarHeader style="background-color: white;">
      <img src="../assets/images/logo4.svg" style="width:100%; height:100%;">
    </CSidebarHeader>
    <div style="padding: 0.8rem 1.2rem 0 1.2rem; border-top:solid 1px #ccc; border-bottom:solid 1px #ccc; text-align:center; background-color: #efefef">
      <div id="circle" style="margin: 0 auto"/>
      <h5 style="padding-top: 1rem">{{getUserInfo.major}}</h5>
      <h5><a class="font_bold">{{getUserInfo.nickname}}({{getUserInfo.userId}})</a> 님</h5> 
    </div>
      <!-- <CRenderFunction flat :content-to-render="$options.nav"/> -->
        <CSidebarNav>
          <CSidebarNavTitle>매칭</CSidebarNavTitle>
          <CSidebarNavItem 
            name="매칭 홈" 
            :icon="{content: $options.icons.homeIcon}"
            to='/matching/MatchingCategory'
          />

          <CSidebarNavTitle>마이 페이지</CSidebarNavTitle>
          <CSidebarNavItem 
            name="내 계정" 
            icon='cil-user'
            to='/myPages/MyAccount'
          />
          <CSidebarNavItem 
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
          </CSidebarNavDropdown>

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
  width: 5rem;
  height: 5rem;
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
