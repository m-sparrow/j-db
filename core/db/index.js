const fs = require('fs')
const jfolder = require('../../fs/jfolder/index.js')
const config = require('../config/index.js')
const constants = require('../constants/index.js')
const utils = require('../utils/index.js')

exports.createDB = (name) => {
  jfolder.createJfolder(config.db_base_path, name)
  jfolder.createJfolder(config.db_base_path + name, constants.table_space_base_path)
}

exports.listTables = (db) => {
  path = utils.getTableBasePath(db)
  return fs.readdirSync (path)
}
