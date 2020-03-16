var fs = require('fs')
var database = require('./core/db/index.js')
var table = require('./core/table/index.js')

exports.createDB = (dbName) => {
  return database.createDB(dbName)
}

exports.listDBs = () => {
  return database.listDBs()
}

exports.listTables = (dbName) => {
  return database.listTables(dbName)
}

exports.createTable = (db, tableName, schema) => {
  return table.createTable(db, tableName, schema)
}

exports.scanKeys = (db, tableName, keys) => {
  return table.scanKeys(db, tableName, keys)
}

exports.putItem = (db, tableName, options) => {
  return table.putItem(db, tableName, options)
}

exports.getItem = (db, tableName, options) => {
  return table.getItem(db, tableName, options)
}

exports.updateItem = (db, tableName, options) => {
  return table.updateItem(db, tableName, options)
}

exports.deleteItem = (db, tableName, options) => {
  return table.deleteItem(db, tableName, options)
}

exports.addItemElement = (db, tableName, options) => {
  return table.addItemElement(db, tableName, options)
}

exports.removeItemElement = (db, tableName, options) => {
  return table.removeItemElement(db, tableName, options)
}


// Adding comments
// db.createDB('MyDB2')
// console.log(db.listTables('MyDB2'))
/* table.createTable('MyDB2', 'MyTable2', {'pk': 'id','sk': {'0': 'sk1','1': 'sk2'},'index': {'key1':'path','key2':'path'}}) */

// test 1

/*  table.putItem('MyDB2', 'MyTable2',
  {"id" : "id1", "sk2":"sk2-1-value", "sk1" : "sk1-1-value"},
  {"test":"value", "testtttchanged": "asdgasjdchanged"}) */

  // {"keys":{"id" : "id1", "sk2":"sk2-1-value", "sk1" : "sk1-1-value"}, "item":{"test":"value", "testtttchanged": "asdgasjdchanged"}

/* var data = table.getItem('MyDB2', 'MyTable2',
    {"id" : "id1", "sk1" : "sk1-1-value", "sk2":"sk2-1-value"})
  console.log(data) */

/*  table.deleteItem('MyDB2', 'MyTable',
      {"id" : "id1", "sk2":"sk2-1-value", "sk1" : "sk1-1-value"}) */

//  console.log(table.scanKeys('MyDB2', 'MyTable', 'id?id1'))

// table.updateItem('MyDB2', 'MyTable',
//    {"id" : "id1", "sk1" : "sk1-1-value", "sk2":"sk2-1-value"}, 'A#2?x3?r2#1', 'test1')
  // console.log(data#
// }
// table.addItemElement('MyDB2', 'MyTable',
//      {"id" : "id1", "sk1" : "sk1-1-value", "sk2":"sk2-1-value"}, 'A#2?x3?r2','key', 'test1')
  // console.log(data) */


//  table.removeItemElement('MyDB2', 'MyTable',
  //     {"id" : "id1", "sk1" : "sk1-1-value", "sk2":"sk2-1-value"}, 'A#2','key')
