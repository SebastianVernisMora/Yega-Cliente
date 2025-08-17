# YEGA API Handoff Specification

## 1. Introduction
This document specifies the API endpoints and data models required to transition the YEGA application from a prototype with simulated data to a production-ready application.

## 2. Base URL
All API endpoints are prefixed with `/api`.
`https://api.yega.com/api`

## 3. Authentication
Handles user registration, login, and logout.

### `POST /auth/login`
Authenticates a user and returns a JWT.

- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "userpassword"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "usr_123",
      "name": "John Doe",
      "email": "user@example.com"
    }
  }
  ```
- **Error Response (401 Unauthorized):**
  ```json
  {
    "error": "Invalid credentials"
  }
  ```

### `POST /auth/register`
Creates a new user account.

- **Request Body:**
  ```json
  {
    "firstName": "Juan",
    "lastName": "Pérez",
    "email": "user@example.com",
    "password": "SecurePassword1"
  }
  ```
- **Success Response (201 Created):**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "usr_456",
      "firstName": "Juan",
      "lastName": "Pérez",
      "email": "user@example.com"
    }
  }
  ```
- **Error Response (409 Conflict):**
  ```json
  {
    "error": "Email already exists"
  }
  ```

### `POST /auth/logout`
Logs out the current user (invalidates token).

- **Success Response (204 No Content):** (Empty response)

---

## 4. Stores & Products

### `GET /stores`
Retrieves a list of stores, with optional filtering.

- **Query Parameters:**
  - `search` (string): Filters stores by name or type.
  - `category` (string): Filters stores by category ID.
- **Success Response (200 OK):**
  ```json
  {
    "user": {
      "name": "Juan"
    },
    "categories": [
      { "id": "cat_1", "name": "Restaurantes", "iconUrl": "/icons/burguer.png", "storeCount": 120 },
      { "id": "cat_2", "name": "Super", "iconUrl": "/icons/cart.png", "storeCount": 45 }
    ],
    "stores": [
      {
        "id": "str_1",
        "name": "Tacos El Güero",
        "type": "Mexicana",
        "estimatedTime": "25-30 min",
        "rating": 4.8,
        "deliveryFee": "Gratis",
        "imageUrl": "/images/tacos.png",
        "distance": "1.2 km"
      }
    ]
  }
  ```

### `GET /stores/:id`
Retrieves details for a single store, including its menu.

- **Path Parameter:**
  - `id` (string): The unique ID of the store.
- **Success Response (200 OK):**
  ```json
  {
    "id": "str_1",
    "name": "Tacos El Güero",
    "type": "Comida Mexicana",
    "imageUrl": "/images/tacos_banner.png",
    "rating": 4.8,
    "reviewCount": 234,
    "deliveryFee": "Gratis",
    "menu": {
      "Tacos": [
        { "id": "prod_1", "name": "Taco de Pastor", "price": 18, "description": "Con piña y cebolla" },
        { "id": "prod_2", "name": "Taco de Carnitas", "price": 20, "description": "Carne suave y jugosa" }
      ],
      "Bebidas": [
        { "id": "prod_3", "name": "Coca Cola 600ml", "price": 25, "description": "Refresco frío" }
      ]
    }
  }
  ```

---

## 5. Cart
Manages the user's shopping cart. Requires authentication.

### `GET /cart`
Retrieves the current user's cart.

- **Success Response (200 OK):**
  ```json
  {
    "id": "cart_123",
    "items": [
      { "productId": "prod_1", "name": "Taco de Pastor", "price": 18, "quantity": 2 },
      { "productId": "prod_2", "name": "Taco de Carnitas", "price": 20, "quantity": 1 }
    ],
    "shippingFee": 25,
    "subtotal": 56,
    "total": 81
  }
  ```

### `POST /cart/items`
Adds an item to the cart.

- **Request Body:**
  ```json
  { "productId": "prod_3", "quantity": 1 }
  ```
- **Success Response (200 OK):** (Returns the updated cart object)

### `PUT /cart/items/:productId`
Updates the quantity of an item in the cart.

- **Request Body:**
  ```json
  { "quantity": 3 }
  ```
- **Success Response (200 OK):** (Returns the updated cart object)

### `DELETE /cart/items/:productId`
Removes an item from the cart.

- **Success Response (200 OK):** (Returns the updated cart object)

---

## 6. Orders
Manages order creation and history. Requires authentication.

### `POST /orders`
Places a new order from the current cart.

- **Request Body:**
  ```json
  { "tip": 10.50 }
  ```
- **Success Response (201 Created):**
  ```json
  {
    "orderId": "ord_xyz789",
    "estimatedTime": "25-30 min",
    "deliveryAddress": "Av. Principal #123",
    "totalPaid": 113.00,
    "status": "preparing"
  }
  ```

### `GET /orders`
Retrieves the user's order history.

- **Success Response (200 OK):**
  ```json
  {
    "orders": [
      {
        "id": "ord_abc123",
        "displayId": "YEG001",
        "date": "2024-01-15",
        "store": "Supermercado Central",
        "total": 89250,
        "currency": "COP",
        "status": "delivered"
      }
    ]
  }
  ```

### `GET /orders/:id`
Retrieves details for a specific order.

- **Success Response (200 OK):**
  ```json
  {
    "id": "ord_abc123",
    "displayId": "YEG001",
    "date": "2024-01-15",
    "store": "Supermercado Central",
    "address": "Calle 123, Ciudad",
    "total": 89250,
    "currency": "COP",
    "status": "delivered",
    "items": [
      { "name": "Leche entera", "quantity": 2 },
      { "name": "Pan integral", "quantity": 1 }
    ],
    "deliveryTime": "25 min",
    "rating": 5
  }
  ```

### `POST /orders/:id/reorder`
Creates a new cart with items from a previous order.

- **Success Response (201 Created):**
  ```json
  { "newCartId": "cart_456" }
  ```

---

## 7. Order Tracking
Provides real-time tracking for an order.

### `GET /orders/:id/tracking`
Retrieves the initial state for tracking an order.

- **Success Response (200 OK):**
  ```json
  {
    "orderId": "ord_xyz789",
    "status": "en-route",
    "estimatedTime": 25,
    "driver": {
      "name": "Carlos Rodríguez",
      "photoUrl": "/images/driver.png",
      "currentPosition": { "lat": 4.60971, "lng": -74.08175 }
    },
    "storePosition": { "lat": 4.61971, "lng": -74.09175 },
    "destinationPosition": { "lat": 4.59971, "lng": -74.07175 },
    "statusHistory": [
      { "status": "Pedido confirmado", "time": "14:30", "completed": true },
      { "status": "En camino", "time": "14:45", "completed": false }
    ]
  }
  ```

### WebSocket `wss://api.yega.com/tracking/:orderId`
Provides real-time updates for driver position and order status.

- **Server-to-Client Messages:**
  - Position Update: `{ "type": "positionUpdate", "payload": { "lat": 4.60981, "lng": -74.08275 } }`
  - Status Update: `{ "type": "statusUpdate", "payload": { "status": "Entregado", "time": "15:10", "completed": true } }`

---

## 8. User Profile
Manages user-specific data. Requires authentication.

### `GET /profile`
Retrieves the complete user profile.

- **Success Response (200 OK):**
  ```json
  {
    "user": {
      "name": "Ana García",
      "email": "ana.garcia@email.com",
      "phone": "+57 310 123 4567",
      "avatarUrl": null,
      "memberSince": "2023"
    },
    "stats": { "orders": 12, "rating": 4.8, "saved": 150000, "currency": "COP" },
    "addresses": [
      { "id": "addr_1", "label": "Casa", "address": "Cra 15 #123-45", "isDefault": true }
    ],
    "paymentMethods": [
      { "id": "pay_1", "brand": "Visa", "lastFour": "4532", "isDefault": true }
    ],
    "settings": { "notifications": true, "darkMode": false }
  }
  ```

### `PUT /profile`
Updates the main user information.

- **Request Body:**
  ```json
  {
    "name": "Ana María García",
    "phone": "+57 310 123 4568"
  }
  ```
- **Success Response (200 OK):** (Returns the updated profile object)

### Address Management
- `POST /profile/addresses`
- `PUT /profile/addresses/:id`
- `DELETE /profile/addresses/:id`

### Payment Method Management
- `POST /profile/payment-methods`
- `PUT /profile/payment-methods/:id`
- `DELETE /profile/payment-methods/:id`

### `PUT /profile/settings`
Updates user settings.

- **Request Body:**
  ```json
  {
    "notifications": false,
    "darkMode": true
  }
  ```
- **Success Response (200 OK):** (Returns the updated settings object)
