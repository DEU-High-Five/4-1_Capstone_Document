<template>
  <div>
    <input type="file" accept="image/*" capture="camera"> 
  </div>
</template>

<style scoped>
.was-validated .form-control:invalid, .form-control.is-invalid {
  border-color: #d8dbe0;
  background-image: none;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.was-validated .form-control:invalid:focus, .form-control.is-invalid:focus {
  border-color: #d8dbe0;
  box-shadow: none;
}
</style>

<script>
import { mapGetters } from "vuex"
import http from "../../http"
export default {
  name: 'GenNewGroup',
  data () {
    return {
      userName: "정현수",
      groupCode: ['', ''],
      userDescription: "",
      uploadModal: false,

      warning_group_code: false,
      warning_user_desc: false,
    }
  },
  created() {
  },
  computed:{
    ...mapGetters([
      "isNotAuthenticated",
      "getUserInfo"
    ]),
  },
  methods: {
    show_upload_modal(){
      const checker = this.upload_checker()
      if (!checker)
        return;
      return this.uploadModal = true;
    },
    upload_checker(){
      // 기관 코드
      if(this.groupCode[0].length != 4 || this.groupCode[1].length != 4){
        this.warning_group_code = true;
      }else{
        this.warning_group_code = false;
      }

      // 직급/부서
      if(this.userDescription == '' || this.userDescription.length < 1 || this.userDescription.length > 20){
        this.warning_user_desc = true;
      }else{
        this.warning_user_desc = false;
      }

      if(this.warning_group_code || this.warning_user_desc){
        return false;
      }
      this.uploadModal = true;
      return true;
    },
    show_warning_group_code() {
      if(this.warning_group_code)
        return false;
      return '';
    },
    show_warning_user_desc() {
      if(this.warning_user_desc)
        return false;
      return '';
    },
    check_and_send(){
      //임시
      return this.$router.replace({ name: 'CheckGroup', query: {data : JSON.stringify({groupCode:this.groupCode})} })

      http.post('/matching/upload', {
        userId: "",
        userName: this.getUserInfo.univ,
        groupName: this.groupName,
        groupDescription: html_content,
      }).then((res) => {
        console.log(res.data.success)
        if(res.data.success == true){
          this.$router.replace({ name: 'GenGroupSuccess', query: {data : JSON.stringify({num: res.data.target})} })
        }
        if(res.data.success == false){
          this.$router.replace({ path: '/pages/register_failed' })
        }
      }).catch(function (error){
        console.log(error)
      })
    },
    gotoMain(){
        this.$router.push({ name: 'MainHome' })
    },
  }
}
</script>