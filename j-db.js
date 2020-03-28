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

exports.getTableMetadata = (db, tableName) => {
  return table.getTableMetadata(db, tableName)
}
