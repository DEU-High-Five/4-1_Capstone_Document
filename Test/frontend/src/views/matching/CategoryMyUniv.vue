<template>
  <div>
    <div id="sec1" data-aos="fade-up" data-aos-once="true">
    <div>
    <h5 style="float:left">나의 학교</h5>
    <CButton pressed block color="secondary" shape="pill" aria-pressed="true" style="width: 150px; float:right; margin-top: -10px; font-weight:800">새 모집글 올리기</CButton>
    </div><br><br>
    </div>
    <CCard style="background-color: #A276AE; box-shadow: 3px 3px 10px rgb(152, 152, 152); border-color: #A276AE" v-for="(cards, index) in tableItems" :key="index" id="sec2" data-aos="fade-up" data-aos-once="true" data-aos-offset="-100" :data-aos-delay="delay_value(index)">
      <CRow id="card_head_count" v-if="!(cards.head_count == cards.head_count_max)" :style="{backgroundColor: color(cards.head_count, cards.head_count_max)}">
        <div style="margin:auto">{{cards.head_count}} / {{cards.head_count_max}}</div>
      </CRow>
      <CRow id="card_head_count" v-else :style="{backgroundColor: color(cards.head_count, cards.head_count_max)}">
        <div style="margin:auto">모집 완료</div>
      </CRow>
      <CCardBody class="category_detail" @click="gotoLogin()">
        <CRow>
          <CCol sm="5">
            <h4 id="card_title" class="card-title mb-0" v-text="cards.title"></h4>
            <div class="medium" style="margin-top: 10px" v-text="cards.sub_title"></div>
          </CCol>
          <CCol sm="7" class="d-none d-md-block">
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="5" style="margin-top: 20px; left:-10px">
            <div v-for="item in cards.tag" :key="item.id" id="tag_box" style="float:left">
              {{ item }}
            </div>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>
<style scoped>
#card_title{
  font-weight: 800;
  width:80%;
  text-overflow: ellipsis;
  text-shadow: 3px 3px 7px rgb(121, 121, 121);
}
#tag_box{
  background-color: yellow;
  margin-left: 10px;
  border-radius: 5px;
  color: black;
  padding-left: 3px;
  padding-right: 3px;
}
#card_head_count{
  position: absolute;
  margin-top: 20px;
  left: 82%;
  width: 60px;
  height: 30px;
  border-radius: 3px;
  font-weight: 800;
  color: #fff;
  text-shadow: 3px 3px 7px rgb(92, 92, 92);
}
.category_detail{
  height: 160px;
  color: aliceblue;
}
</style>

<script>
export default {
  name: 'CategoryMyUniv',
  created(){
    this.$store.commit("set", ["pageInfo", "매칭"])
    this.$store.commit("set", ["pageRoute", "> 나의 학교"])
  },
  data () {
    return {
      tableItems: [
        {
          title: "캡스톤 디자인 팀 구해요~!",
          sub_title: "스마트 앱 개발 계획인데 같이 하실 분!",
          tag: ["#상냥한", "#의기소침한", "#재밌는"],
          head_count_max: 4,
          head_count: 4, 
        },
        {
          title: "전공튜터링 선배 모집",
          sub_title: "비주얼 프로그래밍II 전문가 시급",
          tag: ["#어떤", "#태그를", "#넣을까"],
          head_count_max: 5,
          head_count: 3, 
        },
        {
          title: "컴퓨터 그래픽스 팀원 찾습니다",
          sub_title: "버스 손님 모십니다",
          tag: ["#능력있는", "#실력", "#재밌는"],
          head_count_max: 3,
          head_count: 1, 
        },
        {
          title: "아이디어 경진대회 팀원 구합니다",
          sub_title: "자세한 건 물어보세용",
          tag: ["#아이디어", "#경진", "#대회"],
          head_count_max: 5,
          head_count: 4, 
        },
        {
          title: "캡스톤 디자인 팀 구해요~!",
          sub_title: "스마트 앱 개발 계획인데 같이 하실 분!",
          tag: ["#상냥한", "#의기소침한", "#재밌는"],
          head_count_max: 4,
          head_count: 4, 
        },
        {
          title: "전공튜터링 선배 모집",
          sub_title: "비주얼 프로그래밍II 전문가 시급",
          tag: ["#어떤", "#태그를", "#넣을까"],
          head_count_max: 5,
          head_count: 3, 
        },
        {
          title: "컴퓨터 그래픽스 팀원 찾습니다",
          sub_title: "버스 손님 모십니다",
          tag: ["#능력있는", "#실력", "#재밌는"],
          head_count_max: 3,
          head_count: 1, 
        },
        {
          title: "아이디어 경진대회 팀원 구합니다",
          sub_title: "자세한 건 물어보세용",
          tag: ["#아이디어", "#경진", "#대회"],
          head_count_max: 5,
          head_count: 4, 
        },
        {
          title: "캡스톤 디자인 팀 구해요~!",
          sub_title: "스마트 앱 개발 계획인데 같이 하실 분!",
          tag: ["#상냥한", "#의기소침한", "#재밌는"],
          head_count_max: 4,
          head_count: 4, 
        },
        {
          title: "전공튜터링 선배 모집",
          sub_title: "비주얼 프로그래밍II 전문가 시급",
          tag: ["#어떤", "#태그를", "#넣을까"],
          head_count_max: 5,
          head_count: 3, 
        },
        {
          title: "컴퓨터 그래픽스 팀원 찾습니다",
          sub_title: "버스 손님 모십니다",
          tag: ["#능력있는", "#실력", "#재밌는"],
          head_count_max: 3,
          head_count: 1, 
        },
        {
          title: "아이디어 경진대회 팀원 구합니다",
          sub_title: "자세한 건 물어보세용",
          tag: ["#아이디어", "#경진", "#대회"],
          head_count_max: 5,
          head_count: 4, 
        },
        // {
        //   avatar: { url: 'img/avatars/6.jpg', status: 'danger' },
        //   user: { name: 'Friderik Dávid', new: true, registered: 'Jan 1, 2015' },
        //   country: { name: 'Poland', flag: 'cif-pl' },
        //   usage: { value: 43, period: 'Jun 11, 2015 - Jul 10, 2015' },
        //   payment: { name: 'Amex', icon: 'cib-cc-amex' },
        //   activity: 'Last week'
        // }
      ],
      tableFields: [
        { key: 'avatar', label: '', _classes: 'text-center' },
        { key: 'user' },
        { key: 'country', _classes: 'text-center' },
        { key: 'usage' },
        { key: 'payment', label: 'Payment method', _classes: 'text-center' },
        { key: 'activity' },
      ]
    }
  },
  methods: {
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
        this.$router.push({ name: 'ViewPost' })
    },
  }
}
</script>
