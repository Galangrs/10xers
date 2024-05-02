# 10xers

Backend Dev Hiring
here's the translated README.md for the "Backend Dev Hiring" API:

```markdown
# Hiring Backend API

## Description

This API provides endpoints for user registration, authentication, and phone product management.

## Base URL

http://localhost:8080/

## Swagger

http://localhost:8080/api-docs
```

## Endpoints

### Route /admin/register

-   **URL:** `/admin/register`
-   **Method:** `POST`
-   **Description:** Endpoint for admin registration.
-   **Request Body:**

    ```json
    {
        "email": "boo@example.com",
        "password": "password",
        "username": "admin"
    }
    ```

-   **Responses:**
    -   `201`: Account {username} created successfully
    -   `400`: Email, password, and username must be filled or Invalid email format or email and usernamemust be unique
    -   `403`: IP Blocked

### Route /public/register

-   **URL:** `/public/register`
-   **Method:** `POST`
-   **Description:** Endpoint for public user registration.
-   **Request Body:**
    ```json
    {
        "email": "joo@example.com",
        "password": "password",
        "username": "user"
    }
    ```
-   **Responses:**
    -   `201`: Account {username} created successfully
    -   `400`: Email, password, and username must be filled or Invalid email format or email and usernamemust be unique

### Route /public/login

-   **URL:** `/public/login`
-   **Method:** `POST`
-   **Description:** Endpoint for user login.
-   **Request Body:**
    ```json
    {
        "email": "joo@example.com",
        "password": "password"
    }
    ```
-   **Responses:**
    -   `201`: Welcome {username}
    -   `400`: Invalid email/password

### Route /public/phone

-   **URL:** `/public/phone`
-   **Method:** `GET`
-   **Description:** Retrieve phone details.
-   **Query Parameters:**
    ```json
    {
        "id": 1,
        "brand": "Motorola",
        "type": "12",
        "color": "Blue",
        "price": 600,
        "processor": "Snapdragon",
        "ramCapacity": 8,
        "screenSize": "6.7",
        "storageCapacity": 586,
        "mainCameraResolution": "1080 x 2400",
        "frontCameraResolution": "108",
        "batteryCapacity": "32",
        "operatingSystem": 4000,
        "operatingSystem": "Android 11"
    }
    ```
-   **Responses:**

    -   `200`: Max 10 item detail phone

-   **URL:** `/public/phone`
-   **Method:** `POST`
-   **Description:** Add a new phone product.
-   **Request Body:**
    ```json
    {
        "brand": "Motorola",
        "type": "Motorola Edge 20",
        "color": "Blue",
        "price": 600,
        "processor": "Snapdragon 778G",
        "ramCapacity": 8,
        "screenSize": "6.7 inches",
        "storageCapacity": 586,
        "screenResolution": "1080 x 2400 pixels",
        "mainCameraResolution": "108 MP",
        "frontCameraResolution": "32 MP",
        "batteryCapacity": 4000,
        "operatingSystem": "Android 11"
    }
    ```
-   **Responses:**
    -   `201`: Added product phone {brand} successfully
    -   `400`: Brand, type, color, and price must be filled or price must be a non-negative number or price, ramCapacity, storageCapacity, and batteryCapacity is Number cannot String

### Route /public/phone/id

-   **URL:** `/public/phone/{id}`
-   **Method:** `DELETE`
-   **Description:** Delete a phone product by ID.
-   **Path Parameters:**
    -   `id`: ID of the phone product
-   **Request Headers:**
    -   `access_token`: JWT token for authorization
-   **Responses:**

    -   `200`: Delete product phone {brand} successfully
    -   `401`: You are not authorized to access this phone data or JWT must be provided
    -   `404`: Phone not found with the provided ID {id}

-   **URL:** `/public/phone/{id}`
-   **Method:** `PATCH`
-   **Description:** Edit a phone product by ID.
-   **Path Parameters:**
    -   `id`: ID of the phone product
-   **Request Headers:**
    -   `access_token`: JWT token for authorization
-   **Request Body:**
    ```json
    {
        "brand": "Motorola",
        "type": "Motorola Edge 20",
        "color": "Blue",
        "price": 600,
        "processor": "Snapdragon 778G",
        "ramCapacity": 8,
        "screenSize": "6.7 inches",
        "storageCapacity": 256,
        "screenResolution": "1080 x 2400 pixels",
        "mainCameraResolution": "108 MP",
        "frontCameraResolution": "32 MP",
        "batteryCapacity": 4000,
        "operatingSystem": "Android 11"
    }
    ```
-   **Responses:**
    -   `200`: Edit product phone {brand} successfully
    -   `400`: Price, ramCapacity, storageCapacity, and batteryCapacity are numbers, not strings
    -   `401`: You are not authorized to access this phone data or JWT must be provided
    -   `404`: Phone not found with the provided ID {id}

## Permissions

-   **Guest, Admin, User:**

    -   `GET` `/public/phone`

-   **Admin, User:**

    -   `POST` `/public/login`
    -   `PATCH` `/public/phone`
    -   `DELETE` `/public/phone/:id`
    -   `PATCH` `/public/phone/:id`

-   **White List IP:**
    -   `/admin/register`

## Video:

video demonstrating the implemented APIs and their functionalities has been provided. [Link to Video](https://drive.google.com/file/d/19CShV13XDJ3aZ6c9LBy4xuPYHs2Jbx9b/view?usp=sharing)
