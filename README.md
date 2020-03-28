# j-db
j-db is a hackable NoSQL DB based on raw file system. j-db basically consists of a **Partition Key**, within Partition Key any number of **Secondary Partition Keys** and finally **Item**. In simpler terms, data is stored in the form of a tree. With such a design it is aimed to acheive the performance **O(1)** at any scale for create, fetech, update and deletion of Items.

```
Partition Key - String
Secondary Partition Keys - String
Item - JSON document
```
j-db acts as a core engine which is so flexible can be embdded into an existing application. Cli tool and API version is also availble as per the requirement. Cli tool is used to interact directly while with API version you can inetract with the DB over Restful webservices. Please look into the respective repositories for detailed documentation.

## Syntax

###### Create DB
Create new DB using the below 
```
createDB (dbName)   

#dbName - String

Example:
MyDB
```

###### Fetch list of DBs
This method returns the list of databases
```
listDBs () 
```

###### Create Table
```
createDB (dbName, tableName, schema)   

#dbName - String
#tableName - String
#schema - JSON Object with attributes as "pk" and "sk". The value of "pk" must be a String while "sk" must be a map with keys as integers starting from 0 .... n
    {
      "pk": "pk1",
      "sk": {"0": "sk1", "1": "sk2"}
    }
```

###### Fetch list of tables

###### Scan table keys

###### Fetch Table metadata 

###### Table - Put Item

###### Table - Get Item

###### Table - Update Item

###### Table - Detele Item

###### Table - Add an Element to an existing Item

###### Table - Remove an Element from an exiting Item
