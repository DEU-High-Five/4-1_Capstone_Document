(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e8805a72"],{"9afc":function(e,t,s){"use strict";s("eace")},cf91:function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"c-app flex-row align-items-center"},[s("CWrapper",[s("CHeader",{staticStyle:{"padding-left":"20px","padding-top":"10px"},attrs:{fixed:"",light:""}},[s("div",[s("svg",{staticClass:"c-icon c-icon-custom-size",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",role:"img",height:"42"},on:{click:function(t){e.primaryModal=!0}}},[s("polygon",{staticClass:"ci-primary",attrs:{fill:"var(--ci-primary-color, currentColor)",points:"497.333 239.999 80.092 239.999 176.087 144.004 153.46 121.377 18.837 256 153.46 390.623 176.087 367.996 80.09 271.999 497.333 271.999 497.333 239.999"}})])]),s("div",{attrs:{id:"title_text"}},[s("h2",{staticStyle:{"font-weight":"800"}},[e._v("회원가입")])])]),s("div",{staticClass:"c-body"},[s("main",{staticClass:"c-main"},[s("CContainer",[s("CRow",{staticClass:"justify-content-center"},[s("CCol",{staticStyle:{width:"85%"},attrs:{md:"4"}},[s("CForm",[s("CInput",{attrs:{id:"noWarning",label:"아이디","valid-feedback":"사용 가능한 아이디입니다.","invalid-feedback":"사용 불가능한 아이디입니다.",description:e.description_text_id(),value:"","is-valid":e.id_value_checker},scopedSlots:e._u([{key:"append",fn:function(){return[s("CButton",{attrs:{color:"primary"},on:{click:function(t){return e.id_overlap_check()}}},[e._v("중복확인")])]},proxy:!0}]),model:{value:e.reg_id,callback:function(t){e.reg_id=t},expression:"reg_id"}}),s("CInput",{staticStyle:{font:"small-caption"},attrs:{label:"비밀번호","valid-feedback":"사용 가능한 비밀번호입니다.",type:"password",description:e.description_text_pass(),value:"","is-valid":e.pass_check},model:{value:e.reg_pass,callback:function(t){e.reg_pass=t},expression:"reg_pass"}}),s("CInput",{staticStyle:{font:"small-caption"},attrs:{label:"비밀번호 확인",type:"password","valid-feedback":"비밀번호가 일치합니다.","invalid-feedback":e.description_text_pass_check(),value:"","is-valid":e.validator_pass_check},model:{value:e.reg_pass_check,callback:function(t){e.reg_pass_check=t},expression:"reg_pass_check"}}),s("CInput",{attrs:{label:"닉네임","valid-feedback":"사용 가능한 닉네임입니다.","invalid-feedback":"사용 불가능한 닉네임입니다.",value:"","is-valid":e.nickname_value_checker},scopedSlots:e._u([{key:"append",fn:function(){return[s("CButton",{attrs:{color:"primary"},on:{click:function(t){return e.nickname_overlap_check()}}},[e._v("중복확인")])]},proxy:!0}]),model:{value:e.reg_nickname,callback:function(t){e.reg_nickname=t},expression:"reg_nickname"}}),s("CSelect",{attrs:{name:"select_question",label:"본인 확인 질문",horizontal:"",options:e.options,placeholder:"본인 확인 질문을 선택해주세요."},on:{change:function(t){return e.question_select(t)}}}),s("CInput",{attrs:{label:"본인 확인 질문 답변",description:e.description_text_answer(),disabled:e.is_question_selected,"is-valid":e.answer_checker},model:{value:e.reg_answer,callback:function(t){e.reg_answer=t},expression:"reg_answer"}}),s("div",{staticClass:"form-check",staticStyle:{}},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.isAgreed,expression:"isAgreed"}],staticClass:"form-check-input",attrs:{type:"checkbox",value:"",id:"flexCheckDefault"},domProps:{checked:Array.isArray(e.isAgreed)?e._i(e.isAgreed,"")>-1:e.isAgreed},on:{change:function(t){var s=e.isAgreed,i=t.target,a=!!i.checked;if(Array.isArray(s)){var o="",r=e._i(s,o);i.checked?r<0&&(e.isAgreed=s.concat([o])):r>-1&&(e.isAgreed=s.slice(0,r).concat(s.slice(r+1)))}else e.isAgreed=a}}}),s("label",{staticClass:"form-check-label",attrs:{for:"flexCheckDefault"}},[e._v(" 개인 정보 수집 이용 동의 ")])])],1)],1)],1)],1)],1)]),s("CFooter",{staticStyle:{height:"10%","background-color":"white"},attrs:{fixed:""}},[s("CButton",{staticStyle:{margin:"10px auto",width:"95%"},attrs:{size:"lg",color:"primary",block:""},on:{click:e.gotoNextPage}},[e._v("다음")])],1),s("CModal",{attrs:{title:"Modal title",color:"primary",show:e.primaryModal},on:{"update:show":function(t){e.primaryModal=t}},scopedSlots:e._u([{key:"header",fn:function(){return[s("h6",{staticClass:"modal-title"},[e._v("로그인 화면으로 이동")]),s("CButtonClose",{staticClass:"text-white",on:{click:function(t){e.primaryModal=!1}}})]},proxy:!0},{key:"footer",fn:function(){return[s("CButton",{attrs:{color:"white"},on:{click:function(t){return e.goToLoginChecker(!1)}}},[e._v("아니오")]),s("CButton",{attrs:{color:"primary"},on:{click:function(t){return e.goToLoginChecker(!0)}}},[e._v(" 예 ")])]},proxy:!0}])},[e._v(" 로그인 화면으로 돌아가시겠습니까?"),s("br"),e._v("작성된 내용은 모두 지워집니다. ")]),this.isIdValid&&this.isUsableID?s("CModal",{attrs:{title:"Modal_2",color:"success",show:e.showIdOverlapModal},on:{"update:show":function(t){e.showIdOverlapModal=t}},scopedSlots:e._u([{key:"header",fn:function(){return[s("h6",{staticClass:"modal-title"},[e._v("ID 중복확인")]),s("CButtonClose",{staticClass:"text-white",on:{click:function(t){e.showIdOverlapModal=!1}}})]},proxy:!0},{key:"footer",fn:function(){return[s("CButton",{attrs:{color:"success"},on:{click:function(t){e.showIdOverlapModal=!1}}},[e._v(" 확인 ")])]},proxy:!0}],null,!1,27027963)},[e._v(" 사용 가능한 ID입니다. ")]):s("CModal",{attrs:{title:"Modal_2",color:"danger",show:e.showIdOverlapModal},on:{"update:show":function(t){e.showIdOverlapModal=t}},scopedSlots:e._u([{key:"header",fn:function(){return[s("h6",{staticClass:"modal-title"},[e._v("ID 중복확인")]),s("CButtonClose",{staticClass:"text-white",on:{click:function(t){e.showIdOverlapModal=!1}}})]},proxy:!0},{key:"footer",fn:function(){return[s("CButton",{attrs:{color:"danger"},on:{click:function(t){e.showIdOverlapModal=!1}}},[e._v(" 확인 ")])]},proxy:!0}])},[e._v(" 사용 불가능한 ID입니다. ")]),this.isNicknameValid?s("CModal",{attrs:{title:"Modal_3",color:"success",show:e.showNicknameOverlapModal,centered:!0},on:{"update:show":function(t){e.showNicknameOverlapModal=t}},scopedSlots:e._u([{key:"header",fn:function(){return[s("h6",{staticClass:"modal-title"},[e._v("닉네임 중복확인")]),s("CButtonClose",{staticClass:"text-white",on:{click:function(t){e.showNicknameOverlapModal=!1}}})]},proxy:!0},{key:"footer",fn:function(){return[s("CButton",{attrs:{color:"success"},on:{click:function(t){e.showNicknameOverlapModal=!1}}},[e._v(" 확인 ")])]},proxy:!0}],null,!1,850379935)},[e._v(" 사용 가능한 닉네임입니다. ")]):s("CModal",{attrs:{title:"Modal_3",color:"danger",show:e.showNicknameOverlapModal,centered:!0},on:{"update:show":function(t){e.showNicknameOverlapModal=t}},scopedSlots:e._u([{key:"header",fn:function(){return[s("h6",{staticClass:"modal-title"},[e._v("닉네임 중복확인")])]},proxy:!0},{key:"footer",fn:function(){return[s("CButton",{attrs:{color:"danger"},on:{click:function(t){e.showNicknameOverlapModal=!1}}},[e._v(" 확인 ")])]},proxy:!0}])},[e._v(" 이미 사용 중인 닉네임입니다. ")])],1)],1)},a=[],o={name:"Register2",components:{},data:function(){return{reg_id:"",reg_pass:"",reg_pass_check:"",reg_nickname:"",reg_verify_question:"",reg_answer:"",reg_agree:!1,reg_id_temp:"",reg_pass_temp:"",reg_pass_check_temp:"",reg_nickname_temp:"",isUsableID:!1,isIdValid:!1,isPassValid:!1,isNicknameValid:!1,isPassword1Valid:!1,isPassword2Valid:!1,isQuestionSelected:!1,isAnswerValid:!1,isAgreed:!1,selected:[],show:!0,primaryModal:!1,showIdOverlapModal:!1,showNicknameOverlapModal:!1,horizontal:{label:"col-3",input:"col-9"},desc_text_id:"5~20자 영문 숫자를 포함해주세요.",options:["내가 다녔던 초등학교 이름은?","아버지 성함은?","어머니 성함은?","어렸을 때 내 별명은?","내가 좋아하는 노래는?","추억의 장소는?"]}},computed:{is_question_selected:function(){return""!=this.reg_verify_question&&(this.isQuestionSelected=!0),""==this.reg_verify_question}},methods:{id_overlap_check:function(){this.showIdOverlapModal=!0,this.isIdValid=!0,this.reg_id_temp=this.reg_id},pass_check:function(e){var t=/^[a-z0-9]{5,20}$/,s=/[a-z]/g,i=/[0-9]/g;return t.test(e)&&s.test(e)&&i.test(e)?(this.isPassword1Valid=!0,!0):(this.isPassword1Valid=!1,!1)},pass_confirm_check:function(){return!(!this.isPassword1Valid||this.reg_pass!==this.reg_pass_check)&&(this.isPassword2Valid=!0,!0)},nickname_overlap_check:function(){this.showNicknameOverlapModal=!0,this.isNicknameValid=!0,this.reg_nickname_temp=this.reg_nickname},_check:function(){this.isIdValid},question_select:function(e){this.reg_verify_question=e.target.value,console.log(""==this.reg_verify_question)},answer_checker:function(e){return""!=this.reg_answer?(this.isAnswerValid=!0,!0):(this.isAnswerValid=!1,!1)},goToLoginChecker:function(e){e?this.$router.replace({path:"/pages/login"}):this.primaryModal=!1},description_text_id:function(){return this.isIdValid?"":"5~20자 영문 숫자를 포함해주세요."},description_text_pass:function(){return this.isPassword1Valid?"":"5~20자 영문 숫자를 포함해주세요."},description_text_pass_check:function(){return this.isPassword1Valid&&this.password2?"비밀번호가 일치하지 않습니다.":""},description_text_answer:function(){return this.isAnswerValid?"":"필수 답변 사항입니다."},validCheck:function(){this.IdVaild=!0},gotoNextPage:function(){console.log(this.$store.register_data),this.isIdValid&&this.isPassword1Valid&&this.isPassword2Valid&&this.isQuestionSelected&&this.isNicknameValid&&this.isAnswerValid&&this.isAgreed&&(this.$store.commit("set",["reg_id",this.reg_id]),this.$store.commit("set",["reg_pass",this.reg_pass]),this.$store.commit("set",["reg_nickname",this.reg_nickname]),this.$store.commit("set",["reg_verify_question",this.reg_verify_question]),this.$store.commit("set",["reg_answer",this.reg_answer]),this.$router.replace({path:"/pages/register3"}))},id_value_checker:function(e){if(""!=this.reg_id_temp&&this.reg_id_temp!=this.reg_id&&(this.isIdValid=!1),this.isIdValid){var t=/^[a-z0-9]{5,20}$/,s=/[a-z]/g,i=/[0-9]/g;return t.test(e)&&s.test(e)&&i.test(e)?(this.isUsableID=!0,!0):(this.isUsableID=!1,!1)}},nickname_value_checker:function(e){if(""!=this.reg_nickname_temp&&this.reg_nickname_temp!=this.reg_nickname&&(this.isNicknameValid=!1),this.isNicknameValid)return!!e&&e.length>=5},password_checker:function(e){var t=/^[a-z0-9]{5,20}$/,s=/[a-z]/g,i=/[0-9]/g;return t.test(e)&&s.test(e)&&i.test(e)?(this.isPassword1Valid=!0,!0):(this.isPassword1Valid=!1,!1)},validator_pass_check:function(){return this.isPassword1Valid&&this.reg_pass===this.reg_pass_check?(this.isPassword2Valid=!0,!0):(this.isPassword2Valid=!1,!1)},answer:function(e){return!!e&&e.length>0}}},r=o,n=(s("9afc"),s("2877")),c=Object(n["a"])(r,i,a,!1,null,null,null);t["default"]=c.exports},eace:function(e,t,s){}}]);
//# sourceMappingURL=chunk-e8805a72.7c839ab7.js.map