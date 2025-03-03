# LuxStay API Documentation

## Base URL
```
${EXPO_PUBLIC_API_URL} (default: http://localhost:1337/api)
```

## Authentication
All protected endpoints require a Firebase ID token in the Authorization header:
```
Authorization: Bearer <firebase-id-token>
```

## Endpoints

### Rooms

#### Get All Rooms
```http
GET /rooms
```

Query Parameters:
- `filters[price][$gte]` - Minimum price
- `filters[price][$lte]` - Maximum price
- `filters[location][$contains]` - Location search
- `filters[type][$eq]` - Room type
- `filters[rating][$gte]` - Minimum rating
- `filters[maxGuests][$gte]` - Minimum guests
- `filters[amenities][$contains]` - Required amenities

Response:
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "Luxury Suite",
        "description": "Beautiful suite with ocean view",
        "price": 299.99,
        "images": ["url1", "url2"],
        "location": "Miami Beach",
        "amenities": ["WiFi", "Pool"],
        "rating": 4.8,
        "type": "suite",
        "createdAt": "2025-03-03T14:00:00.000Z",
        "updatedAt": "2025-03-03T14:00:00.000Z"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "pageCount": 5,
      "total": 50
    }
  }
}
```

#### Get Single Room
```http
GET /rooms/{id}
```

Response:
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "name": "Luxury Suite",
      "description": "Beautiful suite with ocean view",
      "price": 299.99,
      "images": ["url1", "url2"],
      "location": "Miami Beach",
      "amenities": ["WiFi", "Pool"],
      "rating": 4.8,
      "type": "suite",
      "createdAt": "2025-03-03T14:00:00.000Z",
      "updatedAt": "2025-03-03T14:00:00.000Z"
    }
  }
}
```

### Bookings

#### Create Booking (Protected)
```http
POST /bookings
```

Request Body:
```json
{
  "data": {
    "userId": "firebase-user-id",
    "roomId": "room-id",
    "checkIn": "2025-03-10T14:00:00.000Z",
    "checkOut": "2025-03-15T11:00:00.000Z",
    "guests": 2,
    "totalPrice": 1499.95,
    "paymentMethod": "card"
  }
}
```

Response:
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "userId": "firebase-user-id",
      "roomId": "room-id",
      "checkIn": "2025-03-10T14:00:00.000Z",
      "checkOut": "2025-03-15T11:00:00.000Z",
      "guests": 2,
      "totalPrice": 1499.95,
      "paymentStatus": "pending",
      "bookingStatus": "pending",
      "createdAt": "2025-03-03T14:00:00.000Z",
      "updatedAt": "2025-03-03T14:00:00.000Z"
    }
  }
}
```

### User Profile

#### Get User Profile (Protected)
```http
GET /users/{userId}
```

Response:
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "userId": "firebase-user-id",
      "displayName": "John Doe",
      "email": "john@example.com",
      "phoneNumber": "+1234567890",
      "preferences": {
        "notifications": true,
        "newsletter": false,
        "language": "en"
      }
    }
  }
}
```

#### Update User Profile (Protected)
```http
PUT /users/{userId}
```

Request Body:
```json
{
  "data": {
    "displayName": "John Smith",
    "phoneNumber": "+1234567890",
    "preferences": {
      "notifications": true,
      "newsletter": true,
      "language": "en"
    }
  }
}
```

### Wishlist

#### Add to Wishlist (Protected)
```http
POST /wishlists
```

Request Body:
```json
{
  "data": {
    "userId": "firebase-user-id",
    "roomId": "room-id"
  }
}
```

#### Remove from Wishlist (Protected)
```http
DELETE /wishlists/{id}
```

#### Get User Wishlist (Protected)
```http
GET /wishlists?filters[userId][$eq]={userId}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": {
    "status": 400,
    "name": "BadRequestError",
    "message": "Invalid request parameters"
  }
}
```

### 401 Unauthorized
```json
{
  "error": {
    "status": 401,
    "name": "UnauthorizedError",
    "message": "Authentication token is invalid"
  }
}
```

### 404 Not Found
```json
{
  "error": {
    "status": 404,
    "name": "NotFoundError",
    "message": "Resource not found"
  }
}
```

## Rate Limiting

- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

## Data Types

### Room Types
- `single`
- `double`
- `suite`
- `presidential`

### Booking Status
- `pending`
- `confirmed`
- `cancelled`

### Payment Status
- `pending`
- `completed`
- `failed`

## Testing

You can use the following test credentials in development:

```
Email: test@luxstay.com
Password: Test123!