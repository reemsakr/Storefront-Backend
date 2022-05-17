npm i# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 
___Table of Contents___

- [API and Database Requirements](#api-and-database-requirements)
  - [API Endpoints](#api-endpoints)
    - [Users](#users)
    - [Products](#products)
    - [Orders](#orders)
    - [Order Products](#order-products)
  - [Data Schema](#data-schema)
    - [Products Schema](#products-schema)
    - [Users Schema](#users-schema)
    - [Orders Schema](#orders-schema)
    - [Products for each Order Schema](#products-for-each-order-schema)
  - [Data Shapes](#data-shapes)
    - [User](#user)
    - [Product](#product)
    - [Order](#order)
    - [Order Product](#order-product)
## API Endpoints
#### Users
- Index - **`token required`**
  - HTTP verb `GET`
  - Endpoint:- `/api/users/`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Array of user objects`

    ```json
      {
        "status": "success",
        "data": {
          "users": [
            {
              "id": 1,
              "firstName": "reem",
              "lastName": "sakr",
              "password_digest":"111",
              "username": "reem.sakr"
            }
          ]
        },
        "message": "users retrieved successfully"
      }
    ```

- Show **`token required`**
  - HTTP verb `GET`
  - Endpoint:- `/api/users/:id`  - **id of the user to be retrieved**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `user object`

    ```json
        {
          "status": "success",
          "data": {
            "user": {
               "id": 1,
              "firstName": "reem",
              "lastName": "sakr",
              "password_digest":"111",
              "username": "reem.sakr"
            }
          },
          "message": "user retrieved successfully"
        }
    ```

- Create **`token required`**
  - HTTP verb `POST`
  - Endpoint:- `/api/users`
  - Request Body

    ```json
      {
              "firstName": "reem",
              "lastName": "sakr",
              "password_digest":"111",
              "username": "reem.sakr"
      }
    ```

  - Response Body -- `user object`

    ```json
      {
        "status": "success",
        "data": {
              "id": 1,
              "firstName": "reem",
              "lastName": "sakr",
              "password_digest":"111",
              "username": "reem.sakr"
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VyTmFtZSI6InRlc3R1c2VyIiwiZmlyc3ROYW1lIjoiVGVzdCIsImxhc3ROYW1lIjoiVXNlciJ9LCJpYXQiOjE2MjUwMDAyNTB9.y45Rlb9_olQIZpTHzFMH5fHK_coRlzcEuXQC2FXtCBY"
        },
        "message": "user created successfully"
      }
    ```

- Delete **`token required`**
  - HTTP verb `DELETE`
  - Endpoint:- `/api/users/:id` - **id of the user to be deleted**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Deleted user object`

    ```json
      {
        "status": "success",
        "data": {
          "user": {
              "id": 2,
              "firstName": "lolo",
              "lastName": "sakr",
              "password_digest":"111",
              "username": "lolo.sakr"
          }
        },
        "message": "user deleted successfully"
      }
    ```

- update **`token required`**
  - HTTP verb `Put`
  - Endpoint:- `/api/users/:id`
  - Request Body

    ```json
      {
              "id": 1,
              "firstName": "reem",
              "lastName": "sakr",
              "password_digest":"111",
              "username": "reem.sakr"
      }
    ```

  - Response Body -- `Updated User object`

    ```json
      {
        "status": "success",
        "data": {
          "user": {
             "id": 1,
              "firstName": "reem",
              "lastName": "sakr",
              "password_digest":"111",
              "username": "reem.sakr"
          }
        },
        "message": "user updated successfully"
      }
    ```

- Authenticate
  - HTTP verb `POST`
  - Endpoint:- `/api/users/authentication`
  - Request Body

    ```json
      {
        "username": "reem.sakr",
        "password_digest": "111"
      }
    ```

  - Response Body -- `Updated User object`

    ```json
      {
        "status": "success",
        "data": {
              "id": 1,
              "firstName": "reem",
              "lastName": "sakr",
              "password_digest":"111",
              "username": "reem.sakr"
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6Im1vQGVsemFuYXR5LmNvbSIsInVzZXJOYW1lIjoibW9oYW1tZWRlbHphbmF0eSIsImZpcnN0TmFtZSI6Ik1vaGFtbWVkIiwibGFzdE5hbWUiOiJFbHphbmF0eSJ9LCJpYXQiOjE2MjUwMDExMDB9.ubpj0l9VSl2Hd-KlHRqqO3-PmSf0VAySY2qnJ1N_S2Y"
        },
        "message": "user authenticated successfully"
      }
    ```
#### Products
- Index
  - HTTP verb `GET`
  - Endpoint:- `/api/products/`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Array of products`

    ```json
     {
        "status": "success",
        "data": {
          "products": [
            {
              "id": 1,
              "name": "product name",
              "price": 20
              
            }
          ]
        },
        "message": "Products retrieved successfully"
      }
    ```

- Show
  - HTTP verb `GET`
  - Endpoint:- `/api/products/:id`  - **id of the product to be retrieved**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Product object`

    ```json
      {
        "status": "success",
        "data": {
          "product": {
            "id": 1,
              "name": "product name",
              "price": 20
          }
        },
        "message": "Product retrieved successfully"
      }
    ```

- Create **`token required`**
  - HTTP verb `POST`
  - Endpoint:- `/api/products`
  - Request Body

    ```json
      {
        
              "name": "product name",
              "price": 20
      }
    ```

  - Response Body -- `product object`

    ```json
      {
        "status": "success",
        "data": {
          "id": 1,
              "name": "product name",
              "price": 20
        },
        "message": "Product created successfully"
      }
    ```

- Delete **`token required`**
  - HTTP verb `DELETE`
  - Endpoint:- `/api/products/:id` - **id of the product to be deleted**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Deleted Product object`

    ```json
      {
        "status": "success",
        "data": {
          "product": {
            "id": 1,
              "name": "product name",
              "price": 20
          }
        },
        "message": "Product deleted successfully"
      }
    ```

- update **`token required`**
  - HTTP verb `PUT`
  - Endpoint:- `/api/products/:id`
  - Request Body

    ```json
      {
        "id": 1,
              "name": "product name",
              "price": 20
      }
    ```

  - Response Body -- `Updated User object`

    ```json
      {
        "status": "success",
        "data": {
          "product": {
            "id": 1,
              "name": "product name",
              "price": 20
          }
        },
        "message": "Product updated successfully"
      }
    ```

- **[OPTIONAL]** Top 5 most popular products
- **[OPTIONAL]** Products by category (args: product category)

#### Orders
- Index - **`token required`**
  - HTTP verb `GET`
  - Endpoint:- `/api/orders/`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Array of order objects, including an array of products added to the order and the associated user`

    ```json
        {
          "status": "success",
          "data": {
            "orders": [
              { 
                "id": 1,
                "product_id":1,
                "quantity":2,
                "user_id": 1,
                "status": "active",
                 "products": [
                  {
                    "product_id": 1,
                    "name": "product name",
                    "price": 20
                  }
                ]
              }
            ]
          },
          "message": "Orders retrieved successfully"
        }
    ```

- Show - **`token required`**
  - HTTP verb `GET`
  - Endpoint:- `/api/orders/:id`  - **id of the order to be retrieved**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Order object`

    ```json
      {
        "status": "success",
        "data": {
          "order": {
            "id": 1,
                "product_id":1,
                "quantity":2,
                "user_id": 1,
                "status": "active",
            "products": []
          }
        },
        "message": "Order retrieved successfully"
      }
    ```

- Create **`token required`**
  - HTTP verb `POST`
  - Endpoint:- `/api/orders`
  - Request Body

    ```json
      {
                "product_id":1,
                "quantity":2,
                "user_id": 1,
                "status": "active",
      }
    ```

  - Response Body -- `User object`

    ```json
      {
        "status": "success",
        "data": {
          "id": 1,
                "product_id":1,
                "quantity":2,
                "user_id": 1,
                "status": "active",
        },
        "message": "Order created successfully"
      }
    ```

- Delete **`token required`**
  - HTTP verb `DELETE`
  - Endpoint:- `/api/orders/:id` - **id of the order to be deleted**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Deleted Order object`

    ```json
      {
        "status": "success",
        "data": {
          "order": {
            "id": 1,
                "product_id":1,
                "quantity":2,
                "user_id": 1,
                "status": "active",
          }
        },
        "message": "Order deleted successfully"
      }
    ```

- update **`token required`**
  - HTTP verb `PUT`
  - Endpoint:- `/api/orders/:id`
  - Request Body

    ```json
      {
        "id": 1,
                "product_id":1,
                "quantity":2,
                "user_id": 1,
                "status": "active",
      }
    ```

  - Response Body -- `Updated User object`

    ```json
      {
        "status": "success",
        "data": {
          "order": {
            "id": 1,
                "product_id":1,
                "quantity":2,
                "user_id": 1,
                "status": "active",
          }
        },
        "message": "Order updated successfully"
      }
    ```

- [OPTIONAL] Completed Orders by user [args: user id](token required)

## Data Schema

### Users Schema

```sql

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    password_digest VARCHAR(255)
);
```
### Products Schema

```sql
CCREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price integer NOT NULL
);
```
### Orders Schema

```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id bigint REFERENCES products(id),
    quantity integer,
    user_id bigint REFERENCES users(id),
    status VARCHAR(15)
);
```

### Products for each Order Schema

```sql
CREATE TABLE order_products (
id SERIAL PRIMARY KEY,
order_id integer REFERENCES orders(id) NOT NULL,
product_id integer REFERENCES products(id) NOT NULL,
quantity integer,
price integer
);
```

## Data Shapes
#### User
```typescript
ype user ={
    id : number;
    firstName:string;
    lastName:string;
    password_digest:string;
    username:string;
}
```
#### Product
type product ={
    id : number;
    name:string;
    price:number;
}
#### Orders
order ={
    id : number;
    product_id:number;
    quantity:number;
    user_id:number;
    status:string;
}

### Order_Products

```typescript
type order_product ={
    id : number;
    order_id:number;
    product_id:number;
    quantity:number;
    price:number;
}
```