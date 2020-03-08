const fs = require('fs')
const jfolder = require('../../fs/jfolder/index.js')
const jfiles = require('../../fs/jfiles/index.js')
const utils = require('../utils/index.js')
const constants = require('../constants/index.js')
const config = require('../config/index.js')


exports.createTable =  (db, table, options) => {
  createTable(db, table, options)
  createTableMetaData(db, table, options)
  createTableKeysSpace(db, table, options)
  createIndexSpace(db, table, options)
}

exports.scanKeys = (db, table, path) => {
  path = utils.getTableBasePath(db) + table +
                    constants.keys_space_base_path + path + config.file_sperator
  path = path.replace(/[?]/g, config.file_sperator)
  var files = fs.readdirSync (path)
  if(files.includes(config.item_file)) {
    if(files.length > 1) {
      files.splice(files.indexOf(config.item_file), 1)
    } else {
      return jfiles.readData(path + config.item_file)
    }
  }
  return files
}

exports.putItem = (db, table, keys, item) => {
  var metaData = readMetaData(db, table)
  var path = utils.getTableBasePath(db) + table + constants.keys_space_base_path +
                      metaData.pk + config.file_sperator
  path += keys[metaData.pk] + config.file_sperator
  for(var key in metaData.sk) {
    var sk = metaData.sk[key]
    var skVal = keys[sk]
    if(!skVal) {
      throw new Error(sk + ' Missing')
    }
    path += sk + config.file_sperator + skVal + config.file_sperator
   }
  jfolder.createJfolder(path)
  jfiles.writeData(path, config.item_file, JSON.stringify(item, null, 2))
}

exports.getItem = (db, table, keys) => {
  return readItem(db, table, keys)
}

exports.deleteItem =  (db, table, keys) => {
  var pathStack = []
  var metaData = readMetaData(db, table)
  var path = utils.getTableBasePath(db) + table +
                    constants.keys_space_base_path + metaData.pk + config.file_sperator +
                      keys[metaData.pk] + config.file_sperator
  pathStack.push(path)
  for(var key in metaData.sk) {
    var sk = metaData.sk[key]
    var skVal = keys[sk]
    if(!skVal) {
      throw new Error(sk + ' Missing')
    }
    path += sk + config.file_sperator
    pathStack.push(path)
    path += skVal + config.file_sperator
    pathStack.push(path)
   }
   fs.unlinkSync(path + config.item_file)
   while(pathStack.length > 0) {
     var dirPath = pathStack.pop()
     // console.log(dirPath)
     var files = fs.readdirSync (dirPath)
     if(files.length == 0) {
       fs.rmdirSync(dirPath)
     }
    }
}

exports.updateItem = (db, table, keys, path, obj) => {
  var elements = path.split(constants.input_keys_seperator)
  var item = readItem(db, table, keys)
  console.log(JSON.stringify(item))
  var deepCloneItem = JSON.parse(JSON.stringify(item))

  if(elements.length == 0 ) {
    return
  }

  if(elements.length == 1) {
    updateElement(elements[0], deepCloneItem, obj)
  } else {
    var deepCloneItemPointer = traverseItem(elements, deepCloneItem)
    updateElement(elements[0], deepCloneItemPointer, obj)
  }
  console.log(JSON.stringify(deepCloneItem))
}

exports.addItemElement = (db, table, keys, path, tag, obj) => {
  var elements = path.split(constants.input_keys_seperator)
  var item = readItem(db, table, keys)
  console.log(item)
  var deepCloneItem = JSON.parse(JSON.stringify(item))

  if(elements.length == 0 ) {
    return
  }

  if(elements.length == 1) {
    addElement(elements[0], deepCloneItem, tag, obj)
  } else {
    var deepCloneItemPointer = traverseItem(elements, deepCloneItem)
    addElement(elements[0], deepCloneItemPointer, tag, obj)
  }
  console.log(JSON.stringify(deepCloneItem))
}

exports.removeItemElement = (db, table, keys, path, tag) => {
  var elements = path.split(constants.input_keys_seperator)
  var item = readItem(db, table, keys)
  console.log(item)
  var deepCloneItem = JSON.parse(JSON.stringify(item))

  if(elements.length == 0 ) {
    return
  }

  if(elements.length == 1) {
    removeElement(elements[0], deepCloneItem)
  } else {
    var deepCloneItemPointer = traverseItem(elements, deepCloneItem)
    removeElement(elements[0], deepCloneItemPointer)
  }
  console.log(JSON.stringify(deepCloneItem))
}

var createTable = (db, table) => {
  jfolder.createJfolder(utils.getTableBasePath(db), table)
}

var createTableMetaData = (db, table, options) => {
  var path = utils.getTableBasePath(db) + table
  jfolder.createJfolder(path, constants.meta_space_base_path)
  jfiles.createFile(path + constants.meta_space_base_path, config.item_file, JSON.stringify(options, null, 2))
}

var createTableKeysSpace = (db, table, options) => {
  var path = utils.getTableBasePath(db) + table
  jfolder.createJfolder(path, constants.keys_space_base_path)
  jfolder.createJfolder(path + constants.keys_space_base_path, options.pk)
}

var createIndexSpace = (db, table, options) => {
  var path = utils.getTableBasePath(db) + table
  jfolder.createJfolder(path, constants.index_space_base_path)
  for(var key in options.index) {
      jfolder.createJfolder(path + constants.index_space_base_path, key)
      jfiles.createFile(path + constants.index_space_base_path + key, constants.file_sperator + config.item_file)
   }
}

var readMetaData = (db, table) => {
  try {
    return jfiles.readData(utils.getTableBasePath(db) + table +
                    constants.meta_space_base_path + config.item_file)
  } catch (err) {
    throw err
  }
}

var readItem = (db, table, keys) => {
  var metaData = readMetaData(db, table)
  var path = utils.getTableBasePath(db) + table +
                    constants.keys_space_base_path + metaData.pk + config.file_sperator
  path += keys[metaData.pk] + config.file_sperator
  for(var key in metaData.sk) {
    var sk = metaData.sk[key]
    var skVal = keys[sk]
    if(!skVal) {
      throw new Error(sk + ' Missing')
    }
    path += sk + config.file_sperator + skVal + config.file_sperator
   }
   return jfiles.readData(path + config.item_file)
}

var traverseArrayItem = (el, deepCloneItem) => {
  if(el.includes(constants.input_keys_array_seperator)) {
    var elSplit = el.split(constants.input_keys_array_seperator)
    return deepCloneItemPointer = deepCloneItem[elSplit[0]][parseInt(elSplit[1])]
  } else {
    return deepCloneItemPointer = deepCloneItem[el]
  }
}

var traverseItem = (elements, deepCloneItem) => {
  var deepCloneItemPointer = traverseArrayItem(elements.shift(), deepCloneItem)
  while(elements.length > 1) {
    deepCloneItemPointer = traverseArrayItem(elements.shift(), deepCloneItemPointer)
  }
  return deepCloneItemPointer
}

var updateElement = (el, deepCloneItem, obj) => {
  var elSplit = el.split(constants.input_keys_array_seperator)
  if(elSplit.length > 1) {
    deepCloneItem[elSplit[0]][parseInt(elSplit[1])] = obj
  } else {
    deepCloneItem[el] = obj
  }
}

var addElement = (el, deepCloneItem, tag, obj) => {
  var elSplit = el.split(constants.input_keys_array_seperator)
  if(elSplit.length > 1) {
    elPointer = deepCloneItem[elSplit[0]][parseInt(elSplit[1])]
  } else {
    elPointer = deepCloneItem[el]
  }
  if(elPointer instanceof Array) {
    elPointer.push(obj)
  } else {
    elPointer[tag] = obj
  }
}

var removeElement = (el, deepCloneItem) => {
  var elSplit = el.split(constants.input_keys_array_seperator)
  if(elSplit.length > 1) {
    deepCloneItem[elSplit[0]].splice([parseInt(elSplit[1])], 1)
  } else {
    delete deepCloneItem[el]
  }
}
