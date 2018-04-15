<template lang='pug'>
  div
    h2.title Documents
    .actions
      q-btn(color='primary', :plain='true', @click='handleNewDocument')
        span New Document
  <!--el-table.admin-content_main-table(:data='documents', border='', style='width: 100%')-->
  <!--  el-table-column(label='Created At', width='220')-->
  <!--    template(slot-scope='scope')-->
  <!--      el-icon.icon(name='time')-->
  <!--      span {{ scope.row.createdAt | date(&quot;L, LT&quot;) }}-->
  <!--  el-table-column(label='Title')-->
  <!--    template(slot-scope='scope')-->
  <!--      span {{ scope.row.title }}-->
  <!--  el-table-column(label='Body')-->
  <!--    template(slot-scope='scope')-->
  <!--      span {{ scope.row.body }}-->
  <!--  el-table-column(label='Actions')-->
  <!--    template(slot-scope='scope')-->
  <!--      q-btn(size='small', @click='handleEdit(scope.$index, scope.row)') Edit-->
  <!--      q-btn(size='small', type='danger', @click='handleDelete(scope.$index, scope.row)') Delete-->
</template>

<script>
  import { QBtn } from '/node_modules/quasar-framework/dist/quasar.mat.common.js'

  import { Documents } from '/imports/Documents/documents'
  export default {
    name: 'admin-documents',
    data: () => ({
      documents: []
    }),
    meteor: {
      subscribe: {
        'documents': [],
      },
      documents() {
        console.log(Documents)
        // return Documents.find({})
      },
    },
    methods: {
      handleEdit (index, row) {
        this.$router.push({
          name: 'admin-documents-edit',
          params: { documentId: row._id }
        })
      },
      handleNewDocument () {
        this.$router.push({name: 'admin-documents-new'})
      },
      async handleDelete (index, row) {
        try {
          await Meteor.callPromise('Documents.methods.remove', {
            _id: row._id
          })
          this.$message({
            type: 'info',
            message: 'Document removed!'
          })
        } catch (error) {
          this.$message({
            type: 'error',
            message: error.reason
          })
        }
      }
    },
    components: {
      QBtn,
    }
  }
</script>
