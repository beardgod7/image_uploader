# Image Upload API

This TypeScript API allows users to upload and retrieve images.

## 1. Upload Image

### Endpoint


### Request

- **Method:** `POST`
- **Endpoint:** `/upload`
- **Content-Type:** `multipart/form-data`

### Request Parameters

- `name` (type: string) - The name associated with the image.
- `Image` (type: file) - The image file to be uploaded.

### Responses

- `201 Created`: Image uploaded successfully.
  - **Response Format:** JSON
  - **Example:**
    ```json
    {
      "success": true,
      "message": "Image uploaded successfully",
      "data": {
        "id": "12345"
      }
    }
    ```
- `200 OK`: No file provided.
  - **Response Format:** JSON
  - **Example:**
    ```json
    {
      "error": "No file provided"
    }
    ```
- `200 OK`: Invalid file type. Only JPG, PNG, and GIF are allowed.
  - **Response Format:** JSON
  - **Example:**
    ```json
    {
      "error": "Invalid file type. Only JPG, PNG, and GIF are allowed."
    }
    ```
- `500 Internal Server Error`: Error uploading image.
  - **Response Format:** JSON
  - **Example:**
    ```json
    {
      "error": "system error"
    }
    ```

## 2. Get Image by ID

### Endpoint


### Request

- **Method:** `GET`
- **Endpoint:** `/get_image/:pictureId`

### URL Parameters

- `pictureId` (type: string) - The ID of the picture to retrieve.

### Responses

- `200 OK`: Image retrieved successfully.
  - **Response Format:** JSON
  - **Example:**
    ```json
    {
      "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/4QA..."
    }
    ```
- `200 OK`: Invalid pictureId format.
  - **Response Format:** JSON
  - **Example:**
    ```json
    {
      "error": "Invalid pictureId format"
    }
    ```
- `200 OK`: Image not found.
  - **Response Format:** JSON
  - **Example:**
    ```json
    {
      "error": "Image not found"
    }
    ```
- `500 Internal Server Error`: System error.
  - **Response Format:** JSON
  - **Example:**
    ```json
    {
      "error": "system error"
    }
    ```

Feel free to use this TypeScript-specific documentation as a starting point and customize it further based on your specific needs.
