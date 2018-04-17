<template lang='pug'>
  div
    div(style="text-align: center; margin-top: 15px;")
      q-btn(color="dark" @click="clickMethod()")
        |Add a record
    div(style="margin-top: 25px;")
      q-list(striped)
        q-list-header doc list
        q-item(v-for="item in docNames" :key="item._id")
          q-item-main {{ item }}
</template>

<script lang="coffee">
  import { Meteor } from 'meteor/meteor'
  import { Docs } from '/imports/docs/doc_api.js'

  import { QList, QListHeader, QBtn, QItem, QItemMain } from '/node_modules/quasar-framework/dist/quasar.mat.common.js'


  return
    data: ->
      docNames: ['Dog Star', 'Sirius', 'Pole Star', 'Sun', 'Arthur']
      counter: -1
    components: {
      QList
      QListHeader
      QBtn
      QItem
      QItemMain
    }
    meteor:
      $subscribe:
        docs: []
        params: () -> null
        # update: () ->
        #   console.log Docs
        #   docsFound = Docs.find()
        #   # if(docsFound.count() > this.docNames.length)
        #   #   docsFound.forEach( (doc, index) ->
        #   #     Docs.remove({_id: doc._id})
        #   #   )
        #   #   @counter = -1
        #   #   alert('starting again ..')
        #   return docsFound
    methods:
      clickMethod: ->
        # console.log @docNames
        # Docs.insert({})
        console.log(@)
        console.log(Docs)
        # console.log(@)
      getCounter: () ->
        if @counter >= @docNames.length - 1
          console.log('docNames', docNames)
          return -1
        @counter++
        @counter
    created: () -> @$subscribe('docs')

</script>