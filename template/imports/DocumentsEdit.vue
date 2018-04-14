<template lang='pug'>
  div
    header.admin-content_main-header.is-back-button
      back-button
      h2.title
        | Documents Edit 
        small - {{ editDocument.title }}
    .admin-content_main-form
      q-card.box-card
        q-form.form-model(:model='editDocument', :rules='rules', ref='editDocument')
          q-row(:gutter='10')
            q-col(:lg='24')
              q-form-item(prop='title')
                q-input(placeholder='Please input document title', size='large', v-model='editDocument.title', auto-complete='off')
            q-col(:lg='24')
              q-form-item(prop='body')
                q-input(placeholder='Please input document body', size='large', v-model='editDocument.body', auto-complete='off')
            q-col(:lg='24')
              q-button.submit-button.full-width(size='large', type='success', @click="handleSubmitForm('editDocument')") Save
</template>

<script>
  import BackButton from '/imports/BackButton.vue'
  import Documents from '/imports/Documents/documents'
  export default {
    name: 'admin-documents-edit',
    data: () => ({
      documents: [],
      users: [],
      editDocument: {
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
    async mounted () {
      this.$nextTick(() => {
        this.renderData()
      })
    },
    methods: {
      renderData () {
        this.editDocument.title = this.documents[0].title
        this.editDocument.body = this.documents[0].body
      },
      handleSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          try {
            if (valid) {
              let dataForm = this.editDocument
              let document = this.documents[0]
              let user = this.users[0]
              Meteor.callPromise('Documents.methods.update', {
                _id: document._id,
                owner: user._id,
                title: dataForm.title,
                body: dataForm.body,
                updatedAt: new Date()
              })
              this.$message({
                type: 'info',
                message: `Document update with success!`
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
    meteor: {
      subscribe: {
        'documents': [],
      },
      users() {
        return Meteor.users.find({})
      },
      documents() {
        return Documents.find({
          _id: this.$route.params.documentId
        })
      },
    },
    components: {
      BackButton
    }
  }
</script>
