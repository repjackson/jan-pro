<template lang='pug'>
  .admin-content_main
    header.admin-content_main-header.is-back-button
      back-button
      h2.title
        | Documents Edit 
        small - {{ newDocument.title }}
    .admin-content_main-form
      q-card.box-card
        q-form.form-model(:model='newDocument', :rules='rules', ref='newDocument')
          q-row(:gutter='10')
            q-col(:lg='24')
              q-form-item(prop='title')
                q-input(placeholder='Please input document title', size='large', v-model='newDocument.title', auto-complete='off')
            q-col(:lg='24')
              q-form-item(prop='body')
                q-input(placeholder='Please input document body', size='large', v-model='newDocument.body', auto-complete='off')
            q-col(:lg='24')
              q-button.submit-button.full-width(size='large', type='success', @click="handleSubmitForm('newDocument')") Save
</template>

<script>
  import BackButton from '/imports/BackButton.vue';
  export default {
    name: 'admin-documents-new',
    data: () => ({
      users: [],
      newDocument: {
        title: '',
        body: ''
      },
      rules: {
        title: [
          { required: true, message: 'Please input title', trigger: 'blur' },
        ],
        body: [
          { required: true, message: 'Please input body text', trigger: 'blur' },
        ]
      },
    }),
    meteor: {
      subscribe: {
        'users': [],
      },
      users() {
        return Meteor.users.find({})
      },
    },
    methods: {
      handleSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          try {
            if (valid) {
              let dataForm = this.newDocument
              let user = this.users[0]
              Meteor.callPromise('Documents.methods.insert', {
                createdAt: new Date(),
                owner: user._id,
                title: dataForm.title,
                body: dataForm.body,
              })
              this.$message({
                type: 'info',
                message: `Document created with success!`
              })
              this.$refs[formName].resetFields()
              this.$router.push({ name: 'admin-documents' })
            }
          } catch (error) {
            this.$message({
              type: 'error',
              message: error.reason
            })
          }
        })
      }
    },
    components: {
      BackButton
    }
  }
</script>
