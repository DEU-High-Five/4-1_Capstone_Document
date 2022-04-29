<template>
  <CHeader fixed with-subheader light id="RegHeader">
                <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon c-icon-custom-size" height="42" @click="gotoLogin">
                <polygon fill="var(--ci-primary-color, currentColor)" points="497.333 239.999 80.092 239.999 176.087 144.004 153.46 121.377 18.837 256 153.46 390.623 176.087 367.996 80.09 271.999 497.333 271.999 497.333 239.999" class="ci-primary">
                    </polygon>
                    </svg></div>
                <div id="title_text">
                  <h2>회원가입</h2>
                </div>
  </CHeader>
</template>

<style>
#RegHeader{
    padding-left: 20px;
    padding-top: 10px;
}
</style>

<script>
export default {
  name: 'TheHeader',
  components: {
  }
}
</script>
