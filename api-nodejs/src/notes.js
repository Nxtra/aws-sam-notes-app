'use strict'
const uuidv4 = require('uuid/v4')
const dynamoUtils = require('./util/dynamoUtils')
const notesTable = new dynamoUtils.DynamoTable('notes')

async function create (note) {
  let newNote = Object.assign(
    {
      id: uuidv4(),
      createdAt: new Date()
    }, note
  )

  let item = {
    id: {S: newNote.id},
    createdAt: {N: new Date().getTime().toString()},
  }
  if (newNote.userId) {
    item.userId = {S: newNote.userId}
  }
  if (newNote.content) {
    item.content = {S: newNote.content}
  }
  let result = await notesTable.putItem(item)
  console.log('putItem result', result)
  return newNote
}

async function get (id) {
  let result = await notesTable.getItem(id)
  console.log('getItem result', result)
  if (result && result.Item) {
    let item = result.Item
    let note = {
      id: result.Item.id.S
    }
    if (item.userId) {
      note.userId = item.userId.S
    }
    if (item.content) {
      note.content = item.content.S
    }
    if (item.createdAt) {
      note.createdAt = new Date(parseInt(result.Item.createdAt.N))
    }
    return note
  }
  return null
}

module.exports = {
  create: create,
  get: get
}
