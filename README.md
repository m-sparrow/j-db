# j-db

j-db is a hackable NoSQL DB based on raw file system. j-db basically consists of a **Partition Key**, within Partition Key any number of **Secondary Partition Keys** and finally **Item**. In simpler terms, data is stored in the form of a tree. With such a design it is aimed to achieve the performance **O(1)** at any scale for create, fetch, update and deletion of Items.

```
Partition Key - String
Secondary Partition Keys - String
Item - JSON document
```
j-db acts as a core engine which is so flexible can be embedded into an existing application. [Cli tool] (https://github.com/m-sparrow/j-db-cli) and [API version] (https://github.com/m-sparrow/j-db-api) is also available as per the requirement. Cli tool is used to interact directly while with API version you can interact with the DB over Restful web services. Please look into the respective repositories for detailed documentation.

## NPM Install
```
npm i j-db-core
```

## Syntax

###### Create DB
Create new DB using the below
```
createDB (dbName)   

#dbName - String    #Ex: MyDB

```

###### Fetch list of DBs
This method returns the list of databases.
```
listDBs ()
```

###### Create Table
This methos is used to create a new table.
```
createDB (dbName, tableName, schema)   

#dbName - String        # Ex: MyDB
#tableName - String     # Ex: MyTable
#schema - JSON
    {
      "pk": "pk1",
      "sk": {"0": "sk1", "1": "sk2"}
    }
```
The value of "pk" must be a String while "sk" must be a map with keys as Integers starting from 0 .... n and values as String.

###### Fetch list of tables
This method returns the list of tables in the given DB
```
listTables(dbName)

#dbName - String        # Ex: MyDB
```

###### Scan table keys
This method is used to scan the list of partition keys and secondary partition keys in the given table.
```
scanKeys (dbName, tableName, keys)

#dbName - String        # Ex: MyDB
#tableName - String     # Ex: MyTable
#keys - String          # Ex: pk1?sk1?....?skn

```
keys acts a cursor delimited with "?". This method returns "pk" or the list of "sk"s as per the given cursor.

###### Fetch Table metadata
This method is used to get the metadata of the given table.
```
getTableMetadata (dbName, tableName)

#dbName - String        # Ex: MyDB
#tableName - String     # Ex: MyTable
```

###### Table - Put Item
This method is used to create new Item in the table.
```
putItem (dbName, tableName, options)

#dbName - String        # Ex: MyDB
#tableName - String     # Ex: MyTable
#options - JSON
    {
      "keys":{
         "pk" : "pk",
         "sk1":"sk1-1-value",
         "sk2" : "sk2-2-value"
      },
      "item":{
         "Key1":"Value1",
         "Key2": "Value2"
       }
    }
```
Keys (Partition Key and all Secondary Partition Keys) are mandatory. Item is mandatory and can be any valid JSON document.

###### Table - Get Item
This method is used to fetch an Item from the table.
```
getItem (dbName, tableName, options)

#dbName - String        # Ex: MyDB
#tableName - String     # Ex: MyTable
#options - JSON
    {
      "keys":{
         "pk" : "pk",
         "sk1":"sk1-1-value",
         "sk2" : "sk2-2-value"
      }
    }
```
Keys (Partition Key and all Secondary Partition Keys) are mandatory.

###### Table - Get Item at a particular position
This method is used to get
```
getItemAt (dbName, tableName, options)

#dbName - String        # Ex: MyDB
#tableName - String     # Ex: MyTable
#options - JSON
    {
      "keys": {
         "id": "id1",
         "sk2": "sk2-2-value",
         "sk1": "sk1-1-value"
       },
       "path": "attr1?attr2?attr3#2?attr4"
    }
```
Keys (Partition Key and all Secondary Partition Keys) are mandatory. Path is also mandatory, Path acts as a cursor to specify the position of the attributes in the Item. "?" is used as a delimiter to traverse through the JSON object while "#" is used to specify the element index if it is an array.

###### Table - Update Item
This method is used to get
```
updateItem (dbName, tableName, options)

#dbName - String        # Ex: MyDB
#tableName - String     # Ex: MyTable
#options - JSON
    {
      "keys": {
         "id": "id1",
         "sk2": "sk2-2-value",
         "sk1": "sk1-1-value"
       },
       "path": "attr1?attr2?attr3#2?attr4",
       "obj": "value-to-be-updated"
    }
```
Keys (Partition Key and all Secondary Partition Keys) are mandatory. Path and Obj is also mandatory. "?" is used as a delimiter to traverse through the JSON object while "#" is used to specify the element index if it is an array.

###### Table - Update Item
This method is used to update an existing Item in the table.
```
updateItem (dbName, tableName, options)

#dbName - String        # Ex: MyDB
#tableName - String     # Ex: MyTable
#options - JSON
    {
      "keys": {
         "id": "id1",
         "sk2": "sk2-2-value",
         "sk1": "sk1-1-value"
       },
       "path": "attr1?attr2?attr3#2?attr4",
       "obj": "value-to-be-updated"
    }
```
Keys (Partition Key and all Secondary Partition Keys) are mandatory. Path and Obj is also mandatory. "?" is used as a delimiter to traverse through the JSON object while "#" is used to specify the element index if it is an array.

###### Table - Delete Item
This method is used to delete an Item in the table.
```
deleteItem (dbName, tableName, options)

#dbName - String        # Ex: MyDB
#tableName - String     # Ex: MyTable
#options - JSON
    {
      "keys":{
         "pk" : "pk",
         "sk1":"sk1-1-value",
         "sk2" : "sk2-2-value"
      }
    }
```
Keys (Partition Key and all Secondary Partition Keys) are mandatory.

###### Table - Add an Element to an existing Item
This method is used a new attribute or array value to an existing Item in the table.
```
addItemElement (dbName, tableName, options)

#dbName - String        # Ex: MyDB
#tableName - String     # Ex: MyTable
#options - JSON
    {
      "keys": {
         "id": "id1",
         "sk2": "sk2-2-value",
         "sk1": "sk1-1-value"
       },
       "path": "attr1?attr2?attr3#2?attr4"
       "tag": "tag"
       "obj": "value-to-be-added"
    }
```
Keys (Partition Key and all Secondary Partition Keys) are mandatory. Path and Obj is also mandatory. "?" is used as a delimiter to traverse through the JSON object while "#" is used to specify the element index if it is an array. Tag is mandatory if the new element is an object (key-value) and optional if the new element is added to an array.

###### Table - Remove an Element from an exiting Item
This method is used to remove an attribute or array value from an existing Item in the table.
```
removeItemElement (dbName, tableName, options)

#dbName - String        # Ex: MyDB
#tableName - String     # Ex: MyTable
#options - JSON
    {
       "keys": {
          "id": "id1",
          "sk2": "sk2-2-value",
          "sk1": "sk1-1-value"
        },
        "path": "attr1?attr2?attr3#2?attr4"
    }
```
Keys (Partition Key and all Secondary Partition Keys) are mandatory. Path is also mandatory. "?" is used as a delimiter to traverse through the JSON object while "#" is used to specify the element index if it is an array.
