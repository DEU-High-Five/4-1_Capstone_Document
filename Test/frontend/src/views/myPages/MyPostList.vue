<template>
  <div>
    <div v-if="isEmpty(this.tableItems)" style="text-align:center; height: 70vh;">
        <CSpinner style="margin-top: 35vh">
        </CSpinner>
    </div>
    <div v-else>
        <div id="sec1" data-aos="fade-up" data-aos-once="true">
            <div>
                <h5 style="float:left">나의 학과</h5>
            </div><br><br>
            <div v-if="tableItems.myMajor.isEmpty">
                <CCard class="my_major_card">
                    <CCardBody class="my_pages_card">
                        <CRow>
                            <CCol style="width:80%">
                                <h4 id="my_pages_card_title">작성된 글이 없습니다.</h4>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </div>
            <div v-else>
                <CCard class="my_major_card"
                    v-for="(cards, index) in tableItems.myMajor.data" 
                    :key="index" 
                    id="sec2" 
                >
                    <CCardBody class="my_pages_card" @click="gotoViewPost(cards.BOARD_NUM)">
                        <CRow>
                            <CCol style="width:80%">
                                <h4 id="my_pages_card_title">{{cards.TITLE}}</h4>
                            </CCol>
                        </CRow>
                    </CCardBody>
                    <CCardFooter  class="disable_padding color_my_major">
                        <CRow v-if="cards.HEAD_COUNT != cards.BOARD_MAX" class="justify-content-center" style="width:100%; margin:0;">
                            <CCol id="head_count_" class="color_my_major">
                                모집인원
                            </CCol>
                            <CCol id="head_count_"  :style="{backgroundColor: color(cards.HEAD_COUNT, cards.BOARD_MAX)}">
                                {{cards.HEAD_COUNT}} / {{cards.BOARD_MAX}}
                            </CCol>
                        </CRow>
                        <CRow v-else class="justify-content-center" style="width:100%; margin:0;">
                            <CCol id="head_count_"  :style="{backgroundColor: color(cards.HEAD_COUNT, cards.BOARD_MAX)}">
                                모집완료
                            </CCol>
                        </CRow>
                    </CCardFooter>
                </CCard>
                </div>
        </div>
        <div id="sec1" data-aos="fade-up" data-aos-once="true" data-aos-delay="50">
            <div>
                <h5 style="float:left">나의 학교</h5>
            </div>
            <br><br>
            <div v-if="tableItems.myUniv.isEmpty">
                <CCard class="my_univ_card"
                    id="sec2" 
                >
                    <CCardBody class="my_pages_card">
                        <CRow>
                            <CCol style="width:80%">
                                <h4 id="my_pages_card_title">작성된 글이 없습니다.</h4>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </div>
            <div v-else>
                <CCard class="my_univ_card"  
                    v-for="(cards, index) in tableItems.myUniv.data" 
                    :key="index" 
                    id="sec2" 
                >
                    <CCardBody class="my_pages_card" @click="gotoViewPost(cards.BOARD_NUM)">
                        <CRow>
                            <CCol style="width:80%">
                                <h4 id="my_pages_card_title">{{cards.TITLE}}</h4>
                            </CCol>
                        </CRow>
                    </CCardBody>
                    <CCardFooter  class="disable_padding color_my_univ">
                        <CRow v-if="cards.HEAD_COUNT != cards.BOARD_MAX" class="justify-content-center" style="width:100%; margin:0;">
                            <CCol id="head_count_" class="color_my_univ">
                                모집인원
                            </CCol>
                            <CCol id="head_count_"  :style="{backgroundColor: color(cards.HEAD_COUNT, cards.BOARD_MAX)}">
                                {{cards.HEAD_COUNT}} / {{cards.BOARD_MAX}}
                            </CCol>
                        </CRow>
                        <CRow v-else class="justify-content-center" style="width:100%; margin:0;">
                            <CCol id="head_count_"  :style="{backgroundColor: color(cards.HEAD_COUNT, cards.BOARD_MAX)}">
                                모집완료
                            </CCol>
                        </CRow>
                    </CCardFooter>
                </CCard>
            </div>
        </div>
        <div id="sec1" data-aos="fade-up" data-aos-once="true" data-aos-delay="100" data-aos-offset="-500">
            <div>
                <h5 style="float:left">친구</h5>
            </div>
            <br><br>
            <div v-if="tableItems.friends.isEmpty">
                <CCard class="friends_card"
                    id="sec2" 
                >
                    <CCardBody class="my_pages_card">
                        <CRow>
                            <CCol style="width:80%">
                                <h4 id="my_pages_card_title">작성된 글이 없습니다.</h4>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </div>
            <div v-else>
                <CCard class="friends_card"  
                    v-for="(cards, index) in tableItems.friends.data" 
                    :key="index" 
                    id="sec2" 
                >
                    <CCardBody class="my_pages_card" @click="gotoViewPost(cards.BOARD_NUM)">
                        <CRow>
                            <CCol style="width:80%">
                                <h4 id="my_pages_card_title">{{cards.TITLE}}</h4>
                            </CCol>
                        </CRow>
                    </CCardBody>
                    <CCardFooter  class="disable_padding color_friends">
                        <CRow v-if="cards.HEAD_COUNT != cards.BOARD_MAX" class="justify-content-center" style="width:100%; margin:0;">
                            <CCol id="head_count_" class="color_friends">
                                모집인원
                            </CCol>
                            <CCol id="head_count_"  :style="{backgroundColor: color(cards.HEAD_COUNT, cards.BOARD_MAX)}">
                                {{cards.HEAD_COUNT}} / {{cards.BOARD_MAX}}
                            </CCol>
                        </CRow>
                        <CRow v-else class="justify-content-center" style="width:100%; margin:0;">
                            <CCol id="head_count_"  :style="{backgroundColor: color(cards.HEAD_COUNT, cards.BOARD_MAX)}">
                                모집완료
                            </CCol>
                        </CRow>
                    </CCardFooter>
                </CCard>
            </div>
        </div>

        <div id="sec1" data-aos="fade-up" data-aos-once="true" data-aos-delay="150">
            <div>
                <h5 style="float:left">동아리</h5>
            </div>
        <br><br>
        <div v-if="tableItems.club.isEmpty">
            <CCard class="club_card">
                <CCardBody class="my_pages_card">
                    <CRow>
                        <CCol style="width:80%">
                            <h4 id="my_pages_card_title">작성된 글이 없습니다.</h4>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </div>
        <div v-else>
            <CCard class="club_card" v-for="(cards, index) in tableItems.club.data" :key="index">
                <CCardBody class="my_pages_card" @click="gotoViewPost(cards.BOARD_NUM)">
                    <CRow>
                        <CCol style="width:80%">
                            <h4 id="my_pages_card_title">{{cards.TITLE}}</h4>
                        </CCol>
                    </CRow>
                </CCardBody>
                <CCardFooter  class="disable_padding color_club">
                    <CRow v-if="cards.HEAD_COUNT != cards.BOARD_MAX" class="justify-content-center" style="width:100%; margin:0;">
                        <CCol id="head_count_" class="color_club">
                            모집인원
                        </CCol>
                        <CCol id="head_count_"  :style="{backgroundColor: color(cards.HEAD_COUNT, cards.BOARD_MAX)}">
                            {{cards.HEAD_COUNT}} / {{cards.BOARD_MAX}}
                        </CCol>
                    </CRow>
                    <CRow v-else class="justify-content-center" style="width:100%; margin:0;">
                        <CCol id="head_count_"  :style="{backgroundColor: color(cards.HEAD_COUNT, cards.BOARD_MAX)}">
                            모집완료
                        </CCol>
                    </CRow>
                </CCardFooter>
            </CCard>
        </div>
    </div>
    </div>
  </div>
</template>
<style scoped>
#head_count_{
    text-align: center;
    color:white;
    font-weight: 800;
}
.disable_padding{
    padding:0;
}
#card_head_count{
  width: 100%;
  height: 100%;
  background-color: brown;
  border-radius: 3px;
  font-weight: 800;
  color: #fff;
  text-shadow: 3px 3px 7px rgb(92, 92, 92);
}
#my_pages_card_title{
  overflow: hidden; 
  white-space: nowrap;
  font-weight: 800;
  text-overflow: ellipsis;
  text-shadow: 3px 3px 7px #555555;
  text-overflow:ellipsis;
}
#circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url("../../assets/images/profile_image.png");
  background-size: cover;
  box-shadow: 3px 3px 7px #CCC;
}
</style>

<script>
import http from "../../http"
export default {
  name: 'MyAccount',
  created(){
    this.$store.commit("pageStore/set_page", ["pageInfo", "내 매칭글"])
    this.$store.commit("pageStore/set_page", ["pageRoute", ""])
    http.get('/myPages').then((res) => {
      if (res.status == 200){
        this.tableItems = res.data.myPosts
      }
    }).catch(function (error){
        console.log(error)
    })
  },
  data () {
    return {
        tableItems: [],
    }
  },
  methods: {
    gotoViewPost(value){
      if (value != undefined){
        this.$router.push({ name: 'ViewPost', query: {data : JSON.stringify({num: value})} })
      }
    },
    isEmpty(value){
      if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
        return true
        }else{
          return false
        }
    },
    delay_value(index){
      if (index < 4)
        return index * 100
      else return 0
    },
    color (value, max) {
      let $color
      let $temp = value/max
      if ($temp <= 0.5) {
        $color = 'rgb(37,186,14)'
      } else if ($temp > 0.5 && $temp <= 0.75) {
        $color = 'rgb(255, 127, 0)'
      } else if ($temp > 0.75 && $temp < 0.98) {
        $color = 'rgb(245,89,25)'
      }
      else $color = 'rgb(177,30,49)'
      return $color
    },
    gotoLogin(){
        this.$router.push({ path: '/matching/ViewPost' })
    },
  }
}
</script>