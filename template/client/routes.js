// Import the router
import { RouterFactory } from 'meteor/akryum:vue-router2'
// Components
import Home from '/imports/ui/Home.vue'
import Session from '/imports/ui/Session.vue'
import Settings from '/imports/ui/Settings.vue'
import Help from '/imports/ui/Help.vue'
import ActionButton from '/imports/ui/ActionButton.vue'


import isUser from '/imports/modules/is-user.js'

import NotFound from '/imports/ui/pages/NotFound.vue'
import Documents from '/imports/ui/pages/Documents.vue'
import DocumentDetails from '/imports/ui/pages/DocumentsDetails.vue'
// import Index from '/imports/ui/pages/Index.vue'
import Auth from '/imports/ui/layout/Auth.vue'
import Login from '/imports/ui/pages/Auth/Login.vue'
import Register from '/imports/ui/pages/Auth/Register.vue'
import ForgotPassword from '/imports/ui/pages/Auth/ForgotPassword.vue'
import ResetPassword from '/imports/ui/pages/Auth/ResetPassword.vue'

import Admin from '/imports/ui/layout/Admin.vue'
import AdminDashboard from '/imports/ui/pages/Admin/Dashboard.vue'
import AdminDocuments from '/imports/ui/pages/Admin/Documents.vue'
import AdminDocumentsNew from '/imports/ui/pages/Admin/DocumentsNew.vue'
import AdminDocumentsEdit from '/imports/ui/pages/Admin/DocumentsEdit.vue'
import AdminUsers from '/imports/ui/pages/Admin/Users.vue'
import AdminUsersEdit from '/imports/ui/pages/Admin/UsersEdit.vue'




RouterFactory.configure(factory => {
    // Simple routes
    factory.addRoutes([
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/session',
            name: 'session',
            component: Session,
        },
        {
            path: '/help',
            name: 'help',
            component: Help,
        },
        {
            path: '/fab',
            name: 'fab',
            component: ActionButton,
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings,
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
          {
            path: '*',
            name: 'not-found',
            component: NotFound
          },
          // {
          //   path: '/',
          //   name: 'index',
          //   component: Index
          // },
          {
            path: '/documents',
            name: 'documents',
            component: Documents,
            beforeEnter: (to, from, next) => {
              isUser().then(response => {
                response ? next() : next({name: 'login'})
              })
            }
          },
          {
            path: '/documents/:documentId',
            name: 'documents-details',
            component: DocumentDetails,
            beforeEnter: (to, from, next) => {
              isUser().then(response => {
                response ? next() : next({name: 'login'})
              })
            }
          },
          {
            path: '/login',
            component: Auth,
            redirect: { name: 'login' },
            children: [
              {
                path: '/login',
                name: 'login',
                component: Login
              },
              {
                path: '/register',
                name: 'register',
                component: Register
              },
              {
                path: '/forgot-password',
                name: 'forgot-password',
                component: ForgotPassword
              },
              {
                path: '/reset-password/:token',
                name: 'reset-password',
                component: ResetPassword
              }
            ]
          },
          {
            path: '/admin',
            component: Admin,
            redirect: { name: 'admin-dashboard' },
            beforeEnter: (to, from, next) => {
              isUser().then(response => {
                response ? next() : next({name: 'login'})
              })
            },
            children: [
              {
                path: '/admin',
                name: 'admin-dashboard',
                component: AdminDashboard
              },
              {
                path: '/admin/documents',
                name: 'admin-documents',
                component: AdminDocuments
              },
              {
                path: '/admin/documents/new',
                name: 'admin-documents-new',
                component: AdminDocumentsNew
              },
              {
                path: '/admin/documents/:documentId/edit',
                name: 'admin-documents-edit',
                component: AdminDocumentsEdit
              },
              {
                path: '/admin/users',
                name: 'admin-users',
                component: AdminUsers
              },
              {
                path: '/admin/users/:userId/edit',
                name: 'admin-users-edit',
                component: AdminUsersEdit
              }
            ]
          }
    ])
})