var fs = require('fs')
var db = require('./core/db/index.js')
var table = require('./core/table/index.js')

var main = function() {
  // Adding comments
  // db.createDB('MyDB2')
  // console.log(db.listTables('MyDB2'))
   /* table.createTable('MyDB2', 'MyTable2', {
   'pk': 'id',
   'sk': {
     '0': 'sk1',
     '1': 'sk2'
   },
   'index': {
     'key1':'path',
     'key2':'path'
   }
 }) */

 // test 1

/*   table.putItem('MyDB2', 'MyTable',
    {"id" : "id1", "sk2":"sk2-1-value", "sk1" : "sk1-1-value"},
    {"test":"value", "testtttchanged": "asdgasjdchanged"}) */

/*   var data = table.getItem('MyDB2', 'MyTable',
      {"id" : "id1", "sk1" : "sk1-1-value", "sk2":"sk2-1-value"})
    console.log(data) */

/*  table.deleteItem('MyDB2', 'MyTable',
        {"id" : "id1", "sk2":"sk2-1-value", "sk1" : "sk1-1-value"}) */

//  console.log(table.scanKeys('MyDB2', 'MyTable', 'id?id1'))

// table.updateItem('MyDB2', 'MyTable',
  //    {"id" : "id1", "sk1" : "sk1-1-value", "sk2":"sk2-1-value"}, 'A#2?x3?r2#1', 'test1')
    // console.log(data#
// }
// table.addItemElement('MyDB2', 'MyTable',
//      {"id" : "id1", "sk1" : "sk1-1-value", "sk2":"sk2-1-value"}, 'A#2?x3?r2','key', 'test1')
    // console.log(data) */


  //  table.removeItemElement('MyDB2', 'MyTable',
    //     {"id" : "id1", "sk1" : "sk1-1-value", "sk2":"sk2-1-value"}, 'A#2','key')
}


if(require.main === module) {
  main()
}
