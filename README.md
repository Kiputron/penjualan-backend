# Penjualan Backend

# Documentation

1. [ Item Category ](#item-category)
   - [Get All Item Category](#get-all-Item-category)
   - [Get One Item Category](#get-one-Item-category)
   - [Create Item Category](#create-Item-category)
   - [Edit Item Category](#edit-Item-category)
   - [Delete Item Category](#delete-item-category)

<a name="item-category"></a>

# Item Category

<a name="get-all-Item-category"></a>

### Get All Item Category

`[GET]/api/v1.0/item-category`

```
params:
- category_name
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

### Delete Item Category

`[DELETE]/api/v1.0/item-category/{id}`
