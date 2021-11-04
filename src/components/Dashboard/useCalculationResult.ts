export type ResultType = "maximum_revenue" | "minimum_revenue" | "median"

interface UseCalculationResult {
    getResult: (resultType: ResultType, data: []) => number;
}

const getMaximumRevenueAmount = () => 1;
const getMedian = () => 2;
const getMinimumRevenueAmount = () => 3;

// const median = (numbers: number[]) => {
//     const sorted = numbers.slice().sort((a, b) => a - b);
//     const middle = Math.floor(sorted.length / 2);
//     return sorted.length % 2 === 0 ? (sorted[middle - 1] + sorted[middle]) / 2 : sorted[middle];
// };
const calculation: Record<ResultType, () => number> = {
    "maximum_revenue": getMaximumRevenueAmount,
    "minimum_revenue": getMinimumRevenueAmount,
    "median": getMedian,
};

const useCalculationResult = (): UseCalculationResult => {

    return {
        getResult: (resultType: ResultType, data: []): number => {
            console.log("data", data);
            if (calculation[resultType])
                return calculation[resultType]();
            else
                throw new Error("Selected calculation type doesn't exist!");
        },
    };
};

export default useCalculationResult;
