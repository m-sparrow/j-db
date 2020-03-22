var index = require('../../index')

exports.createDB = async function(req, res) {
		let result =  await index.createDB(req.body.db)
		res.send(result)
}

exports.listDBs = async function(req, res) {
		let result =  await index.listDBs()
		res.send(result)
}

exports.listTables = async function(req, res) {
		let result =  await index.listTables(req.query.db)
		res.send(result)
}

exports.scanKeys = async function(req, res) {
		let result =  await index.scanKeys(req.body.db, req.body.table, req.body.keys)
		res.send(result)
}

exports.createTable = async function(req, res) {
		let result =  await index.createTable(req.body.db, req.body.table, req.body.schema)
		res.send(result)
}

exports.putItem = async function(req, res) {
		let result =  await index.putItem(req.body.db, req.body.table, req.body.options)
		res.send(result)
}

exports.getItem = async function(req, res) {
		let result =  await index.getItem(req.body.db, req.body.table, req.body.options)
		res.send(result)
}

exports.updateItem = async function(req, res) {
		let result =  await index.updateItem(req.body.db, req.body.table, req.body.options)
		res.send(result)
}

exports.deleteItem = async function(req, res) {
		let result =  await index.deleteItem(req.body.db, req.body.table, req.body.options)
		res.send(result)
}

exports.addItemElement = async function(req, res) {
		let result =  await index.addItemElement(req.body.db, req.body.table, req.body.options)
		res.send(result)
}

exports.removeItemElement = async function(req, res) {
		let result =  await index.removeItemElement(req.body.db, req.body.table, req.body.options)
		res.send(result)
}

exports.getTableMetadata = async function(req, res) {
		let result =  await index.getTableMetadata(req.body.db, req.body.table)
		res.send(result)
}
