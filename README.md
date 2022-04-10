# Penjualan Backend

# Documentation

1. [ Item Category ](#item-category)
   - [Get All Item Category](#get-all-Item-category)
   - [Get One Item Category](#get-one-Item-category)
   - [Create Item Category](#create-Item-category)
   - [Edit Item Category](#edit-Item-category)
   - [Delete Item Category](#delete-item-category)

2. [ Item ](#item)
   - [Get All Item](#get-all-Item)
   - [Get One Item](#get-one-Item)
   - [Create Item](#create-Item)
   - [Edit Item](#edit-Item)
   - [Delete Item](#delete-item)
 
3. [ Transaction ](#transaction)
   - [Get All Transaction](#get-all-Transaction)
   - [Get One Transaction](#get-one-Transaction)
   - [Create Transaction](#create-Transaction)
   - [Edit Transaction](#edit-Transaction)
   - [Delete Transaction](#delete-Transaction)
   - [Report Transaction](#report-Transaction)

<a name="item-category"></a>

# Item Category

<a name="get-all-Item-category"></a>

### Get All Item Category

`[GET]/api/v1.0/item-category`

```
params:
-  category_name
```

<a name="get-one-Item-category"></a>

### Get One Item Category

`[GET]/api/v1.0/item-category/{id}`

<a name="create-Item-category"></a>

### Create Item Category

`[POST]/api/v1.0/item-category`

```
body:
{
  "category_name": String
}
```

<a name="edit-Item-category"></a>

### Edit Item Category

`[PUT]/api/v1.0/item-category/{id}`

```
body:
{
  "category_name": String
}
```
<a name="delete-Item-category"></a>

### Delete Item Category

`[DELETE]/api/v1.0/item-category/{id}`

<a name="item"></a>

# Item

<a name="get-all-Item"></a>

### Get All Item

`[GET]/api/v1.0/item`

```
params:
-  item_name
-  category_name
```

<a name="get-one-Item"></a>

### Get One Item

`[GET]/api/v1.0/item/{id}`

<a name="create-Item"></a>

### Create Item

`[POST]/api/v1.0/item`

```
body:
{
  "item_name": String,
  "qty": Int,
  "category_id": Int
}
```

<a name="edit-Item"></a>

### Edit Item

`[PUT]/api/v1.0/item/{id}`

```
body:
{
  "item_name": String,
  "qty": Int,
  "category_id": Int
}
```

<a name="delete-Item"></a>

### Delete Item

`[DELETE]/api/v1.0/item/{id}`

<a name="transaction"></a>

# Transaction

<a name="get-all-Transaction"></a>

### Get All Transaction

`[GET]/api/v1.0/transaction`

```
params:
-  start_date
-  end_date 
-  item_name
-  category_name
```

<a name="get-one-Transaction"></a>

### Get One Transaction

`[GET]/api/v1.0/transaction/{id}`

<a name="create-Transaction"></a>

### Create Transaction

`[POST]/api/v1.0/item-`

```
body:
{
  "item_id": Int,
  "qty": Int,
  "transaction_date": DateTime
}
```

<a name="edit-Transaction"></a>

### Edit Transaction

`[PUT]/api/v1.0/transaction/{id}`

```
body:
{
  "item_id": Int,
  "qty": Int,
  "transaction_date": DateTime
}
```
<a name="delete-Transaction"></a>

### Delete Transaction

`[DELETE]/api/v1.0/transaction/{id}`

<a name="report-Transaction"></a>

### Report Transaction

`[GET]/api/v1.0/transaction/report`

```
params:
-  start_date
-  end_date 
```
