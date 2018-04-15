import { Meteor } from 'meteor/meteor'
import Documents from '../documents'

Meteor.publish('documents', function () {
  // return Documents.find({ owner: this.userId })
  return Documents.find({ })
})

Meteor.publish('documents.view', function documentsView (documentId) {
  return Documents.find({_id: documentId, owner: this.userId})
})
