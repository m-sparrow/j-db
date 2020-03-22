var express = require('express')
var router = express.Router()

var service = require('../service/base-service')

router.post('/db/create', service.createDB)
router.get('/db/list', service.listDBs)

router.post('/table/create', service.createTable)
router.get('/table/list', service.listTables)
router.get('/table/scan-keys', service.scanKeys)
router.post('/table/put-item', service.putItem)
router.get('/table/get-item', service.getItem)
router.post('/table/update-item', service.updateItem)
router.post('/table/delete-item', service.deleteItem)
router.post('/table/add-item-element', service.addItemElement)
router.post('/table/remove-item-element', service.removeItemElement)
router.get('/table/metadata', service.getTableMetadata)


module.exports = router;
