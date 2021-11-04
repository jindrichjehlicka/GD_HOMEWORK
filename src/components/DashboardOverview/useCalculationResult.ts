import { CalculationData } from "./useCalculationOverviewData";

export type ResultType = "maximum_revenue" | "minimum_revenue" | "median"

interface UseCalculationResult {
    getResult: (resultType: ResultType, data: CalculationData[]) => CalculationResult;
}

type CalculationResult = { label: string, result: number, currency?: string }

const numbersRegex = /[^0-9.]/g;

const mapRevenueAmounts = (data: CalculationData[]): CalculationResult[] => {
    return data.map(i => {
        const currency = i.values[0].match(numbersRegex)?.[0];
        return {
            label: i.label,
            result: i.values.map(j => Number(j.replace(numbersRegex, ""))).filter(Boolean).reduce((a, b) => a + b, 0),
            currency,
        };
    }).sort((a, b) => {
        return a.result < b.result ? -1 : a.result > b.result ? 1 : 0;

    });
};

const getMaximumMonthRevenueAmount = (data: CalculationData[]): CalculationResult => {
    const mappedRevenues = mapRevenueAmounts(data);
    return mappedRevenues[mappedRevenues.length - 1];
};

const getMinimumMonthRevenueAmount = (data: CalculationData[]) => {
    const mappedRevenues = mapRevenueAmounts(data);
    return mappedRevenues[0];
};

const getHighestMonthlyMedian = (data: CalculationData[]):CalculationResult => {

    const mapped =  data.map(i => {
        const currency = i.values[0].match(numbersRegex)?.[0];
        return {
            label: i.label,
            result: getMedian(i.values.map(j => Number(j.replace(numbersRegex, ""))).filter(Boolean)),
            currency,
        };
    }).sort((a, b) => {
        return a.result < b.result ? -1 : a.result > b.result ? 1 : 0;

    });
    
    return mapped[mapped.length-1];
};

const getMedian = (numbers: number[]) => {
    const sorted = numbers.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[middle - 1] + sorted[middle]) / 2 : sorted[middle];
};
const calculation: Record<ResultType, (data: CalculationData[]) => CalculationResult> = {
    "maximum_revenue": getMaximumMonthRevenueAmount,
    "minimum_revenue": getMinimumMonthRevenueAmount,
    "median": getHighestMonthlyMedian,
};

const useCalculationResult = (): UseCalculationResult => {
    return {
        getResult: (resultType: ResultType, data: CalculationData[]): CalculationResult => {
            if (calculation[resultType])
                return calculation[resultType](data);
            else
                throw new Error("Selected calculation type doesn't exist!");
        },
    };
};

export default useCalculationResult;
