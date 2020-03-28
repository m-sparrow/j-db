# j-db
j-db is a hackable NoSQL DB based on raw file system. j-db basically consists of a **Partition Key**, within Partition Key any number of **Secondary Partition Keys** and finally **Item**. In simpler terms, data is stored in the form of a tree. With such a design it is aimed to acheive the performance **O(1)** at any scale for create, fetech, update and deletion of Items.

> **Partition Key** - String
> **Secondary Partition Keys** - String
> **Item** - JSON document


