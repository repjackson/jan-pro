<template lang='pug'>
    div.q-pa-lg
        q-card 
            q-card-title(style="text-align: center;") 
                h5 Login
            q-card-main
                <q-input v-model="loginForm.email" type="email" float-label="Email" />
                <q-input v-model="loginForm.password" type="password" float-label="Password" />
    
                    <!--el-form.auth-layout_card-content.card-content(:model="loginForm" :rules="rules" ref="loginForm")-->
                    <!--  el-form-item(prop="email" label="Email")-->
                    <!--    el-input(v-model="loginForm.email" v-on:keyup.enter="submitForm('loginForm')" auto-complete="off")-->
                    <!--  el-form-item(prop="password" label="Password")-->
                    <!--    el-input(type="password" v-model="loginForm.password" v-on:keyup.enter="submitForm('loginForm')" auto-complete="off")-->
                q-btn.q-pa-lg.full-width(size="medium" type="primary" @click="submitForm('loginForm')" :loading="isLoading")
                    | Enter
            q-card-separator
        div.q-pa-lg(style="text-align: center;")
            router-link(:to="{ name: 'forgot-password'}") Forgot password?
        div.q-pa-lg(style="text-align: center;")
            | No account yet? 
            |&nbsp;
            router-link(:to="{ name: 'register'}") Register
</template>


<script lang='coffee'>
    import { QInput, QBtn, QCard, QCardTitle, QCardMain, QCardMedia, QCardSeparator, QCardActions } from '/node_modules/quasar-framework/dist/quasar.mat.common.js'

    return
        name: 'auth-login'
        components: {
            QInput
            QBtn
            QCard
            QCardTitle
            QCardMain
            QCardMedia
            QCardSeparator
            QCardActions
        }
        data: -> 
            isLoading: false
            loginForm:
                email: ''
                password: ''
            rules:
                email: [
                  { required: true, message: 'Please insert your email!', trigger: 'blur' }
                  { type: 'email', message: 'Please insert is valid email!', trigger: 'blur,change' }
                ]
                password: [
                  { required: true, message: 'Please insert your password!', trigger: 'blur' },
                ]
                
        # methods:
        #     submitForm: (formName)->
        #         @isLoading = true
        #         @$refs[formName].validate( (valid)=>
        #             if valid
        #                 dataForm = @loginForm
        #                 constemail = dataForm.email
        #                 password = dataForm.password
        #                 Meteor.loginWithPassword(email, password, (err) =>
        #                     if err
        #                         @$notify.error({
        #                             title: 'Sorry',
        #                             message: err.reason,
        #                             offset: 100
        #                         })
        #                         @isLoading = false
        #                     else
        #                         @$router.push({ name: 'admin-dashboard' })
        #                         @$notify.success({
        #                             title: 'Welcome',
        #                             message: `Good to see you!`,
        #                             offset: 100,
        #                             duration: 9000
        #                         })
        #                 )
        #             else
        #                 @$notify.error({
        #                     title: 'Sorry!!!',
        #                     message: 'All fields are required',
        #                     offset: 100
        #                 })
        #                 @isLoading = false
        #         )
        #     resetForm: (formName)->
        #         @$refs[formName].resetFields()
</script>
