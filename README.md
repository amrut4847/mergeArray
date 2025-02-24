# Merge Array Project

This project provides APIs to merge and sort arrays. It is built using Express and TypeScript.

## APIs

### 1. Merge and Sort Arrays

- **Endpoint:** `/merge-array`
- **Method:** `POST`
- **Description:** Merges two arrays and sorts the resulting array.
- **Request Body:**
  ```json
  {
    "array1": [number],
    "array2": [number]
  }
  
- **Response Body:**
  ```json
  {
    "statusCode": 200,
    "body": "{\"data\":{\"mergedArray\":[1,1,2,3,4,5,7,9,10]}}",
    "headers": {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
    }
  }

### 2. Merge Sorted Arrays

- **Endpoint: /merge-sorted-array
- **Method: POST
- **Description: Merges two already sorted arrays.
- **Request Body:
  ```json
  {
    "array1": [number],
    "array2": [number]
  }
  
- **Response Body:**
  ```json
  {
    "statusCode": 200,
    "body": "{\"data\":{\"mergedArray\":[1,1,2,3,4,5,7,9,10]}}",
    "headers": {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
    }
  }

## Steps to Run the Project

### 1. Clone the repository:

git clone https://github.com/amrut4847/mergeArray.git
cd merge-array-project


### 2. Install dependencies:

npm install

### 3. Start the server:

npm start

### 4. Server will be running on:

http://localhost:3000

### 5. Run test cases

npm test

## Dependencies
  - express

## Dev Dependencies
  - @types/express
  - @types/node
  - @types/jest
  - @types/supertest
  - nodemon
  - ts-node
  - typescript
  - supertest
  - jest

## Postman collection 
./MergeArrays.postman_collection.json
