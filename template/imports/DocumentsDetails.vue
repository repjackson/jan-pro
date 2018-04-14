<template lang='pug'>
  .documents-details
    header
      back-button
      h2 Document Details
    h4 {{ documents[0].title }}
    p {{ documents[0].body }}
</template>

<script>
	import BackButton from '/imports/BackButton.vue'
	import Documents from '/imports/Documents/documents'
  export default {
    name: 'documents-details',
    data: () => ({
    	users: [],
    	documents: []
    }),
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
        });
      },
    },
    components: {
    	BackButton
    }
  }
</script>

<style lang="stylus" scoped>
.documents-details
  text-align left
  padding 20px 60px
  header
  	padding 0 0 20px 0
  	h2
  		font-size 32px
  h4
  	font-size 18px
.button-back
	top 20px
	left 8px
</style>
