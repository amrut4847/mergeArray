import request from "supertest";
import { app } from "./server"; // Adjust path as needed

describe("POST /merge-array", () => {
    test("Should return empty array when both inputs are empty arrays", async () => {
        const response = await request(app)
            .post("/merge-array")
            .send({ array1: [], array2: [] });

        expect(response.body.statusCode).toBe(200);
        const result  = JSON.parse(response.body.body);
        expect(result.data.mergedArray).toEqual([]);
    });

    test("Should merge arrays when both contain one element", async () => {
        const response = await request(app)
            .post("/merge-array")
            .send({ array1: [5], array2: [3] });

        expect(response.body.statusCode).toBe(200);
        const result  = JSON.parse(response.body.body);
        expect(result.data.mergedArray).toEqual([3, 5]);
    });

    test("Should correctly merge arrays with negative numbers", async () => {
        const response = await request(app)
            .post("/merge-array")
            .send({ array1: [-10, -5], array2: [-8, -3] });

        expect(response.body.statusCode).toBe(200);
        const result  = JSON.parse(response.body.body);
        expect(result.data.mergedArray).toEqual([-10, -8, -5, -3]);
    });

    test("Should handle duplicate values in input arrays", async () => {
        const response = await request(app)
            .post("/merge-array")
            .send({ array1: [1, 2, 2, 3], array2: [2, 3, 4] });

        expect(response.body.statusCode).toBe(200);
        const result  = JSON.parse(response.body.body);
        expect(result.data.mergedArray).toEqual([1, 2, 2, 2, 3, 3, 4]);
    });

    test("Should merge large arrays efficiently", async () => {
        const largeArray1 = Array.from({ length: 500000 }, (_, i) => i * 2); // Even numbers
        const largeArray2 = Array.from({ length: 500000 }, (_, i) => i * 2 + 1); // Odd numbers

        const response = await request(app)
            .post("/merge-array")
            .send({ array1: largeArray1, array2: largeArray2 });

        expect(response.body.statusCode).toBe(200);
        const result  = JSON.parse(response.body.body);
        expect(result.data.mergedArray.length).toBe(1000000);
        expect(result.data.mergedArray[0]).toBe(0);
        expect(result.data.mergedArray[999999]).toBe(999999);
    });

    test("Should return error if input is not an array", async () => {
        const response = await request(app)
            .post("/merge-array")
            .send({ array1: "not an array", array2: [1, 2, 3] });

        const result  = JSON.parse(response.body.body);
        expect(response.body.statusCode).toBe(400);
        expect(result.errors[0].error).toBe("Both inputs must be arrays of numbers.");
    });

    test("Should return error if input contains non-number elements", async () => {
        const response = await request(app)
            .post("/merge-array")
            .send({ array1: [1, "hello"], array2: [2, 3] });
        
        const result  = JSON.parse(response.body.body);
        expect(response.body.statusCode).toBe(400);
        expect(result.errors[0].error).toBe("Both inputs must be arrays of numbers.");
    });
});

describe("POST /merge-sorted-array", () => {
    test("Should return empty array when both inputs are empty", async () => {
        const response = await request(app)
            .post("/merge-sorted-array")
            .send({ array1: [], array2: [] });

        const result  = JSON.parse(response.body.body);
        expect(response.body.statusCode).toBe(200);
        expect(result.data.mergedArray).toEqual([]);
    });

    test("Should merge two already sorted arrays", async () => {
        const response = await request(app)
            .post("/merge-sorted-array")
            .send({ array1: [1, 3, 5], array2: [2, 4, 6] });

        const result  = JSON.parse(response.body.body);
        expect(response.body.statusCode).toBe(200);
        expect(result.data.mergedArray).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test("Should merge two sorted arrays containing negative numbers", async () => {
        const response = await request(app)
            .post("/merge-sorted-array")
            .send({ array1: [-10, -5, 0], array2: [-8, -3, 2] });
    
        const result  = JSON.parse(response.body.body);
        expect(response.body.statusCode).toBe(200);
        expect(result.data.mergedArray).toEqual([-10, -8, -5, -3, 0, 2]);
    });

    test("Should handle sorted arrays with duplicate values", async () => {
        const response = await request(app)
            .post("/merge-sorted-array")
            .send({ array1: [1, 2, 2, 3], array2: [2, 3, 4] });
        
            const result  = JSON.parse(response.body.body);
        expect(response.body.statusCode).toBe(200);
        expect(result.data.mergedArray).toEqual([1, 2, 2, 2, 3, 3, 4]);
    });

    test("Should efficiently merge two large sorted arrays", async () => {
        const largeArray1 = Array.from({ length: 50000 }, (_, i) => i * 2);
        const largeArray2 = Array.from({ length: 50000 }, (_, i) => i * 2 + 1);

        const response = await request(app)
            .post("/merge-sorted-array")
            .send({ array1: largeArray1, array2: largeArray2 });

        const result  = JSON.parse(response.body.body);
        expect(response.body.statusCode).toBe(200);
        expect(result.data.mergedArray.length).toBe(100000);
        expect(result.data.mergedArray[0]).toBe(0);
        expect(result.data.mergedArray[99999]).toBe(99999);
    });

    test("Should return error if input arrays are not sorted", async () => {
        const response = await request(app)
            .post("/merge-sorted-array")
            .send({ array1: [3, 1, 5], array2: [2, 6, 4] });
        
        const result  = JSON.parse(response.body.body);
        expect(response.body.statusCode).toBe(400);
        expect(result.errors[0].error).toBe("Both inputs must be sorted arrays of numbers.");
    });

    test("Should return error if input is not an array", async () => {
        const response = await request(app)
            .post("/merge-sorted-array")
            .send({ array1: "not an array", array2: [1, 2, 3] });

        const result  = JSON.parse(response.body.body);
        expect(response.body.statusCode).toBe(400);
        expect(result.errors[0].error).toBe("Both inputs must be arrays of numbers.");
    });

    test("Should return error if input contains non-number elements", async () => {
        const response = await request(app)
            .post("/merge-sorted-array")
            .send({ array1: [1, "hello"], array2: [2, 3] });

        const result  = JSON.parse(response.body.body);
        expect(response.body.statusCode).toBe(400);
        expect(result.errors[0].error).toBe("Both inputs must be arrays of numbers.");
    });
});
