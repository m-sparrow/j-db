const fs = require('fs')
const jfolder = require('../../fs/jfolder/index.js')
const config = require('../config/index.js')
const constants = require('../constants/index.js')
const utils = require('../utils/index.js')

exports.createDB = (name) => {
  var basePath = utils.getDBBasePath()
  try {
    if(!fs.existsSync(basePath)) {
      jfolder.createJfolder(basePath)
    }
    jfolder.createJfolder(basePath, name)
    jfolder.createJfolder(basePath + name, constants.table_space_base_path)
    return utils.frameSuccessResponse('create-db', name, 200, 'Success', '')
  } catch (err) {
    return utils.frameErrorResponse('create-db', name, 500, 'Error', err)
  }
}

exports.listDBs = () => {
  try {
    return utils.frameSuccessResponse('list-all-dbs', 'DB', 200, 'Success', fs.readdirSync (utils.getDBBasePath()))
  } catch (err) {
    return utils.frameErrorResponse('list-all-dbs', 'DB', 500, 'Error', err)
  }
}

exports.listTables = (db) => {
  try {
    return utils.frameSuccessResponse('list-all-tables', db, 200, 'Success', fs.readdirSync(utils.getTableBasePath(db)))
  } catch (err) {
    return utils.frameErrorResponse('list-all-tables', db, 500, 'Error', err)
  }
}
