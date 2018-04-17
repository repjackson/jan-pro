import { Meteor } from 'meteor/meteor'
import Docs from '../doc_api'

Meteor.publish('docs', function () {
  // return Documents.find({ owner: this.userId })
  return Docs.find({ })
})

Meteor.publish('docs.view', function documentsView (documentId) {
  return Docs.find({_id: documentId, owner: this.userId})
})
