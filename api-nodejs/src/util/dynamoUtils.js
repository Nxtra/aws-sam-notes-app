'use strict'
const AWS = require('aws-sdk')

if (process.env.DYNAMO_ENDPOINT_URL) {
  console.log('configuring local Dynamo DB connection', process.env.DYNAMO_ENDPOINT_URL)
  AWS.config.update({
    region: 'eu-west-1',
    endpoint: process.env.DYNAMO_ENDPOINT_URL
  })
}

let dynamoDB
dynamoDB = new AWS.DynamoDB()

class DynamoTable {
  constructor (tableName) {
    this.tableName = tableName
  }
}

DynamoTable.prototype.putItem = async function (item) {
  let result = await dynamoDB.putItem({
    Item: item,
    TableName: this.tableName
  }).promise()
  console.log('putItem', result)
  return result
}

DynamoTable.prototype.getItem = async function (id) {
  return dynamoDB.getItem({
    Key: {
      id: {
        S: id
      }
    },
    TableName: this.tableName
  }).promise()
}

exports.DynamoTable = DynamoTable
