'use strict'
const AWS = require('aws-sdk')
const tables = [{
  TableName: 'notes',
  KeySchema: [
    {AttributeName: 'id', KeyType: 'HASH'}
  ],
  AttributeDefinitions: [
    {AttributeName: 'id', AttributeType: 'S'}
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  }
}
]

console.log('configuring local Dynamo DB connection')

AWS.config.update({
  region: 'eu-west-2',
  endpoint: 'http://localhost:8000'
})

let dynamoDB = new AWS.DynamoDB()

tables.forEach(async (table) => {
  try {
    let result = await dynamoDB.listTables().promise()
    console.log('existing tables', result)
    if (result.TableNames.indexOf(table.TableName) > -1) {
      console.log('table already exists:', table.TableName)
    } else {
      let result = await dynamoDB.createTable(table).promise()
      console.log('Created table. Table description:', result)
    }
  } catch (e) {
    console.error('Unable to create table. Error JSON:', e)
  }
})
