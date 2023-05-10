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
db.< collection-name >.insertMany( < documents-list > )
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
db.< collection-name >.find()
db.< collection-name >.find({})
// 查询所有符合指定条件的文档
db.< collection-name >.find( [ query ] )
// 查询第一个文档
db.< collection-name >.findOne()
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
db.myFirstCollection.find() // db.myFirstCollection.find({})
// 查询所有 name: Sun Wukong 的文档
db.myFirstCollection.find( { name: 'Sun Wukong' } )
// 查询第一个文档
db.myFirstCollection.findOne()
// 查询第一个 name: Sun Wukong 的文档
db.myFirstCollection.findOne( { name: 'Sun Wukong' } )
// 格式化查询结果
db.myFirstCollection.find().pretty()
// 限制查询结果返回的个数
db.myFirstCollection.find().limit(3)
// 略过指定个数的文档
db.myFirstCollection.find().skip(2)
// 对查询结果进行排序，1 是升序，-1 是降序
db.myFirstCollection.find().sort( { age: 1 } )
db.myFirstCollection.find().sort( { age: -1 } )
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