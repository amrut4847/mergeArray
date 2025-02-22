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
  "data": {
    "mergedArray": [number]
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
  "data": {
    "mergedArray": [number]
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


## Project Structure

merge-array-project/
├── interfaces/
│   └── requestBody.ts
├── layers/
│   └── utils.ts
├── package.json
├── server.ts
└── tsconfig.json

## Dependencies

express
body-parser
cors

## Dev Dependencies

@types/express
@types/node
nodemon
ts-node
typescript

## Postman collection 
./MergeArrays.postman_collection.json
