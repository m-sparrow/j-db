var index = require('./index')

var argv = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .command('create-db', 'Create Database')
    .command('list-all-dbs', 'Print list of Databases')
    .command('list-all-tables', 'Print list of tables')
    .command('scan-keys', 'Scan keys [primary, sort]')
    .command('create-table', 'Create a new table')
    .command('put-item', 'Add new item to the table')
    .command('get-item', 'Retrieve item from table')
    .command('update-item', 'Update an existing item in table')
    .command('delete-item', 'Delete an item from table')
    .command('add-item-element', 'Add an element to an Item')
    .command('remove-item-element', 'Remove an element from an Item')
    .example('$0 create-db -d [db-name]', '')
    .example('$0 list-all-dbs', '')
    .example('$0 list-all-tables -d [db-name]', '')
    .example('$0 scan-keys -d [db-name] -t [table-name] -o [keys]', '')
    .example('$0 create-table -d [db-name] -t [table-name] -o [schema]','')
    .example('$0 put-item -d [db-name] -t [table-name] -o [options]', '')
    .example('$0 get-item -d [db-name] -t [table-name] -o [options]', '')
    .example('$0 update-item -d [db-name] -t [table-name] -o [options]', '')
    .example('$0 delete-item -d [db-name] -t [table-name] -o [options]', '')
    .example('$0 add-item-element -d [db-name] -t [table-name] -o [options]', '')
    .example('$0 remove-item-element -d [db-name] -t [table-name] -o [options]', '')
    .alias('c', 'cmd')
    .nargs('c', 1)
    .describe('c', 'A valid db operation. Refer commands section')
    .demandOption(['c'])
    .alias('d', 'db')
    .nargs('d', 1)
    .describe('d', 'Database')
    .alias('t', 'table')
    .nargs('t', 1)
    .describe('t', 'Table Name')
    .alias('o', 'options')
    .nargs('o', 1)
    .describe('o', '[schema, keys, item, tags or/and values, etc]')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2020')
    .argv;

  var main = function() {
    switch (argv.cmd) {
      case "create-db":
        console.log(index.createDB(argv.db))
        break
      case "list-all-dbs":
        console.log(index.listDBs())
        break
      case "list-all-tables":
        console.log(index.listTables(argv.db))
        break
      case "scan-keys":
        console.log(index.scanKeys(argv.db, argv.table, argv.options))
        break
      case "create-table":
        console.log(index.createTable(argv.db, argv.table, JSON.parse(argv.options, 'utf8')))
        break
      case "put-item":
        console.log(index.putItem(argv.db, argv.table, JSON.parse(argv.options, 'utf8')))
        break
      case "get-item":
        console.log(index.getItem(argv.db, argv.table, JSON.parse(argv.options, 'utf8')))
        break
      case "update-item":
        console.log(index.updateItem(argv.db, argv.table, JSON.parse(argv.options, 'utf8')))
        break
      case "delete-item":
        console.log(index.deleteItem(argv.db, argv.table, JSON.parse(argv.options, 'utf8')))
        break
      case "add-item-element":
        console.log(index.addItemElement(argv.db, argv.table, JSON.parse(argv.options, 'utf8')))
        break
      case "remove-item-element":
        console.log(index.removeItemElement(argv.db, argv.table, JSON.parse(argv.options, 'utf8')))
        break
      deafult:
        console.log("Invalid command")
    }
  }

  if(require.main === module) {
    main()
  }
