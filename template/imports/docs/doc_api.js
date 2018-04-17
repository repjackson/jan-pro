import { Mongo } from 'meteor/mongo'

const Docs = new Mongo.Collection('docs')

// Docs.allow({
//   insert: () => true,
//   update: () => true,
//   remove: () => true
// })

// Docs.deny({
//   insert: () => false,
//   update: () => false,
//   remove: () => false
// })

export default {Docs};
