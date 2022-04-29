import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import router from './router'
import createPersistedState from "vuex-persistedstate";

import jwt from "./common/jwt"
import http from "./http"

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  // pageInfo: '',
  // pageRoute: '',
  // isMainPage: true,
  // category: '',
}

const mutations = {
  toggleSidebarDesktop(state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile(state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  // pageUpdate(state, [insert_, delete_]){
  //   state.
  // },
  // pageInfo: function(state, payload){
  //   state.pageDirectory = payload.pageName
  // },
  set(state, [variable, value]) {
    state[variable] = value
  },
  set_register_store(register_data, [variable, value]) {
    register_data[variable] = value
  }
}

const pageStore = {
  namespaced: true,
  state:{
    pageInfo: '',
    pageRoute: '',
    isMainPage: true,
    category: '',
    message: 0,
  },
  mutations:{
    set_page(state, [variable, value]) {
      state[variable] = value
    },
  }
}

const registerStore = {
  namespaced: true,
  state:{
    reg_univ: '',
    reg_major: '',
    reg_cert_file: '',
    reg_id: '',
    reg_password: '',
    reg_nickname: '',
    reg_email: '',
    reg_verify_question: '',
    reg_question_answer: '',
    reg_interested_major: ''
  },
  mutations: {
    set_reg(state, [variable, value]) {
      state[variable] = value
    },
    resetAll: function(state){
      state.reg_univ = ''
      state.reg_major = ''
      state.reg_cert_file = ''
      state.reg_id = ''
      state.reg_password = ''
      state.reg_nickname = ''
      state.reg_email = ''
      state.reg_verify_question = ''
      state.reg_question_answer = ''
      state.reg_interested_major = ''
    },
  //   checkAndSend(){
  //     this.$http.post('/api/users/signUp', {
  //       reg_univ: state.reg_univ,
  //       reg_major: state.reg_major,
  //       reg_id: state.reg_id,
  //       reg_password: state.reg_password,
  //       reg_nickname: state.reg_nickname,
  //       reg_email : state.reg_email,
  //       reg_verify_question: state.reg_verify_question,
  //       reg_question_answer: state.reg_question_answer,
  //       reg_interested_major: state.reg_interested_major
  //     }).then((res) => {
  //       console.log(res.data.success)
  //       if(res.data.success == true){
  //         this.$router.replace({ path: '/pages/register_success' })
  //       }
  //       if(res.data.success == false){
  //         this.$router.replace({ path: '/pages/register_failed' })
  //       }
  //       state.reg_univ = ''
  //       state.reg_major = ''
  //       state.reg_cert_file = ''
  //       state.reg_id = ''
  //       state.reg_password = ''
  //       state.reg_nickname = ''
  //       state.reg_email = ''
  //       state.reg_verify_question = ''
  //       state.reg_question_answer = ''
  //       state.reg_interested_major = ''
  //     }).catch(function (error){
  //       console.log(error)
  //     })
  // },
  }
}



const userStore = { 
  state: { 
    loginModal: false,

    userId: '', 
    userUniv: '',
    userMajor: '',
    userNickname: '',
    authorized: '',    
    token: {
      accessToken: jwt.getToken(),
    },
    isAuthenticated: !!jwt.getToken(),
  }, 
  getters: {
    getUserInfo: function (state) {
      const user = {
        userId: state.userId,
        univ: state.userUniv,
        major: state.userMajor,
        nickname: state.userNickname,
        authorized: state.authorized
      }
      return user
    },
    getUserId: function (state) {
      return state.userId
    },
    getModalState: function (state) {
      return state.loginModal
    },
    getUserUniv: function (state) {
      return state.userUniv
    },
    getUserMajor: function (state) {
      return state.userMajor
    },
    getAccessToken: function (state) {
      return state.token.accessToken
    },
    isAuthenticated: function (state) {
      return state.isAuthenticated
    },
    isNotAuthenticated: function (state) {
      return !state.isAuthenticated
    },
  },
  mutations: {
    refreshToken: function(state, value) {
      state.token.accessToken = value       
    },
    setLoginModal: function(state, value) {
      state.loginModal = value
    },
    login: function (state, payload) { 
      state.userId = payload.userId 
      state.userUniv = payload.userUniv,
      state.userMajor = payload.userMajor,
      state.userNickname = payload.userNickname,
      state.authorized = payload.authorized, 
      state.token.accessToken = payload.accessToken
      state.isAuthenticated = true
      jwt.saveToken(payload.accessToken)
    }, 
    logout: function (state, payload = {}) {
      state.token.accessToken = ""
      state.isAuthenticated = false
      state.userId = ''
      state.userUniv = ''
      state.userMajor = ''
      state.userNickname = ''
      state.authorized = ''
      jwt.destroyToken()
    },
    loginCheck: function (state) { 
      if (state.token.accessToken) { 
        router.push({ 
          name: 'MatchingCategory' 
        }).catch(error => { console.log(error) 
        }) 
      } 
    } 
  },
  actions: {
    logout: function (context, payload) {
      return new Promise(resolve => {
        let params = {
          userId: context.state['userId'],
        }
        http
          .post("/users/logout", params)
          .then(response => {
            if(response.status === 200){
              context.commit("logout", payload)
            }
            resolve({response})
          }).catch(error => {
            console.log(error)
          })
      })
    },
    login: function (context, payload) {
      let params = {
        userId: payload.userId,
        userPassword: payload.userPassword,
      }
      return new Promise((resolve, reject) => {
        http
          .post("/users/login", params)
          .then(response => {
            const { data } = response
            if(data.success){
              context.commit("login", {
                userId: data.user.Id,
                userUniv: data.user.Univ,
                userMajor: data.user.Major,
                userNickname: data.user.Nickname,
                authorized: data.user.authorized, 
                accessToken: data.accessToken,
              })
              resolve(response)
              router.replace({ name: 'Matching' })
            }
            else{
              context.commit("setLoginModal", true)
              resolve(response)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // loginCheck: function (context, payload) {
    //   return new Promise((resolve, reject) => {
    //     http
    //       .get("/users/")
    //       .then(response => {
    //         const { data } = response
    //         if(data.success){
    //           console.log(data)
    //           context.commit("login", {
    //             userId: data.user.Id,
    //             userUniv: data.user.Univ,
    //             userMajor: data.user.Major,
    //             userNickname: data.user.Nickname,
    //             authorized: data.user.authorized, 
    //             accessToken: data.accessToken,
    //           })
    //           resolve(response)
    //           router.replace({ name: 'Matching' })
    //         }
    //         else{
    //           context.commit("setLoginModal", true)
    //           resolve(response)
    //         }
    //       })
    //       .catch(error => {
    //         reject(error)
    //       })
    //   })
    // },
  }
}


export default new Vuex.Store({
  state,
  mutations,
  
  modules: {
    userStore: userStore,
    registerStore: registerStore,
    pageStore: pageStore
  },
  plugins: [
    createPersistedState({
      paths: ['userStore', 'pageStore']
    })
  ]
})