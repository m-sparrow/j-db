const config = require('../config/index.js')
const constants = require('../constants/index.js')

exports.getDBBasePath = () => {
  return config.db_base_path + constants.db_space_base_path
}
exports.getTableBasePath = (db) => {
  return config.db_base_path + constants.db_space_base_path + db + constants.table_space_base_path
}

exports.frameSuccessResponse = (action, target, code, status, payload) => {
  var response = {}
  response.action = action
  response.target = target
  response.code = code
  response.status = status
  response.payload = payload
  return response
}

exports.frameErrorResponse = (action, target, code, status, err) => {
  var response = {}
  response.action = action
  response.target = target
  response.code = code
  response.status = status
  response.err = err.message
  return response
}
