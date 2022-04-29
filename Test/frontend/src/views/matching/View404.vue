<template>
  <div>
    <CContainer>
      <CCol>
        <div style="text-align:center; padding-top:25vh;">
          <img src="../../assets/images/404.png" width="40%">
          <h3 style="margin-top:20px">분명 있었는데..?</h3>
        </div>
      </CCol>
      <CCol style="text-align:center">
          <a style="background-color: red; color: white; font-size: 20px; font-weight:800; padding: 5px 10px; border-radius: 5px">404 Not Found</a>
      </CCol>
      <CCol style="margin-top: 100px">
      <CButton size="lg" color="primary" variant="outline" block @click="goToMainPage()">메인 페이지로 이동</CButton>
      </CCol>
      <!-- <a href="https://www.flaticon.com/free-icons/question" title="question icons">Question icons created by Freepik - Flaticon</a> -->
      </CContainer>
  </div>
</template>
<style scoped>
</style>
<script>

export default {
  name: 'View404',
  data () {
    return {
    }
  },
  methods: {
    goToMainPage(){
        return this.$router.replace({ name: 'MatchingCategory' })
    }
  }
}
</script>