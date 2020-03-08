const config = require('../config/index.js')
const constants = require('../constants/index.js')

exports.getTableBasePath = (db) => {
  return config.db_base_path + db + constants.table_space_base_path
}
