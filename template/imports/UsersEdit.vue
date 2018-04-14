<template lang='pug'>
  .admin-content_main
    header.admin-content_main-header.is-back-button
      back-button
      h2.title
        | User Edit 
        small - {{ editUser.firstName }} {{ editUser.lastName }}
    .admin-content_main-form
      q-card.box-card
        el-form.form-model(:model='editUser', :rules='rules', ref='editUser')
          el-row(:gutter='10')
            el-col(:lg='12')
              el-form-item(prop='email')
                el-input(placeholder='Your first email', size='large', v-model='editUser.email', auto-complete='off')
            el-col(:lg='12')
              el-form-item(prop='firstName')
                el-input(placeholder='Your first name', size='large', v-model='editUser.firstName', auto-complete='off')
            el-col(:lg='12')
              el-form-item(prop='lastName')
                el-input(placeholder='Your last name', size='large', v-model='editUser.lastName', auto-complete='off')
            el-col(:lg='24')
              el-button.submit-button.full-width(size='large', type='success', @click="handleSubmitForm('editUser')") Save
</template>

<script>
  import BackButton from '/imports/BackButton.vue';
  export default {
    name: 'admin-users-edit',
    data: () => ({
      users: [],
      editUser: {
        firstName: '',
        lastName: '',
        email: '',
        verifyEmail: false
      },
      rules: {
        firstName: [ { required: true, message: 'Please input first name', trigger: 'blur' }],
        lastName: [ { required: true, message: 'Please input last name', trigger: 'blur' }],
        email: [{ required: true, message: 'Please input last email', trigger: 'blur' }]
      },
    }),
    async mounted () {
      this.$nextTick(() => {
        this.renderData()
      })
    },
    methods: {
      renderData () {
        this.editUser.firstName = this.users[0].profile.firstName
        this.editUser.lastName = this.users[0].profile.lastName
        this.editUser.email = this.users[0].emails[0].address
        this.editUser.verifyEmail = this.users[0].emails[0].verified
      },
      handleSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          try {
            if (valid) {
              let dataForm = this.editUser
              let user = this.users[0]
              Meteor.callPromise('Users.methods.update', {
                _id: user._id,
                services: {
                  password: user.services.password
                },
                profile: {
                  firstName: dataForm.firstName,
                  lastName: dataForm.lastName,
                  phone: user.profile.phone
                },
                emails: [{
                  address: dataForm.email,
                  verified: this.editUser.verifyEmail
                }],
                roles: [user.roles[0]],
                updatedAt: new Date()
              })
              this.$message({
                type: 'info',
                message: `User update with success!`,
                duration: 9999
              })
              this.$refs[formName].resetFields()
              this.$router.push({ name: 'admin-users' })
            }
          } catch (error) {
            this.$message({
              type: 'error',
              message: error
            })
          }
        })
      }
    },
    meteor: {
      subscribe: {
        'users': [],
      },
      users() {
        return Meteor.users.find({
          _id: this.$route.params.userId
        });
      },
    },
    components: {
      BackButton
    }
  }
</script>
