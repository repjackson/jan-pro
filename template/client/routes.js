// Import the router
import { RouterFactory } from 'meteor/akryum:vue-router2'
// Components
import Home from '/imports/Home.vue'
import Session from '/imports/Session.vue'
import Settings from '/imports/Settings.vue'
import Help from '/imports/Help.vue'
import ActionButton from '/imports/ActionButton.vue'


import isUser from '/imports/modules/is-user.js'

import NotFound from '/imports/NotFound.vue'
import Documents from '/imports/Documents.vue'
import DocumentDetails from '/imports/DocumentsDetails.vue'
// import Index from '/Index.vue'
import Auth from '/imports/Auth.vue'
import Login from '/imports/Login.vue'
import Register from '/imports/Register.vue'
import ForgotPassword from '/imports/ForgotPassword.vue'
import ResetPassword from '/imports/ResetPassword.vue'

import Admin from '/imports/Admin.vue'
import AdminDashboard from '/imports/Dashboard.vue'
import AdminDocuments from '/imports/Documents.vue'
import AdminDocumentsNew from '/imports/DocumentsNew.vue'
import AdminDocumentsEdit from '/imports/DocumentsEdit.vue'
import AdminUsers from '/imports/Users.vue'
import AdminUsersEdit from '/imports/UsersEdit.vue'

// import Calendar from '/pages/Calendar.vue'



RouterFactory.configure(factory => {
  factory.addRoutes([
    { path:'/', name:'home', component:Home },
    { path:'/session', name:'session', component:Session },
    { path:'/help', name:'help', component:Help },
    { path:'/fab', name:'fab', component:ActionButton },
    // { path:'/calendar', name:'calendar', component:Calendar },
    { path:'/settings', name:'settings', component:Settings },
    { path:'/documents', name:'documents', component:Documents },
    { path:'/documents/:documentId', name:'documents-details', component:DocumentDetails },
    { path: '/login', component: Auth, redirect:{name:'login'},
      children: [
        { path:'/login', name:'login', component:Login },
        { path:'/register', name:'register', component:Register },
        { path:'/forgot-password', name:'forgot-password', component:ForgotPassword },
        { path:'/reset-password/:token', name:'reset-password', component:ResetPassword }
      ]
    },
    { path: '/admin', component: Admin, redirect: { name: 'admin-dashboard' },
      // beforeEnter: (to, from, next) => {
      //   isUser().then(response => { response ? next() : next({name: 'login'}) })
      // },
      children: [
        { path:'/admin', name:'admin-dashboard', component:Admin },
        { path:'/admin/documents', name:'admin-documents', component:AdminDocuments },
        { path:'/admin/documents/new', name:'admin-documents-new', component:AdminDocumentsNew },
        { path:'/admin/documents/:documentId/edit', name:'admin-documents-edit', component:AdminDocumentsEdit },
        { path:'/admin/users', name:'admin-users', component:AdminUsers },
        { path:'/admin/users/:userId/edit', name:'admin-users-edit', component:AdminUsersEdit }
      ]},
    { path:'*', name:'not-found', component:NotFound }
  ])
})