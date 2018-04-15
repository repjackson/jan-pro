<template lang='pug'>
  div
    div(style="text-align: center; margin-top: 15px;")
      q-btn(color="dark" @click="clickMethod()")
        |Add a record
    div(style="margin-top: 25px;")
      q-list(striped)
        q-list-header Striped doc list
        q-item(v-for="item in docRecords" :key="item._id")
          q-item-main {{ item.name }}
</template>

<script lang="coffee">
  import { Meteor } from 'meteor/meteor'
  import { Documents } from '/imports/Documents/documents'

  #swap the Comment on these two lines if you want to compile for ios
  import { QList, QListHeader, QBtn, QItem, QItemMain } from '/node_modules/quasar-framework/dist/quasar.mat.common.js'
  #import { QList, QListHeader, QBtn, QItem, QItemMain } from '/node_modules/quasar-framework/dist/quasar.ios.common.js';


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
      docRecords: 
        params: () -> return null
        update: () ->
          console.log Documents
          # docsFound = Documents.find()
          # if(docsFound.count() > this.docNames.length)
          #   docsFound.forEach( (doc, index) ->
          #     Documents.remove({_id: doc._id})
          #   )
          #   @counter = -1
          #   alert('starting again ..')
          # return docsFound
    methods:
      clickMethod: ->
        console.log @docNames
        if @counter < @docNames.length - 1
          Documents.insert({name: @docNames[@getCounter()]})
        else
          alert('There are only five stars')
      getCounter: () ->
        if @counter >= @docNames.length - 1
          console.log('docNames', docNames)
          return -1
        @counter++
        @counter
    created: () -> @$subscribe('docs')

</script>