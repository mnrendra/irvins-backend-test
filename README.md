# IRVINS Backend Take Home Assignment
This is my [IRVINS](https://irvinsaltedegg.com) take home assignment based on [IRVINS-Backend-Test](https://github.com/mnrendra/irvins-backend-test/blob/master/IRVINS-FullStack-Candidate-Test.pdf) document.<br/>
This assignment is to create Backend RESTful API for CRUD product.<br/>
This assignment was built using:<br/>
`NodeJs` for the runtime,<br/>
`ExpressJs` for the RESTful framework,<br/>
`MongoDB` for the databse,<br/>
and several NodeJs frameworks for the utilities.
<br/>
<br/>
And the results have been deploy on <b>[AWS](http://54.179.136.166/irvins/api/)</b> and <b>[Digitalocean](http://178.128.88.151/irvins/api/)</b>.<br/>
The database cloud on `MongoDB Atlas` and the file upload (image) cloud on `http://ec2-54-179-143-127.ap-southeast-1.compute.amazonaws.com/images/irvins/products/`.
<br/>
For the database (MongoDB Atlas) access, you can email me on [muhammadnurrendra@gmail.com](mailto://muhammadnurrendra@gmail.com) to ask access rights.
<br/>
<br/>
This project is related with [irvins-frontend-test](https://github.com/mnrendra/irvins-frontend-test#readme)
<br/>
<br/>
This project repo on:<br/>
[Github](https://github.com/mnrendra/irvins-backend-test),<br/>
[Bitbucket](https://bitbucket.org/mnrendra/irvins-backend-test/src/master)
<br/>
<br/>
Below is the API documentation:

# API Documentations

## `/products` endpoint
### `GET /products`
Get all products from database.<br/>
This API has query parameters and some of them have default values.<br/>
Below is the query parameters and the default values.

| Query | Default Value | Description | Example |
|---|---|---|---|
| `limit` | `3` | Limitation of products number per request. This is intended for pagination. | `GET /products?limit=10` will return 10 products per request |
| `page` | `0` | Page request number *start from 0. This is combined with `limit` for pagination. | `GET /products?page=1` will return page number two |
| `minPrice` | `0` | Filter products that only have a price above or equal the `minPrice` value. | `GET /products?minPrice=100` will return products where price value is more than or equal 100 |
| `maxPrice` | `1000000` | Filter products that only have a price below or equal the `maxPrice` value. | `GET /products?maxPrice=1000` will return products where price value is less than or equal 1000 |
| `sortBy` || Sort products based on parameter value.<br/><br/><i>Below is the parameter value options:</i><br/><br/>`priceAsc` sort by price in ascending order,<br/>`priceDes` sort by price in descending order,<br/><br/>`nameAsc` sort by name in ascending order,<br/>`nameDes` sort by name in descending order,<br/><br/>`createdAsc` sort by created time in ascending order,<br/>`createdDes` sort by created time in descending order,<br/><br/>`updatedAsc` sort by updated time in ascending order,<br/>`updatedDes` sort by updated time in descending order. | `GET /products?sortBy=priceAsc` will return products sort by price in ascending order. |

*This default value can be changed in `/config/constant.js` file.

#### Example:

request:
#### `GET /products?limit=2&page=0&minPrice=500&maxPrice=1000&sortBy=priceDes`

response:
```json
{
  "status": 200,
  "total": 4,
  "page": 0,
  "limit": 2,
  "data": [
    {
      "id": "5dfb1ba2483624089b63c0fd",
      "name": "Product 9",
      "price": 910.12,
      "image": "http://ec2-54-179-143-127.ap-southeast-1.compute.amazonaws.com/images/irvins/products/5e0eee6f785a2f3a89180e92.jpg",
      "created": "2020-01-03T07:58:40.063Z",
      "updated": "2020-01-03T07:58:40.063Z"
    },
    {
      "id": "5dfb1ba2483624089b63c0fd",
      "name": "Product 8",
      "price": 891.01,
      "image": "http://ec2-54-179-143-127.ap-southeast-1.compute.amazonaws.com/images/irvins/products/5e0eee6f785a2f3a89180e90.jpg",
      "created": "2020-01-03T06:35:27.619Z",
      "updated": "2020-01-03T07:31:03.974Z"
    },
  ]
}
```

<hr/>

### `GET /products/:id`
Get product by product-id.

#### Example:

request:
#### `GET /products/5dfb1ba2483624089b63c0fd`

response:
```json
{
  "status": 200,
  "data": {
    "id": "5dfb1ba2483624089b63c0fd",
    "name": "Product 8",
    "price": 891.01,
    "image": "http://ec2-54-179-143-127.ap-southeast-1.compute.amazonaws.com/images/irvins/products/5e0eee6f785a2f3a89180e90.jpg",
    "created": "2020-01-03T06:35:27.619Z",
    "updated": "2020-01-03T07:31:03.974Z"
  }
}
```

<hr/>

### `POST /products`
Post new product.<br/>
This API require data to post as new product.<br/>
Below is data requirements:

| Field | Type | Specification | Required |
|---|---|---|---|
| `name` | `String` | minimum length is 3 characters and maximum length is 32 characters | `true` |
| `price` | `Number` | minimum value is 0 and maximum value is 1000000 | `true` |
| `image` | `File` | mimetype should be `image/jpeg` or `image/png` | `false` |

*This specification can be changed in `/config/constant.js` file.

#### Example:

request:
#### `POST /products`

data:
```json
{
  "name": "Product 10",
  "price": 1012.34
}
```
response:
```json

{
  "status": 200,
  "success": {
    "name": "Success save new product!",
    "data": {
      "id": "5dfb1ba2483624089b64c0fd",
      "name": "Product 10",
      "price": 1012.34,
      "image": null,
      "created": "2020-01-03T07:31:03.974Z",
      "updated": "2020-01-03T07:31:03.974Z"
  }
}
```
<hr/>

### `PUT /products/:id`
Update product data.<br/>
This API require product-id that will be updated.<br>
And this API require data option for update the data.

#### Example:

request:
#### `PUT /products/5dfb1ba2483624089b64c0fd`

data:
```json
{
  "price": 1100.00
}
```
response:
```json
{
  "status": 200,
  "success": {
    "name": "Success update product!",
    "data": {
      "id": "5dfb1ba2483624089b64c0fd",
      "name": "Product 10",
      "price": 1100.00,
      "image": null,
      "created": "2020-01-03T07:31:03.974Z",
      "updated": "2020-01-03T07:31:03.974Z"
  }
}
```
<hr/>

### `DELETE /products/:id`
Delete product document.<br/>
This API require product-id that will be deleted.

#### Example:

request:
#### `DELETE /products/5dfb1ba2483624089b64c0fd`

response:
```json
{
  "status": 200,
  "success": {
    "name": "Success delete product!",
    "data": {
      "id": "5dfb1ba2483624089b64c0fd",
      "status": "deleted",
  }
}
```
<hr/>
