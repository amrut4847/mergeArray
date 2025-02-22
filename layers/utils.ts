export const mergeSortedArrays = (arr1: number[], arr2: number[]): number[] =>{
    const mergedArray: number[] = new Array(arr1.length + arr2.length);
    let i = 0, j = 0, k = 0;

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            mergedArray[k++] = arr1[i++];
        } else {
            mergedArray[k++] = arr2[j++];
        }
    }

    while (i < arr1.length) {
        mergedArray[k++] = arr1[i++];
    }

    while (j < arr2.length) {
        mergedArray[k++] = arr2[j++];
    }

    return mergedArray;
}

export const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  };
  
export function genericError(statusCode: number, e: any) {
    return {
      statusCode,
      body: JSON.stringify({ errors: [e.message || e] }),
      headers: corsHeaders,
    };
  }
  
  export function genericSuccess(statusCode: number, payload: any) {
    return {
      statusCode,
      body: JSON.stringify({ data: payload }),
      headers: corsHeaders,
    };
  }