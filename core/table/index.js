const fs = require('fs')
const jfolder = require('../../fs/jfolder/index.js')
const jfiles = require('../../fs/jfiles/index.js')
const utils = require('../utils/index.js')
const constants = require('../constants/index.js')
const config = require('../config/index.js')


exports.createTable =  (db, table, options) => {
  try {
    createTableBasicStructure(db, table, options)
    createTableMetaData(db, table, options)
    createTableKeysSpace(db, table, options)
    createIndexSpace(db, table, options)
    return utils.frameSuccessResponse('create-table', table, 200, 'Success','')
  } catch (err) {
    return utils.frameErrorResponse('create-table', table, 500, 'Error',err)
  }
}

exports.scanKeys = (db, table, path) => {
  var payload
  try {
    path = utils.getTableBasePath(db) + table + constants.keys_space_base_path + path + config.file_sperator
    path = path.replace(/[?]/g, config.file_sperator)
    var files = fs.readdirSync (path)
    if(files.includes(config.item_file)) {
      if(files.length > 1) {
        files.splice(files.indexOf(config.item_file), 1)
      } else {
        payload = jfiles.readData(path + config.item_file)
      }
    } else {
      payload =  files
    }
    return utils.frameSuccessResponse('scan-keys', table, 200, 'Success',payload)
  } catch (err) {
    return utils.frameErrorResponse('scan-keys', table, 500, 'Error',err)
  }

}

exports.putItem = (db, table, options) => {
  try {
    var itemPath = getItemPath(db, table, options.keys, true)
    if(!fs.existsSync(itemPath + config.item_file)) {
      jfiles.writeData(itemPath, config.item_file, JSON.stringify(options.item, null, 2))
      return utils.frameSuccessResponse('put-item', table, 200, 'Success', JSON.stringify(options.item))
    } else {
      throw new Error('Cannot ovverride the item. Invalid Operation.')
    }
  } catch (err) {
    return utils.frameErrorResponse('put-item', table, 500, 'Error',err)
  }
}

exports.getItem = (db, table, options) => {
  try {
    return utils.frameSuccessResponse('get-item', table, 200, 'Success', JSON.stringify(readItem(db, table, options.keys)))
  } catch (err) {
    return utils.frameErrorResponse('get-item', table, 500, 'Error', err)
  }
}

exports.getItemAt = (db, table, options) => {
  try {
    var itemPath = getItemPath(db, table, options.keys)
    var payload  = {}
    var deepCloneItem = readItem(db, table, options.keys)

    if(options.path) {
      var elements = options.path.split(constants.input_keys_seperator)
      if(elements.length == 0 ) {
        payload = deepCloneItem
      } else if(elements.length == 1) {
        payload = getElement(elements[0], deepCloneItem)
      } else {
        var deepCloneItemPointer = traverseItem(elements, deepCloneItem)
        payload = getElement(elements[0], deepCloneItemPointer)
      }
    } else {
      payload = deepCloneItem
    }

    return utils.frameSuccessResponse('get-item-at', table, 200, 'Success', JSON.stringify(payload))
  } catch (err) {
    return utils.frameErrorResponse('get-item-at', table, 500, 'Error', err)
  }
}

exports.deleteItem =  (db, table, options) => {
  try {
    var keys = options.keys
    var pathStack = []
    var metaData = readMetaData(db, table)
    var path = utils.getTableBasePath(db) + table + constants.keys_space_base_path +
                metaData.pk + config.file_sperator + keys[metaData.pk] + config.file_sperator
    pathStack.push(path)
    for(var key in metaData.sk) {
      var sk = metaData.sk[key]
      var skVal = keys[sk]
      if(!skVal) {
        throw new Error(sk + ' : Key Missing')
      }
      path += sk + config.file_sperator
      pathStack.push(path)
      path += skVal + config.file_sperator
      pathStack.push(path)
     }
     var payload = readItem(db, table, keys)
     fs.unlinkSync(path + config.item_file)
     while(pathStack.length > 0) {
       var dirPath = pathStack.pop()
       var files = fs.readdirSync (dirPath)
       if(files.length == 0) {
         fs.rmdirSync(dirPath)
       }
      }
      return utils.frameSuccessResponse('delete-item', table, 200, 'Success', JSON.stringify(payload))
  } catch (err) {
    return utils.frameErrorResponse('delete-item', table, 500, 'Error', err)
  }
}

exports.updateItem = (db, table, options) => {
  try {
    var itemPath = getItemPath(db, table, options.keys)
    var payload  = {}
    var elements = options.path.split(constants.input_keys_seperator)
    var item = readItem(db, table, options.keys)
    var deepCloneItem = JSON.parse(JSON.stringify(item))

    if(elements.length == 0 ) {
      return
    }

    if(elements.length == 1) {
      updateElement(elements[0], deepCloneItem, options.obj)
    } else {
      var deepCloneItemPointer = traverseItem(elements, deepCloneItem)
      updateElement(elements[0], deepCloneItemPointer, options.obj)
    }

    payload.old = item
    payload.new  = deepCloneItem

    if(fs.existsSync(itemPath + config.item_file)) {
      jfiles.writeData(itemPath, config.item_file, JSON.stringify(payload.new, null, 2))
      return utils.frameSuccessResponse('update-item', table, 200, 'Success', JSON.stringify(payload))
    } else {
      throw new Error('Cannot Update the item. Invalid Operation.')
    }
  } catch (err) {
    return utils.frameErrorResponse('update-item', table, 500, 'Error', err)
  }
}

exports.addItemElement = (db, table, options) => {
  try {
    var itemPath = getItemPath(db, table, options.keys)
    var payload  = {}
    var item = readItem(db, table, options.keys)
    var deepCloneItem = JSON.parse(JSON.stringify(item))

    if(options.path) {
      var elements = options.path.split(constants.input_keys_seperator)
      if(elements.length == 0 ) {
        return
      }

      if(elements.length == 1) {
        addElement(elements[0], deepCloneItem, options.tag, options.obj)
      } else {
        var deepCloneItemPointer = traverseItem(elements, deepCloneItem)
        addElement(elements[0], deepCloneItemPointer, options.tag, options.obj)
      }
    } else {
      if(deepCloneItem instanceof Array) {
        deepCloneItem.push(options.obj)
      } else {
        deepCloneItem[options.tag] = options.obj
      }
    }

    payload.old = item
    payload.new = deepCloneItem

    if(fs.existsSync(itemPath + config.item_file)) {
      jfiles.writeData(itemPath, config.item_file, JSON.stringify(payload.new, null, 2))
      return utils.frameSuccessResponse('add-item-element', table, 200, 'Success', JSON.stringify(payload))
    } else {
      throw new Error('Cannot Update the item. Invalid Operation.')
    }
  } catch (err) {
    return utils.frameErrorResponse('add-item-element', table, 500, 'Error', err)
  }
}

exports.removeItemElement = (db, table, options) => {
  try {
    var itemPath = getItemPath(db, table, options.keys)
    var payload  = {}
    var elements = options.path.split(constants.input_keys_seperator)
    var item = readItem(db, table, options.keys)
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
    payload.old = item
    payload.new  = deepCloneItem

    if(fs.existsSync(itemPath + config.item_file)) {
      jfiles.writeData(itemPath, config.item_file, JSON.stringify(payload.new, null, 2))
      return utils.frameSuccessResponse('remove-item-element', table, 200, 'Success', JSON.stringify(payload))
    } else {
      throw new Error('Cannot Update the item. Invalid Operation.')
    }
  } catch (err) {
    return utils.frameErrorResponse('remove-item-element', table, 500, 'Error', err)
  }
}

exports.getTableMetadata = (db, table) => {
  try {
    return utils.frameSuccessResponse('get-table-meta-data', table, 200, 'Success', JSON.stringify(readMetaData(db, table)))
  } catch (err) {
    return utils.frameErrorResponse('get-table-meta-data', table, 500, 'Error', err)
  }
}

var createTableBasicStructure = (db, table) => {
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
    return jfiles.readData(utils.getTableBasePath(db) + table +
                    constants.meta_space_base_path + config.item_file)
}

var readItem = (db, table, keys) => {
  return jfiles.readData(getItemPath(db, table, keys) + config.item_file)
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

var getElement = (el, deepCloneItem) => {
   var elSplit = el.split(constants.input_keys_array_seperator)
   if(elSplit.length > 1) {
     elPointer = deepCloneItem[elSplit[0]][parseInt(elSplit[1])]
   } else {
     elPointer = deepCloneItem[el]
   }
   return elPointer
 }

var removeElement = (el, deepCloneItem) => {
  var elSplit = el.split(constants.input_keys_array_seperator)
  if(elSplit.length > 1) {
    deepCloneItem[elSplit[0]].splice([parseInt(elSplit[1])], 1)
  } else {
    delete deepCloneItem[el]
  }
}

var getItemPath = (db, table, keys, createIfNotExist) => {
  var metaData = readMetaData(db, table)
  var path = utils.getTableBasePath(db) + table + constants.keys_space_base_path +
                      metaData.pk + config.file_sperator
  path += keys[metaData.pk] + config.file_sperator
  if(createIfNotExist && !fs.existsSync(path)) {
    jfolder.createJfolder(path)
  }
  for(var key in metaData.sk) {
    var sk = metaData.sk[key]
    var skVal = keys[sk]
    if(!skVal) {
      throw new Error(sk + ' : Key Missing')
    }
    path += sk + config.file_sperator
    if(createIfNotExist && !fs.existsSync(path)) {
      jfolder.createJfolder(path)
    }
    path += skVal + config.file_sperator
    if(createIfNotExist && !fs.existsSync(path)) {
      jfolder.createJfolder(path)
    }
  }
  return path
}
