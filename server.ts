import express, { Request, Response } from "express";
import { MergeArrayRequest } from "./interfaces/requestBody";
import { mergeSortedArrays, genericSuccess, genericError, isValidArray, isSorted } from "./layers/utils";

const app = express();
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

app.post("/merge-array", (req: Request, res: Response): any => {
    try {
        const { array1, array2 } = req.body as MergeArrayRequest;

        if (!isValidArray(array1) || !isValidArray(array2)) {
            return res.status(400).json(genericError(400, { error: "Both inputs must be arrays of numbers." }));
        }
        // Merge and sort the arrays
        const mergedArray: number[] = mergeSortedArrays(array1.sort((a, b) => a - b), array2.sort((a, b) => a - b));
        return res.status(200).json(genericSuccess(200, {
            mergedArray
        }));
    } catch (error) {
        console.error("Error merging arrays:", error);
        return res.status(500).json(genericError(500, { error: "Internal server error" }));
    }
});

app.post("/merge-sorted-array", (req: Request, res: Response): any => {
    try {
        const { array1, array2 } = req.body as MergeArrayRequest;

        if (!isValidArray(array1) || !isValidArray(array2)) {
            return res.status(400).json(genericError(400, { error: "Both inputs must be arrays of numbers." }));
        }

        // Validate if both arrays are sorted
        if (!isSorted(array1) || !isSorted(array2)) {
            return res.status(400).json(genericError(400, { error: "Both inputs must be sorted arrays of numbers." }));
        }

        // Merge sorted arrays only
        const mergedArray: number[] = mergeSortedArrays(array1, array2);
        return res.status(200).json(genericSuccess(200, {
            mergedArray
        }));
    } catch (error) {
        console.error("Error merging arrays:", error);
        return res.status(500).json(genericError(500, { error: "Internal server error" }));
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export { app };