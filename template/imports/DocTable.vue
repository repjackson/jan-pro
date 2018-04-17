<template lang='pug'>
  div
    h4 Doc table
    .actions
      q-btn(no-ripple color='primary', :plain='true', @click='handleNewDocument')
        span New Document
    .docs
      h4 list
      .docs-item(v-for="document in docs" :key="document._id" @click="handleDocumentDetails(document._id)")
        h2 {{ document.title }}
        p {{ document.body }}
</template>

<script>
  import { QBtn, QTable, QTh, QTr } from '/node_modules/quasar-framework/dist/quasar.mat.common.js'

  import { docs } from '/imports/docs/doc_api'
  export default {
    name: 'doc-table',
    data: () => ({ docs: [] }),
    meteor: {
      subscribe: { 'docs': [] },
      docs() { console.log(docs)
        // return docs.find({})
      },
    },
    methods: {
      handleEdit (index, row) {
        this.$router.push({ name:'admin-docs-edit', params:{documentId:row._id} })
      },
      handleNewDocument () { 
        // this.$router.push({name: 'admin-docs-new'}) 
        console.log(this.docs)
      },
      async handleDelete (index, row) {
        try {
          await Meteor.callPromise('docs.methods.remove', {_id: row._id})
          this.$message({ type: 'info', message: 'Document removed!' })
        } catch (error) {
          this.$message({
            type: 'error',
            message: error.reason
          })
        }
      }
    },
    components: { QBtn, QTable, QTh, QTr }
  }
</script>
