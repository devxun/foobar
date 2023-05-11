# MongoDB

## Shell

> Navicat Premium（或 DataGrid 或 Robo 3T）
>
> MongoDB 6.0.5（使用 `db.version()` 查看当前 MongoDB 的版本信息）

### 数据库操作

#### 创建数据库

##### 语法：

```js
use < database-name >
```

##### 示例：

```js
use myDB
```

#### 查看当前数据库

```js
db
```

#### 查看所有数据库

```js
show dbs // show databases
```

#### 查看当前数据库所有集合

```js
db.getCollectionNames()
```

#### 查看当前数据库状态

```js
db.stats()
```

#### 删除当前数据库

```js
db.dropDatabase()
```

### 集合操作

#### 创建集合

##### 语法：

```js
// 1. 显式创建
db.createCollection( < collection-name >, [ options ] )
// 2. 隐式创建
db.< collection-name >.insertOne( < document > )
```

##### 示例：

```js
// 1. 显式创建
db.createCollection( 'myFirstCollection' )
db.createCollection( 'mySecondCollection', { capped: true, size: 1024000, max: 100 } )
// 2. 隐式创建
db.myThirdCollection.insertOne( { name: 'Sun Wukong' } )
```

#### 查看集合

```js
show collections
```

#### 集合重命名

##### 语法：

```js
db.< collection-name >.renameCollection( < new-name > )
```

##### 示例：

```js
db.myThirdCollection.renameCollection( 'myFourthCollection' )
```

#### 删除集合

##### 语法：

```js
db.< collection-name >.drop()
```

##### 示例：

```js
db.myFourthCollection.drop()
```

### 文档操作

#### 插入文档

##### 语法：

```js
// 插入单个
db.< collection-name >.insertOne( < document > )
// 插入多个
db.< collection-name >.insertMany( < document-list > )
```

##### 示例：

```js
db.myFirstCollection.insertOne( { name: 'Sun Wukong' } )
db.myFirstCollection.insertMany( [ { name: 'Zhu Bajie' }, { name: 'Sha Heshang' } ] )
```

#### 查询文档

##### 语法：

```js
// 查询所有文档
db.< collection-name >.find({}) // db.< collection-name >.find()
// 查询所有符合指定条件的文档
db.< collection-name >.find( [ query ] )
// 查询第一个文档
db.< collection-name >.findOne({})
// 查询第一个符合指定条件的文档
db.< collection-name >.findOne( [ query ] )
// 格式化查询结果
db.< collection-name >.find( [ query ] ).pretty()
// 限制查询结果返回的个数
db.< collection-name >.find( [ query ] ).limit( < number > )
// 略过指定个数的文档
db.< collection-name >.find( [ query ] ).skip( < number > )
// 对查询结果进行排序，1 是升序，-1 是降序
db.< collection-name >.find( [ query ] ).sort( { filed: 1 } )
db.< collection-name >.find( [ query ] ).sort( { filed: -1 } )
```

##### 示例：

```js
db.myFirstCollection.insertOne( { name: 'Sun Wukong', age: 19 } )
db.myFirstCollection.insertOne( { name: 'Zhu Bajie', age: 18 } )
db.myFirstCollection.insertOne( { name: 'Sha Heshang', age: 15 } )

// 查询所有的文档
db.myFirstCollection.find({}) // db.myFirstCollection.find({})
// 查询所有 name: Sun Wukong 的文档
db.myFirstCollection.find( { name: 'Sun Wukong' } )
// 查询第一个文档
db.myFirstCollection.findOne({})
// 查询第一个 name: Sun Wukong 的文档
db.myFirstCollection.findOne( { name: 'Sun Wukong' } )
// 格式化查询结果
db.myFirstCollection.find({}).pretty()
// 限制查询结果返回的个数
db.myFirstCollection.find({}).limit(3)
// 略过指定个数的文档
db.myFirstCollection.find({}).skip(2)
// 对查询结果进行排序，1 是升序，-1 是降序
db.myFirstCollection.find({}).sort( { age: 1 } )
db.myFirstCollection.find({}).sort( { age: -1 } )
```

#### 更新文档

##### 语法：

```js
// 更新单个
// upset 表示不存在更新文档时，是否需要新增，默认为 false
// update => { $set: { < document > } }
db.< collection-name >.updateOne( < query >, < update >[ , { < upsert > } ] )
// 更新多个
db.< collection-name >.updateMany( < query >, < update >[ , { < upsert > } ] )
// 移除指定字段
// update => { $unset: { < document > } }
```

##### 示例：

```js
// 更新单个
db.myFirstCollection.updateOne( { name: 'Sun Wukong' }, { $set: { age: 31 } } )
// 使用 upsert 选项
db.myFirstCollection.updateOne( { name: 'Bai Gujing' }, { $set: { age: 17 } }, { upsert: true } )
// 更新多个
db.myFirstCollection.updateMany( { name: 'Zhu Bajie' }, { $set: { age: 29 } } )
// 使用 upsert 选项
db.myFirstCollection.updateMany( { name: 'Gao Cuilan' }, { $set: { age: 24 } }, { upsert: true } )
// 移除指定字段
db.myFirstCollection.updateOne( { name: 'Gao Cuilan' }, { $unset: { age: 24 } })
```

#### 删除文档

##### 语法：

```js
// 删除单个
db.< collection-name >.deleteOne( < query > )
// 删除多个
db.< collection-name >.deleteMany( < query > )
```

##### 示例：

```js
// 删除单个
db.myFirstCollection.deleteOne( { name: 'Gao Cuilan' } )
// 删除全部文档的第一个
db.myFirstCollection.deleteOne({})
// 删除多个
db.myFirstCollection.deleteMany( { name: 'Sha Heshang' } )
// 删除全部
db.myFirstCollection.deleteMany({})
```

### 条件操作符

| 操作符                     | 格式                                                         | 示例                                                         | 与 RDBMS where 语句                             |
| -------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ----------------------------------------------- |
| 等于（=）                  | `{ field: value } ` 或 `{ field: { $eq: value } }`           | `db.myFirstCollection.find( { name: 'Sun Wukong' } )` 或 `db.myFirstCollection.find( { name: { $eq: 'Sun Wukong' } } )` | `where name='Sun Wukong'`                       |
| 大于（>）                  | `{ field: { $gt: value } }`                                  | `db.myFirstCollection.find( { age: { $gt: 16 } } )`          | `where age>16`                                  |
| 小于（<）                  | `{ field: { $lt: value } }`                                  | `db.myFirstCollection.find( { age: { $lt: 16 } } )`          | `where age<16`                                  |
| 大于等于（>=）             | `{ field: { $gte: value } }`                                 | `db.myFirstCollection.find( { age: { $gte: 18 } } )`         | `wehre age>=18`                                 |
| 小于等于（<=）             | `{ field: { $lte: value } }`                                 | `db.myFirstCollection.find( { age: { $lte: 15 } } )`         | `where age<=15`                                 |
| 在…之间（between … and …） | `{ field: { $gte: value01, $lte: value02 } }`                | `db.myFirstCollection.find( { age: { $gte: 16, $lte: 18 } } )` | `where age between 16 and 18`                   |
| 不等于（!=）               | `{ field: { $ne: value } }`                                  | `db.myFirstCollection.find( { age: { $ne: 17 } } )`          | `where age!=17`                                 |
| 与（and）                  | `{ field01: value01, field02: value02, ... }` 或 `{ $and: [ { field01: value01 }, { field02: value02 }, ... ] }` | `db.myFirstCollection.find( { name: 'Sun Wukong', age: 19 } )` 或 `db.myFirstCollection.find( { $and: [ { name: 'Sun Wukong' }, { age: 19 } ] } )` | `where name='Sun Wukong' and age=19`            |
| 或（or）                   | `{ $or: [ { field01: value01 }, { field02: value02 }, ... ] }` | `db.myFirstCollection.find( { $or: [ { name: 'Sun Wukong' }, { age: 18 } ] } )` | `where name='Sun Wukong' or age=18`             |
| 包含（in）                 | `{ field: { $in: [ value01, value02, ... ] } }`              | `db.myFirstCollection.find( { name: { $in: [ 'Sun Wukong', 'Zhu Bajie' ] } } )` | `where name in ('Sun Wukong', 'Zhu Bajie')`     |
| 不包含（nin）              | `{ field: { $nin: [ value01, value02, ... ] } }`             | `db.myFirstCollection.find( { name: { $nin: [ 'Sun Wukong', 'Zhu Bajie' ] } } )` | `where name not in ('Sun Wukong', 'Zhu Bajie')` |
| 正则表达式（包含）         | `{ field: { $regex: /value/ } }`                             | `db.myFirstCollection.find( { name: { $regex: /Wu/ } } )`    | `where name like '%Wu%'`                        |
| 正则表达式（以…开头）      | `{ field: { $regex: /^value/ } }`                            | `db.myFirstCollection.find( { name: { $regex: /^Sun/ } } )`  | `where name like '%Sun'`                        |
| 正则表达式（以…结尾）      | `{ field: { $regex: /value$/ } }`                            | `db.myFirstCollection.find( { name: { $regex: /kong$/ } } )` | `where name like 'kong%'`                       |

## Python

> pymongo 3.12.0

### 安装包

```bash
# pip
pip install pymongo
# conda
conda install pymongo
```

### 导入包

```python
import pymongo
```

### 连接 MongoDB 服务器

#### 语法：

```python
# 方式 1
< connection-object-name > = pymongo.MongoClient('mongodb:// < ip > : < port >')
# 方式 2
< connection-object-name > = pymongo.MongoClient( < ip >, < port > )
# 方式 3
< connection-object-name > = pymongo.MongoClient(host= < ip >, port= < port > )
```

#### 示例：

```python
# 方式 1
my_connection = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
# 方式 2
my_connection = pymongo.MongoClient("127.0.0.1", 27017)
# 方式 3
my_connection = pymongo.MongoClient(host="127.0.0.1", port=27017)
```

### 访问数据库

#### 语法：

```python
# 方式 1：中括号运算符
< database-object-name > = < connection-object-name >[ < database-name > ]
# 方式 2：点运算符
< database-object-name > = < connection-object-name >.< database-name >
# 方式 1
< database-object-name > = < connection-object-name >.get_database( < database-name > )
```

#### 示例：

```python
# 方式 1
my_database = my_connection['myDatabase']
# 方式 2
my_database = my_connection.myDatabase
# 方式 3
my_database = my_connection.get_database('myDatabase')
```

### 访问集合

#### 语法：

```python
# 方式 1：中括号运算符
< collection-object-name > = < database-object-name >[ < collection-name > ]
# 方式 2：点运算符
< collection-object-name > = < database-object-name >.< collection-name >
# 方式 1
< collection-object-name > = < database-object-name >.get_collection( < collection-name > )
```

#### 示例：

```python
# 方式 1
my_collection = my_database['myCollection']
# 方式 2
my_collection = my_database.my_collection
# 方式 3
my_collection = my_database.get_collection('myCollection')
```

### 操作文档

#### 插入文档

##### 语法：

```python
# 插入单个
< collection-object-name >.insert_one( < document > )
# 插入多个
< collection-object-name >.insert_many( < document-list > )
```

##### 示例：

```python
# 插入单个
my_collection.insert_one({'name': 'Sun Wukong', 'age': 19})
# 插入多个
my_collection.insert_many([{'name': 'Zhu Bajie', 'age': 18}, {'name': 'Sha Heshang', 'age': 15}])
```

#### 查询文档

##### 语法：

```python
# 查询第一个文档
< collection-object-name >.find_one( < condition > )
# 查询所有文档
< collection-object-name >.find( < condition > )
```

##### 示例：

```python
# 查询第一个文档
my_collection.find_one({'name': 'Sun Wukong'})
# 查询所有文档
my_collection.find({})
```

#### 更新文档

##### 语法：

```python
# 更新单个
< collection-object-name >.update_one( < condition >, < update > )
# 更新多个
< collection-object-name >.update_many( < condition >, < update > )
```

##### 示例：

```python
# 更新单个
my_collection.update_one({'name': 'Sun Wukong'}, {'$set': {'name': 'Sun Xingzhe'}})
# 更新多个
my_collection.update_many({'name': 'Sun Wukong'}, {'$set': {'name': 'Sun Xingzhe'}})
```

#### 删除文档

##### 语法：

```python
# 删除单个
< collection-object-name >.delete_one( < condition > )
# 删除多个
< collection-object-name >.delete_many( < condition > )
```

##### 示例：

```python
# 删除单个
my_collection.delete_one({'name': 'Sun Wukong'})
# 删除多个
my_collection.delete_many({})
```

### 编码实现

```python
import pymongo


# 连接 MongoDB
def connect_server(host, port, database_name, collection_name):
    # 连接 MongoDB 服务器
    my_connection = pymongo.MongoClient(host, port)
    # 访问数据库
    my_database = my_connection.get_database(database_name)
    # 访问集合
    my_collection = my_database.get_collection(collection_name)
    return my_collection


# 插入单个文档
def insert_document(collection, document):
    collection.insert_one(document)


# 插入多个文档
def insert_documents(collection, document_list):
    collection.insert_many(document_list)


# 查询单个文档
def find_document(collection, condition):
    result = collection.find_one(condition)
    print(result)


# 查询多个文档
def find_documents(collection, condition):
    results = collection.find(condition)
    for result in results:
        print(result)


# 更新单个文档
def update_document(collection, condition, update):
    collection.update_one(condition, update)


# 更新多个文档
def update_documents(collection, condition, update):
    collection.update_many(condition, update)


# 删除单个文档
def delete_document(collection, condition):
    collection.delete_one(condition)


# 删除多个文档
def delete_documents(collection, condition):
    collection.delete_many(condition)


# 插入操作
def operate_insert():
    collection = connect_server('127.0.0.1', 27017, 'myDatabase', 'myCollection')
    document = {'name': 'Sun Wukong', 'age': 19}
    document_list = [{'name': 'Zhu Bajie', 'age': 18}, {'name': 'Sha Heshang', 'age': 15}]
    insert_document(collection, document)
    insert_documents(collection, document_list)


# 查询操作
def operate_find():
    collection = connect_server('127.0.0.1', 27017, 'myDatabase', 'myCollection')
    # condition = {'name': 'Sun Wukong'}
    # find_document(collection, condition)
    find_documents(collection, {})


# 更新操作
def operate_update():
    collection = connect_server('127.0.0.1', 27017, 'myDatabase', 'myCollection')
    condition = {'name': 'Sun Wukong'}
    update = {'$set': {'name': 'Sun Xingzhe'}}
    # update_document(collection, condition, update)
    update_documents(collection, condition, update)


# 删除操作
def operate_delete():
    collection = connect_server('127.0.0.1', 27017, 'myDatabase', 'myCollection')
    condition = {'name': 'Sun Xingzhe'}
    delete_document(collection, condition)
    delete_documents(collection, {})

    
# operate_insert()
# operate_find()
# operate_update()
operate_delete()

```

