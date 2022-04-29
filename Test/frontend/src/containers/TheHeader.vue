<template>
  <CHeader fixed light id="main_header">
    <!-- <div v-if="getIsMainPage"> -->
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('toggleSidebarDesktop')"
    />
    <!-- <CBreadcrumbRouter class="border-0 mb-0" id="routers"/> -->
    <CHeaderNavLink id="page_route" :to="gotoMain" v-text="pageInfo"/>
    <!-- <CRow id="page_route" v-text="pageInfo"/> -->
    <transition name="slide-rev-fade">
      <CHeaderNavLink v-if="isNull" id="page_route2" :style="{color: route_color}" to="/matching/CategoryView" v-text="pageRoute"/>
    </transition>
    <!-- <CRow id="page_route2" v-text="pageRoute"/> -->
    
    <!-- <CHeaderNav class="mr-4">
      <TheHeaderDropdownAccnt/>
    </CHeaderNav> -->
    <!-- <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0"/>
    </CSubheader> -->
  </CHeader>
</template>

<style scoped>
#routers{
  color: black !important;
  font-size: 30px;
  font-weight: 800;
}
#page_route{
  align-items: center;
  color: black !important;
  font-size: 30px;
  font-weight: 800;
  margin: 10px 5px 0 5px;
}
#page_route2{
  margin: auto 5px;
  padding-top: 5px;
  align-items: center;
  color: darkgreen;
  font-size: 25px;
  font-weight: 800;
}
.c-header {
  min-height: 62px;
}
#main_header{
  height: 30px;
  overflow: hidden;
}
</style>

<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'

export default {
  name: 'TheHeader',
  components: {
    TheHeaderDropdownAccnt
  },
  methods: {
    
  },
  computed: {
    gotoMain(){
      if (this.$store.state.pageStore.pageInfo == "매칭")
        return "/matching/MatchingCategory"
      if (this.$store.state.pageStore.pageInfo == "내 매칭글")
        return "/myPages/MyPostList"
    },
    pageInfo () {
      return this.$store.state.pageStore.pageInfo 
    },
    pageRoute(){
      return this.$store.state.pageStore.pageRoute
    },
    getIsMainPage(){
      return !this.$store.state.pageStore.isMainPage
    },
    isNull(){
      return this.$store.state.pageStore.pageRoute != ""
    },
    // goToPrevPage(){
    //   if(this.$store.state.pageRoute == "> 나의 학과"){
    //     return "/matching/CategoryMyMajor"
    //   }
    //   if(this.$store.state.pageRoute == "> 나의 학교"){
    //     return "/matching/CategoryMyUniv"
    //   }
    // },
    route_color(){
      if(this.$store.state.pageStore.pageRoute == "> 나의 학과"){
        return "#4E72B8"
      }
      if(this.$store.state.pageStore.pageRoute == "> 나의 학교"){
        return "#A276AE"
      }
      if(this.$store.state.pageStore.pageRoute == "> 친구"){
        return "#BC8F8F"
      }
      if(this.$store.state.pageStore.pageRoute == "> 동아리"){
        return "#E9A41B"
      }
      return "black"
    }
  },
}
</script>
