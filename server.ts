import express, { Request, Response } from "express";
import { MergeArrayRequest } from "./interfaces/requestBody";
import { mergeSortedArrays, genericSuccess, genericError } from "./layers/utils";
const app = express();
app.use(express.json());

app.post("/merge-array", (req: Request, res: Response): any => {
    try {
        const { array1, array2 } = req.body as MergeArrayRequest;

        if (!Array.isArray(array1) || !Array.isArray(array2)) {
            res.send(genericError(400, { error: "Both inputs must be arrays of numbers." }));
        }

        // Merge and sort the arrays
        const mergedArray: number[] = [...array1, ...array2].sort((a, b) => a - b);
        res.send(genericSuccess(200, {
            mergedArray
        }));
    } catch (error) {
        console.error("Error merging arrays:", error);
        res.send(genericError(500, { error: "Internal server error" }));
    }
});

app.post("/merge-sorted-array", (req: Request, res: Response): any => {
    try {
        const { array1, array2 } = req.body as MergeArrayRequest;

        if (!Array.isArray(array1) || !Array.isArray(array2)) {
            res.send(genericError(400, { error: "Both inputs must be arrays of numbers." }));
        }

        // Merge sorted arrays only
        const mergedArray: number[] = mergeSortedArrays(array1, array2);

        res.send(genericSuccess(200, {
            mergedArray
        }));
    } catch (error) {
        console.error("Error merging arrays:", error);
        res.send(genericError(500, { error: "Internal server error" }));
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
