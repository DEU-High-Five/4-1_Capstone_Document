(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e1dcc"],{"7bf1":function(t,e,o){"use strict";o.r(e);var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"c-app flex-row align-items-center"},[o("CWrapper",[o("CHeader",{staticStyle:{"padding-left":"20px","padding-top":"10px"},attrs:{fixed:"",light:""}},[o("div",[o("svg",{staticClass:"c-icon c-icon-custom-size",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",role:"img",height:"42"},on:{click:function(e){t.primaryModal=!0}}},[o("polygon",{staticClass:"ci-primary",attrs:{fill:"var(--ci-primary-color, currentColor)",points:"497.333 239.999 80.092 239.999 176.087 144.004 153.46 121.377 18.837 256 153.46 390.623 176.087 367.996 80.09 271.999 497.333 271.999 497.333 239.999"}})])]),o("div",{attrs:{id:"title_text"}},[o("h2",{staticStyle:{"font-weight":"800"}},[t._v("회원가입")])])]),o("div",{staticClass:"c-body"},[o("main",{staticClass:"c-main"},[o("CContainer",[o("CRow",{staticClass:"justify-content-center"},[o("CCol",{staticStyle:{width:"85%"},attrs:{md:"4"}},[o("CForm",[o("CSelect",{attrs:{name:"select_interest",label:"관심 학과를 선택해주세요. (선택)",horizontal:"",options:t.majorList,placeholder:"# 학과를 선택해주세요."}})],1)],1)],1)],1)],1)]),o("CFooter",{staticStyle:{height:"10%","background-color":"white"},attrs:{fixed:""}},[o("CButton",{staticStyle:{margin:"10px auto",width:"95%"},attrs:{size:"lg",color:"primary",block:""},on:{click:t.gotoFinalPage}},[t._v("회원가입 완료")])],1),o("CModal",{attrs:{title:"Modal title",color:"primary",show:t.primaryModal},on:{"update:show":function(e){t.primaryModal=e}},scopedSlots:t._u([{key:"header",fn:function(){return[o("h6",{staticClass:"modal-title"},[t._v("로그인 화면으로 이동")]),o("CButtonClose",{staticClass:"text-white",on:{click:function(e){t.primaryModal=!1}}})]},proxy:!0},{key:"footer",fn:function(){return[o("CButton",{attrs:{color:"white"},on:{click:function(e){return t.checker(!1)}}},[t._v("아니오")]),o("CButton",{attrs:{color:"primary"},on:{click:function(e){return t.checker(!0)}}},[t._v(" 예 ")])]},proxy:!0}])},[t._v(" 로그인 화면으로 돌아가시겠습니까?"),o("br"),t._v("작성된 내용은 모두 지워집니다. ")])],1)],1)},r=[],a=o("ec13"),n={name:"Register3",data:function(){return{primaryModal:!1,goLogin:!1,majorList:[]}},methods:{gotoFinalPage:function(){this.$store.commit("set",["reg_interested_major",this.reg_interested_major]),this.$router.replace({path:"/pages/register4"})},gotoLogin:function(){this.$router.replace({path:"/pages/login"})},checker:function(t){t?this.$router.replace({path:"/pages/login"}):this.primaryModal=!1}},created:function(){var t=this;a.Root.content.map((function(e){t.$store.state.reg_univ==e.schoolName[0]&&t.majorList.push(e.departmentName[0])}))}},s=n,c=o("2877"),l=Object(c["a"])(s,i,r,!1,null,null,null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d0e1dcc.1c62da59.js.map