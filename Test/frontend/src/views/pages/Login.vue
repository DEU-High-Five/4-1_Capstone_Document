<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8" id="login_body">
            <CCard class="p-4" id="main_login">
              <div id="description_zone">
                <svg width="150px" height="150px" viewBox="0 0 340 340" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" overflow="hidden"><defs><clipPath id="clip0"><rect x="360" y="65" width="328" height="327"/></clipPath></defs><g clip-path="url(#clip0)" transform="translate(-360 -65)"><path d="M243.942 283.836 243.942 249.174 278.604 249.174 313.266 249.174 313.266 283.836 313.266 318.498 278.604 318.498 243.942 318.498 243.942 283.836ZM305.418 283.836 305.418 257.022 278.604 257.022 251.79 257.022 251.79 283.836 251.79 310.65 278.604 310.65 305.418 310.65 305.418 283.836Z" fill="#A90B0B" transform="matrix(1.00306 0 0 -1 360 392)"/><path d="M258.984 284.163 258.984 264.87 278.277 264.87 297.57 264.87 297.57 284.163 297.57 303.456 278.277 303.456 258.984 303.456 258.984 284.163Z" fill="#A90B0B" transform="matrix(1.00306 0 0 -1 360 392)"/><path d="M15.042 283.182 15.042 248.52 49.704 248.52 84.366 248.52 84.366 283.182 84.366 317.844 49.704 317.844 15.042 317.844 15.042 283.182ZM76.518 283.182 76.518 256.368 49.704 256.368 22.89 256.368 22.89 283.182 22.89 309.996 49.704 309.996 76.518 309.996 76.518 283.182Z" fill="#A90B0B" transform="matrix(1.00306 0 0 -1 360 392)"/><path d="M30.084 283.509 30.084 264.216 49.377 264.216 68.67 264.216 68.67 283.509 68.67 302.802 49.377 302.802 30.084 302.802 30.084 283.509Z" fill="#A90B0B" transform="matrix(1.00306 0 0 -1 360 392)"/><path d="M187.698 244.923C178.084 242.242 172.591 235.898 169.582 223.995 168.536 219.875 168.405 216.082 168.405 187.044 168.405 151.401 168.601 149.374 172.591 140.872 177.169 130.996 186.455 126.287 199.797 127.072 215.428 127.988 223.406 135.836 225.957 152.971 227.396 162.192 227.33 213.269 225.957 221.444 223.995 232.759 218.371 240.803 210.065 244.007 205.16 245.904 193.061 246.362 187.698 244.923ZM201.759 230.143C205.094 229.227 208.822 225.368 210.196 221.314 211.765 216.67 211.765 157.941 210.196 152.317 208.299 145.58 203.983 141.918 197.835 141.918 193.78 141.918 190.968 143.226 188.483 146.234 184.166 151.466 184.101 151.859 184.101 187.044 184.101 222.687 184.101 222.491 188.875 227.069 192.603 230.666 196.462 231.581 201.759 230.143Z" fill="#A90B0B" transform="matrix(1.00306 0 0 -1 360 392)"/><path d="M83.712 186.39 83.712 128.838 91.56 128.838 99.408 128.838 99.5388 176.122 99.735 223.341 107.583 176.253 115.431 129.165 123.083 128.969 130.669 128.773 131.062 130.604C131.258 131.585 134.724 152.578 138.648 177.234 142.637 201.89 145.973 222.36 146.169 222.687 146.3 223.079 146.431 202.086 146.431 176.122L146.496 128.838 154.344 128.838 162.192 128.838 162.192 186.39 162.192 243.942 148.327 243.811 134.462 243.615 128.838 201.236C125.764 177.953 123.083 159.445 122.821 160.034 122.56 160.688 120.99 172.983 119.355 187.371 117.655 201.759 115.3 220.333 114.058 228.573 112.815 236.879 111.834 243.68 111.834 243.811 111.834 243.877 105.49 243.942 97.773 243.942L83.712 243.942 83.712 186.39Z" fill="#A90B0B" transform="matrix(1.00306 0 0 -1 360 392)"/><path d="M231.843 243.157C231.647 242.699 231.581 216.866 231.647 185.736L231.843 129.165 239.56 128.969 247.212 128.773 247.212 171.74C247.212 195.415 247.343 214.577 247.604 214.381 247.801 214.185 251.986 195.088 257.022 172.002 261.992 148.916 266.374 129.688 266.701 129.361 266.963 129.1 272.064 128.903 278.015 128.969L288.741 129.165 288.741 186.39 288.741 243.615 280.762 243.811 272.718 244.007 272.587 201.105 272.391 158.203 263.3 198.293C258.265 220.333 253.948 239.626 253.556 241.195L252.967 243.942 242.569 243.942C234.786 243.942 232.039 243.746 231.843 243.157Z" fill="#A90B0B" transform="matrix(1.00306 0 0 -1 360 392)"/><path d="M295.608 186.39 295.608 128.838 303.456 128.838 311.304 128.838 311.304 186.39 311.304 243.942 303.456 243.942 295.608 243.942 295.608 186.39Z" fill="#A90B0B" transform="matrix(1.00306 0 0 -1 360 392)"/><path d="M152.905 126.549C142.245 123.868 136.294 117.066 133.612 104.575 132.566 99.6696 132.435 95.6148 132.5 68.016 132.5 41.6598 132.697 36.1662 133.612 31.7844 137.144 14.9766 146.888 7.7172 164.35 8.6328 174.945 9.2868 181.943 13.3416 186.259 21.4512 190.379 29.1684 190.51 30.411 190.772 65.2692 190.968 86.001 190.837 98.4924 190.379 101.566 188.417 114.45 183.12 121.906 173.375 125.633 168.601 127.465 158.203 127.922 152.905 126.549ZM167.947 110.722C170.629 109.414 173.702 105.425 174.618 101.959 175.076 100.324 175.272 87.8322 175.141 66.9042L174.945 34.335 173.114 30.6072C170.759 25.7676 168.274 24.0018 163.435 23.6748 161.342 23.544 158.922 23.544 158.006 23.8056 155.521 24.3942 152.447 27.3372 150.551 30.9996L148.785 34.335 148.589 67.4928C148.393 99.9966 148.458 100.781 149.766 103.921 150.551 105.686 151.99 107.91 152.971 108.891 156.633 112.357 162.846 113.142 167.947 110.722Z" fill="#A90B0B" transform="matrix(1.00306 0 0 -1 360 392)"/><path d="M78.48 117.72 78.48 110.526 87.309 110.526 96.138 110.526 96.138 60.495 96.138 10.3986 104.182 10.5948 112.161 10.791 112.357 60.6912 112.488 110.526 122.952 110.526 133.416 110.526 133.416 117.72 133.416 124.914 105.948 124.914 78.48 124.914 78.48 117.72Z" fill="#A90B0B" transform="matrix(1.00306 0 0 -1 360 392)"/><path d="M194.238 67.689 194.238 10.464 202.086 10.464 209.934 10.464 209.934 37.278 209.934 64.092 215.624 64.092C223.93 64.092 229.292 62.9802 231.778 60.822L233.805 58.9908 234.001 34.7274 234.197 10.464 242.372 10.464 250.613 10.464 250.286 32.5692C250.155 46.2378 249.763 55.4592 249.305 56.898 247.866 61.3452 244.727 65.3346 240.737 67.8852L236.813 70.3704 240.214 71.5476C244.531 73.0518 248.128 76.6488 249.239 80.442 249.828 82.4694 250.09 87.7668 250.155 97.119 250.155 112.75 249.566 115.431 245.446 119.093 239.953 123.868 233.87 124.914 211.504 124.914L194.238 124.914 194.238 67.689ZM230.535 109.61C231.712 109.087 233.02 108.106 233.413 107.387 233.87 106.537 234.132 101.435 234.132 94.3068 234.132 84.1044 234.001 82.3386 233.02 81.1614 231.385 79.134 227.854 78.5454 218.305 78.48L209.934 78.48 209.934 94.503 209.934 110.526 219.09 110.526C225.565 110.526 228.965 110.264 230.535 109.61Z" fill="#A90B0B" transform="matrix(1.00306 0 0 -1 360 392)"/><path d="M250.024 123.998C250.22 123.541 255.125 107.06 260.881 87.3744L271.41 51.6006 271.41 31.065 271.41 10.464 279.258 10.464 287.106 10.464 287.106 30.8034 287.106 51.1428 298.224 87.636C304.372 107.648 309.342 124.26 309.342 124.522 309.342 124.718 305.745 124.914 301.363 124.914L293.319 124.914 286.517 98.1C282.724 83.3196 279.454 71.4822 279.193 71.7438 278.931 72.0708 278.277 74.4906 277.623 77.172 277.034 79.8534 274.222 91.6908 271.345 103.528L266.047 124.914 257.872 124.914C251.267 124.914 249.763 124.718 250.024 123.998Z" fill="#A90B0B" transform="matrix(1.00306 0 0 -1 360 392)"/><path d="M14.388 45.126 14.388 10.464 49.05 10.464 83.712 10.464 83.712 45.126 83.712 79.788 49.05 79.788 14.388 79.788 14.388 45.126ZM75.864 45.126 75.864 18.312 49.05 18.312 22.236 18.312 22.236 45.126 22.236 71.94 49.05 71.94 75.864 71.94 75.864 45.126Z" fill="#A90B0B" transform="matrix(1.00306 0 0 -1 360 392)"/><path d="M29.43 45.453 29.43 26.16 48.723 26.16 68.016 26.16 68.016 45.453 68.016 64.746 48.723 64.746 29.43 64.746 29.43 45.453Z" fill="#A90B0B" transform="matrix(1.00306 0 0 -1 360 392)"/></g></svg>
                <div id="descript_text_login">
                  <h3 class="bold main_color">모든 물건을 내 손안에!</h3>
                </div>
              </div>
              <CCardBody>
                <CForm>
                  <CInput
                    placeholder="ID"
                    autocomplete="username email"
                    v-model="user.userId"
                    invalid-feedback="ID 입력 형식이 올바르지 않습니다."
                    :is-valid="show_warning"
                  >
                    <template #prepend-content><CIcon name="cil-user"/></template>
                  </CInput>
                  <CInput
                    style="font: small-caption"
                    placeholder="비밀번호"
                    type="password"
                    v-model="user.userPassword"
                    autocomplete="curent-password"
                  >
                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                  </CInput>
                  <CRow>
                    <CCol class="text-center">
                      <CButton size="lg" color="primary" block @click="loginSubmit">로그인</CButton>
                    </CCol>
                  </CRow>
                  <!-- <CRow style="margin-top:10px">
                    <CCol class="text-center">
                      <CButton size="lg" color="primary" variant="outline" block @click="loginSubmit">-</CButton>
                    </CCol>
                  </CRow> -->
                  <CRow class="mt-2" style="text-align: center">
                    <CCol>
                      아직 회원이 아니신가요?
                      <CButton color="link" v-bind:style="{fontSize: ftsize() +'px'}" @click="gotoRegister">회원가입</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
        </CCol>
      </CRow>
      <CModal
      :closeOnBackdrop="false"
      title="Modal_3"
      color="white"
      :show.sync="getModalState"
      :centered="true"
    >
      아이디 혹은 비밀번호가 일치하지 않습니다.
      <template #header>
        <h6 class="modal-title">로그인 실패</h6>
        <!-- <CButtonClose @click="showNicknameOverlapModal = false" class="text-white"/> -->
      </template>
      <template #footer>
        <CButton @click="checkModal" color="success">  확인  </CButton>
      </template>
    </CModal>
    </CContainer>
  </div>
</template>

<style scoped>
#login_body{
  overflow: hidden;
  height: 120%;
}
</style>

<script>
import { mapGetters } from "vuex"
export default {
  name: 'Login',
  data() { 
    return {
      warning_id:false,
      showCheckModal: false,
      windowWidth: window.outerWidth,
      user: {
        userId: "", 
        userPassword: "",
      },
      }; 
    }, 
    created() {
      this.$store.commit("registerStore/resetAll")
      this.$store.commit("loginCheck")
    },
    computed:{
      ...mapGetters([
        "getModalState"
      ])
    },
    methods: { 
      aa(){
        console.log(this.$store.state.userStore.loginModal)
      },
      show_warning() {
      if(this.warning_id)
        return false;
      return '';
    },
      input_checker(val){
        var reg1 = /^[a-z0-9]{5,20}$/;
        var reg2 = /[a-z]/g;    
        var reg3 = /[0-9]/g;
        if(reg1.test(val) &&  reg2.test(val) && reg3.test(val)){
          return true;
        }
        else return false;
      },
      checkModal(){
        this.user.userPassword = ''
        this.$store.commit("setLoginModal", false)
      },
      ftsize(){
        if(this.windowWidth > 320)
          return 13
        else
          return 5
      },
      gotoRegister(){
        this.$router.replace({ name: 'Register' })
      },
      async loginSubmit(e) { 
        e.preventDefault();
        
        if (!this.input_checker(this.user.userId)){
          this.warning_id = true;
          return;
        }

        this.$store.dispatch("login", this.user)



        // const response = await this.$http.post('/api/users/login', {
        //     userId: this.userId,
        //     userPassword: this.userPassword
        //   }).then((res) => {
        //     if(res.data.success == true){
        //       console.log(res.data.token)
        //       this.$router.replace({ name: 'Matching' })
        //     }
        //     if(res.data.success == false){
        //       this.showCheckModal = true;
        //     }
        //   }).catch(function (error){
        //     console.log(error)
        //   })





        // try { 
        //   this.$axios 
        //   .post(HOST + "/register", JSON.stringify(saveData), { 
        //     headers: { 
        //       "Content-Type": `application/json`, 
        //       }, 
        //       }) 
        //       .then((res) => { 
        //         if (res.status === 200) { 
        //           // 로그인 성공시 처리해줘야할 부분 
        //           } 
        //         }); 
        // } catch (error) { 
        //   console.error(error); 
        //   }
          //this.$router.replace({ name: 'Matching' })
      }, 
    }, 
};

</script>