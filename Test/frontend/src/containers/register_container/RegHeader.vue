<template>
  <CHeader fixed light id="RegHeader">
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
</template>

<style scoped>
#RegHeader{
    padding-left: 20px;
    padding-top: 10px;
}
</style>

<script>
export default {
  name: 'RegHeader',
  computed: {
    pageInfo () {
      return this.$store.state.pageInfo 
    },
    pageRoute(){
      return this.$store.state.pageRoute
    },
    getIsMainPage(){
      return !this.$store.state.isMainPage
    },
    isNull(){
      return this.$store.state.pageRoute != ""
    },
    goToPrevPage(){
      if(this.$store.state.pageRoute == "> 나의 학과"){
        return "/matching/CategoryMyMajor"
      }
      if(this.$store.state.pageRoute == "> 나의 학교"){
        return "/matching/CategoryMyUniv"
      }
    },
    route_color(){
      if(this.$store.state.pageRoute == "> 나의 학과"){
        return "#4E72B8"
      }
      if(this.$store.state.pageRoute == "> 나의 학교"){
        return "#A276AE"
      }
      return "black"
    }
  },
}
</script>
