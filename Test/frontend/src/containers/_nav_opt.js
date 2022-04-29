import store from '../store'

import { cilAccountLogout, cilHome,  } from '@coreui/icons'
export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavTitle',
        _children: ['매칭']
      },
      {
        _name: 'CSidebarNavItem',
        name: '매칭 홈',
        to: '/matching/MatchingCategory',
        icon: {content: cilHome}
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['마이페이지']
      },
      {
        _name: 'CSidebarNavItem',
        name: '내 계정',
        to: '/myPages/MyAccount',
        icon: 'cil-user',
      },
      {
        _name: 'CSidebarNavItem',
        name: '내 매칭글',
        to: '/myPages/MyPostList',
        icon: 'cil-pencil',
      },
      {
        _name: 'CSidebarNavDropdown',
        name: '신청 내역',
        route: '/myPages/MyApplyList',
        icon: 'cil-task',
        items: [
          {
            name: '받은 신청 목록',
            to: '/myPages/MyRecvList'
          },
          {
            name: '보낸 신청 목록',
            to: '/myPages/MyApplyList'
          }
        ]
      },
      // {
      //   _name: 'CSidebarNavTitle',
      //   _children: ['계정']
      // },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: '로그아웃',
      //   icon: {content: cilAccountLogout},
      //   on: {
      //     click: (e) => {
      //       console.log("asdfasdf")
      //       store.commit('set', ['sidebarShow', false])
      //       store.dispatch("logout", {})
      //       .then(() =>{
      //         if (!store.state.userStore.isAuthenticated) {
      //           router.push({
      //             name: "Login",
      //           })
      //         }
      //       })
      //       .catch(({ message }) => alert(message))
      //     }
      //   }
      // },
    ]
  }
]