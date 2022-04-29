<template>
    <CFooter fixed id="register_footer">
        <CButton size="lg" color="primary" style="margin:auto; width:95%" block @click="gotoNextPage">다음</CButton>
    </CFooter>
  <!-- <CFooter :fixed="true">
    <div>
      <a href="https://coreui.io" target="_blank">CoreUI</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}} creativeLabs.</span>
    </div>
    <div class="mfs-auto">
      <span class="mr-1" target="_blank">Powered by</span>
      <a href="https://coreui.io/vue">CoreUI for Vue</a>
    </div>
  </CFooter> -->
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
